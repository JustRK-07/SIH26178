# VYRON

AI-powered environmental intelligence network for disaster management in India. Smart India Hackathon 26178.

> See [`DESIGN.md`](./DESIGN.md) for the visual design direction. This README is for running the demo.

## What's in the box

- **Marketing site** (`/`) — hero, problem, solution, process flow, CTA, footer
- **Authority dashboard** (`/dashboard`) — map-first ops console with KPI strip, 24h risk chart, alert feed, drawer
- **Field responder** (`/dashboard/responder`) — tablet-first, map + bottom sheet with incidents / tasks / comms
- **Analyst** (`/dashboard/analytics`) — multi-district time-series, model performance, coverage table
- **System admin** (`/dashboard/admin`) — sensor inventory, OTA, alert rules, users
- **Sensor inventory** (`/dashboard/sensors`) + **detail** (`/dashboard/sensors/[id]`)
- **Alerts** (`/dashboard/alerts`) — full list, click for drawer
- **Map** (`/dashboard/map`) — full-screen map
- **Citizen PWA** (`/citizen`) — mobile-first, today's risk, voice briefing, nearby alerts
- **Docs** (`/docs`) — brief, architecture, data sources, what's mocked
- **Sign-in** (`/signin`) — role picker for the demo

Four personas, one design system, four vocabularies.

## Run locally

```bash
# 1. Install
npm install

# 2. (Optional) Mapbox token for production-grade map tiles.
#    Without it, the dashboard falls back to an SVG India outline.
cp .env.example .env.local
# Edit .env.local and add NEXT_PUBLIC_MAPBOX_TOKEN=...

# 3. Start dev server
npm run dev
# → http://localhost:3000
```

Requires **Node 18.17+**.

## Project structure

```
app/
├── page.tsx                       # Marketing landing
├── layout.tsx                     # Root layout, fonts, metadata
├── globals.css                    # Tokens + keyframes
├── signin/page.tsx                # Role picker
├── docs/page.tsx                  # Brief
├── citizen/page.tsx               # Citizen PWA
└── dashboard/
    ├── page.tsx                   # Authority (default)
    ├── map/page.tsx
    ├── alerts/page.tsx
    ├── sensors/page.tsx
    ├── sensors/[id]/page.tsx
    ├── analytics/page.tsx         # Analyst
    ├── responder/page.tsx         # Field responder
    └── admin/page.tsx

components/
├── ui/                            # Design system primitives
│   ├── card.tsx
│   ├── pill.tsx
│   ├── kpi-tile.tsx
│   ├── button.tsx
│   ├── table.tsx
│   ├── drawer.tsx
│   ├── filter-pill.tsx
│   ├── severity-dot.tsx
│   ├── status-pill.tsx
│   ├── section-header.tsx
│   └── empty-state.tsx
├── layout/
│   ├── dashboard-shell.tsx        # Icon rail + top bar
│   ├── icon-rail.tsx
│   ├── top-bar.tsx
│   ├── marketing-nav.tsx
│   ├── citizen-shell.tsx
│   └── responder-shell.tsx
├── dashboard/
│   ├── risk-map.tsx               # SVG + (optional) Mapbox
│   ├── kpi-strip.tsx
│   ├── risk-chart.tsx             # Recharts multi-line
│   ├── alert-feed.tsx
│   ├── alert-drawer.tsx
│   └── filter-bar.tsx
└── marketing/
    ├── hero.tsx
    ├── stat-tiles.tsx
    ├── problem-section.tsx
    ├── solution-section.tsx
    ├── process-flow.tsx
    ├── cta-strip.tsx
    └── footer.tsx

lib/
├── types.ts                       # Domain types
├── constants.ts                   # Regions, hazards, severity
├── utils.ts                       # cn, formatIndianNumber, formatIST
└── mock-data.ts                   # Seeded mock sensors, alerts, risk scores
```

## Architecture (target pipeline)

```
ESP32 sensors → LoRa / NB-IoT → MQTT broker (Mosquitto)
                                   │
                                   ▼
                              aiomqtt subscriber
                                   │
                                   ▼
                              FastAPI ingest
                                   │
                ┌──────────────────┼──────────────────┐
                ▼                  ▼                  ▼
          TimescaleDB          MongoDB            Redis
        (time-series)        (documents)         (pub/sub)
                │                  │                  │
                └──────────────────┼──────────────────┘
                                   ▼
                     LangChain analyst + forecast
                                   │
                                   ▼
                    Next.js dashboard + Citizen PWA
                    (WebSocket bridge for live updates)
```

Edge AI runs **on the ESP32** using TFLite Micro or ONNX Runtime. The cloud is for forecasting, not for first alert.

## What's mocked vs real

| Layer | Mocked | Real |
|---|---|---|
| Sensor fleet | ~3,000 simulated nodes in `lib/mock-data.ts` | — |
| Live MQTT stream | Seeded deterministic data | Drop-in: `aiomqtt` subscription |
| Map tiles | SVG India outline | `NEXT_PUBLIC_MAPBOX_TOKEN` for real tiles |
| Edge AI | Realistic model accuracy numbers | ONNX / TFLite micro on ESP32-S3 |
| Auth | Role picker at `/signin` | NIC SSO + Aadhaar via NextAuth |

The mock data is deterministic — SSR and CSR render identically — so the demo works without any backend.

## Demo script

1. **Land on `/`** — read the headline, scroll past stat tiles, see the sensor mesh SVG animate.
2. **Open dashboard** — `Authority` console, map fills with hazard hotspots. Click any dot on the map. Filter by `Flood` in the top bar.
3. **Click an alert in the right feed** — drawer slides in with timeline, recommended action, contributing sensors, publish/share/acknowledge buttons.
4. **Switch role to `Field responder`** at `/signin` — tablet-style layout with bottom-sheet tabs (Incidents / Tasks / Comms).
5. **Switch role to `Analyst`** — multi-district chart, model performance, exportable coverage table.
6. **Switch role to `Citizen`** — mobile-first PWA with today's risk card, AQI / temp / rain metrics, voice briefing.
7. **Switch role to `System admin`** — sensor inventory with status, battery, signal; alert rules; user counts.

## Design system

See [`DESIGN.md`](./DESIGN.md) for full rationale. One-line summary:

- Cool slate canvas, teal-blue brand, severity ramp from info → critical.
- Inter only, weight contrast carries hierarchy.
- 10px cards, hairline borders, **zero drop shadows** in `/dashboard`.
- One orchestrated motion moment (map fade-in); everything else is response animation.

## Notes for judges

- **Map**: works without a Mapbox token (SVG fallback). With a token, swap `RiskMap` for a `react-map-gl` component — design tokens already match.
- **Real-time**: add a `useEffect` SSE subscription to `/api/stream` (not implemented in the demo) and the `ALERTS` array will update without changing components.
- **Edge AI**: model accuracy numbers in `lib/mock-data.ts` come from public benchmarks for flood / smoke / AQI / landslide classifiers. The actual ONNX models would live under `edge-models/` and be bundled at build time.
- **Federated learning**: `MODEL_METRICS.lastRound` represents the next FL round window; UI is wired.

## Scripts

```bash
npm run dev        # local dev server
npm run build      # production build
npm run start      # serve production build
npm run lint       # next lint
npm run typecheck  # tsc --noEmit
```
