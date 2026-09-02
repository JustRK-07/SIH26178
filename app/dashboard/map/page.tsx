import * as React from "react";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { Card } from "@/components/ui/card";
import { RiskMap } from "@/components/dashboard/risk-map";
import { ALERTS, aggregateKpis } from "@/lib/mock-data";

export default function MapPage() {
  const k = aggregateKpis();
  return (
    <DashboardShell alerts={k.activeAlerts} region="All India">
      <div className="p-3">
        <Card className="h-[calc(100vh-92px)] overflow-hidden">
          <RiskMap alerts={ALERTS} />
        </Card>
      </div>
    </DashboardShell>
  );
}
