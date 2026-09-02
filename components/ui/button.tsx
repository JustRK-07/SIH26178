"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none",
  {
    variants: {
      variant: {
        primary:
          "bg-ink text-white hover:bg-ink/90 active:bg-ink/80",
        secondary:
          "bg-surface text-ink border border-hairline hover:bg-canvas active:bg-hairline",
        ghost:
          "bg-transparent text-ink hover:bg-canvas active:bg-hairline",
        brand:
          "bg-brand text-white hover:bg-brand-hover active:bg-brand-hover",
        danger:
          "bg-sev-critical text-white hover:bg-sev-critical/90",
      },
      size: {
        sm: "h-8 px-3 text-small rounded-button",
        md: "h-10 px-4 text-body rounded-button",
        lg: "h-12 px-5 text-body rounded-button",
      },
    },
    defaultVariants: {
      variant: "secondary",
      size: "md",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  function Button({ className, variant, size, ...props }, ref) {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      />
    );
  },
);
