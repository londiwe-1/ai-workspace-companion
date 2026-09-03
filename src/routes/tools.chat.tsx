import { createFileRoute } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Bot, Loader2, Send, User } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import { toast } from "sonner";
import { AppShell } from "@/components/AppShell";
import { PageHeader } from "@/components/PageHeader";
import { chat } from "@/lib/ai.functions";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/tools/chat")({
  head: () => ({
    meta: [
      { title: "AI Chatbot — AI Productivity Assistant" },
      {
        name: "description",
        content: "Ask workplace questions and get practical answers from the AI assistant.",
      },
      { property: "og:title", content: "Workplace AI Chatbot" },
      {
        property: "og:description",
        content: "A conversational assistant for office, planning and communication questions.",
      },
    ],
  }),
  component: ChatPage,
});

type Message = { role: "user" | "assistant"; content: string };

const SUGGESTIONS = [
  "How do I politely decline a meeting invite?",
  "Give me a template for a weekly status update.",
  "How can I prioritise work when everything is urgent?",
];

function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const send = useServerFn(chat);
  const bottomRef = useRef<HTMLDivElement>(null);

  const mutation = useMutation({
    mutationFn: (history: Message[]) => send({ data: { messages: history } }),
    onSuccess: (data) =>
      setMessages((prev) => [...prev, { role: "assistant", content: data.text }]),
    onError: (error: Error) => toast.error(error.message || "The assistant could not reply"),
  });

  // Always send the FULL conversation history — the model is stateless.
  function submit(text: string) {
    const value = text.trim();
    if (!value || mutation.isPending) return;
    const next: Message[] = [...messages, { role: "user", content: value }];
    setMessages(next);
    setInput("");
    mutation.mutate(next);
  }

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, mutation.isPending]);

  return (
    <AppShell>
      <PageHeader
        icon={Bot}
        title="AI Chatbot"
        description="Ask anything about workplace productivity and communication."
      />

      <Card className="flex h-[60vh] flex-col overflow-hidden p-0 shadow-card">
        <div className="flex-1 space-y-4 overflow-y-auto p-4">
          {messages.length === 0 && (
            <div className="space-y-3 py-8 text-center">
              <p className="text-sm text-muted-foreground">Start with one of these:</p>
              <div className="flex flex-wrap justify-center gap-2">
                {SUGGESTIONS.map((s) => (
                  <Button key={s} variant="outline" size="sm" onClick={() => submit(s)}>
                    {s}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {messages.map((m, i) => (
            <div key={i} className="flex gap-3">
              <span className="mt-1 flex size-7 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground">
                {m.role === "user" ? <User className="size-4" /> : <Bot className="size-4" />}
              </span>
              <div
                className={
                  m.role === "user"
                    ? "max-w-[85%] rounded-2xl bg-primary px-4 py-2 text-sm text-primary-foreground"
                    : "max-w-[85%] text-sm leading-relaxed [&_li]:ml-5 [&_li]:list-disc [&_p]:mb-2 [&_strong]:font-semibold"
                }
              >
                {m.role === "user" ? m.content : <ReactMarkdown>{m.content}</ReactMarkdown>}
              </div>
            </div>
          ))}

          {mutation.isPending && (
            <p className="flex items-center gap-2 text-sm text-muted-foreground">
              <Loader2 className="size-4 animate-spin" /> Thinking…
            </p>
          )}
          <div ref={bottomRef} />
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            submit(input);
          }}
          className="flex items-end gap-2 border-t border-border p-3"
        >
          <Textarea
            rows={1}
            value={input}
            placeholder="Ask a workplace question…"
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                submit(input);
              }
            }}
            className="max-h-32 min-h-10 resize-none"
          />
          <Button type="submit" size="icon" disabled={!input.trim() || mutation.isPending}>
            <Send className="size-4" />
          </Button>
        </form>
      </Card>

      <p className="mt-3 text-xs text-muted-foreground">
        Responses are AI-generated — verify important information and never share sensitive data.
      </p>
    </AppShell>
  );
}
