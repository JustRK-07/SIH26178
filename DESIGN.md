# VYRON — Design Direction

For the dashboard (operational tool, 4 roles) and the marketing website.
Reference: **Manus 1.6 Lite** — quiet-tool restraint, white canvas, KPI strip + line chart, restrained accent. Pull its discipline. Reject its sameness.

---

## 1. The opinion

VYRON should feel like a tool a pilot reads in turbulence: calm interface, dense information, severity as color (not decoration), and the map as the anchor, not a sidebar. India-specific details (lakh formatting, IST, district-first geography, bilingual typography) carry the identity — not palette tropes borrowed from generic SaaS kits.

The brand color is teal-blue (`#0b5cff`), chosen for sky/monsoon association. It is **not** the warm clay palette that dominates current AI-generated designs, and it is **not** a generic Tailwind blue-500.

---

## 2. Subject grounding

India's hazard landscape: Assam/Bihar floods, Uttarakhand/Himachal forest fires, Delhi AQI, Himalayan landslides, industrial belt chemical events. The tool serves people who must act in seconds under stress. That argues for:

- High information density
- Severity-coded colors that read in 200 ms
- Map dominance over chrome
- A palette that does not compete with the data
- Numbers and timestamps foregrounded, never italicised, never decorative

---

## 3. Design tokens

### 3.1 Color

| Token | Hex | Role |
|---|---|---|
| `canvas` | `#f4f5f7` | App background. Cool slate — reads as atmosphere, not paper. |
| `surface` | `#ffffff` | Cards, panels, table rows. |
| `hairline` | `#e5e7eb` | 1px borders. The only structure device. |
| `ink` | `#0c1116` | Primary text. True near-black, not tinted. |
| `inkMuted` | `#5b6573` | Secondary text. |
| `brand` | `#0b5cff` | CTAs, focus ring, link, active state. **One job only.** |
| `brandHover` | `#0a4ed6` | Hover/pressed. |

### Severity ramp (semantic — used on map, alerts, KPIs)

| Token | Hex | Meaning |
|---|---|---|
| `sev.info` | `#3b82f6` | Informational / monitor |
| `sev.advisory` | `#0ea5e9` | Watch |
| `sev.caution` | `#f59e0b` | Advisory |
| `sev.warning` | `#f97316` | Warning |
| `sev.critical` | `#dc2626` | Emergency |

Status (separate from severity): `success #10b981`, `offline #9ca3af`.

### 3.2 Typography

**One family** with weight contrast: **Inter** at 400 / 500 / 600.
No serif display. Disasters don't have time for them.

**JetBrains Mono** is allowed **only** for genuine machine identifiers — sensor IDs (`ESP32-A4F2`), timestamps (`18:42:07 IST`), protocol strings. Never as decorative "data labels."

Scale (modular 1.25):

| Token | Size / Line / Weight | Use |
|---|---|---|
| `display` | 40 / 48 / 600 | Once, on landing hero |
| `h1` | 28 / 36 / 600 | Page title |
| `h2` | 20 / 28 / 600 | Section title |
| `body` | 14 / 22 / 400 | Default |
| `small` | 13 / 20 / 400 | Table cells, list rows |
| `caption` | 12 / 16 / 500 | Labels below numbers, table headers |

All numbers: `font-variant-numeric: tabular-nums`.

Line lengths: ≤ 72ch on landing, ≤ 80ch in dashboard tables.

### 3.3 Spacing, radius, elevation

- Base: 4px. Stops: 4, 8, 12, 16, 24, 32, 48.
- Radius: **10px** on cards (committed; not 12, not 16). Pills: 999. Map container: 0 (edge-to-edge).
- **Elevation rule:** zero drop shadows anywhere in `/dashboard`. Depth comes from hairline borders + a single 1px divider. This is the one decision that prevents the SaaS card kit look.

### 3.4 Motion

