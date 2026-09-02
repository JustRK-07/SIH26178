"use client";

import * as React from "react";
import Link from "next/link";
import { Bell, ChevronLeft, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

type CitizenShellProps = {
  areaName?: string;
  children: React.ReactNode;
};

/**
 * CitizenShell — mobile-first chrome. Top app bar, bottom action dock.
 * Pull-downs replace side rails because there's no room.
 */
export function CitizenShell({ areaName = "Your area · 5 km", children }: CitizenShellProps) {
  return (
    <div className="flex h-screen flex-col bg-canvas">
      <header className="flex h-14 shrink-0 items-center justify-between border-b border-hairline bg-surface px-4">
        <div className="flex items-center gap-2">
          <Link href="/" aria-label="Back home">
            <ChevronLeft size={18} className="text-ink-muted" />
          </Link>
          <span className="flex h-6 w-6 items-center justify-center rounded-card bg-ink text-[10px] font-semibold text-white">
            V
          </span>
        </div>
        <div className="flex items-center gap-1 text-caption text-ink">
          <MapPin size={12} className="text-ink-muted" />
          {areaName}
        </div>
        <button
          type="button"
          aria-label="Notifications"
          className="flex h-8 w-8 items-center justify-center rounded-button text-ink-muted hover:bg-canvas"
        >
          <Bell size={16} />
        </button>
      </header>

      <main className="min-h-0 flex-1 overflow-y-auto">{children}</main>

      <footer className="flex h-16 shrink-0 items-center justify-around border-t border-hairline bg-surface">
        <Link href="/citizen" className="flex flex-col items-center gap-0.5 text-caption text-ink">
          <span className="h-1 w-6 rounded-pill bg-brand" />
          Today
        </Link>
        <Link
          href="/citizen/map"
          className="flex flex-col items-center gap-0.5 text-caption text-ink-muted"
        >
          <span className="h-1 w-6 rounded-pill bg-transparent" />
          Map
        </Link>
        <Link
          href="/citizen/alerts"
          className="flex flex-col items-center gap-0.5 text-caption text-ink-muted"
        >
          <span className="h-1 w-6 rounded-pill bg-transparent" />
          Alerts
        </Link>
        <Link
          href="/citizen/settings"
          className="flex flex-col items-center gap-0.5 text-caption text-ink-muted"
        >
          <span className="h-1 w-6 rounded-pill bg-transparent" />
          Settings
        </Link>
      </footer>
    </div>
  );
}

export function CitizenCTA() {
  return (
    <div className="px-4 pb-4">
      <Button variant="primary" size="lg" className="w-full">
        Notify me when risk changes
      </Button>
    </div>
  );
}
