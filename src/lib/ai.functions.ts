import { createServerFn } from "@tanstack/react-start";
import { streamText } from "ai";
import { z } from "zod";
import { createLovableAiGatewayProvider, DEFAULT_MODEL } from "./ai-gateway.server";

/**
 * Prompt engineering library.
 * Each tool has a dedicated system prompt that sets role, output format and
 * constraints — this is the "prompt engineering" layer of the project.
 */
export const SYSTEM_PROMPTS = {
  email: (tone: string) =>
    `You are a professional workplace writing assistant.
Write a complete, ready-to-send email based on the user's instruction.
Tone: ${tone}.
Rules:
- Start with a "Subject:" line.
- Include a greeting, a clear body (2-4 short paragraphs) and a sign-off.
- Keep it concise and free of filler. Use plain text, no markdown headings.`,
  meeting: () =>
    `Act as a meeting analyst. From the raw meeting notes or transcript provided, produce markdown with exactly these sections:
## Executive Summary
A short paragraph summarising the meeting.
## Key Discussion Points
Bullet list of the main topics discussed.
## Decisions Made
Bullet list of decisions reached.
## Action Items
Bullet list in the format: **Owner** — task (due date if mentioned).
If information is missing, say "Not specified" instead of inventing details.`,
  tasks: () =>
    `Act as a productivity coach. Turn the user's raw task list into a plan using markdown with exactly these sections:
## Urgent — Do First
Tasks that are both urgent and important, each with a short reason and rough time estimate.
## Important — Schedule
Important but not urgent tasks, each with a short reason and rough time estimate.
## Low Priority — Later
Non-urgent tasks that can wait.
## Daily Action Plan
A numbered, hour-by-hour suggested order for today.
Prioritize tasks according to urgency and importance. If a task's urgency is unclear, say so instead of guessing.`,
  research: () =>
    `Act as a research assistant. Provide a concise research brief in markdown with exactly these sections:
## Summary
2-3 sentences.
## Key Insights
5-7 bullet points.
## Recommendations
Bullets with practical recommendations, noting uncertainty or where the reader should verify.
Be factual, neutral and flag anything you are unsure about.`,
  chat: () =>
    `You are a helpful workplace productivity assistant. Answer questions about office work,
communication, planning, meetings and professional tools. Be concise, practical and friendly.
If a question needs sensitive personal data, remind the user not to share it.`,
} as const;

const ToolInput = z.object({
  tool: z.enum(["email", "meeting", "tasks", "research"]),
  input: z.string().min(1),
  tone: z.string().optional(),
});

function requireKey() {
  const key = process.env["LOVABLE_API_KEY"];
  if (!key) throw new Error("AI is not configured (missing API key).");
  return key;
}

/** Runs a single-shot productivity tool and returns the generated text. */
export const runTool = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => ToolInput.parse(data))
  .handler(async ({ data }) => {
    const gateway = createLovableAiGatewayProvider(requireKey());
    const system =
      data.tool === "email"
        ? SYSTEM_PROMPTS.email(data.tone ?? "Professional")
        : SYSTEM_PROMPTS[data.tool]();

    // Streaming under the hood avoids timeouts on longer generations.
    const result = streamText({
      model: gateway(DEFAULT_MODEL),
      system,
      prompt: data.input,
    });

    return { text: await result.text };
  });

const ChatInput = z.object({
  messages: z.array(
    z.object({ role: z.enum(["user", "assistant"]), content: z.string() }),
  ),
});

/** Chatbot endpoint — the full conversation history is sent on every call. */
export const chat = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => ChatInput.parse(data))
  .handler(async ({ data }) => {
    const gateway = createLovableAiGatewayProvider(requireKey());

    const result = streamText({
      model: gateway(DEFAULT_MODEL),
      system: SYSTEM_PROMPTS.chat(),
      messages: data.messages,
    });

    return { text: await result.text };
  });
