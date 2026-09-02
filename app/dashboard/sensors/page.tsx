import * as React from "react";
import Link from "next/link";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { Card, CardBody, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusPill } from "@/components/ui/status-pill";
import { Pill } from "@/components/ui/pill";
import { SENSORS, aggregateKpis, regionById } from "@/lib/mock-data";
import { HAZARD_LABEL } from "@/lib/constants";
import { formatIST } from "@/lib/utils";

export default function SensorsPage() {
  const k = aggregateKpis();
  return (
    <DashboardShell alerts={k.activeAlerts} region="All India">
      <div className="flex h-full flex-col gap-4 overflow-y-auto p-4">
        <div>
          <h1 className="text-h1 text-ink">Sensors</h1>
          <p className="mt-1 text-small text-ink-muted">
            {SENSORS.length} nodes across {new Set(SENSORS.map((s) => s.regionId)).size} districts.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Inventory</CardTitle>
            <Pill>{SENSORS.length} total</Pill>
          </CardHeader>
          <CardBody className="p-0">
            <table className="w-full border-collapse text-small">
              <thead className="bg-canvas text-caption text-ink-muted">
                <tr>
                  <th className="px-4 py-2 text-left font-medium">Sensor</th>
                  <th className="px-4 py-2 text-left font-medium">Region</th>
                  <th className="px-4 py-2 text-left font-medium">Hazard</th>
                  <th className="px-4 py-2 text-left font-medium">Status</th>
                  <th className="px-4 py-2 text-left font-medium">Battery</th>
                  <th className="px-4 py-2 text-left font-medium">Last seen</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hairline">
                {SENSORS.slice(0, 40).map((s) => {
                  const r = regionById(s.regionId);
                  return (
                    <tr key={s.id} className="hover:bg-canvas/60">
                      <td className="px-4 py-2 font-mono text-[11px] text-ink">
                        <Link href={`/dashboard/sensors/${s.id}`} className="hover:text-brand">
                          {s.id}
                        </Link>
                      </td>
                      <td className="px-4 py-2 text-ink">{r?.name}, {r?.state}</td>
                      <td className="px-4 py-2 text-ink">{HAZARD_LABEL[s.hazard]}</td>
                      <td className="px-4 py-2">
                        <StatusPill status={s.status} />
                      </td>
                      <td className="px-4 py-2 vyron-num text-ink">{s.battery}%</td>
                      <td className="px-4 py-2 text-ink-muted">{formatIST(s.lastSeen)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </CardBody>
        </Card>
      </div>
    </DashboardShell>
  );
}
