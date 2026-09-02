"use client";

import * as React from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

type DrawerProps = {
  open: boolean;
  onClose: () => void;
  title?: string;
  side?: "right" | "bottom";
  width?: number;
  children: React.ReactNode;
};

/**
 * Drawer — right-side slide-in panel for alert detail.
 * No shadow; depth from the hairline border.
 */
export function Drawer({
  open,
  onClose,
  title,
  side = "right",
  width = 360,
  children,
}: DrawerProps) {
  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title}
      className="fixed inset-0 z-50 flex"
    >
      <button
        aria-label="Close drawer"
        onClick={onClose}
        className="flex-1 bg-ink/10 backdrop-blur-[1px]"
      />
      <div
        className={cn(
          "vyron-drawer-in border-l border-hairline bg-surface",
          side === "right" ? "h-full" : "w-full",
        )}
        style={side === "right" ? { width } : undefined}
      >
        {title && (
          <div className="flex items-center justify-between border-b border-hairline px-4 py-3">
            <h2 className="text-h2 text-ink">{title}</h2>
            <button
              onClick={onClose}
              aria-label="Close"
              className="rounded-button p-1.5 text-ink-muted hover:bg-canvas hover:text-ink"
            >
              <X size={16} />
            </button>
          </div>
        )}
        <div className="overflow-y-auto p-4" style={{ maxHeight: "calc(100vh - 57px)" }}>
          {children}
        </div>
      </div>
    </div>
  );
}
