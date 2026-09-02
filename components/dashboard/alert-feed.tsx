"use client";

import * as React from "react";
import type { Alert } from "@/lib/types";
import { HAZARD_LABEL, SEVERITY_LABEL, regionById } from "@/lib/constants";
import { formatRelative } from "@/lib/utils";
import { SeverityDot } from "@/components/ui/severity-dot";
import { cn } from "@/lib/utils";

type AlertFeedProps = {
  alerts: Alert[];
  selectedId?: string;
  onSelect: (id: string) => void;
};

export function AlertFeed({ alerts, selectedId, onSelect }: AlertFeedProps) {
  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between border-b border-hairline px-4 py-2.5">
        <p className="text-caption uppercase tracking-wide text-ink-muted">Live alert feed</p>
        <span className="vyron-num text-caption text-ink">{alerts.length}</span>
      </div>
      <ul className="flex flex-col divide-y divide-hairline overflow-y-auto">
        {alerts.map((a) => {
          const region = regionById(a.regionId);
          const active = selectedId === a.id;
          return (
            <li key={a.id}>
              <button
                type="button"
                onClick={() => onSelect(a.id)}
                className={cn(
                  "flex w-full flex-col gap-1.5 px-4 py-3 text-left transition-colors",
                  active ? "bg-canvas" : "hover:bg-canvas/60",
                )}
              >
                <div className="flex items-center gap-2">
                  <SeverityDot severity={a.severity} />
                  <span className="text-caption font-medium uppercase tracking-wide text-ink-muted">
                    {SEVERITY_LABEL[a.severity]}
                  </span>
                  <span className="text-caption text-ink-muted">·</span>
                  <span className="text-caption text-ink-muted">{HAZARD_LABEL[a.hazard]}</span>
                  <span className="ml-auto text-caption text-ink-muted">
                    {formatRelative(a.createdAt)}
                  </span>
                </div>
                <p className="text-body font-medium text-ink">{a.headline}</p>
                <p className="text-caption text-ink-muted">
                  {region?.name}, {region?.state} · confidence{" "}
                  <span className="vyron-num text-ink">{a.confidence}%</span>
                </p>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
