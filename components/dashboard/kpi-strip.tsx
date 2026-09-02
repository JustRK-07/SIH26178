import { KpiTile } from "@/components/ui/kpi-tile";
import { aggregateKpis } from "@/lib/mock-data";
import { formatIndianNumber } from "@/lib/utils";

/**
 * KPI strip — five tiles, severity-coded deltas.
 * Numbers are tabular (see globals.css).
 */
export function KpiStrip() {
  const k = aggregateKpis();
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
      <KpiTile
        label="Sensors online"
        value={formatIndianNumber(k.sensorsOnline)}
        delta={`${k.sensorsDeltaPct > 0 ? "+" : ""}${k.sensorsDeltaPct}%`}
        deltaSeverity="good"
        hint="vs last week"
      />
      <KpiTile
        label="Active alerts"
        value={formatIndianNumber(k.activeAlerts)}
        delta={`${k.alertsDelta > 0 ? "+" : ""}${k.alertsDelta}`}
        deltaSeverity={k.alertsDelta < 0 ? "good" : "bad"}
        hint="last 24h"
      />
      <KpiTile
        label="Highest-risk district"
        value={k.highestRiskRegion}
        delta="trending up"
        deltaSeverity="bad"
      />
      <KpiTile
        label="Avg response time"
        value={`${Math.floor(k.avgResponseSeconds / 60)}m ${k.avgResponseSeconds % 60}s`}
        delta={`${k.responseDeltaSeconds > 0 ? "+" : ""}${k.responseDeltaSeconds}s`}
        deltaSeverity="good"
        hint="week-on-week"
      />
      <KpiTile
        label="Population coverage"
        value={`${k.coveragePct}%`}
        delta={`+${k.coverageDeltaPct}pp`}
        deltaSeverity="good"
        hint="target districts"
      />
    </div>
  );
}
