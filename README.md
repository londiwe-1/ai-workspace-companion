# AI Productivity Assistant

An AI-powered workplace assistant that automates common office tasks. Built as a student project to
demonstrate practical AI usage, prompt engineering and responsible AI principles.

## Project Overview

The AI Productivity Assistant is a responsive web dashboard that bundles five AI assistants into one
professional interface. A user can draft emails, summarise meetings, prioritise tasks, research a
topic and chat with a workplace assistant — all powered by a large language model called securely
from the server.

The application is a complete, functional MVP: no mock data, no fake responses.

## Features

| Feature | What it does |
| --- | --- |
| **Email Generator** | Turns a short instruction into a ready-to-send email, with a Professional, Friendly or Formal tone. |
| **Meeting Summarizer** | Converts raw meeting notes into a Meeting Summary, Key Decisions and Action Items. |
| **Task Planner** | Sorts a task list into High / Medium / Low priority with reasons, time estimates and a suggested order. |
| **Research Assistant** | Produces a concise research summary with key points and limitations. |
| **AI Chatbot** | A conversational assistant for workplace questions, with full conversation memory. |

Supporting pages: **Home**, **About Project** and **Responsible AI**.

## AI Tools Used

- **Lovable AI Gateway** — server-side gateway to the model provider
- **Google Gemini Flash** — text generation model
- **Vercel AI SDK (`ai`, `@ai-sdk/openai-compatible`)** — model calls and streaming
- **TanStack Start server functions** — keep prompts and the API key on the server
- **React 19, TanStack Router, Tailwind CSS v4, shadcn/ui, lucide-react** — front end

## Prompt Engineering Examples

All prompts live in `src/lib/ai.functions.ts` under `SYSTEM_PROMPTS`.

**Email Generator**

> You are a professional workplace writing assistant. Write a complete, ready-to-send email based on
> the user's instruction. Tone: {Professional | Friendly | Formal}. Start with a "Subject:" line,
> include a greeting, 2-4 short paragraphs and a sign-off. Keep it concise and free of filler.

**Meeting Summarizer**

> From the raw meeting notes provided, produce markdown with exactly these sections: Meeting Summary,
> Key Decisions, Action Items (`**Owner** — task (due date)`). If information is missing, say
> "Not specified" instead of inventing details.

**Task Planner**

> Turn the user's raw task list into a prioritized plan using High Priority, Medium Priority and Low
> Priority sections. For each task add a short reason and a rough time estimate. End with a
> "Suggested Order" section.

**Research Assistant**

> Provide Overview (2-3 sentences), Key Points (5-7 bullets) and Considerations & Limitations. Be
> factual, neutral and flag anything you are unsure about.

**Techniques applied:** role assignment, explicit output schemas, tone parameterisation,
anti-hallucination instructions ("say Not specified"), length constraints and uncertainty flagging.

## Ethical AI Considerations

- **Human review** — every output is labelled as AI-generated and must be reviewed before use.
- **Privacy** — users are told not to share sensitive or confidential information; nothing is stored.
- **Accuracy** — the model can produce incorrect or outdated information; prompts require it to flag
  uncertainty rather than invent facts.
- **Verification** — important figures, names and dates must be checked against trusted sources.
- **Security** — the AI API key never leaves the server; the browser only sees generated text.

See the in-app **Responsible AI** page for the user-facing version of these guidelines.

## Running Locally

```bash
bun install
bun run dev
```

## Project Structure

```
src/
  components/      Reusable UI (AppShell, PageHeader, ToolWorkspace, AiOutput)
  components/ui/   shadcn/ui primitives
  lib/
    ai-gateway.server.ts  Server-only AI provider setup
    ai.functions.ts       Server functions + prompt library
  routes/          File-based routes (home, about, responsible-ai, tools/*)
  styles.css       Blue & white design system tokens
```
