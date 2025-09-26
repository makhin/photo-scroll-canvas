import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeTagVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-tag-bg text-tag-text hover:bg-tag-bg/80",
        secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive: "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground border-border",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeTagProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeTagVariants> {}

function BadgeTag({ className, variant, ...props }: BadgeTagProps) {
  return (
    <div className={cn(badgeTagVariants({ variant }), className)} {...props} />
  );
}

export { BadgeTag, badgeTagVariants };