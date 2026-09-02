"use client";

import * as React from "react";
import { ArrowRight, Check, MapPin, Navigation } from "lucide-react";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { RiskMap } from "@/components/dashboard/risk-map";
import { Card, CardBody, CardHeader, CardTitle } from "@/components/ui/card";
import { Pill } from "@/components/ui/pill";
import { SeverityDot } from "@/components/ui/severity-dot";
import { Button } from "@/components/ui/button";
import { ALERTS, aggregateKpis } from "@/lib/mock-data";
import { HAZARD_LABEL, SEVERITY_LABEL } from "@/lib/constants";
import { regionById } from "@/lib/mock-data";
import { formatRelative } from "@/lib/utils";
import { cn } from "@/lib/utils";

const TASKS = [
  { id: 1, label: "Pre-position boats at Ward 12 ghat", done: true },
  { id: 2, label: "Confirm shelter capacity with district control room", done: true },
  { id: 3, label: "Mark evacuation route on field map", done: false },
  { id: 4, label: "Brief 3-team leaders on water-level trend", done: false },
  { id: 5, label: "Stage medical kits at Ward 9 school", done: false },
];

export default function ResponderPage() {
  const [tasks, setTasks] = React.useState(TASKS);
  const [tab, setTab] = React.useState<"incidents" | "tasks" | "comms">("incidents");
  const k = aggregateKpis();
  const top = ALERTS.filter((a) => a.severity === "critical" || a.severity === "warning").slice(0, 4);

  return (
    <DashboardShell alerts={k.activeAlerts} region="Kamrup, Assam">
      <div className="grid h-full grid-rows-[1fr_auto]">
        {/* Map */}
        <div className="relative">
          <RiskMap alerts={ALERTS} />
          <div className="absolute left-3 top-3 flex items-center gap-2 rounded-card border border-hairline bg-surface px-3 py-1.5">
            <Navigation size={12} className="text-brand" />
            <span className="text-caption text-ink">2.3 km from your location</span>
          </div>
        </div>

        {/* Bottom sheet */}
        <Card className="max-h-[55%] overflow-hidden rounded-t-card rounded-b-none border-b-0">
          <div className="flex border-b border-hairline">
            {(
              [
                { id: "incidents", label: "Incidents", count: top.length },
                { id: "tasks", label: "Tasks", count: tasks.filter((t) => !t.done).length },
                { id: "comms", label: "Comms", count: 0 },
              ] as const
            ).map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setTab(t.id)}
                className={cn(
                  "relative flex items-center gap-1.5 px-4 py-3 text-caption transition-colors",
                  tab === t.id ? "text-ink" : "text-ink-muted hover:text-ink",
                )}
              >
                {t.label}
                <span
                  className={cn(
                    "vyron-num rounded-pill px-1.5 py-0.5 text-[10px]",
                    tab === t.id ? "bg-ink text-white" : "bg-canvas text-ink-muted",
                  )}
                >
                  {t.count}
                </span>
                {tab === t.id && (
                  <span aria-hidden className="absolute inset-x-3 bottom-0 h-0.5 bg-ink" />
                )}
              </button>
            ))}
          </div>

          {tab === "incidents" && (
            <ul className="divide-y divide-hairline overflow-y-auto" style={{ maxHeight: 320 }}>
              {top.map((a) => {
                const r = regionById(a.regionId);
                return (
                  <li key={a.id} className="flex flex-col gap-1 px-4 py-3">
                    <div className="flex items-center gap-2">
                      <SeverityDot severity={a.severity} />
                      <span className="text-caption font-medium uppercase tracking-wide text-ink-muted">
                        {SEVERITY_LABEL[a.severity]}
                      </span>
                      <span className="text-caption text-ink-muted">·</span>
                      <span className="text-caption text-ink-muted">{HAZARD_LABEL[a.hazard]}</span>
                      <span className="ml-auto text-caption text-ink-muted">{formatRelative(a.createdAt)}</span>
                    </div>
                    <p className="text-body text-ink">{a.headline}</p>
                    <div className="flex items-center gap-3 text-caption text-ink-muted">
                      <span className="inline-flex items-center gap-1">
                        <MapPin size={12} />
                        {r?.name}, {r?.state}
                      </span>
                      <span>{a.confidence}% confidence</span>
                      <Button variant="ghost" size="sm" className="ml-auto h-7">
                        Navigate
                        <ArrowRight size={12} />
                      </Button>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}

          {tab === "tasks" && (
            <ul className="divide-y divide-hairline overflow-y-auto" style={{ maxHeight: 320 }}>
              {tasks.map((t) => (
                <li
                  key={t.id}
                  className="flex items-center gap-3 px-4 py-3"
                >
                  <button
                    type="button"
                    onClick={() =>
                      setTasks((cur) =>
                        cur.map((c) => (c.id === t.id ? { ...c, done: !c.done } : c)),
                      )
                    }
                    className={cn(
                      "flex h-6 w-6 shrink-0 items-center justify-center rounded-button border",
                      t.done
                        ? "border-success bg-success text-white"
                        : "border-hairline bg-surface hover:border-ink",
                    )}
                    aria-label={t.done ? "Mark incomplete" : "Mark complete"}
                  >
                    {t.done && <Check size={12} />}
                  </button>
                  <span
                    className={cn(
                      "text-body",
                      t.done ? "text-ink-muted line-through" : "text-ink",
                    )}
                  >
                    {t.label}
                  </span>
                </li>
              ))}
            </ul>
          )}

          {tab === "comms" && (
            <div className="p-4">
              <EmptyComms />
            </div>
          )}
        </Card>
      </div>
    </DashboardShell>
  );
}

function EmptyComms() {
  return (
    <div className="flex flex-col items-start gap-2 rounded-card border border-dashed border-hairline bg-surface p-6">
      <p className="text-body text-ink">No active radio channels.</p>
      <p className="text-small text-ink-muted">
        Open a channel with the district control room to coordinate teams.
      </p>
      <Button variant="primary" size="md">
        Open SDRF channel
      </Button>
    </div>
  );
}
