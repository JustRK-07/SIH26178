"use client";

import * as React from "react";
import { useParams } from "next/navigation";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { Card, CardBody, CardHeader, CardTitle } from "@/components/ui/card";
import { Pill } from "@/components/ui/pill";
import { StatusPill } from "@/components/ui/status-pill";
import { Button } from "@/components/ui/button";
import { SENSORS, READINGS, aggregateKpis, regionById, readingsForSensor } from "@/lib/mock-data";
import { HAZARD_LABEL } from "@/lib/constants";
import { formatIST } from "@/lib/utils";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function SensorDetailPage() {
  const params = useParams<{ id: string }>();
  const sensor = SENSORS.find((s) => s.id === params.id);
  const k = aggregateKpis();

  if (!sensor) {
    return (
      <DashboardShell alerts={k.activeAlerts}>
        <div className="p-6">
          <p className="text-body text-ink">Sensor not found.</p>
          <Link href="/dashboard/sensors" className="text-small text-brand">
            Back to inventory
          </Link>
        </div>
      </DashboardShell>
    );
  }

  const r = regionById(sensor.regionId);
  const readings = readingsForSensor(sensor.id);
  const latest = readings[readings.length - 1];

  return (
    <DashboardShell alerts={k.activeAlerts} region={r?.name}>
      <div className="flex h-full flex-col gap-4 overflow-y-auto p-4">
        <Link
          href="/dashboard/sensors"
          className="inline-flex items-center gap-1 text-small text-ink-muted hover:text-ink"
        >
          <ChevronLeft size={14} />
          Sensors
        </Link>

        <div className="flex items-end justify-between">
          <div>
            <h1 className="text-h1 text-ink">
              <span className="font-mono">{sensor.id}</span>
            </h1>
            <p className="mt-1 text-small text-ink-muted">
              {r?.name}, {r?.state} · {HAZARD_LABEL[sensor.hazard]}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <StatusPill status={sensor.status} />
            <Button variant="secondary" size="md">
              Isolate
            </Button>
            <Button variant="primary" size="md">
              Update firmware
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          <Card>
            <CardBody className="flex flex-col gap-1 p-4">
              <p className="text-caption uppercase tracking-wide text-ink-muted">Battery</p>
              <p className="vyron-num text-h1 text-ink">{sensor.battery}%</p>
            </CardBody>
          </Card>
          <Card>
            <CardBody className="flex flex-col gap-1 p-4">
              <p className="text-caption uppercase tracking-wide text-ink-muted">Signal</p>
              <p className="vyron-num text-h1 text-ink">{sensor.signal}%</p>
            </CardBody>
          </Card>
          <Card>
            <CardBody className="flex flex-col gap-1 p-4">
              <p className="text-caption uppercase tracking-wide text-ink-muted">Firmware</p>
              <p className="font-mono text-h2 text-ink">{sensor.firmware}</p>
            </CardBody>
          </Card>
          <Card>
            <CardBody className="flex flex-col gap-1 p-4">
              <p className="text-caption uppercase tracking-wide text-ink-muted">Latest reading</p>
              <p className="vyron-num text-h1 text-ink">
                {latest?.value ?? "—"} <span className="text-small text-ink-muted">{latest?.unit}</span>
              </p>
            </CardBody>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Last 60 minutes</CardTitle>
            <Pill>{readings.length} samples</Pill>
          </CardHeader>
          <CardBody className="p-0">
            <table className="w-full border-collapse text-small">
              <thead className="bg-canvas text-caption text-ink-muted">
                <tr>
                  <th className="px-4 py-2 text-left font-medium">Time</th>
                  <th className="px-4 py-2 text-left font-medium">Value</th>
                  <th className="px-4 py-2 text-left font-medium">Unit</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hairline">
                {readings.slice(-15).reverse().map((r, i) => (
                  <tr key={i} className="hover:bg-canvas/60">
                    <td className="px-4 py-2 font-mono text-[11px] text-ink">{formatIST(r.at)}</td>
                    <td className="px-4 py-2 vyron-num text-ink">{r.value}</td>
                    <td className="px-4 py-2 text-ink-muted">{r.unit}</td>
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
