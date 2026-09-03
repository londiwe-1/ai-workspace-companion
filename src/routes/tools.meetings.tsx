import { createFileRoute } from "@tanstack/react-router";
import { NotebookPen } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { PageHeader } from "@/components/PageHeader";
import { ToolWorkspace } from "@/components/ToolWorkspace";

export const Route = createFileRoute("/tools/meetings")({
  head: () => ({
    meta: [
      { title: "Meeting Summarizer — AI Productivity Assistant" },
      {
        name: "description",
        content: "Turn raw meeting notes into a summary, key decisions and action items.",
      },
      { property: "og:title", content: "AI Meeting Summarizer" },
      {
        property: "og:description",
        content: "Paste meeting notes and get a structured summary with owners and next steps.",
      },
    ],
  }),
  component: MeetingsPage,
});

function MeetingsPage() {
  return (
    <AppShell>
      <PageHeader
        icon={NotebookPen}
        title="Meeting Summarizer"
        description="Paste your notes to get a summary, key decisions and action items."
      />
      <ToolWorkspace
        tool="meeting"
        inputLabel="Meeting notes"
        outputTitle="Meeting breakdown"
        rows={12}
        placeholder="Paste your raw meeting notes here…"
      />
    </AppShell>
  );
}
