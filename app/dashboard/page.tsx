"use client";

import * as React from "react";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { RiskMap } from "@/components/dashboard/risk-map";
import { KpiStrip } from "@/components/dashboard/kpi-strip";
import { RiskChart, RiskLegend } from "@/components/dashboard/risk-chart";
import { AlertFeed } from "@/components/dashboard/alert-feed";
import { AlertDrawer } from "@/components/dashboard/alert-drawer";
import { FilterBar } from "@/components/dashboard/filter-bar";
import { Card, CardBody, CardHeader, CardTitle } from "@/components/ui/card";
import { ALERTS, aggregateKpis } from "@/lib/mock-data";
import type { Alert, Hazard } from "@/lib/types";

export default function AuthorityDashboardPage() {
  const [hazardFilter, setHazardFilter] = React.useState<Hazard | "all">("all");
  const [windowSel, setWindowSel] = React.useState<"1h" | "24h" | "7d">("24h");
  const [selectedAlert, setSelectedAlert] = React.useState<Alert | null>(null);

  const filteredAlerts = React.useMemo(() => {
    if (hazardFilter === "all") return ALERTS;
    return ALERTS.filter((a) => a.hazard === hazardFilter);
  }, [hazardFilter]);

  const kpis = aggregateKpis();

  return (
    <DashboardShell alerts={kpis.activeAlerts} region="All India">
      <div className="flex h-full flex-col gap-3 p-3">
        <FilterBar
          active={hazardFilter}
          onChange={setHazardFilter}
          window={windowSel}
          onWindowChange={setWindowSel}
        />

        <KpiStrip />

        <div className="grid min-h-0 flex-1 grid-cols-1 gap-3 lg:grid-cols-[1fr_360px]">
          <div className="flex min-h-0 flex-col gap-3">
            <Card className="relative flex-1 overflow-hidden">
              <RiskMap alerts={filteredAlerts} />
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>24h risk score · top districts</CardTitle>
                <RiskLegend />
              </CardHeader>
              <CardBody>
                <RiskChart />
              </CardBody>
            </Card>
          </div>

          <Card className="overflow-hidden">
            <AlertFeed
              alerts={filteredAlerts.slice(0, 50)}
              selectedId={selectedAlert?.id}
              onSelect={(id) =>
                setSelectedAlert(filteredAlerts.find((a) => a.id === id) ?? null)
              }
            />
          </Card>
        </div>
      </div>

      <AlertDrawer alert={selectedAlert} onClose={() => setSelectedAlert(null)} />
    </DashboardShell>
  );
}
