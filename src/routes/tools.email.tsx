import { createFileRoute } from "@tanstack/react-router";
import { Mail } from "lucide-react";
import { useState } from "react";
import { AppShell } from "@/components/AppShell";
import { PageHeader } from "@/components/PageHeader";
import { ToolWorkspace } from "@/components/ToolWorkspace";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const Route = createFileRoute("/tools/email")({
  head: () => ({
    meta: [
      { title: "Email Generator — AI Productivity Assistant" },
      {
        name: "description",
        content: "Generate professional, friendly or formal work emails from a short instruction.",
      },
      { property: "og:title", content: "AI Email Generator" },
      {
        property: "og:description",
        content: "Write ready-to-send work emails in the tone you choose.",
      },
    ],
  }),
  component: EmailPage,
});

const TONES = ["Professional", "Friendly", "Formal"];

function EmailPage() {
  const [tone, setTone] = useState("Professional");

  return (
    <AppShell>
      <PageHeader
        icon={Mail}
        title="Email Generator"
        description="Describe what you need to say and get a ready-to-send email."
      />
      <ToolWorkspace
        // `key` forces a fresh workspace when the tone changes is not needed —
        // the tone is passed straight through to the server function.
        tool="email"
        tone={tone}
        inputLabel="Email brief"
        outputTitle="Generated email"
        rows={6}
        placeholder="e.g. Ask the design team for updated mockups before Friday's client review."
        extraControls={
          <div className="space-y-2">
            <Label htmlFor="tone">Tone</Label>
            <Select value={tone} onValueChange={setTone}>
              <SelectTrigger id="tone" className="w-full sm:w-56">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {TONES.map((t) => (
                  <SelectItem key={t} value={t}>
                    {t}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        }
      />
    </AppShell>
  );
}
