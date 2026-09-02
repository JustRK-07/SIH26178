"use client";

import * as React from "react";
import { FilterPill } from "@/components/ui/filter-pill";
import type { Hazard } from "@/lib/types";
import { HAZARD_LABEL } from "@/lib/constants";

const HAZARDS: Hazard[] = [
  "flood",
  "fire",
  "air-quality",
  "heat",
  "landslide",
  "industrial",
  "water-quality",
];

type FilterBarProps = {
  active: Hazard | "all";
  onChange: (h: Hazard | "all") => void;
  window: "1h" | "24h" | "7d";
  onWindowChange: (w: "1h" | "24h" | "7d") => void;
  onRefresh?: () => void;
};

export function FilterBar({ active, onChange, window: w, onWindowChange, onRefresh }: FilterBarProps) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <FilterPill active={active === "all"} onClick={() => onChange("all")}>
        All hazards
      </FilterPill>
      {HAZARDS.map((h) => (
        <FilterPill key={h} active={active === h} onClick={() => onChange(h)}>
          {HAZARD_LABEL[h]}
        </FilterPill>
      ))}
      <span aria-hidden className="mx-2 h-5 w-px bg-hairline" />
      <FilterPill active={w === "1h"} onClick={() => onWindowChange("1h")}>
        1h
      </FilterPill>
      <FilterPill active={w === "24h"} onClick={() => onWindowChange("24h")}>
        24h
      </FilterPill>
      <FilterPill active={w === "7d"} onClick={() => onWindowChange("7d")}>
        7d
      </FilterPill>
      <button
        type="button"
        onClick={onRefresh}
        className="ml-auto inline-flex h-7 items-center rounded-pill border border-hairline bg-surface px-3 text-caption text-ink hover:bg-canvas"
      >
        Refresh
      </button>
    </div>
  );
}
