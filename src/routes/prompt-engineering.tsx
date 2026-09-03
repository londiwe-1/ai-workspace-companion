import { createFileRoute } from "@tanstack/react-router";
import { Terminal } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { PageHeader } from "@/components/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/prompt-engineering")({
  head: () => ({
    meta: [
      { title: "Prompt Engineering — AI Productivity Assistant" },
      {
        name: "description",
        content:
          "Example system prompts for email, meeting, task, research and chatbot tools, with explanations of why each prompt is effective.",
      },
      { property: "og:title", content: "Prompt Engineering — AI Productivity Assistant" },
      {
        property: "og:description",
        content:
          "System prompts and effectiveness notes for each AI tool in the assistant.",
      },
    ],
  }),
  component: PromptEngineering,
});

type PromptExample = {
  tool: string;
  icon: string;
  prompt: string;
  why: { label: string; detail: string }[];
};

const promptExamples: PromptExample[] = [
  {
    tool: "Email Generation",
    icon: "✉️",
    prompt: `You are a professional workplace writing assistant.
Write a complete, ready-to-send email based on the user's instruction.
Tone: ${"<tone>"}.
Rules:
- Start with a "Subject:" line.
- Include a greeting, a clear body (2-4 short paragraphs) and a sign-off.
- Keep it concise and free of filler. Use plain text, no markdown headings.`,
    why: [
      {
        label: "Role assignment",
        detail:
          "Naming the assistant a 'workplace writing assistant' biases the model toward professional email conventions instead of generic prose.",
      },
      {
        label: "Explicit structure",
        detail:
          "Requiring a Subject line, greeting, body and sign-off guarantees a complete, ready-to-send message every time.",
      },
      {
        label: "Tone as a parameter",
        detail:
          "Passing tone dynamically (Professional / Friendly / Formal) lets one prompt serve multiple styles without rewriting it.",
      },
      {
        label: "Format constraint",
        detail:
          "Asking for plain text with no markdown headings keeps the output clean and paste-ready into an email client.",
      },
    ],
  },
  {
    tool: "Meeting Summarization",
    icon: "📝",
    prompt: `You are a meeting analyst. From the raw meeting notes provided, produce markdown with exactly these sections:
## Meeting Summary
A short paragraph.
## Key Decisions
Bullet list of decisions made.
## Action Items
Bullet list in the format: **Owner** — task (due date if mentioned).
If information is missing, say "Not specified" instead of inventing details.`,
    why: [
      {
        label: "Fixed output schema",
        detail:
          "Specifying exact section headings (Summary, Key Decisions, Action Items) makes output predictable and easy to scan.",
      },
      {
        label: "Consistent action-item format",
        detail:
          "The 'Owner — task — due date' template ensures action items stay actionable and assignable.",
      },
      {
        label: "Anti-hallucination rule",
        detail:
          "Telling the model to say 'Not specified' instead of guessing prevents fabricated owners or deadlines — a critical safety guard.",
      },
    ],
  },
  {
    tool: "Task Planning",
    icon: "✅",
    prompt: `You are a productivity planner. Turn the user's raw task list into a prioritized plan using markdown with exactly these sections:
## High Priority
## Medium Priority
## Low Priority
Under each heading use a bullet list. For each task add a short reason and a rough time estimate.
End with a "## Suggested Order" section listing the recommended sequence.`,
    why: [
      {
        label: "Categorization structure",
        detail:
          "High / Medium / Low priority headings force the model to reason about importance rather than echoing the list verbatim.",
      },
      {
        label: "Reasoning + estimates",
        detail:
          "Asking for a reason and time estimate per task makes the plan transparent and useful for scheduling.",
      },
      {
        label: "Execution guidance",
        detail:
          "A 'Suggested Order' section turns a static list into an actionable sequence the user can follow.",
      },
    ],
  },
  {
    tool: "Research Assistance",
    icon: "🔍",
    prompt: `You are a research assistant. Provide a concise research summary in markdown:
## Overview
2-3 sentences.
## Key Points
5-7 bullet points.
## Considerations & Limitations
Bullets noting uncertainty or where the reader should verify.
Be factual, neutral and flag anything you are unsure about.`,
    why: [
      {
        label: "Bounded length",
        detail:
          "Limiting the Overview to 2-3 sentences and Key Points to 5-7 bullets keeps the summary concise and scannable.",
      },
      {
        label: "Explicit uncertainty flagging",
        detail:
          "A dedicated 'Considerations & Limitations' section plus 'flag anything you are unsure about' builds trust and supports the responsible-AI principle of verifying outputs.",
      },
      {
        label: "Neutrality instruction",
        detail:
          "Asking for a factual, neutral tone reduces bias and opinion leakage into the summary.",
      },
    ],
  },
  {
    tool: "Chatbot Interaction",
    icon: "💬",
    prompt: `You are a helpful workplace productivity assistant. Answer questions about office work,
communication, planning, meetings and professional tools. Be concise, practical and friendly.
If a question needs sensitive personal data, remind the user not to share it.`,
    why: [
      {
        label: "Scoped domain",
        detail:
          "Defining the assistant's scope to 'office work, communication, planning, meetings' keeps answers on-topic and professional.",
      },
      {
        label: "Conversational style",
        detail:
          "'Concise, practical and friendly' sets a helpful tone without encouraging long, rambling replies.",
      },
      {
        label: "Privacy guardrail",
        detail:
          "Instructing the model to discourage sharing sensitive data reinforces the project's responsible-AI privacy principle directly in the chat.",
      },
      {
        label: "Full history context",
        detail:
          "The full conversation is sent on each call, so the prompt plus history gives the model continuity for follow-up questions.",
      },
    ],
  },
];

