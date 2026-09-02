/**
 * Format helpers — Indian number system, IST timestamps, duration.
 * Plain functions, no deps; date-fns is used where richer formatting is needed.
 */

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Indian number system — groups by lakh and crore. */
export function formatIndianNumber(n: number, fractionDigits = 0): string {
  if (Number.isNaN(n)) return "—";
  const abs = Math.abs(n);
  const sign = n < 0 ? "-" : "";
  if (abs >= 1e7) {
    return `${sign}${(abs / 1e7).toFixed(fractionDigits)} cr`;
  }
  if (abs >= 1e5) {
    return `${sign}${(abs / 1e5).toFixed(fractionDigits)} lakh`;
  }
  return `${sign}${abs.toLocaleString("en-IN", {
    maximumFractionDigits: fractionDigits,
  })}`;
}

/** ISO timestamp → "18:42 IST" (or full date if older than 24h). */
export function formatIST(iso: string, now: Date = new Date()): string {
  const d = new Date(iso);
  const sameDay =
    d.getUTCFullYear() === now.getUTCFullYear() &&
    d.getUTCMonth() === now.getUTCMonth() &&
    d.getUTCDate() === now.getUTCDate();
  const time = d.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "Asia/Kolkata",
  });
  if (sameDay) return `${time} IST`;
  const date = d.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    timeZone: "Asia/Kolkata",
  });
  return `${date} · ${time} IST`;
}

/** "2 min ago" / "47 sec ago" style. */
export function formatRelative(iso: string, now: Date = new Date()): string {
  const diff = (now.getTime() - new Date(iso).getTime()) / 1000;
  if (diff < 60) return `${Math.max(0, Math.floor(diff))} sec ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} hr ago`;
  return `${Math.floor(diff / 86400)} day ago`;
}

/** mm:ss duration, e.g. "4m 12s". */
export function formatDuration(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) return "—";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  if (m === 0) return `${s}s`;
  return `${m}m ${s.toString().padStart(2, "0")}s`;
}

/** "+2%" / "-18s" delta helpers — string in, formatted out. */
export function formatDelta(value: number, unit: "pct" | "abs" | "s" = "pct"): string {
  if (!Number.isFinite(value)) return "—";
  const sign = value > 0 ? "+" : value < 0 ? "" : "";
  if (unit === "pct") return `${sign}${value}%`;
  if (unit === "s") return `${sign}${Math.round(value)}s`;
  return `${sign}${value}`;
}
