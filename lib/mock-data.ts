/**
 * Mock data layer. Everything the dashboard renders comes from here.
 * In production this is replaced by an MQTT→FastAPI bridge feeding
 * TimescaleDB. See DESIGN.md for the pipeline diagram.
 */

import type {
  Alert,
  Hazard,
  ModelMetric,
  Reading,
  Region,
  RiskScore,
  Sensor,
  Severity,
} from "./types";
import { HAZARD_TO_REGION, REGIONS, SEVERITY_ORDER } from "./constants";

// Deterministic pseudo-random so SSR and CSR agree. No Math.random.
function seeded(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 0xffffffff;
  };
}

const rand = seeded(42);
const pick = <T,>(arr: T[]): T => arr[Math.floor(rand() * arr.length)];
const between = (lo: number, hi: number) => lo + rand() * (hi - lo);

// ------------------------------------------------------------------
// Sensors
// ------------------------------------------------------------------

const FIRMWARES = ["1.4.2", "1.4.3", "1.5.0-rc2", "1.5.0"];

export const SENSORS: Sensor[] = (() => {
  const out: Sensor[] = [];
  let n = 0;
  for (const region of REGIONS) {
    for (const hazard of Object.keys(HAZARD_TO_REGION) as Hazard[]) {
      if (!HAZARD_TO_REGION[hazard].includes(region.id)) continue;
      const count = 2 + Math.floor(rand() * 4); // 2..5 sensors per (region, hazard)
      for (let i = 0; i < count; i++) {
        n++;
        const r = rand();
        out.push({
          id: `ESP32-${(n * 7919).toString(16).toUpperCase().padStart(4, "0")}`,
          regionId: region.id,
          hazard,
          status: r < 0.85 ? "online" : r < 0.95 ? "degraded" : "offline",
          battery: Math.round(40 + rand() * 60),
          signal: Math.round(40 + rand() * 60),
          firmware: pick(FIRMWARES),
          lastSeen: new Date(Date.now() - rand() * 1000 * 60 * 30).toISOString(),
          installedOn: new Date(
            Date.now() - (90 + Math.floor(rand() * 600)) * 86400000,
          ).toISOString(),
        });
      }
    }
  }
  return out;
})();

// ------------------------------------------------------------------
// Live readings (last 60 minutes, 5-minute cadence per sensor)
// ------------------------------------------------------------------

export const READINGS: Reading[] = (() => {
  const out: Reading[] = [];
  for (const sensor of SENSORS) {
    if (sensor.status === "offline") continue;
    for (let i = 60; i >= 0; i -= 5) {
      const base = baseFor(sensor.hazard);
      out.push({
        sensorId: sensor.id,
        hazard: sensor.hazard,
        value: +(base * (0.85 + rand() * 0.3)).toFixed(1),
        unit: unitFor(sensor.hazard),
        at: new Date(Date.now() - i * 60 * 1000).toISOString(),
      });
    }
  }
  return out;
})();

function baseFor(hazard: Hazard): number {
  switch (hazard) {
    case "flood":
      return 4.2; // metres
    case "fire":
      return 380; // AQI smoke index
    case "air-quality":
      return 285; // PM2.5 ug/m3
    case "heat":
      return 42; // °C
    case "landslide":
      return 18; // mm/h rain
    case "industrial":
      return 12; // ppm VOC
    case "water-quality":
      return 6.5; // pH
  }
}

function unitFor(hazard: Hazard): string {
  switch (hazard) {
    case "flood":
      return "m";
    case "fire":
      return "AQI";
    case "air-quality":
      return "µg/m³";
    case "heat":
      return "°C";
    case "landslide":
      return "mm/h";
    case "industrial":
      return "ppm";
    case "water-quality":
      return "pH";
  }
}

// ------------------------------------------------------------------
// Alerts — built deterministically per (region, hazard) tuple
// ------------------------------------------------------------------

