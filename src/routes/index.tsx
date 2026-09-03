import { createFileRoute, Link } from "@tanstack/react-router";
import { Bot, ListChecks, Mail, NotebookPen, Search, ShieldCheck } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AI Productivity Assistant — Automate Office Tasks" },
      {
        name: "description",
        content:
          "An AI workplace assistant for emails, meeting summaries, task planning, research and chat.",
      },
      { property: "og:title", content: "AI Productivity Assistant" },
      {
        property: "og:description",
        content: "AI-powered tools for emails, meetings, tasks, research and workplace Q&A.",
      },
    ],
  }),
  component: Home,
});

const features = [
  {
    to: "/tools/email",
    icon: Mail,
    title: "Email Generator",
    text: "Draft professional emails from a short instruction, with a tone of your choice.",
  },
  {
    to: "/tools/meetings",
    icon: NotebookPen,
    title: "Meeting Summarizer",
    text: "Turn raw notes into a summary, key decisions and clear action items.",
  },
  {
    to: "/tools/tasks",
    icon: ListChecks,
    title: "Task Planner",
    text: "Prioritise your to-do list into high, medium and low priority work.",
  },
  {
    to: "/tools/research",
    icon: Search,
    title: "Research Assistant",
    text: "Get a concise research summary with key points on any topic.",
  },
  {
    to: "/tools/chat",
    icon: Bot,
    title: "AI Chatbot",
    text: "Ask workplace questions and get practical, friendly guidance.",
  },
  {
    to: "/responsible-ai",
    icon: ShieldCheck,
    title: "Responsible AI",
    text: "Guidelines for reviewing outputs and using AI safely at work.",
  },
] as const;

function Home() {
  return (
    <AppShell>
      <section className="mb-10 overflow-hidden rounded-2xl bg-gradient-primary px-6 py-12 text-primary-foreground shadow-card sm:px-10">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] opacity-80">
          Student project
        </p>
        <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
          AI Productivity Assistant
        </h2>
        <p className="mt-4 max-w-2xl text-sm opacity-90 sm:text-base">
          A workplace assistant that automates everyday office tasks — writing emails, summarising
          meetings, planning work, researching topics and answering questions.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button asChild variant="secondary">
            <Link to="/tools/email">Start with an email</Link>
          </Button>
          <Button asChild variant="outline" className="bg-transparent">
            <Link to="/about">About the project</Link>
          </Button>
        </div>
      </section>

      <h3 className="mb-4 text-lg font-semibold">Features</h3>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((f) => (
          <Link key={f.to} to={f.to} className="group">
            <Card className="h-full transition-shadow group-hover:shadow-card">
              <CardHeader className="space-y-3">
                <span className="flex size-10 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                  <f.icon className="size-5" />
                </span>
                <CardTitle className="text-base">{f.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">{f.text}</CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </AppShell>
  );
}
