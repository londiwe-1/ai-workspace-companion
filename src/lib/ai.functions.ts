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
    `You are a meeting analyst. From the raw meeting notes provided, produce markdown with exactly these sections:
## Meeting Summary
A short paragraph.
## Key Decisions
Bullet list of decisions made.
## Action Items
Bullet list in the format: **Owner** — task (due date if mentioned).
If information is missing, say "Not specified" instead of inventing details.`,
  tasks: () =>
    `You are a productivity planner. Turn the user's raw task list into a prioritized plan using markdown with exactly these sections:
## High Priority
## Medium Priority
## Low Priority
Under each heading use a bullet list. For each task add a short reason and a rough time estimate.
End with a "## Suggested Order" section listing the recommended sequence.`,
  research: () =>
    `You are a research assistant. Provide a concise research summary in markdown:
## Overview
2-3 sentences.
## Key Points
5-7 bullet points.
## Considerations & Limitations
Bullets noting uncertainty or where the reader should verify.
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
