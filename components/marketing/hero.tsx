import Link from "next/link";
import { Button } from "@/components/ui/button";

/**
 * Hero — left-aligned display, body support, two CTAs.
 * No arrow suffix on buttons. The animated mesh SVG illustrates the
 * sensor network without resorting to emoji or stock illustration.
 */
export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-hairline bg-canvas">
      <div className="mx-auto grid max-w-content items-center gap-12 px-6 py-20 md:grid-cols-[1.1fr_1fr] md:py-28">
        <div className="flex flex-col gap-6">
          <p className="text-caption font-medium uppercase tracking-wide text-ink-muted">
            Smart India Hackathon · 26178
          </p>
          <h1 className="text-display text-ink">
            India&apos;s environmental intelligence, before disaster strikes.
          </h1>
          <p className="max-w-xl text-body text-ink-muted">
            Distributed AI sensor nodes detect floods, fires, pollution, and landslides at the
            edge — and tell authorities what&apos;s coming in seconds, not hours.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <Link href="/dashboard">
              <Button variant="primary" size="lg">
                See live demo
              </Button>
            </Link>
            <Link href="/docs">
              <Button variant="secondary" size="lg">
                Read the brief
              </Button>
            </Link>
          </div>
        </div>

        <HeroMesh />
      </div>
    </section>
  );
}

function HeroMesh() {
  // 30 sensor dots, connecting lines, animated pulse from a "central hub".
  // Pure SVG, no JS animation — keeps LCP fast.
  return (
    <div className="relative aspect-square w-full">
      <svg
        viewBox="0 0 400 400"
        className="h-full w-full"
        aria-hidden
      >
        <defs>
          <radialGradient id="hub" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#0b5cff" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#0b5cff" stopOpacity="0" />
          </radialGradient>
          <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#e5e7eb" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="400" height="400" fill="url(#grid)" />

        {/* Concentric pulse rings */}
        <circle cx="200" cy="200" r="60" fill="url(#hub)" />
        <circle cx="200" cy="200" r="100" fill="none" stroke="#0b5cff" strokeOpacity="0.18" strokeWidth="1" />
        <circle cx="200" cy="200" r="140" fill="none" stroke="#0b5cff" strokeOpacity="0.12" strokeWidth="1" />

        {/* Sensor dots */}
        {DOTS.map((d, i) => (
          <g key={i}>
            <line
              x1="200"
              y1="200"
              x2={d.x}
              y2={d.y}
              stroke="#0b5cff"
              strokeOpacity="0.18"
              strokeWidth="0.75"
            />
            <circle cx={d.x} cy={d.y} r="3" fill={d.color} />
            <circle cx={d.x} cy={d.y} r="6" fill={d.color} fillOpacity="0.18" />
          </g>
        ))}

        {/* Central hub */}
        <circle cx="200" cy="200" r="6" fill="#0c1116" />
        <circle cx="200" cy="200" r="3" fill="#ffffff" />
      </svg>
    </div>
  );
}

const DOTS = [
  { x: 120, y: 80, color: "#3b82f6" },
  { x: 280, y: 70, color: "#0ea5e9" },
  { x: 350, y: 140, color: "#10b981" },
  { x: 90, y: 160, color: "#f59e0b" },
  { x: 200, y: 60, color: "#3b82f6" },
  { x: 60, y: 250, color: "#0ea5e9" },
  { x: 320, y: 240, color: "#f97316" },
  { x: 360, y: 320, color: "#f59e0b" },
  { x: 230, y: 350, color: "#dc2626" },
  { x: 130, y: 340, color: "#3b82f6" },
  { x: 180, y: 280, color: "#10b981" },
  { x: 250, y: 150, color: "#f97316" },
  { x: 80, y: 110, color: "#0ea5e9" },
  { x: 310, y: 100, color: "#dc2626" },
  { x: 270, y: 310, color: "#3b82f6" },
  { x: 150, y: 200, color: "#10b981" },
  { x: 70, y: 320, color: "#0ea5e9" },
  { x: 340, y: 200, color: "#f59e0b" },
  { x: 220, y: 100, color: "#3b82f6" },
  { x: 170, y: 130, color: "#dc2626" },
];
