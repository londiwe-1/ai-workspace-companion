import { createFileRoute } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { PageHeader } from "@/components/PageHeader";
import { ToolWorkspace } from "@/components/ToolWorkspace";

export const Route = createFileRoute("/tools/research")({
  head: () => ({
    meta: [
      { title: "Research Assistant — AI Productivity Assistant" },
      {
        name: "description",
        content: "Get a concise research summary with key points and limitations on any topic.",
      },
      { property: "og:title", content: "AI Research Assistant" },
      {
        property: "og:description",
        content: "Ask a question and receive an overview, key points and things to verify.",
      },
    ],
  }),
  component: ResearchPage,
});

function ResearchPage() {
  return (
    <AppShell>
      <PageHeader
        icon={Search}
        title="Research Assistant"
        description="Ask a question and get a concise, structured summary."
      />
      <ToolWorkspace
        tool="research"
        inputLabel="Research question or topic"
        outputTitle="Research summary"
        rows={5}
        placeholder="e.g. What are best practices for running effective remote stand-up meetings?"
      />
    </AppShell>
  );
}
