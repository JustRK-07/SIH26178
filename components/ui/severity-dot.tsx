import { cn } from "@/lib/utils";
import type { Severity } from "@/lib/types";

const COLOR: Record<Severity, string> = {
  info: "bg-sev-info",
  advisory: "bg-sev-advisory",
  caution: "bg-sev-caution",
  warning: "bg-sev-warning",
  critical: "bg-sev-critical",
};

type SeverityDotProps = {
  severity: Severity;
  pulse?: boolean;
  size?: "sm" | "md";
  className?: string;
};

/**
 * Severity dot — small, semantic. Always paired with text (a Pill or label).
 * Critical severity pulses by default; pass pulse=false to opt out.
 */
export function SeverityDot({
  severity,
  pulse,
  size = "sm",
  className,
}: SeverityDotProps) {
  const isCritical = severity === "critical";
  const shouldPulse = pulse ?? isCritical;
  return (
    <span
      aria-hidden
      className={cn(
        "inline-block rounded-pill",
        COLOR[severity],
        size === "sm" ? "h-2 w-2" : "h-2.5 w-2.5",
        shouldPulse && isCritical && "vyron-pulse-critical",
        className,
      )}
    />
  );
}
