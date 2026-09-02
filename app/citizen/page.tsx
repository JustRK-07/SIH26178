"use client";

import * as React from "react";
import { Wind, Droplets, Thermometer, AlertTriangle, Volume2 } from "lucide-react";
import { CitizenShell, CitizenCTA } from "@/components/layout/citizen-shell";
import { Card, CardBody } from "@/components/ui/card";
import { Pill } from "@/components/ui/pill";
import { SeverityDot } from "@/components/ui/severity-dot";
import { Button } from "@/components/ui/button";
import { ALERTS, aggregateKpis } from "@/lib/mock-data";
import { HAZARD_LABEL, SEVERITY_LABEL, regionById } from "@/lib/constants";
import { formatRelative } from "@/lib/utils";

export default function CitizenPage() {
  const k = aggregateKpis();
  const nearby = ALERTS.filter((a) => a.severity !== "info").slice(0, 3);

  return (
    <CitizenShell areaName="Kamrup, Assam · 5 km">
      <div className="flex flex-col gap-3 p-3">
        <Card>
          <CardBody className="flex items-center justify-between gap-3 p-4">
            <div>
              <p className="text-caption uppercase tracking-wide text-ink-muted">Today&apos;s risk</p>
              <p className="mt-1 text-h1 text-ink">Caution</p>
              <p className="mt-1 text-small text-ink-muted">
                Flood risk in low-lying wards. Avoid riverside roads after 17:00 IST.
              </p>
            </div>
            <SeverityDot severity="caution" size="md" />
          </CardBody>
        </Card>

        <div className="grid grid-cols-3 gap-2">
          <MetricTile icon={Wind} label="AQI" value="186" hint="Unhealthy" tone="warning" />
          <MetricTile icon={Thermometer} label="Temp" value="31°" hint="Heat advisory" tone="caution" />
          <MetricTile icon={Droplets} label="Rain" value="42mm" hint="Next 6h" tone="info" />
        </div>

        <Card>
          <CardBody className="p-3">
            <div className="flex items-center justify-between">
              <p className="text-caption uppercase tracking-wide text-ink-muted">Nearby alerts</p>
              <Pill>{nearby.length}</Pill>
            </div>
            <ul className="mt-2 divide-y divide-hairline">
              {nearby.map((a) => {
                const r = regionById(a.regionId);
                return (
                  <li key={a.id} className="flex flex-col gap-1 py-2.5">
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
                    <p className="text-body text-ink">{a.headline}</p>
                    <p className="text-caption text-ink-muted">
                      {r?.name}, {r?.state} · {a.recommendedAction}
                    </p>
                  </li>
                );
              })}
            </ul>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="flex items-center gap-3 p-4">
            <span className="flex h-9 w-9 items-center justify-center rounded-card bg-canvas text-ink">
              <Volume2 size={16} />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-body text-ink">Voice briefing</p>
              <p className="text-caption text-ink-muted">
                Listen to today&apos;s risk summary in English or Hindi.
              </p>
            </div>
            <Button variant="secondary" size="sm">
              Play
            </Button>
          </CardBody>
        </Card>

        <Card className="border-dashed">
          <CardBody className="flex items-start gap-3 p-4">
            <span className="flex h-9 w-9 items-center justify-center rounded-card bg-canvas text-ink">
              <AlertTriangle size={16} className="text-sev-caution" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-body text-ink">{formatIndianNumber(k.sensorsOnline)} sensors watching your area.</p>
              <p className="text-caption text-ink-muted">
                We&apos;ll alert you the moment something changes.
              </p>
            </div>
          </CardBody>
        </Card>

        <CitizenCTA />
      </div>
    </CitizenShell>
  );
}

function MetricTile({
  icon: Icon,
  label,
  value,
  hint,
  tone,
}: {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  label: string;
  value: string;
  hint: string;
  tone: "info" | "caution" | "warning" | "critical" | "advisory";
}) {
  const TONE: Record<string, string> = {
    info: "text-sev-info",
    advisory: "text-sev-advisory",
    caution: "text-sev-caution",
    warning: "text-sev-warning",
    critical: "text-sev-critical",
  };
  return (
    <Card>
      <CardBody className="flex flex-col gap-1 p-3">
        <Icon size={14} className={TONE[tone]} />
        <p className="text-caption uppercase tracking-wide text-ink-muted">{label}</p>
        <p className="vyron-num text-h2 text-ink">{value}</p>
        <p className="text-caption text-ink-muted">{hint}</p>
      </CardBody>
    </Card>
  );
}

function formatIndianNumber(n: number) {
  return n.toLocaleString("en-IN");
}