- **One orchestrated moment** on page-load: map fades in while its camera pans gently to the user's region (geolocation or last-viewed district). ~700ms ease-out.
- **Response animations only** after that: alert pulse, drawer slide, toast appear.
- **No** fade-up-on-scroll. **No** hover transitions on every card. **No** parallax.
- Respect `prefers-reduced-motion`: no camera pan, no slide; cross-fade only.

---

## 4. Layout principles

1. Map-first everywhere it appears.
2. Information density over decoration.
3. Severity is the only color that earns attention.
4. Borders, not shadows, define structure.
5. One brand color (teal-blue); severity ramp is the second color system.
6. Numbers carry weight — large, tabular, never italic.
7. Indian-format everywhere — lakh/crore, IST, district before state.

---

## 5. Wireframes

### 5.1 Authority dashboard (the hero screen)

```
┌──────────────────────────────────────────────────────────────────────┐
│ ▌VYRON  Assam ▾      ● Live      ⚠ 3 alerts      🔔      👤         │  52px top bar
├─┬────────────────────────────────────────────────────────────────────┤
│🗺│                                                                    │
│ │                                                                    │
│⚠│            MAPBOX GL — INDIA, full bleed                          │
│ │            · hazard heatmap layer                                   │
│📡│            · sensor markers (clustered)                             │
│ │            · district polygons on hover                             │
│📊│                                                                    │
│ │                                                                    │
│⚙│  ┌──────────┬──────────┬──────────┬──────────┬──────────┐         │  KPI strip
│ │  │ Sensors  │ Alerts   │ Risk     │ Response │ Coverage │         │
│ │  │ 12,438   │ 7        │ Bihar    │ 4m 12s   │ 78%      │         │
│ │  │ ▲ 2%     │ ▼ 3      │ ↑ high   │ ↓ 18s    │ ▲ 4pp    │         │
│ │  └──────────┴──────────┴──────────┴──────────┴──────────┘         │
│ │  ┌────────────────────────────────┬─────────────────────────────┐  │
│ │  │ 24h risk score · 5 districts  │ Live alert feed              │  │
│ │  │ (multi-line, severity-banded) │ 18:42  CRITICAL · Assam     │  │
│ │  │                                │ 18:31  WARNING · Uttarakhand│  │
│ │  │                                │ 17:55  CAUTION · Delhi      │  │
│ │  └────────────────────────────────┴─────────────────────────────┘  │
└─┴────────────────────────────────────────────────────────────────────┘
   56px                                                  320px drawer (on alert click)
   icon rail
```

### 5.2 Marketing landing

```
┌──────────────────────────────────────────────────────────────────────┐
│ VYRON   About   Architecture   Impact   Docs             Sign in     │  64px nav
├──────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  India's environmental intelligence,                                 │  display 40/48
│  before disaster strikes.                                            │
│                                                                      │
│  Distributed AI sensor nodes detect floods, fires, pollution,        │  body 14/22
│  and landslides at the edge — and tell authorities what's coming.    │
│                                                                      │
│  [ See live demo ]   [ Read the brief ]                              │  primary, secondary
│                                                                      │
├──────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  ┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐         │
│  │ 12,438          │ │ 47 sec          │ │ 1,847           │         │
│  │ sensors online  │ │ avg detection   │ │ alerts this season│        │
│  └─────────────────┘ └─────────────────┘ └─────────────────┘         │
│                                                                      │
├──────────────────────────────────────────────────────────────────────┤
│  How it works                                                        │
│                                                                      │
│  Sensor  →  Edge AI  →  Local alert  →  Cloud forecast  →  Authority│  flow diagram,
│                                                                      │  no "01/02/03"
└──────────────────────────────────────────────────────────────────────┘
```

---

## 6. Per-persona screens

