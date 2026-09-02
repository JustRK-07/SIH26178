/**
 * Domain types for VYRON.
 * Hazard severity, alert states, sensor health — all sourced from the
 * design direction document (see DESIGN.md §3.1 and §6).
 */

export type Severity = "info" | "advisory" | "caution" | "warning" | "critical";

export type Hazard =
  | "flood"
  | "fire"
  | "air-quality"
  | "heat"
  | "landslide"
  | "industrial"
  | "water-quality";

export type SensorStatus = "online" | "degraded" | "offline";

export type Region = {
  id: string;
  name: string;
  state: string;
  lat: number;
  lng: number;
};

export type Sensor = {
  id: string;
  regionId: string;
  hazard: Hazard;
  status: SensorStatus;
  battery: number; // 0..100
  signal: number; // 0..100
  firmware: string;
  lastSeen: string; // ISO
  installedOn: string; // ISO
};

export type Reading = {
  sensorId: string;
  hazard: Hazard;
  value: number;
  unit: string;
  at: string; // ISO
};

export type Alert = {
  id: string;
  hazard: Hazard;
  severity: Severity;
  regionId: string;
  confidence: number; // 0..100
  headline: string;
  detail: string;
  recommendedAction: string;
  createdAt: string; // ISO
  sensorIds: string[];
};

export type RiskScore = {
  regionId: string;
  at: string; // ISO
  score: number; // 0..100
};

export type ModelMetric = {
  name: string;
  accuracy: number;
  precision: number;
  recall: number;
  f1: number;
  lastRound: string; // ISO
};

export type User = {
  id: string;
  name: string;
  role: "authority" | "responder" | "analyst" | "admin" | "citizen";
  regionId?: string;
  avatar?: string;
};
