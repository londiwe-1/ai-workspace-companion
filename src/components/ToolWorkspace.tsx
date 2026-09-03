import { useMutation } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Loader2, Sparkle } from "lucide-react";
import { useState, type ReactNode } from "react";
import { toast } from "sonner";
import { runTool } from "@/lib/ai.functions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { AiOutput } from "@/components/AiOutput";

type Tool = "email" | "meeting" | "tasks" | "research";

/**
 * Reusable form + result workspace shared by every single-shot AI tool.
 * `extraControls` lets a tool add options (e.g. the email tone selector).
 */
export function ToolWorkspace({
  tool,
  inputLabel,
  placeholder,
  outputTitle,
  tone,
  extraControls,
  rows = 8,
}: {
  tool: Tool;
  inputLabel: string;
  placeholder: string;
  outputTitle: string;
  tone?: string;
  extraControls?: ReactNode;
  rows?: number;
}) {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const run = useServerFn(runTool);

  const mutation = useMutation({
    mutationFn: (value: string) => run({ data: { tool, input: value, tone } }),
    onSuccess: (data) => setResult(data.text),
    onError: (error: Error) => toast.error(error.message || "Generation failed"),
  });

  return (
    <div className="space-y-6">
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="text-base">{inputLabel}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {extraControls}
          <div className="space-y-2">
            <Label htmlFor="tool-input">Your input</Label>
            <Textarea
              id="tool-input"
              rows={rows}
              value={input}
              placeholder={placeholder}
              onChange={(e) => setInput(e.target.value)}
            />
          </div>
          <Button
            disabled={!input.trim() || mutation.isPending}
            onClick={() => mutation.mutate(input)}
          >
            {mutation.isPending ? (
              <Loader2 className="mr-2 size-4 animate-spin" />
            ) : (
              <Sparkle className="mr-2 size-4" />
            )}
            {mutation.isPending ? "Generating…" : "Generate"}
          </Button>
        </CardContent>
      </Card>

      {result && <AiOutput title={outputTitle} text={result} />}
    </div>
  );
}
