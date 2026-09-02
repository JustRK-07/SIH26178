import * as React from "react";
import { IconRail } from "./icon-rail";
import { TopBar } from "./top-bar";

type DashboardShellProps = {
  region?: string;
  alerts?: number;
  children: React.ReactNode;
};

/**
 * DashboardShell — fixed icon rail on the left, top bar across, content fills the rest.
 * No internal scroll wrappers here — let pages compose their own scroll areas.
 */
export function DashboardShell({ region, alerts = 0, children }: DashboardShellProps) {
  return (
    <div className="flex h-screen overflow-hidden bg-canvas">
      <IconRail />
      <div className="flex min-w-0 flex-1 flex-col">
        <TopBar region={region} alerts={alerts} />
        <main className="min-h-0 flex-1 overflow-hidden">{children}</main>
      </div>
    </div>
  );
}
