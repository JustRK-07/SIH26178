"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type FilterPillProps = {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
};

/**
 * FilterPill — toggleable chip for hazard/time filters.
 * Active state inverts to ink background; inactive stays surface.
 */
export function FilterPill({ active, onClick, children }: FilterPillProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex h-7 items-center rounded-pill border px-3 text-caption transition-colors",
        active
          ? "border-ink bg-ink text-white"
          : "border-hairline bg-surface text-ink hover:bg-canvas",
      )}
    >
      {children}
    </button>
  );
}
