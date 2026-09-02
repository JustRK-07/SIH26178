"use client";

import * as React from "react";
import { MapPin } from "lucide-react";
import type { Alert, Severity } from "@/lib/types";
import { REGIONS } from "@/lib/constants";
import { cn } from "@/lib/utils";

const SEV_COLOR: Record<Severity, string> = {
  info: "#3b82f6",
  advisory: "#0ea5e9",
  caution: "#f59e0b",
  warning: "#f97316",
  critical: "#dc2626",
};

const SEV_RADIUS: Record<Severity, number> = {
  info: 4,
  advisory: 5,
  caution: 6,
  warning: 7,
  critical: 9,
};

type RiskMapProps = {
  alerts: Alert[];
  className?: string;
};

/**
 * RiskMap — SVG-based India outline + sensor markers + alert hotspots.
 * No Mapbox token required for the demo; the design holds up either way.
 * For production, swap for react-map-gl with a Mapbox style.
 */
export function RiskMap({ alerts, className }: RiskMapProps) {
  const [hovered, setHovered] = React.useState<string | null>(null);

  // Project lat/lng to viewBox coordinates using a simple equirectangular
  // projection over India's bounding box.
  const project = (lat: number, lng: number) => {
    const minLng = 68;
    const maxLng = 98;
    const minLat = 8;
    const maxLat = 38;
    const x = ((lng - minLng) / (maxLng - minLng)) * 800;
    const y = 460 - ((lat - minLat) / (maxLat - minLat)) * 460;
    return { x, y };
  };

  const alertsByRegion = React.useMemo(() => {
    const m = new Map<string, Alert[]>();
    for (const a of alerts) {
      if (!m.has(a.regionId)) m.set(a.regionId, []);
      m.get(a.regionId)!.push(a);
    }
    return m;
  }, [alerts]);

  return (
    <div className={cn("relative h-full w-full overflow-hidden bg-canvas", className)}>
      <svg
        viewBox="0 0 800 460"
        preserveAspectRatio="xMidYMid slice"
        className="vyron-map-settle absolute inset-0 h-full w-full"
        aria-label="India hazard map"
      >
        {/* Background grid */}
        <defs>
          <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#e5e7eb" strokeWidth="0.5" />
          </pattern>
          <radialGradient id="heat-info" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={SEV_COLOR.info} stopOpacity="0.45" />
            <stop offset="100%" stopColor={SEV_COLOR.info} stopOpacity="0" />
          </radialGradient>
          <radialGradient id="heat-critical" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={SEV_COLOR.critical} stopOpacity="0.55" />
            <stop offset="100%" stopColor={SEV_COLOR.critical} stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="800" height="460" fill="url(#grid)" />

        {/* Stylised India outline — abstract, not a real border */}
        <path
          d="M 230 90 L 320 80 L 410 95 L 480 120 L 540 150 L 600 180 L 640 230 L 670 290 L 640 350 L 560 400 L 480 420 L 400 410 L 340 380 L 290 350 L 240 310 L 210 260 L 200 200 L 210 140 Z"
          fill="#ffffff"
          stroke="#e5e7eb"
          strokeWidth="1.5"
        />

        {/* Sensor markers */}
        {REGIONS.map((r) => {
          const p = project(r.lat, r.lng);
          const regionAlerts = alertsByRegion.get(r.id) ?? [];
          const top = regionAlerts[0];
          const color = top ? SEV_COLOR[top.severity] : "#9ca3af";
          const radius = top ? SEV_RADIUS[top.severity] : 2;
          return (
            <g
              key={r.id}
              onMouseEnter={() => setHovered(r.id)}
              onMouseLeave={() => setHovered(null)}
              style={{ cursor: "pointer" }}
            >
              {top && (
                <circle
                  cx={p.x}
                  cy={p.y}
                  r={radius * 4}
                  fill={top.severity === "critical" ? "url(#heat-critical)" : "url(#heat-info)"}
                />
              )}
              <circle cx={p.x} cy={p.y} r={radius} fill={color} stroke="#ffffff" strokeWidth="1.5" />
              {hovered === r.id && (
                <g>
                  <rect
                    x={p.x + 8}
                    y={p.y - 28}
                    width="120"
                    height="40"
                    rx="6"
                    fill="#0c1116"
                  />
                  <text x={p.x + 14} y={p.y - 14} fill="#ffffff" fontSize="11" fontWeight="600">
                    {r.name}, {r.state}
                  </text>
                  <text x={p.x + 14} y={p.y - 2} fill="#ffffff" fontSize="10" opacity="0.7">
                    {regionAlerts.length === 0 ? "No active alerts" : `${regionAlerts.length} active alert${regionAlerts.length > 1 ? "s" : ""}`}
                  </text>
                </g>
              )}
            </g>
          );
        })}
      </svg>

      <MapLegend />
      <MapDisclaimer />
    </div>
  );
}

function MapLegend() {
  const items: Array<{ severity: Severity; label: string }> = [
    { severity: "critical", label: "Critical" },
    { severity: "warning", label: "Warning" },
    { severity: "caution", label: "Caution" },
    { severity: "advisory", label: "Advisory" },
    { severity: "info", label: "Info" },
  ];
  return (
    <div className="absolute bottom-3 left-3 rounded-card border border-hairline bg-surface p-3">
      <p className="text-caption uppercase tracking-wide text-ink-muted">Severity</p>
      <div className="mt-2 flex flex-col gap-1">
        {items.map((i) => (
          <div key={i.severity} className="flex items-center gap-2">
            <span
              aria-hidden
              className="h-2 w-2 rounded-pill"
              style={{ backgroundColor: SEV_COLOR[i.severity] }}
            />
            <span className="text-caption text-ink">{i.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function MapDisclaimer() {
  return (
    <div className="absolute right-3 top-3 flex items-center gap-1 rounded-card border border-hairline bg-surface px-2.5 py-1.5 text-caption text-ink-muted">
      <MapPin size={12} />
      India · {REGIONS.length} districts monitored
    </div>
  );
}