const ALERT_TEMPLATES: Record<Hazard, { headline: string; detail: string; action: string }> = {
  flood: {
    headline: "Water level rising past danger mark",
    detail:
      "Brahmaputra tributary level up 0.8 m in last 3 hours. Sensor cluster upstream reports accelerated inflow.",
    action: "Issue evacuation notice for low-lying wards. Pre-position SDRF boats.",
  },
  fire: {
    headline: "Smoke plume detected near forest fringe",
    detail:
      "Edge vision model flagged smoke with 92% confidence. Wind 14 km/h from NW pushing plume toward Dehradun outskirts.",
    action: "Dispatch ground crew. Activate satellite pass for thermal confirmation.",
  },
  "air-quality": {
    headline: "PM2.5 sustained above 300 µg/m³",
    detail: "Stagnant boundary layer + stubble smoke. 6-hour forecast shows no relief.",
    action: "Issue health advisory. Restrict outdoor activity for sensitive groups.",
  },
  heat: {
    headline: "Wet-bulb temperature crossing 31°C",
    detail: "Humidity + heat index beyond safe threshold for outdoor labour.",
    action: "Activate cooling shelters. Suspend non-essential outdoor work between 12:00–16:00 IST.",
  },
  landslide: {
    headline: "Soil moisture + vibration spike above threshold",
    detail:
      "Two sensors in adjacent grid report concurrent moisture saturation and micro-tremor (0.4g).",
    action: "Evacuate identified households within 500 m radius. Issue red warning.",
  },
  industrial: {
    headline: "VOC concentration anomaly at plant boundary",
    detail: "Sudden 6× spike in VOC sensor; pattern matches ethyl-benzene signature.",
    action: "Notify plant operator. Prepare evacuation shelter downwind.",
  },
  "water-quality": {
    headline: "pH drop indicates likely contamination",
    detail: "Drinking-water intake station reports pH 4.8, sustained for 30 minutes.",
    action: "Switch to alternate intake. Notify municipal health officer.",
  },
};

