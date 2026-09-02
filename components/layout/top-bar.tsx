"use client";

import * as React from "react";
import { Bell, ChevronDown, Radio } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Pill } from "@/components/ui/pill";

type TopBarProps = {
  region?: string;
  live?: boolean;
  alerts?: number;
  onLiveToggle?: () => void;
};

/**
 * TopBar — 52px, sits right of the icon rail.
 * Region selector (left), live indicator + alerts + bell + avatar (right).
 */
export function TopBar({ region = "All India", live = true, alerts = 0, onLiveToggle }: TopBarProps) {
  return (
    <header className="flex h-topbar shrink-0 items-center justify-between border-b border-hairline bg-surface px-4">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm" className="gap-1">
          <span className="text-body text-ink">{region}</span>
          <ChevronDown size={14} className="text-ink-muted" />
        </Button>
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onLiveToggle}
          aria-label={live ? "Pause live updates" : "Resume live updates"}
          className={cn(
            "inline-flex h-7 items-center gap-1.5 rounded-pill border px-3 text-caption transition-colors",
            live
              ? "border-success/40 bg-success/10 text-success"
              : "border-hairline bg-surface text-ink-muted hover:bg-canvas",
          )}
        >
          <Radio size={12} />
          {live ? "Live" : "Paused"}
        </button>

        <Pill severity={alerts > 0 ? "warning" : "info"}>
          <span className="vyron-num">{alerts}</span>
          <span>active alerts</span>
        </Pill>

        <button
          type="button"
          aria-label="Notifications"
          className="relative flex h-9 w-9 items-center justify-center rounded-button text-ink-muted hover:bg-canvas hover:text-ink"
        >
          <Bell size={16} />
          {alerts > 0 && (
            <span
              aria-hidden
              className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-pill bg-sev-critical"
            />
          )}
        </button>

        <div className="ml-1 flex h-8 w-8 items-center justify-center rounded-pill bg-canvas text-caption font-medium text-ink-muted">
          IM
        </div>
      </div>
    </header>
  );
}
