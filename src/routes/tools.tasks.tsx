import { createFileRoute } from "@tanstack/react-router";
import { ListChecks } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { PageHeader } from "@/components/PageHeader";
import { ToolWorkspace } from "@/components/ToolWorkspace";

export const Route = createFileRoute("/tools/tasks")({
  head: () => ({
    meta: [
      { title: "Task Planner — AI Productivity Assistant" },
      {
        name: "description",
        content: "Turn a messy to-do list into a prioritised plan with high, medium and low tiers.",
      },
      { property: "og:title", content: "AI Task Planner" },
      {
        property: "og:description",
        content: "Prioritise your workload and get a suggested order of execution.",
      },
    ],
  }),
  component: TasksPage,
});

function TasksPage() {
  return (
    <AppShell>
      <PageHeader
        icon={ListChecks}
        title="Task Planner"
        description="List your tasks and get them prioritised into a clear plan."
      />
      <ToolWorkspace
        tool="tasks"
        inputLabel="Your tasks"
        outputTitle="Prioritised plan"
        rows={10}
        placeholder={"One task per line, e.g.\nSend invoice to client\nPrepare Monday standup\nFix login bug"}
      />
    </AppShell>
  );
}
