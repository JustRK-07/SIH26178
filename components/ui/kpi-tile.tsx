import { cn } from "@/lib/utils";

type KpiTileProps = {
  label: string;
  value: string;
  /** Pre-formatted delta, e.g. "+2%" or "-18s". */
  delta?: string;
  /** Severity controls delta color. "neutral" = ink-muted. */
  deltaSeverity?: "good" | "bad" | "neutral";
  hint?: string;
  className?: string;
};

const DELTA_COLOR = {
  good: "text-success",
  bad: "text-sev-critical",
  neutral: "text-ink-muted",
};

/**
 * KPI tile — number first, label below, delta last.
 * Numbers are tabular by default (globals.css).
 */
export function KpiTile({
  label,
  value,
  delta,
  deltaSeverity = "neutral",
  hint,
  className,
}: KpiTileProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-1 rounded-card border border-hairline bg-surface px-4 py-3",
        className,
      )}
    >
      <span className="text-caption uppercase tracking-wide text-ink-muted">{label}</span>
      <span className="vyron-num text-h1 text-ink">{value}</span>
      {delta && (
        <span className={cn("text-caption", DELTA_COLOR[deltaSeverity])}>
          {delta}
          {hint && <span className="ml-1 text-ink-muted">{hint}</span>}
        </span>
      )}
    </div>
  );
}
