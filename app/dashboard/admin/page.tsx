import * as React from "react";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { Card, CardBody, CardHeader, CardTitle } from "@/components/ui/card";
import { Pill } from "@/components/ui/pill";
import { StatusPill } from "@/components/ui/status-pill";
import { Button } from "@/components/ui/button";
import { SENSORS, aggregateKpis, regionById } from "@/lib/mock-data";
import { formatIST } from "@/lib/utils";
import { Download, Upload } from "lucide-react";

const ROLES = [
  { id: "authority", count: 28, label: "Authority" },
  { id: "responder", count: 142, label: "Field responder" },
  { id: "analyst", count: 19, label: "Analyst" },
  { id: "admin", count: 6, label: "System admin" },
  { id: "citizen", count: 18420, label: "Citizen" },
];

const ALERT_RULES = [
  { name: "Flood · >4.0m rise in 3h", severity: "Critical", channels: "Push, SMS, IVR" },
  { name: "Smoke plume · >80% conf", severity: "Warning", channels: "Push, Email" },
  { name: "PM2.5 · >300 µg/m³", severity: "Caution", channels: "Push" },
  { name: "VOC spike · 6× baseline", severity: "Warning", channels: "Push, Email, IVR" },
];

export default function AdminPage() {
  const k = aggregateKpis();
  const recentSensors = SENSORS.slice(0, 12);

  return (
    <DashboardShell alerts={k.activeAlerts} region="System">
      <div className="flex h-full flex-col gap-4 overflow-y-auto p-4">
        <div className="flex items-end justify-between">
          <div>
            <h1 className="text-h1 text-ink">System admin</h1>
            <p className="mt-1 text-small text-ink-muted">
              Manage the network, OTA firmware, alert rules, and users.
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="secondary" size="md">
              <Upload size={14} />
              Push OTA
            </Button>
            <Button variant="primary" size="md">
              Add sensor
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
          {ROLES.map((r) => (
            <Card key={r.id}>
              <CardBody className="flex flex-col gap-1 p-4">
                <p className="text-caption uppercase tracking-wide text-ink-muted">{r.label}</p>
                <p className="vyron-num text-h1 text-ink">{r.count.toLocaleString("en-IN")}</p>
                <p className="text-caption text-ink-muted">active users</p>
              </CardBody>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Recent sensor activity</CardTitle>
            <Button variant="ghost" size="sm">
              <Download size={14} />
              Export
            </Button>
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
                  <th className="px-4 py-2 text-left font-medium">Signal</th>
                  <th className="px-4 py-2 text-left font-medium">Firmware</th>
                  <th className="px-4 py-2 text-left font-medium">Last seen</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hairline">
                {recentSensors.map((s) => {
                  const r = regionById(s.regionId);
                  return (
                    <tr key={s.id} className="hover:bg-canvas/60">
                      <td className="px-4 py-2 font-mono text-[11px] text-ink">{s.id}</td>
                      <td className="px-4 py-2 text-ink">{r?.name}, {r?.state}</td>
                      <td className="px-4 py-2 capitalize text-ink">{s.hazard.replace("-", " ")}</td>
                      <td className="px-4 py-2">
                        <StatusPill status={s.status} />
                      </td>
                      <td className="px-4 py-2 vyron-num text-ink">{s.battery}%</td>
                      <td className="px-4 py-2 vyron-num text-ink">{s.signal}%</td>
                      <td className="px-4 py-2 font-mono text-[11px] text-ink-muted">{s.firmware}</td>
                      <td className="px-4 py-2 text-ink-muted">{formatIST(s.lastSeen)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Alert rules</CardTitle>
            <Pill>{ALERT_RULES.length} active</Pill>
          </CardHeader>
          <CardBody className="p-0">
            <ul className="divide-y divide-hairline">
              {ALERT_RULES.map((rule) => (
                <li
                  key={rule.name}
                  className="flex items-center justify-between gap-4 px-4 py-3"
                >
                  <div>
                    <p className="text-body text-ink">{rule.name}</p>
                    <p className="text-caption text-ink-muted">Channels: {rule.channels}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Pill>{rule.severity}</Pill>
                    <Button variant="ghost" size="sm">
                      Edit
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          </CardBody>
        </Card>
      </div>
    </DashboardShell>
  );
}
