import { useEffect, useState } from "react";
import { Menu as MenuIcon, X, ShoppingBag } from "lucide-react";
import { brand } from "@/data/site";
import { useCart } from "@/lib/cart";
import { useScrolled } from "@/hooks/use-motion";
import { Button } from "./Btn";
import { cn } from "@/lib/utils";

const links = [
  { href: "#menu", label: "Menu" },
  { href: "#about", label: "About" },
  { href: "#story", label: "Our Story" },
  { href: "#location", label: "Location" },
];

export function Nav() {
  const scrolled = useScrolled();
  const [open, setOpen] = useState(false);
  const { count, setOpen: openCart } = useCart();

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 md:px-6">
      <nav
        className={cn(
          "mx-auto flex max-w-7xl items-center justify-between rounded-full px-4 transition-all duration-700 ease-premium md:px-6",
          scrolled ? "h-14 bg-background/80 shadow-soft backdrop-blur-xl" : "h-16 bg-transparent",
        )}
      >
        <a href="#top" className="flex items-center gap-2.5">
          <span className="grid h-8 w-8 place-items-center rounded-full bg-primary font-display text-[0.7rem] font-bold text-primary-foreground">
            {brand.short}
          </span>
          <span className="font-display text-lg font-semibold tracking-tight">{brand.name}</span>
        </a>
        <ul className="hidden items-center gap-8 lg:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="eyebrow relative text-foreground/70 transition-colors hover:text-foreground after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-foreground after:transition-transform after:duration-500 hover:after:scale-x-100">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2">
          <button
            onClick={() => openCart(true)}
            aria-label="Open order"
            className="relative grid h-10 w-10 place-items-center rounded-full transition-colors hover:bg-foreground/5"
          >
            <ShoppingBag className="h-[18px] w-[18px]" strokeWidth={1.6} />
            {count > 0 && (
              <span className="absolute -right-0.5 -top-0.5 grid h-5 min-w-5 place-items-center rounded-full bg-accent px-1 text-[0.65rem] font-bold text-accent-foreground">
                {count}
              </span>
            )}
          </button>
          <Button size="sm" className="hidden sm:inline-flex" onClick={() => document.getElementById("menu")?.scrollIntoView()}>
            Order Now
          </Button>
          <button onClick={() => setOpen(true)} aria-label="Open menu" className="grid h-10 w-10 place-items-center rounded-full lg:hidden hover:bg-foreground/5">
            <MenuIcon className="h-5 w-5" strokeWidth={1.6} />
          </button>
        </div>
      </nav>

      {/* Mobile sheet */}
      <div
        className={cn(
          "fixed inset-0 z-50 flex flex-col bg-ink p-6 text-ink-foreground transition-all duration-700 ease-premium lg:hidden",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      >
        <div className="flex items-center justify-between">
          <span className="font-display text-lg font-semibold">{brand.name}</span>
          <button onClick={() => setOpen(false)} aria-label="Close menu" className="grid h-10 w-10 place-items-center rounded-full border border-ink-foreground/20">
            <X className="h-5 w-5" />
          </button>
        </div>
        <ul className="mt-16 space-y-2">
          {links.map((l, i) => (
            <li
              key={l.href}
              className={cn("transition-all duration-700 ease-premium", open ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0")}
              style={{ transitionDelay: open ? `${120 + i * 70}ms` : "0ms" }}
            >
              <a href={l.href} onClick={() => setOpen(false)} className="block py-2 font-display text-5xl font-semibold tracking-tight">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="mt-auto">
          <Button variant="light" size="lg" className="w-full" onClick={() => { setOpen(false); document.getElementById("menu")?.scrollIntoView(); }}>
            Order Now
          </Button>
        </div>
      </div>
    </header>
  );
}
