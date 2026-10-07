import { ArrowRight, MapPin, Leaf } from "lucide-react";
import { images } from "@/data/site";
import { useParallax, useTilt } from "@/hooks/use-motion";
import { LinkBtn } from "./Btn";

export function Hero() {
  const tilt = useTilt<HTMLDivElement>(4);
  const par = useParallax<HTMLDivElement>(-0.08);
  const shape = useParallax<HTMLDivElement>(0.12);

  return (
    <section id="top" className="relative overflow-hidden pt-28 pb-16 md:pt-32 lg:min-h-[100svh] lg:pb-24">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 md:px-8 lg:grid-cols-[1.1fr_1fr] lg:gap-8">
        <div className="relative z-10">
          <p className="reveal eyebrow flex items-center gap-2 text-accent">
            <span className="h-2 w-2 rounded-full bg-accent animate-pulse-dot" /> Now serving · Manhattan
          </p>
          <h1 className="reveal mt-6 text-[clamp(3.2rem,9vw,7.6rem)] font-bold leading-[0.88]" style={{ ["--d" as string]: "100ms" }}>
            Good food.
            <br />
            <span className="font-serif font-normal italic tracking-normal text-accent">Made</span> to move.
          </h1>
          <p className="reveal mt-7 max-w-md text-lg leading-relaxed text-muted-foreground" style={{ ["--d" as string]: "220ms" }}>
            Bowls, salads and sandwiches built fresh every morning — ready before your next train.
          </p>
          <div className="reveal mt-9 flex flex-wrap gap-3" style={{ ["--d" as string]: "320ms" }}>
            <LinkBtn href="#menu" size="lg">
              Order Now <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </LinkBtn>
            <LinkBtn href="#menu" variant="outline" size="lg">Explore Menu</LinkBtn>
          </div>
          <dl className="reveal mt-14 flex gap-10 border-t pt-6" style={{ ["--d" as string]: "420ms" }}>
            {[["~6 min", "Avg. pickup"], ["40+", "Fresh inputs daily"], ["0", "Microwaves"]].map(([v, l]) => (
              <div key={l}>
                <dt className="font-display text-2xl font-semibold">{v}</dt>
                <dd className="mt-1 text-xs text-muted-foreground">{l}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative mx-auto w-full max-w-[520px] lg:max-w-none">
          <div ref={shape} className="absolute -right-10 top-6 h-[85%] w-[80%] rounded-[3rem] bg-olive-soft" aria-hidden />
          <div ref={shape} className="absolute -left-6 bottom-0 h-40 w-40 rounded-full bg-sand" aria-hidden />
          <div ref={par} className="relative">
            <div ref={tilt} className="relative transition-transform duration-500 ease-out will-change-transform" style={{ transformStyle: "preserve-3d" }}>
              <div className="overflow-hidden rounded-[2.5rem] shadow-lift">
                <img
                  src={images.hero}
                  alt="Signature chicken bowl with rice, corn, red cabbage and soft egg, top-down"
                  className="aspect-[4/5] w-full object-cover"
                  fetchPriority="high"
                />
              </div>
              <div className="animate-float absolute -left-4 top-10 rounded-2xl bg-card/95 px-4 py-3 shadow-lift backdrop-blur md:-left-12" style={{ transform: "translateZ(40px)" }}>
                <p className="eyebrow text-muted-foreground">Today's pick</p>
                <p className="mt-1 font-display text-base font-semibold">Signature Chicken Bowl</p>
                <p className="text-sm text-accent">$16 · 640 cal</p>
              </div>
              <div className="animate-float-slow absolute -right-3 bottom-16 flex items-center gap-2 rounded-full bg-ink px-4 py-2.5 text-ink-foreground shadow-lift md:-right-8" style={{ transform: "translateZ(60px)" }}>
                <Leaf className="h-4 w-4 text-saffron" strokeWidth={1.8} />
                <span className="eyebrow">Freshly prepared</span>
              </div>
              <div className="absolute bottom-5 left-5 flex items-center gap-1.5 rounded-full bg-background/85 px-3 py-1.5 text-xs font-medium backdrop-blur">
                <MapPin className="h-3.5 w-3.5" strokeWidth={1.8} /> NYC
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-16 overflow-hidden border-y py-4 lg:absolute lg:inset-x-0 lg:bottom-0 lg:mt-0">
        <div className="animate-marquee flex w-max gap-10 whitespace-nowrap font-display text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
          {Array.from({ length: 2 }).map((_, k) =>
            ["Made this morning", "Grain bowls", "Cold brew", "Market salads", "Pressed sandwiches", "Built for the commute", "Pickup or delivery"].map((t) => (
              <span key={k + t} className="flex items-center gap-10">{t}<span className="text-accent">✦</span></span>
            )),
          )}
        </div>
      </div>
    </section>
  );
}
