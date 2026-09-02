import { cn } from "@/lib/utils";

type EmptyStateProps = {
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
};

/**
 * Empty state — one sentence explaining what to do next.
 * No illustration, no apology. See DESIGN.md §8.
 */
export function EmptyState({ title, description, action, className }: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-start gap-2 rounded-card border border-dashed border-hairline bg-surface p-6",
        className,
      )}
    >
      <p className="text-body text-ink">{title}</p>
      {description && (
        <p className="text-small text-ink-muted">{description}</p>
      )}
      {action}
    </div>
  );
}
