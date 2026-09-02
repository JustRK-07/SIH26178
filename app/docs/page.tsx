import { MarketingNav } from "@/components/layout/marketing-nav";
import { Footer } from "@/components/marketing/footer";

export default function DocsPage() {
  return (
    <>
      <MarketingNav />
      <main className="mx-auto max-w-content px-6 py-16">
        <p className="text-caption uppercase tracking-wide text-ink-muted">Brief</p>
        <h1 className="mt-2 text-display text-ink">VYRON — brief and architecture</h1>
        <p className="mt-4 max-w-2xl text-body text-ink-muted">
          A single page for judges. Problem, solution, architecture diagram, data sources,
          what&apos;s mocked, and what would ship after the hackathon.
        </p>

        <Section title="Problem">
          <p>
            India faces floods, forest fires, air-quality crises, heat waves, landslides, and
            industrial emissions. Existing monitoring is centralised and slow. Citizens and
            authorities learn about hazards after they have already escalated.
          </p>
        </Section>

        <Section title="Solution">
          <p>
            A distributed network of solar-powered ESP32 sensor nodes with edge AI models. Each
            node decides locally in milliseconds and only sends severity-coded alerts to the cloud.
            Authorities receive a map-first console; citizens receive a mobile PWA.
          </p>
        </Section>

        <Section title="Architecture" id="architecture">
          <pre className="overflow-x-auto rounded-card border border-hairline bg-surface p-4 font-mono text-[11px] leading-relaxed text-ink">
{`┌──────────────┐    LoRa / NB-IoT     ┌──────────────┐
│  Sensor node │ ───────────────────▶ │ MQTT broker  │
│  ESP32 + AI  │                      │  (Mosquitto) │
└──────────────┘                      └──────┬───────┘
                                              │
                                              ▼
┌──────────────┐   WebSocket       ┌──────────────────────┐
│  Next.js UI  │ ◀─────────────────│ FastAPI ingestion    │
│  Dashboard + │                   │  + alert dispatcher  │
│  Citizen PWA │                   └──────────┬───────────┘
└──────────────┘                              │
                                              ▼
                                  ┌──────────────────────┐
                                  │ TimescaleDB + Mongo  │
                                  │ + Redis pub/sub      │
                                  └──────────┬───────────┘
                                             │
                                             ▼
                                  ┌──────────────────────┐
                                  │ LangChain analyst    │
                                  │ + forecast models    │
                                  └──────────────────────┘`}
          </pre>
        </Section>

        <Section title="Data sources" id="data">
          <ul className="list-disc space-y-1 pl-5 text-body text-ink">
            <li>Sensor readings — simulated per <code>lib/mock-data.ts</code></li>
            <li>IMD weather — mausam.imd.gov.in</li>
            <li>MOSDAC satellite (ISRO) — mosdac.gov.in</li>
            <li>Open-Meteo flood — open-meteo.com/en/docs/flood-api</li>
            <li>NASA FIRMS — firms.modaps.eosdis.nasa.gov</li>
            <li>CWC FloodWatch India — central water commission forecasts</li>
          </ul>
        </Section>

        <Section title="What is mocked for the demo">
          <ul className="list-disc space-y-1 pl-5 text-body text-ink">
            <li>Sensor fleet: ~3,000 simulated ESP32 nodes across 14 Indian districts</li>
            <li>Live MQTT stream: replaced with deterministic seeded data (no backend needed)</li>
            <li>Map tiles: SVG India outline instead of Mapbox token (drop in <code>NEXT_PUBLIC_MAPBOX_TOKEN</code> to swap)</li>
            <li>Edge AI models: referenced in <code>lib/mock-data.ts</code> with realistic accuracy numbers</li>
          </ul>
        </Section>

        <Section title="What would ship after the hackathon">
          <ul className="list-disc space-y-1 pl-5 pl-5 text-body text-ink">
            <li>FastAPI + aiomqtt bridge (see <code>README.md</code>)</li>
            <li>TimescaleDB schema for time-series, MongoDB for documents</li>
            <li>ONNX Runtime edge inference on ESP32-S3 with TFLite micro fallback</li>
            <li>Federated learning round-trip every 6 hours across districts</li>
            <li>NIC SSO + Aadhaar-linked citizen auth via NextAuth</li>
          </ul>
        </Section>
      </main>
      <Footer />
    </>
  );
}

function Section({
  title,
  children,
  id,
}: {
  title: string;
  children: React.ReactNode;
  id?: string;
}) {
  return (
    <section id={id} className="mt-12">
      <h2 className="text-h1 text-ink">{title}</h2>
      <div className="mt-4 space-y-3 text-body text-ink-muted">{children}</div>
    </section>
  );
}
