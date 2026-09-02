import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Table — 13px rows, hairline dividers, sticky header in canvas color.
 * No zebra striping. Hover row uses surface-canvas tint.
 */

export const Table = React.forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement>
>(function Table({ className, ...props }, ref) {
  return (
    <table
      ref={ref}
      className={cn("w-full border-collapse text-small", className)}
      {...props}
    />
  );
});

export const THead = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(function THead({ className, ...props }, ref) {
  return (
    <thead
      ref={ref}
      className={cn("sticky top-0 bg-canvas text-caption text-ink-muted", className)}
      {...props}
    />
  );
});

export const TR = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>(function TR({ className, ...props }, ref) {
  return (
    <tr
      ref={ref}
      className={cn(
        "border-b border-hairline last:border-b-0 hover:bg-canvas/60 transition-colors",
        className,
      )}
      {...props}
    />
  );
});

export const TH = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>(function TH({ className, ...props }, ref) {
  return (
    <th
      ref={ref}
      className={cn("px-3 py-2 text-left font-medium text-ink-muted", className)}
      {...props}
    />
  );
});

export const TD = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(function TD({ className, ...props }, ref) {
  return (
    <td ref={ref} className={cn("px-3 py-2 text-ink", className)} {...props} />
  );
});
