import Link from "next/link";
import { Button } from "@/components/ui/button";

export function CTAStrip() {
  return (
    <section id="impact" className="bg-ink text-white">
      <div className="mx-auto flex max-w-content flex-col items-start gap-6 px-6 py-16 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-h1 text-white">From reactive to proactive.</h2>
          <p className="mt-2 max-w-xl text-body text-white/70">
            Open the dashboard. The map is live. The alerts are real Indian hazards, scored by an
            edge model running on simulated sensor data.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link href="/dashboard">
            <Button variant="brand" size="lg">
              Open dashboard
            </Button>
          </Link>
          <Link href="/signin">
            <Button variant="secondary" size="lg" className="bg-white/10 text-white border-white/20 hover:bg-white/20">
              Pick a role
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
