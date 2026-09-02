import Link from "next/link";
import { Activity, MapPin, Microscope, Shield, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardBody } from "@/components/ui/card";

const ROLES = [
  {
    href: "/dashboard",
    label: "Authority",
    desc: "District collector, NDMA, state disaster management.",
    icon: Shield,
  },
  {
    href: "/dashboard/responder",
    label: "Field responder",
    desc: "NDRF, SDRF, fire, medical. Tablet-first.",
    icon: Users,
  },
  {
    href: "/dashboard/analytics",
    label: "Analyst",
    desc: "IMD, ISRO, academic research. Time-series explorer.",
    icon: Microscope,
  },
  {
    href: "/citizen",
    label: "Citizen",
    desc: "Public PWA. Today&apos;s risk, alerts, voice briefing.",
    icon: MapPin,
  },
  {
    href: "/dashboard/admin",
    label: "System admin",
    desc: "Sensors, OTA firmware, alert rules, users.",
    icon: Activity,
  },
];

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-canvas">
      <div className="mx-auto max-w-3xl px-6 py-16">
        <Link href="/" className="inline-flex items-center gap-2 text-small text-ink-muted hover:text-ink">
          ← Back to home
        </Link>
        <h1 className="mt-6 text-display text-ink">Pick a role</h1>
        <p className="mt-2 max-w-xl text-body text-ink-muted">
          VYRON routes the same data to four audiences with four vocabularies. Choose one to enter
          the demo.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-3 md:grid-cols-2">
          {ROLES.map((r) => (
            <Link key={r.href} href={r.href}>
              <Card className="h-full transition-colors hover:bg-canvas/60">
                <CardBody className="flex items-start gap-3 p-5">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-card bg-canvas text-ink">
                    <r.icon size={16} />
                  </span>
                  <div className="min-w-0">
                    <p className="text-h2 text-ink">{r.label}</p>
                    <p className="mt-1 text-small text-ink-muted">{r.desc}</p>
                  </div>
                </CardBody>
              </Card>
            </Link>
          ))}
        </div>

        <p className="mt-10 text-caption text-ink-muted">
          For the hackathon demo, sign-in is role-only. Production deployment uses OAuth with
          NIC/NDMA SSO and Aadhaar-linked citizen accounts.
        </p>
      </div>
    </div>
  );
}
