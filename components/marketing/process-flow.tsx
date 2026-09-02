import { Cpu, Radio, Server, ShieldAlert, Smartphone } from "lucide-react";

/**
 * Process flow — 5 nodes depicting the data path. No "01/02/03" markers.
 * Each node is a label + icon + one-line description; arrows live between them.
 */
export function ProcessFlow() {
  const steps = [
    {
      icon: Cpu,
      label: "Sensor",
      desc: "Solar-powered ESP32 with multi-hazard probes",
    },
    {
      icon: Radio,
      label: "Edge AI",
      desc: "On-device inference — no cloud round-trip",
    },
    {
      icon: ShieldAlert,
      label: "Local alert",
      desc: "Severity-coded warning issued in seconds",
    },
    {
      icon: Server,
      label: "Cloud forecast",
      desc: "Aggregated to long-horizon risk model",
    },
    {
      icon: Smartphone,
      label: "Authority + citizen",
      desc: "Prioritised push to NDMA, state, and citizens",
    },
  ];
  return (
    <section id="architecture" className="border-b border-hairline bg-canvas">
      <div className="mx-auto max-w-content px-6 py-20">
        <h2 className="text-h1 text-ink">How it works</h2>
        <p className="mt-2 max-w-2xl text-body text-ink-muted">
          Detection happens where the disaster happens. Cloud is for forecasting, not for first
          alert.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-5">
          {steps.map((s, i) => (
            <div key={s.label} className="flex flex-col gap-3 rounded-card border border-hairline bg-surface p-4">
              <div className="flex items-center justify-between">
                <span className="flex h-9 w-9 items-center justify-center rounded-card bg-canvas text-ink">
                  <s.icon size={16} />
                </span>
                {i < steps.length - 1 && (
                  <span aria-hidden className="text-caption text-ink-muted md:hidden">
                    ↓
                  </span>
                )}
              </div>
              <p className="text-body font-semibold text-ink">{s.label}</p>
              <p className="text-small text-ink-muted">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
