import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const LINKS = [
  { href: "/#problem", label: "Problem" },
  { href: "/#solution", label: "Solution" },
  { href: "/#architecture", label: "Architecture" },
  { href: "/#impact", label: "Impact" },
  { href: "/docs", label: "Docs" },
];

/**
 * MarketingNav — sticky top bar for the public site.
 * Logo left, primary links center, sign-in CTA right.
 */
export function MarketingNav() {
  return (
    <header className="sticky top-0 z-30 border-b border-hairline bg-canvas/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-content items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-card bg-ink text-caption font-semibold text-white">
            V
          </span>
          <span className="text-body font-semibold text-ink">VYRON</span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-small text-ink-muted transition-colors hover:text-ink"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link href="/signin">
            <Button variant="secondary" size="sm">
              Sign in
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button variant="primary" size="sm">
              Open dashboard
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