export const ALERTS: Alert[] = (() => {
  const out: Alert[] = [];
  let i = 0;
  // Seed a handful of high-severity incidents so the demo lands.
  const seededHigh: Array<[Hazard, Severity, string]> = [
    ["flood", "critical", "as-kamrup"],
    ["fire", "warning", "uk-dehradun"],
    ["air-quality", "caution", "dl-central"],
    ["landslide", "warning", "uk-dehradun"],
    ["heat", "advisory", "rj-jodhpur"],
  ];
  for (const [hazard, severity, regionId] of seededHigh) {
    i++;
    const tpl = ALERT_TEMPLATES[hazard];
    out.push({
      id: `ALR-${String(i).padStart(4, "0")}`,
      hazard,
      severity,
      regionId,
      confidence: 78 + Math.floor(rand() * 20),
      headline: tpl.headline,
      detail: tpl.detail,
      recommendedAction: tpl.action,
      createdAt: new Date(Date.now() - (5 + i * 11) * 60 * 1000).toISOString(),
      sensorIds: SENSORS.filter((s) => s.regionId === regionId && s.hazard === hazard)
        .slice(0, 3)
        .map((s) => s.id),
    });
  }
  // Filler
  for (const region of REGIONS) {
    for (const hazard of Object.keys(HAZARD_TO_REGION) as Hazard[]) {
      if (!HAZARD_TO_REGION[hazard].includes(region.id)) continue;
      if (rand() < 0.35) {
        i++;
        const severities: Severity[] = ["info", "advisory", "caution"];
        const severity = pick(severities);
        const tpl = ALERT_TEMPLATES[hazard];
        out.push({
          id: `ALR-${String(i).padStart(4, "0")}`,
          hazard,
          severity,
          regionId: region.id,
          confidence: 60 + Math.floor(rand() * 30),
          headline: tpl.headline,
          detail: tpl.detail,
          recommendedAction: tpl.action,
          createdAt: new Date(Date.now() - (60 + i * 7) * 60 * 1000).toISOString(),
          sensorIds: SENSORS.filter((s) => s.regionId === region.id && s.hazard === hazard)
        .slice(0, 2)
        .map((s) => s.id),
        });
      }
    }
  }
  return out.sort(
    (a, b) =>
      SEVERITY_ORDER[b.severity] - SEVERITY_ORDER[a.severity] ||
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
})();

// ------------------------------------------------------------------
// 24h risk score per region (used by Authority dashboard chart)
// ------------------------------------------------------------------

export const RISK_SCORES: RiskScore[] = (() => {
  const out: RiskScore[] = [];
  const top = ["as-kamrup", "uk-dehradun", "dl-central", "rj-jodhpur", "mh-mumbai"];
  const baseScores: Record<string, number> = {
    "as-kamrup": 78,
    "uk-dehradun": 64,
    "dl-central": 71,
    "rj-jodhpur": 55,
    "mh-mumbai": 47,
  };
  for (const regionId of top) {
    const base = baseScores[regionId];
    for (let h = 24; h >= 0; h--) {
      out.push({
        regionId,
        at: new Date(Date.now() - h * 60 * 60 * 1000).toISOString(),
        score: Math.max(10, Math.min(95, Math.round(base + Math.sin(h / 3) * 12 + (rand() - 0.5) * 8))),
      });
    }
  }
  return out;
})();

// ------------------------------------------------------------------
// Model performance (analyst dashboard)
// ------------------------------------------------------------------

export const MODEL_METRICS: ModelMetric[] = [
  { name: "Flood edge classifier", accuracy: 0.94, precision: 0.91, recall: 0.89, f1: 0.90, lastRound: "2026-09-01T18:30:00Z" },
  { name: "Smoke plume detector", accuracy: 0.91, precision: 0.88, recall: 0.92, f1: 0.90, lastRound: "2026-09-02T07:12:00Z" },
  { name: "Air-quality forecaster", accuracy: 0.87, precision: 0.86, recall: 0.84, f1: 0.85, lastRound: "2026-09-02T11:05:00Z" },
  { name: "Landslide precursor model", accuracy: 0.82, precision: 0.79, recall: 0.85, f1: 0.82, lastRound: "2026-09-02T14:48:00Z" },
  { name: "Industrial VOC anomaly", accuracy: 0.96, precision: 0.93, recall: 0.95, f1: 0.94, lastRound: "2026-09-02T16:22:00Z" },
];

// ------------------------------------------------------------------
// Aggregates used by the KPI strip
// ------------------------------------------------------------------

export function aggregateKpis() {
  const online = SENSORS.filter((s) => s.status === "online").length;
  const total = SENSORS.length;
  const active = ALERTS.filter(
    (a) => SEVERITY_ORDER[a.severity] >= SEVERITY_ORDER.caution,
  ).length;
  const criticalRegion = ALERTS.find((a) => a.severity === "critical")?.regionId;
  return {
    sensorsOnline: online,
    sensorsTotal: total,
    sensorsDeltaPct: 2,
    activeAlerts: active,
    alertsDelta: -3,
    highestRiskRegion: criticalRegion
      ? REGIONS.find((r) => r.id === criticalRegion)?.name ?? "Patna"
      : "Patna",
    highestRiskTrend: "up" as const,
    avgResponseSeconds: 252,
    responseDeltaSeconds: -18,
    coveragePct: 78,
    coverageDeltaPct: 4,
  };
}

export function regionById(id: string): Region | undefined {
  return REGIONS.find((r) => r.id === id);
}

export function alertsForRegion(regionId: string): Alert[] {
  return ALERTS.filter((a) => a.regionId === regionId);
}

export function sensorsForRegion(regionId: string): Sensor[] {
  return SENSORS.filter((s) => s.regionId === regionId);
}

export function readingsForSensor(sensorId: string): Reading[] {
  return READINGS.filter((r) => r.sensorId === sensorId).sort(
    (a, b) => new Date(a.at).getTime() - new Date(b.at).getTime(),
  );
}

// Deterministic jitter for "live" updates — small drift each render.
export function jitterScore(score: number): number {
  return Math.max(0, Math.min(100, score + (rand() - 0.5) * 2));
}
