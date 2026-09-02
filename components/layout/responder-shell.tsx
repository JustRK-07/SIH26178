"use client";

import * as React from "react";
import { Compass, ListChecks, Phone, WifiOff } from "lucide-react";
import { cn } from "@/lib/utils";

type ResponderShellProps = {
  online: boolean;
  lastSync?: string;
  children: React.ReactNode;
};

/**
 * ResponderShell — tablet-first. Map on top (2/3), bottom sheet (1/3).
 * Offline banner lives above the bottom sheet when disconnected.
 */
export function ResponderShell({ online, lastSync, children }: ResponderShellProps) {
  return (
    <div className="flex h-screen flex-col bg-canvas">
      {!online && (
        <div
          role="status"
          className="flex shrink-0 items-center justify-center gap-2 border-b border-hairline bg-sev-caution/10 px-4 py-1.5 text-caption text-sev-caution"
        >
          <WifiOff size={12} />
          Offline · {lastSync ? `Last synced ${lastSync}` : "no recent sync"}
        </div>
      )}
      <main className="min-h-0 flex-1 overflow-hidden">{children}</main>
    </div>
  );
}

/** Bottom sheet header — drag handle + tabs (Map / Tasks / Comms). */
export function ResponderSheetTabs({
  active,
  onChange,
}: {
  active: "incidents" | "tasks" | "comms";
  onChange: (v: "incidents" | "tasks" | "comms") => void;
}) {
  const items: Array<{ id: "incidents" | "tasks" | "comms"; label: string; icon: React.ComponentType<{ size?: number }> }> = [
    { id: "incidents", label: "Incidents", icon: Compass },
    { id: "tasks", label: "Tasks", icon: ListChecks },
    { id: "comms", label: "Comms", icon: Phone },
  ];
  return (
    <div className="flex items-center gap-1 border-b border-hairline bg-surface px-3 pt-2">
      {items.map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          type="button"
          onClick={() => onChange(id)}
          className={cn(
            "flex items-center gap-1.5 border-b-2 px-3 py-2 text-caption transition-colors",
            active === id
              ? "border-ink text-ink"
              : "border-transparent text-ink-muted hover:text-ink",
          )}
        >
          <Icon size={14} />
          {label}
        </button>
      ))}
    </div>
  );
}
