/**
 * Indian districts the demo references, with rough centroid coordinates.
 * Coordinates are approximate — fine for a mock demo, not for production.
 */

import type { Hazard, Region, Severity } from "./types";

export const REGIONS: Region[] = [
  // Flood-prone
  { id: "as-kamrup", name: "Kamrup", state: "Assam", lat: 26.18, lng: 91.74 },
  { id: "br-patna", name: "Patna", state: "Bihar", lat: 25.59, lng: 85.13 },
  { id: "kl-ernakulam", name: "Ernakulam", state: "Kerala", lat: 9.98, lng: 76.28 },
  { id: "mh-mumbai", name: "Mumbai City", state: "Maharashtra", lat: 19.07, lng: 72.87 },

  // Forest-fire prone
  { id: "uk-dehradun", name: "Dehradun", state: "Uttarakhand", lat: 30.32, lng: 78.03 },
  { id: "hp-shimla", name: "Shimla", state: "Himachal Pradesh", lat: 31.1, lng: 77.17 },
  { id: "mp-mandla", name: "Mandla", state: "Madhya Pradesh", lat: 22.6, lng: 80.38 },

  // Air-quality hotspots
  { id: "dl-central", name: "Central Delhi", state: "Delhi", lat: 28.63, lng: 77.22 },
  { id: "up-lucknow", name: "Lucknow", state: "Uttar Pradesh", lat: 26.85, lng: 80.95 },

  // Heat
  { id: "rj-jodhpur", name: "Jodhpur", state: "Rajasthan", lat: 26.28, lng: 73.02 },

  // Landslide
  { id: "sk-gangtok", name: "Gangtok", state: "Sikkim", lat: 27.33, lng: 88.61 },

  // Industrial
  { id: "gj-ahmedabad", name: "Ahmedabad", state: "Gujarat", lat: 23.02, lng: 72.57 },
  { id: "tn-chennai", name: "Chennai", state: "Tamil Nadu", lat: 13.08, lng: 80.27 },

  // Water quality
  { id: "od-bhubaneswar", name: "Khordha", state: "Odisha", lat: 20.27, lng: 85.84 },
];

export const HAZARD_LABEL: Record<Hazard, string> = {
  flood: "Flood",
  fire: "Forest fire",
  "air-quality": "Air quality",
  heat: "Extreme heat",
  landslide: "Landslide",
  industrial: "Industrial emission",
  "water-quality": "Water quality",
};

export const HAZARD_TO_REGION: Record<Hazard, string[]> = {
  flood: ["as-kamrup", "br-patna", "kl-ernakulam", "mh-mumbai"],
  fire: ["uk-dehradun", "hp-shimla", "mp-mandla"],
  "air-quality": ["dl-central", "up-lucknow", "mh-mumbai"],
  heat: ["rj-jodhpur", "up-lucknow"],
  landslide: ["uk-dehradun", "hp-shimla", "sk-gangtok"],
  industrial: ["gj-ahmedabad", "tn-chennai", "mh-mumbai"],
  "water-quality": ["od-bhubaneswar", "kl-ernakulam"],
};

export const SEVERITY_ORDER: Record<Severity, number> = {
  critical: 5,
  warning: 4,
  caution: 3,
  advisory: 2,
  info: 1,
};

export const SEVERITY_LABEL: Record<Severity, string> = {
  info: "Info",
  advisory: "Advisory",
  caution: "Caution",
  warning: "Warning",
  critical: "Critical",
};
