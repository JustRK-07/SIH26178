"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Activity,
  AlertTriangle,
  Cpu,
  LayoutDashboard,
  Map,
  Settings,
  Users,
} from "lucide-react";

type IconRailItem = {
  href: string;
  label: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
};

const ITEMS: IconRailItem[] = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/map", label: "Map", icon: Map },
  { href: "/dashboard/alerts", label: "Alerts", icon: AlertTriangle },
  { href: "/dashboard/sensors", label: "Sensors", icon: Cpu },
  { href: "/dashboard/analytics", label: "Analytics", icon: Activity },
  { href: "/dashboard/responder", label: "Responder", icon: Users },
  { href: "/dashboard/admin", label: "Admin", icon: Settings },
];

/**
 * IconRail — fixed left rail, 56px wide, icon-only with hover tooltips.
 * The single anchor of the dashboard chrome.
 */
export function IconRail() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Primary"
      className="flex h-screen w-rail shrink-0 flex-col items-center border-r border-hairline bg-surface py-3"
    >
      <Link
        href="/"
        aria-label="VYRON home"
        className="mb-3 flex h-9 w-9 items-center justify-center rounded-card bg-ink text-caption font-semibold text-white"
      >
        V
      </Link>

      <div className="flex flex-1 flex-col gap-1">
        {ITEMS.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || (href !== "/dashboard" && pathname?.startsWith(href));
          return (
            <Link
              key={href}
              href={href}
              aria-label={label}
              aria-current={active ? "page" : undefined}
              className={cn(
                "group relative flex h-10 w-10 items-center justify-center rounded-button transition-colors",
                active
                  ? "bg-canvas text-ink"
                  : "text-ink-muted hover:bg-canvas hover:text-ink",
              )}
            >
              <Icon size={18} />
              <span
                role="tooltip"
                className="pointer-events-none absolute left-full top-1/2 ml-2 -translate-y-1/2 whitespace-nowrap rounded-button border border-hairline bg-surface px-2 py-1 text-caption text-ink opacity-0 shadow-sm transition-opacity group-hover:opacity-100"
              >
                {label}
              </span>
            </Link>
          );
        })}
      </div>

      <div
        aria-hidden
        className="mt-2 h-9 w-9 rounded-card bg-canvas text-center text-caption leading-9 text-ink-muted"
      >
        IM
      </div>
    </nav>
  );
}
