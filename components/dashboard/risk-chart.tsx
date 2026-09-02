"use client";

import * as React from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { RISK_SCORES } from "@/lib/mock-data";
import { REGIONS } from "@/lib/constants";

const COLORS = ["#dc2626", "#f97316", "#f59e0b", "#0ea5e9", "#3b82f6"];

const TOP_REGIONS = ["as-kamrup", "uk-dehradun", "dl-central", "rj-jodhpur", "mh-mumbai"];

/**
 * Risk chart — 24h risk score per district.
 * Subtle hairlines, severity-banded colours, custom tooltip in a flat card.
 */
export function RiskChart() {
  const data = React.useMemo(() => {
    const buckets = new Map<string, Record<string, string | number>>();
    for (const r of RISK_SCORES) {
      const hour = r.at.slice(11, 16);
      const row = buckets.get(hour) ?? { time: hour };
      row[r.regionId] = r.score;
      buckets.set(hour, row);
    }
    return Array.from(buckets.values()).sort((a, b) =>
      String(a.time).localeCompare(String(b.time)),
    );
  }, []);

  return (
    <ResponsiveContainer width="100%" height={240}>
      <LineChart data={data} margin={{ top: 10, right: 16, left: 0, bottom: 0 }}>
        <CartesianGrid stroke="#e5e7eb" strokeDasharray="2 4" vertical={false} />
        <XAxis
          dataKey="time"
          stroke="#5b6573"
          fontSize={11}
          tickLine={false}
          axisLine={{ stroke: "#e5e7eb" }}
          interval={2}
        />
        <YAxis
          stroke="#5b6573"
          fontSize={11}
          tickLine={false}
          axisLine={false}
          width={32}
          domain={[0, 100]}
        />
        <Tooltip content={<RiskTooltip />} />
        {TOP_REGIONS.map((rid, i) => {
          const r = REGIONS.find((x) => x.id === rid)!;
          return (
            <Line
              key={rid}
              type="monotone"
              dataKey={rid}
              stroke={COLORS[i]}
              strokeWidth={1.75}
              dot={false}
              activeDot={{ r: 4, strokeWidth: 0, fill: COLORS[i] }}
            />
          );
        })}
      </LineChart>
    </ResponsiveContainer>
  );
}

function RiskTooltip({ active, payload, label }: { active?: boolean; payload?: any[]; label?: string }) {
  if (!active || !payload || payload.length === 0) return null;
  return (
    <div className="rounded-card border border-hairline bg-surface p-3 shadow-sm">
      <p className="text-caption text-ink-muted">{label} IST</p>
      <div className="mt-1.5 flex flex-col gap-1">
        {payload.map((p: any) => {
          const r = REGIONS.find((x) => x.id === p.dataKey);
          return (
            <div key={p.dataKey} className="flex items-center gap-2 text-caption">
              <span
                aria-hidden
                className="h-2 w-2 rounded-pill"
                style={{ backgroundColor: p.color }}
              />
              <span className="text-ink-muted">{r?.name ?? p.dataKey}</span>
              <span className="vyron-num ml-auto pl-3 text-ink">{p.value}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function RiskLegend() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {TOP_REGIONS.map((rid, i) => {
        const r = REGIONS.find((x) => x.id === rid)!;
        return (
          <div key={rid} className="flex items-center gap-1.5 text-caption text-ink-muted">
            <span
              aria-hidden
              className="h-2 w-2 rounded-pill"
              style={{ backgroundColor: COLORS[i] }}
            />
            {r.name}, {r.state}
          </div>
        );
      })}
    </div>
  );
}
