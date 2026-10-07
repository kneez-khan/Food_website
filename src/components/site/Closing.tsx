import { ArrowRight, ArrowUpRight, Instagram, Mail } from "lucide-react";
import { brand, images } from "@/data/site";
import { useParallax } from "@/hooks/use-motion";
import { LinkBtn } from "./Btn";

export function Location() {
  const maps = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(brand.mapsQuery)}`;
  return (
    <section id="location" className="mx-auto max-w-7xl scroll-mt-20 px-5 py-24 md:px-8 md:py-36">
      <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
        <div>
          <p className="reveal eyebrow text-accent">07 — Find us</p>
          <h2 className="reveal mt-4 text-5xl font-bold leading-[0.95] md:text-6xl">Downtown,<br />and on your way.</h2>
          <div className="reveal mt-10 space-y-6 border-t pt-6">
            <div>
              <p className="eyebrow text-muted-foreground">Address</p>
              <p className="mt-2 text-lg">{brand.address}</p>
            </div>
            <div>
              <p className="eyebrow text-muted-foreground">Hours</p>
              {brand.hours.map((h) => (
                <p key={h.d} className="mt-2 flex justify-between text-lg"><span>{h.d}</span><span className="text-muted-foreground">{h.h}</span></p>
              ))}
            </div>
          </div>
          <div className="reveal mt-10 flex flex-wrap gap-3">
            <LinkBtn href={maps} target="_blank" rel="noreferrer" variant="outline">Get Directions <ArrowUpRight className="h-4 w-4" /></LinkBtn>
            <LinkBtn href="#menu">Order Pickup</LinkBtn>
          </div>
        </div>
        <div className="reveal relative min-h-[380px] overflow-hidden rounded-[2.5rem] bg-ink">
          <iframe
            title="Map of Manhattan"
            src={`https://www.google.com/maps?q=${encodeURIComponent(brand.mapsQuery)}&z=13&output=embed`}
            className="absolute inset-0 h-full w-full grayscale contrast-[1.1] opacity-80"
            loading="lazy"
          />
          <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <span className="block h-5 w-5 rounded-full bg-accent ring-4 ring-background animate-pulse-dot" />
          </div>
          <div className="absolute bottom-5 left-5 rounded-2xl bg-background/90 px-4 py-3 backdrop-blur">
            <p className="eyebrow text-muted-foreground">{brand.city}</p>
            <p className="font-display font-semibold">{brand.name}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function FinalCta() {
  const p = useParallax<HTMLDivElement>(-0.1);
  return (
    <section className="px-3 md:px-6">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] bg-ink text-ink-foreground">
        <div ref={p} className="absolute inset-[-10%]">
          <img src={images.cta} alt="" loading="lazy" className="h-full w-full object-cover opacity-55" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/70 to-transparent" />
        <div className="relative px-6 py-24 md:px-16 md:py-36">
          <p className="reveal eyebrow text-saffron">Hungry yet?</p>
          <h2 className="reveal mt-5 max-w-3xl text-5xl font-bold leading-[0.92] md:text-8xl">
            Your next favorite meal <span className="font-serif font-normal italic tracking-normal">is waiting.</span>
          </h2>
          <p className="reveal mt-6 max-w-md text-lg text-ink-muted">Fresh, satisfying food made for the pace of New York.</p>
          <div className="reveal mt-10 flex flex-wrap gap-3">
            <LinkBtn href="#menu" variant="light" size="lg">Order Now <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></LinkBtn>
            <LinkBtn href="#menu" variant="ghostLight" size="lg">View Menu</LinkBtn>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  const cols = [
    { h: "Explore", l: [["Menu", "#menu"], ["About", "#about"], ["Our Story", "#story"], ["Location", "#location"]] },
    { h: "Menu", l: [["Bowls", "#menu"], ["Salads", "#menu"], ["Sandwiches", "#menu"], ["Drinks", "#menu"]] },
  ];
  return (
    <footer className="mx-auto max-w-7xl px-5 pb-28 pt-24 md:px-8 md:pb-12">
      <div className="grid gap-12 md:grid-cols-[1.5fr_1fr_1fr_1.2fr]">
        <div>
          <p className="font-display text-3xl font-bold">{brand.name}</p>
          <p className="mt-3 max-w-xs text-sm text-muted-foreground">Fresh food for fast days. {brand.city}.</p>
          <LinkBtn href="#menu" size="sm" className="mt-6">Order Now</LinkBtn>
        </div>
        {cols.map((c) => (
          <div key={c.h}>
            <p className="eyebrow text-muted-foreground">{c.h}</p>
            <ul className="mt-4 space-y-2">
              {c.l.map(([t, h]) => <li key={t}><a href={h} className="text-sm hover:text-accent transition-colors">{t}</a></li>)}
            </ul>
          </div>
        ))}
        <div>
          <p className="eyebrow text-muted-foreground">Contact</p>
          <p className="mt-4 text-sm">{brand.address}</p>
          <a href={`mailto:${brand.email}`} className="mt-2 block text-sm hover:text-accent">{brand.email}</a>
          <div className="mt-5 flex gap-2">
            <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram" className="grid h-10 w-10 place-items-center rounded-full border transition-colors hover:bg-foreground hover:text-background"><Instagram className="h-4 w-4" strokeWidth={1.6} /></a>
            <a href={`mailto:${brand.email}`} aria-label="Email" className="grid h-10 w-10 place-items-center rounded-full border transition-colors hover:bg-foreground hover:text-background"><Mail className="h-4 w-4" strokeWidth={1.6} /></a>
          </div>
        </div>
      </div>
      <div className="mt-16 flex flex-wrap justify-between gap-4 border-t pt-6 text-xs text-muted-foreground">
        <p>© {new Date().getFullYear()} {brand.name}. All rights reserved.</p>
        <p>Made in New York.</p>
      </div>
    </footer>
  );
}
