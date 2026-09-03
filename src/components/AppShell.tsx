import { Link } from "@tanstack/react-router";
import {
  Bot,
  BrainCircuit,
  Home,
  Info,
  ListChecks,
  Mail,
  Menu,
  NotebookPen,
  Search,
  ShieldCheck,
} from "lucide-react";
import { useState, type ReactNode } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

/** Sidebar navigation model — single source of truth for links + icons. */
const navGroups = [
  {
    label: "Overview",
    items: [
      { to: "/", label: "Home", icon: Home },
      { to: "/about", label: "About Project", icon: Info },
      { to: "/responsible-ai", label: "Responsible AI", icon: ShieldCheck },
    ],
  },
  {
    label: "AI Tools",
    items: [
      { to: "/tools/email", label: "Email Generator", icon: Mail },
      { to: "/tools/meetings", label: "Meeting Summarizer", icon: NotebookPen },
      { to: "/tools/tasks", label: "Task Planner", icon: ListChecks },
      { to: "/tools/research", label: "Research Assistant", icon: Search },
      { to: "/tools/chat", label: "AI Chatbot", icon: Bot },
    ],
  },
] as const;

function NavLinks({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <nav className="flex flex-col gap-6 p-4">
      {navGroups.map((group) => (
        <div key={group.label}>
          <p className="px-3 pb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {group.label}
          </p>
          <ul className="space-y-1">
            {group.items.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  onClick={onNavigate}
                  activeOptions={{ exact: item.to === "/" }}
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-sidebar-foreground transition-colors hover:bg-sidebar-accent"
                  activeProps={{
                    className: "bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary",
                  }}
                >
                  <item.icon className="size-4 shrink-0" />
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  );
}

function Brand() {
  return (
    <div className="flex items-center gap-3 border-b border-sidebar-border px-5 py-4">
      <span className="flex size-9 items-center justify-center rounded-xl bg-gradient-primary text-primary-foreground">
        <BrainCircuit className="size-5" />
      </span>
      <span className="leading-tight">
        <span className="block text-sm font-bold">AI Productivity</span>
        <span className="block text-xs text-muted-foreground">Assistant</span>
      </span>
    </div>
  );
}

/** Dashboard shell: fixed sidebar on desktop, slide-over drawer on mobile. */
export function AppShell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <aside className="fixed inset-y-0 left-0 hidden w-64 flex-col border-r border-sidebar-border bg-sidebar lg:flex">
        <Brand />
        <div className="flex-1 overflow-y-auto">
          <NavLinks />
        </div>
        <p className="border-t border-sidebar-border p-4 text-xs text-muted-foreground">
          Student project · Responsible AI
        </p>
      </aside>

      <div className="lg:pl-64">
        <header className="sticky top-0 z-30 flex items-center gap-3 border-b border-border bg-background/85 px-4 py-3 backdrop-blur lg:px-8">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open navigation">
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72 bg-sidebar p-0">
              <Brand />
              <NavLinks onNavigate={() => setOpen(false)} />
            </SheetContent>
          </Sheet>
          <h1 className="text-sm font-semibold sm:text-base">AI Productivity Assistant</h1>
        </header>

        <main className="mx-auto w-full max-w-5xl px-4 py-8 lg:px-8">{children}</main>
      </div>
    </div>
  );
}