### Authority (DC / NDMA ops)
- Map full-bleed, KPI strip beneath, alert feed docked right.
- Filters: hazard type, time window, district, severity.
- Alert click opens drawer (timeline, recommended action, dispatch).
- Tablet/desktop; desktop primary.

### Field responder (NDRF / SDRF / fire crew)
- Map first, bottom sheet with nearby incidents.
- Touch targets ≥ 44px.
- Offline-tolerant: cached tiles + last-known data, banner "Last synced 2 min ago."
- Tablet-first.

### Analyst (IMD / ISRO / academic)
- Time-series explorer, full screen.
- Multi-district overlay; model performance panel.
- Export CSV / JSON / PNG. Forecast confidence bands visible.
- Desktop primary, keyboard-first.

### Citizen (PWA)
- Map zoomed to "my area" (geofence 5 km).
- Today's risk card (AQI, heat, nearest hazard).
- Bilingual (English + Hindi at launch).
- Notification opt-in. Mobile-primary.

---

## 7. Component rules

| Component | Spec |
|---|---|
| Card | `surface` bg, 1px `hairline`, 10px radius, no shadow, 16px padding. |
| Pill | 999 radius, `surface` bg, hairline border, 6/12 padding, optional severity dot. |
| KPI tile | Number first (`h2` 20/28 600, tabular). Label below (`caption`, muted). Delta last (12px, severity color). |
| Button primary | `ink` bg, white text, 8px radius, no arrow suffix. |
| Button secondary | `surface` bg, hairline border, `ink` text. |
| Table | 13px rows, hairline dividers, sticky header in `canvas` color. |
| Map legend | Bottom-left, surface bg + hairline, 12px label, severity swatches. |
| Focus ring | 2px `brand`, 2px offset. Visible on every interactive element. |
| Empty state | One sentence explaining what to do next. No illustration. |

---

## 8. Copy & voice

- **Sentence case. Always.**
- **Active voice.** "Publish alert," not "Alert will be published."
- Name things by what users understand: **Sensors**, not "IoT telemetry endpoints."
- Errors don't apologize: "Map tiles failed to load. Retry" — never "Oops! Something went wrong."
- Empty states invite action: "No alerts in your area today. Set a watch on a region to get notified."
- Vocabulary stays consistent across flows: the button that says **Publish** produces a toast that says **Published**.

---

## 9. What we deliberately rejected

| Default we saw and refused | Why |
|---|---|
| Warm cream `#F4F1EA` + terracotta `#D97757` background | The dominant AI-tell palette right now. Wrong for disaster ops. |
| Serif display + sans body | VYRON is a tool, not a publication. Inter throughout. |
| All-caps eyebrow labels above headings | Noise, not signal. |
| "01 / 02 / 03" process markers on every section | Process flow diagram instead — only used where content is genuinely sequential. |
| Identical soft drop shadows on every card | Reads as SaaS card kit. Flat surfaces with hairlines instead. |
| "→" appended to CTAs | Adds nothing. Strip it. |
| Monospace as decorative "data labels" | JetBrains Mono only for sensor IDs and timestamps. |
| Centered hero | Left-aligned. Body justifies ragged-right. |

---

## 10. Acceptance criteria

The developer can call this done when:

- One brand color is used for one job (CTAs, links, focus). Severity ramp carries everything else.
- Zero drop shadows in `/dashboard`.
- Hairlines visible at 100% and 200% zoom.
- Map LCP < 1.5 s on 4G.
- All numbers tabular; all timestamps in IST; all large counts in lakh/crore.
- Keyboard focus ring visible on every interactive element.
- `prefers-reduced-motion` honored.
- Light mode ships first; dark mode uses `canvas: #0c1116 / surface: #14181f` with the same severity ramp inverted for contrast.
- Breakpoints: 640 / 768 / 1024 / 1280.
- Severity ramp contrast ≥ WCAG AA on both `canvas` and `surface`.
- No emoji in chrome (use [Lucide](https://lucide.dev/) icons only).
