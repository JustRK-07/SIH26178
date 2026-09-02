import { Bell, Layers, Map as MapIcon, Network, Radio, Users } from "lucide-react";
import { Card } from "@/components/ui/card";

/**
 * Solution — six pillars. Each card is a short sentence; no decorative
 * subtitle/eyebrow labels. Hairline border, no shadow.
 */
export function SolutionSection() {
  const pillars = [
    {
      icon: Radio,
      title: "Distributed sensor nodes",
      body: "ESP32 + multi-hazard probes, solar-powered, LoRaWAN/NB-IoT uplink.",
    },
    {
      icon: Layers,
      title: "On-device AI",
      body: "Edge inference for flood, fire, AQI, heat, landslide, and industrial.",
    },
    {
      icon: Bell,
      title: "Multi-hazard early warning",
      body: "Severity + confidence scoring; push alerts to authority and citizen.",
    },
    {
      icon: MapIcon,
      title: "Regional risk mapping",
      body: "Mapbox GL heatmap with district overlays and 24h risk trajectory.",
    },
    {
      icon: Users,
      title: "Authority + citizen notifications",
      body: "Mobile, web, SMS, IVR. Four personas, one vocabulary.",
    },
    {
      icon: Network,
      title: "Edge + cloud hybrid",
      body: "Edge decides in seconds. Cloud forecasts over weeks.",
    },
  ];
  return (
    <section id="solution" className="border-b border-hairline bg-surface">
      <div className="mx-auto max-w-content px-6 py-20">
        <h2 className="text-h1 text-ink">Solution</h2>
        <p className="mt-2 max-w-2xl text-body text-ink-muted">
          A network, not a product. Each node is small; together they shift disaster response from
          reactive to proactive.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {pillars.map((p) => (
            <Card key={p.title} className="flex flex-col gap-3 p-5">
              <span className="flex h-9 w-9 items-center justify-center rounded-card bg-canvas text-ink">
                <p.icon size={16} />
              </span>
              <p className="text-h2 text-ink">{p.title}</p>
              <p className="text-small text-ink-muted">{p.body}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
