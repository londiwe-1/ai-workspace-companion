import { createFileRoute, Link } from "@tanstack/react-router";
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
            <CardTitle className="text-base">Prompt Engineering</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <p>
              Each tool is driven by a carefully designed system prompt that fixes the model's role,
              the output structure and anti-hallucination rules. See the full prompts and why each
              one is effective on the dedicated Prompt Engineering page.
            </p>
            <p>
              <Link
                to="/prompt-engineering"
                className="font-medium text-primary hover:underline"
              >
                View prompt engineering examples →
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
