import type { LucideIcon } from "lucide-react";

/** Consistent page title block used across every dashboard page. */
export function PageHeader({
  icon: Icon,
  title,
  description,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
}) {
  return (
    <div className="mb-8 flex items-start gap-4">
      <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-gradient-primary text-primary-foreground shadow-card">
        <Icon className="size-5" />
      </span>
      <div>
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">{title}</h2>
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}
