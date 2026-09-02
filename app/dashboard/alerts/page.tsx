"use client";

import * as React from "react";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { Card } from "@/components/ui/card";
import { AlertFeed } from "@/components/dashboard/alert-feed";
import { AlertDrawer } from "@/components/dashboard/alert-drawer";
import { ALERTS, aggregateKpis } from "@/lib/mock-data";

export default function AlertsPage() {
  const k = aggregateKpis();
  const [selectedId, setSelectedId] = React.useState<string | null>(null);
  const selected = ALERTS.find((a) => a.id === selectedId) ?? null;

  return (
    <DashboardShell alerts={k.activeAlerts} region="All India">
      <div className="flex h-full flex-col gap-3 p-3">
        <div>
          <h1 className="text-h1 text-ink">Alerts</h1>
          <p className="mt-1 text-small text-ink-muted">
            Sorted by severity, then most recent.
          </p>
        </div>
        <Card className="min-h-0 flex-1 overflow-hidden">
          <AlertFeed
            alerts={ALERTS}
            selectedId={selectedId ?? undefined}
            onSelect={setSelectedId}
          />
        </Card>
      </div>
      <AlertDrawer alert={selected} onClose={() => setSelectedId(null)} />
    </DashboardShell>
  );
}