const principles = [
  {
    title: "Assign a clear role",
    detail:
      "Every prompt opens by naming the assistant's role, which steers the model toward domain-appropriate language and structure.",
  },
  {
    title: "Fix the output format",
    detail:
      "Specifying exact sections, headings and bullet formats makes results consistent across runs and easy to display.",
  },
  {
    title: "Constrain length and tone",
    detail:
      "Bounds on paragraphs, bullets and tone prevent over-long or off-style responses.",
  },
  {
    title: "Guard against hallucination",
    detail:
      "Instructions to say 'Not specified', flag uncertainty and avoid inventing details keep outputs trustworthy.",
  },
  {
    title: "Build in responsibility",
    detail:
      "Privacy reminders and verification prompts embed ethical AI practice directly into each tool.",
  },
];

function PromptEngineering() {
  return (
    <AppShell>
      <PageHeader
        icon={Terminal}
        title="Prompt Engineering"
        description="The system prompts behind each tool and why they work."
      />

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Why prompt engineering matters</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <p>
              Every AI tool in this assistant is driven by a carefully designed system prompt. The
              prompt is the single biggest lever on output quality — it sets the model's role, the
              shape of the response and the safety rules it must follow. The patterns below are
              reused across all five tools.
            </p>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {principles.map((p) => (
                <div key={p.title} className="rounded-lg border border-border bg-muted/40 p-3">
                  <p className="text-sm font-semibold text-foreground">{p.title}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{p.detail}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {promptExamples.map((p) => (
          <Card key={p.tool}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <span aria-hidden className="text-lg">{p.icon}</span>
                {p.tool}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  System prompt
                </p>
                <pre className="overflow-x-auto rounded-lg border border-border bg-muted/60 p-4 text-xs leading-relaxed text-foreground whitespace-pre-wrap">
                  {p.prompt}
                </pre>
              </div>
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Why this prompt is effective
                </p>
                <div className="space-y-2">
                  {p.why.map((w) => (
                    <div key={w.label} className="flex flex-col gap-1 sm:flex-row sm:gap-3">
                      <Badge variant="secondary" className="w-fit shrink-0 text-xs">
                        {w.label}
                      </Badge>
                      <p className="text-sm text-muted-foreground">{w.detail}</p>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        <Card>
          <CardHeader>
            <CardTitle className="text-base">How prompts are applied</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>
              Each system prompt lives in <code className="rounded bg-muted px-1 py-0.5 text-xs">src/lib/ai.functions.ts</code>{" "}
              and is sent to the model via the Lovable AI Gateway on every request. The user's input
              is passed as the message, while the system prompt silently shapes the response — the
              user never sees the prompt, only the structured result.
            </p>
            <p>
              The email tool additionally injects the selected tone into its prompt, demonstrating
              how a single well-engineered prompt can be parameterised for different styles.
            </p>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
