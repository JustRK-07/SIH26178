"use client";

import * as React from "react";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { Card, CardBody, CardHeader, CardTitle } from "@/components/ui/card";
import { RiskChart, RiskLegend } from "@/components/dashboard/risk-chart";
import { FilterBar } from "@/components/dashboard/filter-bar";
import { aggregateKpis, MODEL_METRICS } from "@/lib/mock-data";
import { Pill } from "@/components/ui/pill";
import { formatIndianNumber } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

export default function AnalyticsPage() {
  const k = aggregateKpis();
  return (
    <DashboardShell alerts={k.activeAlerts} region="All India">
      <div className="flex h-full flex-col gap-4 overflow-y-auto p-4">
        <div className="flex items-end justify-between">
          <div>
            <h1 className="text-h1 text-ink">Analytics</h1>
            <p className="mt-1 text-small text-ink-muted">
              Multi-district risk trajectory, model performance, and exports.
            </p>
          </div>
          <Button variant="secondary" size="md">
            <Download size={14} />
            Export CSV
          </Button>
        </div>

        <FilterBar
          active="all"
          onChange={() => {}}
          window="7d"
          onWindowChange={() => {}}
        />

        <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
          <Card className="xl:col-span-2">
            <CardHeader>
              <CardTitle>Risk score · last 24h</CardTitle>
              <RiskLegend />
            </CardHeader>
            <CardBody>
              <RiskChart />
            </CardBody>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Model performance</CardTitle>
              <Pill>5 models</Pill>
            </CardHeader>
            <CardBody className="p-0">
              <ul className="divide-y divide-hairline">
                {MODEL_METRICS.map((m) => (
                  <li key={m.name} className="px-4 py-3">
                    <p className="text-body font-medium text-ink">{m.name}</p>
                    <div className="mt-2 grid grid-cols-4 gap-3 text-caption">
                      <Metric label="Acc" value={m.accuracy} />
                      <Metric label="Prec" value={m.precision} />
                      <Metric label="Rec" value={m.recall} />
                      <Metric label="F1" value={m.f1} />
                    </div>
                  </li>
                ))}
              </ul>
            </CardBody>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Coverage by state</CardTitle>
            <p className="text-caption text-ink-muted">Sensors deployed vs districts covered</p>
          </CardHeader>
          <CardBody className="p-0">
            <table className="w-full border-collapse text-small">
              <thead className="bg-canvas text-caption text-ink-muted">
                <tr>
                  <th className="px-4 py-2 text-left font-medium">State</th>
                  <th className="px-4 py-2 text-left font-medium">Sensors</th>
                  <th className="px-4 py-2 text-left font-medium">Districts covered</th>
                  <th className="px-4 py-2 text-left font-medium">Population covered</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hairline">
                {STATES.map((s) => (
                  <tr key={s.state} className="hover:bg-canvas/60">
                    <td className="px-4 py-2 text-ink">{s.state}</td>
                    <td className="px-4 py-2 vyron-num text-ink">{formatIndianNumber(s.sensors)}</td>
                    <td className="px-4 py-2 vyron-num text-ink">
                      {s.districts} / {s.totalDistricts}
                    </td>
                    <td className="px-4 py-2 vyron-num text-ink">{formatIndianNumber(s.population)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardBody>
        </Card>
      </div>
    </DashboardShell>
  );
}

function Metric({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <p className="text-caption uppercase tracking-wide text-ink-muted">{label}</p>
      <p className="vyron-num text-body text-ink">{(value * 100).toFixed(0)}%</p>
    </div>
  );
}

const STATES = [
  { state: "Assam", sensors: 1842, districts: 18, totalDistricts: 35, population: 31200000 },
  { state: "Bihar", sensors: 1604, districts: 22, totalDistricts: 38, population: 124800000 },
  { state: "Uttarakhand", sensors: 942, districts: 9, totalDistricts: 13, population: 10120000 },
  { state: "Himachal Pradesh", sensors: 728, districts: 8, totalDistricts: 12, population: 6860000 },
  { state: "Delhi NCR", sensors: 612, districts: 5, totalDistricts: 11, population: 32900000 },
  { state: "Maharashtra", sensors: 1410, districts: 14, totalDistricts: 36, population: 112000000 },
  { state: "Kerala", sensors: 1102, districts: 9, totalDistricts: 14, population: 33400000 },
  { state: "Tamil Nadu", sensors: 1218, districts: 18, totalDistricts: 38, population: 72100000 },
];
