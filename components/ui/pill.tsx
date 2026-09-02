import * as React from "react";
import { cn } from "@/lib/utils";
import type { Severity } from "@/lib/types";
import { SeverityDot } from "./severity-dot";

type PillProps = {
  severity?: Severity;
  children: React.ReactNode;
  className?: string;
} & React.HTMLAttributes<HTMLSpanElement>;

/**
 * Pill — 999 radius, hairline border. Used for hazard tags, status chips,
 * filter selectors. Severity is optional; pass it to get the matching dot.
 */
export function Pill({ severity, children, className, ...props }: PillProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-pill border border-hairline bg-surface px-3 py-1.5 text-caption text-ink",
        className,
      )}
      {...props}
    >
      {severity && <SeverityDot severity={severity} />}
      {children}
    </span>
  );
}
