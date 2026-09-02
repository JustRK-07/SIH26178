"use client";

import * as React from "react";
import { Activity, Cpu, MapPin, Megaphone, Share2 } from "lucide-react";
import type { Alert } from "@/lib/types";
import { Drawer } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Pill } from "@/components/ui/pill";
import { SeverityDot } from "@/components/ui/severity-dot";
import { HAZARD_LABEL, SEVERITY_LABEL } from "@/lib/constants";
import { regionById } from "@/lib/mock-data";
import { formatIST, formatRelative } from "@/lib/utils";

type AlertDrawerProps = {
  alert: Alert | null;
  onClose: () => void;
};

export function AlertDrawer({ alert, onClose }: AlertDrawerProps) {
  if (!alert) return <Drawer open={false} onClose={onClose} />;
  const region = regionById(alert.regionId);

  return (
    <Drawer open={!!alert} onClose={onClose} title="Alert detail">
      <div className="flex flex-col gap-5">
        <div className="flex items-center gap-2">
          <SeverityDot severity={alert.severity} />
          <span className="text-caption font-medium uppercase tracking-wide text-ink-muted">
            {SEVERITY_LABEL[alert.severity]}
          </span>
          <span className="text-caption text-ink-muted">·</span>
          <Pill>
            <span>{HAZARD_LABEL[alert.hazard]}</span>
          </Pill>
          <span className="ml-auto text-caption text-ink-muted">
            {formatRelative(alert.createdAt)}
          </span>
        </div>

        <h3 className="text-h2 text-ink">{alert.headline}</h3>

        <div className="flex items-center gap-2 text-small text-ink-muted">
          <MapPin size={14} />
          {region?.name}, {region?.state}
          <span className="ml-auto vyron-num text-ink">{alert.confidence}% confidence</span>
        </div>

        <Section title="Detail" icon={Activity}>
          <p className="text-small text-ink">{alert.detail}</p>
        </Section>

        <Section title="Recommended action" icon={Megaphone}>
          <p className="text-small text-ink">{alert.recommendedAction}</p>
        </Section>

        <Section title="Contributing sensors" icon={Cpu}>
          <div className="flex flex-wrap gap-2">
            {alert.sensorIds.map((id) => (
              <Pill key={id}>
                <span className="font-mono text-[11px]">{id}</span>
              </Pill>
            ))}
          </div>
        </Section>

        <Section title="Timeline" icon={Activity}>
          <ol className="space-y-2 border-l border-hairline pl-4">
            <TimelineRow time={alert.createdAt} label="Alert raised by edge model" />
            <TimelineRow time={alert.createdAt} label="Cross-validated with neighbour sensors" later />
            <TimelineRow time={alert.createdAt} label="Severity escalated to critical" later />
          </ol>
        </Section>

        <div className="flex flex-wrap gap-2 border-t border-hairline pt-4">
          <Button variant="primary" size="md">
            Publish alert
          </Button>
          <Button variant="secondary" size="md">
            <Share2 size={14} />
            Share with SDRF
          </Button>
          <Button variant="ghost" size="md">
            Acknowledge
          </Button>
        </div>

        <p className="border-t border-hairline pt-4 text-caption text-ink-muted">
          Created {formatIST(alert.createdAt)} · ID{" "}
          <span className="font-mono text-ink">{alert.id}</span>
        </p>
      </div>
    </Drawer>
  );
}

function Section({
  title,
  icon: Icon,
  children,
}: {
  title: string;
  icon: React.ComponentType<{ size?: number }>;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-card border border-hairline bg-canvas/40 p-3">
      <div className="mb-2 flex items-center gap-2 text-caption uppercase tracking-wide text-ink-muted">
        <Icon size={12} />
        {title}
      </div>
      {children}
    </div>
  );
}

function TimelineRow({
  time,
  label,
  later,
}: {
  time: string;
  label: string;
  later?: boolean;
}) {
  return (
    <li className="relative">
      <span
        aria-hidden
        className="absolute -left-[18px] top-1.5 h-2 w-2 rounded-pill bg-ink"
      />
      <p className="text-small text-ink">{label}</p>
      <p className="text-caption text-ink-muted">
        {later ? "+ " : ""}
        {formatIST(time)}
      </p>
    </li>
  );
}
