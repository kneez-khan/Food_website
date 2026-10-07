import { cva, type VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes, AnchorHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export const btn = cva(
  "group inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-[0.14em] uppercase transition-all duration-500 ease-premium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 whitespace-nowrap",
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground hover:bg-accent hover:-translate-y-0.5 shadow-soft hover:shadow-lift",
        olive: "bg-accent text-accent-foreground hover:bg-primary hover:-translate-y-0.5 shadow-soft",
        outline: "border border-foreground/25 text-foreground hover:border-foreground hover:bg-foreground hover:text-background",
        light: "bg-ink-foreground text-ink hover:bg-saffron hover:-translate-y-0.5",
        ghostLight: "border border-ink-foreground/30 text-ink-foreground hover:bg-ink-foreground hover:text-ink",
        chip: "bg-foreground/5 text-foreground hover:bg-foreground hover:text-background",
      },
      size: { sm: "h-9 px-4 text-[0.68rem]", md: "h-12 px-6 text-[0.72rem]", lg: "h-14 px-8 text-xs" },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

type V = VariantProps<typeof btn>;
export function Button({ className, variant, size, ...p }: ButtonHTMLAttributes<HTMLButtonElement> & V) {
  return <button className={cn(btn({ variant, size }), className)} {...p} />;
}
export function LinkBtn({ className, variant, size, ...p }: AnchorHTMLAttributes<HTMLAnchorElement> & V) {
  return <a className={cn(btn({ variant, size }), className)} {...p} />;
}
