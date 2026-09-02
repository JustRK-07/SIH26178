import { cn } from "@/lib/utils";
import type { SensorStatus } from "@/lib/types";

const COLOR: Record<SensorStatus, string> = {
  online: "bg-success",
  degraded: "bg-sev-caution",
  offline: "bg-offline",
};

const LABEL: Record<SensorStatus, string> = {
  online: "Online",
  degraded: "Degraded",
  offline: "Offline",
};

/** Status dot + label. Used in sensor inventory and node map. */
export function StatusPill({ status, className }: { status: SensorStatus; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-1.5 text-caption text-ink-muted", className)}>
      <span className={cn("h-2 w-2 rounded-pill", COLOR[status])} aria-hidden />
      {LABEL[status]}
    </span>
  );
}
