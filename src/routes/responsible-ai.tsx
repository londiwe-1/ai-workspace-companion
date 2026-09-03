import { createFileRoute } from "@tanstack/react-router";
import { AlertTriangle, Eye, Lock, ShieldCheck, CheckCircle2 } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { PageHeader } from "@/components/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const Route = createFileRoute("/responsible-ai")({
  head: () => ({
    meta: [
      { title: "Responsible AI — AI Productivity Assistant" },
      {
        name: "description",
        content:
          "Guidelines for safe and ethical use of AI: human review, privacy, accuracy and verification.",
      },
      { property: "og:title", content: "Responsible AI Guidelines" },
      {
        property: "og:description",
        content: "Human review, data privacy, accuracy limits and verification of AI outputs.",
      },
    ],
  }),
  component: ResponsibleAi,
});

const principles = [
  {
    icon: Eye,
    title: "Human review is required",
    text: "AI-generated content should always be reviewed by a human before it is sent, published or acted upon.",
  },
  {
    icon: Lock,
    title: "Protect sensitive information",
    text: "Do not share personal, confidential or client-identifying information with AI tools.",
  },
  {
    icon: AlertTriangle,
    title: "AI can be wrong",
    text: "AI can generate incorrect, outdated or fabricated information, stated with full confidence.",
  },
  {
    icon: CheckCircle2,
    title: "Verify important outputs",
    text: "Check facts, figures, names and dates against trusted sources before relying on any output.",
  },
];

function ResponsibleAi() {
  return (
    <AppShell>
      <PageHeader
        icon={ShieldCheck}
        title="Responsible AI"
        description="Principles that guide how this assistant should be used."
      />

      <div className="grid gap-4 sm:grid-cols-2">
        {principles.map((p) => (
          <Card key={p.title} className="h-full">
            <CardHeader className="space-y-3">
              <span className="flex size-10 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                <p.icon className="size-5" />
              </span>
              <CardTitle className="text-base">{p.title}</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">{p.text}</CardContent>
          </Card>
        ))}
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-base">Ethical considerations in this project</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          <ul className="ml-5 list-disc space-y-1">
            <li>Every result is clearly labelled as AI-generated.</li>
            <li>Prompts instruct the model to say "Not specified" instead of inventing details.</li>
            <li>No user input or output is stored — nothing is saved after you leave the page.</li>
            <li>The assistant supports human judgement; it does not replace it.</li>
          </ul>
        </CardContent>
      </Card>
    </AppShell>
  );
}
