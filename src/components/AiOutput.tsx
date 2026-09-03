import ReactMarkdown from "react-markdown";
import { Copy } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

/** Renders AI output as markdown with a copy action and a review reminder. */
export function AiOutput({ title, text }: { title: string; text: string }) {
  return (
    <Card className="shadow-card">
      <CardHeader className="flex flex-row items-center justify-between gap-4 space-y-0">
        <CardTitle className="text-base">{title}</CardTitle>
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            navigator.clipboard.writeText(text);
            toast.success("Copied to clipboard");
          }}
        >
          <Copy className="mr-2 size-4" /> Copy
        </Button>
      </CardHeader>
      <CardContent>
        <div className="prose-output space-y-3 text-sm leading-relaxed [&_h2]:mt-5 [&_h2]:text-base [&_h2]:font-semibold [&_h2]:text-primary [&_li]:ml-5 [&_li]:list-disc [&_p]:whitespace-pre-wrap [&_strong]:font-semibold [&_ul]:space-y-1">
          <ReactMarkdown>{text}</ReactMarkdown>
        </div>
        <p className="mt-6 border-t border-border pt-3 text-xs text-muted-foreground">
          AI-generated content — review for accuracy before using it.
        </p>
      </CardContent>
    </Card>
  );
}
