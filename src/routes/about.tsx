import { createFileRoute } from "@tanstack/react-router";
import { Info } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { PageHeader } from "@/components/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About the Project — AI Productivity Assistant" },
      {
        name: "description",
        content:
          "Project overview, technology stack and prompt engineering approach behind the AI Productivity Assistant.",
      },
      { property: "og:title", content: "About the AI Productivity Assistant" },
      {
        property: "og:description",
        content: "Overview, tech stack and prompt engineering examples for this student project.",
      },
    ],
  }),
  component: About,
});

const promptExamples = [
  {
    tool: "Email Generator",
    prompt:
      "You are a professional workplace writing assistant. Write a ready-to-send email. Tone: Friendly. Start with a Subject line, include a greeting, 2-4 short paragraphs and a sign-off.",
  },
  {
    tool: "Meeting Summarizer",
    prompt:
      "From the raw meeting notes, produce markdown sections: Meeting Summary, Key Decisions, Action Items (Owner — task — due date). If information is missing, say 'Not specified' instead of inventing details.",
  },
  {
    tool: "Task Planner",
    prompt:
      "Turn the raw task list into High / Medium / Low priority sections. For each task add a short reason and a time estimate, then suggest an execution order.",
  },
  {
    tool: "Research Assistant",
    prompt:
      "Provide Overview, Key Points (5-7 bullets) and Considerations & Limitations. Be factual and flag uncertainty.",
  },
];

function About() {
  return (
    <AppShell>
      <PageHeader
        icon={Info}
        title="About This Project"
        description="How the AI Productivity Assistant was built and why."
      />

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Project Overview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <p>
              The AI Productivity Assistant is a student project that demonstrates how generative AI
              can automate routine workplace tasks. It bundles five assistants — email writing,
              meeting summarisation, task prioritisation, research and workplace Q&A — into one
              clean dashboard.
            </p>
            <p>
              The goal is to show practical AI usage, prompt engineering skill and responsible AI
              practice in a single, working MVP.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">AI Tools & Technology</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            <ul className="ml-5 list-disc space-y-1">
              <li>React 19 + TanStack Start (routing, server functions, SSR)</li>
              <li>Tailwind CSS v4 design system with a blue and white palette</li>
              <li>shadcn/ui components and lucide-react icons</li>
              <li>AI SDK connected to the Lovable AI Gateway</li>
              <li>Google Gemini Flash as the text generation model</li>
              <li>API keys stay on the server; the browser never sees them</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Prompt Engineering Examples</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {promptExamples.map((p) => (
              <div key={p.tool} className="rounded-lg border border-border bg-muted/50 p-4">
                <p className="text-sm font-semibold">{p.tool}</p>
                <p className="mt-2 text-sm text-muted-foreground">{p.prompt}</p>
              </div>
            ))}
            <p className="text-xs text-muted-foreground">
              Each prompt fixes a role, an output structure and a rule against inventing missing
              facts — this makes results consistent and easier to verify.
            </p>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
