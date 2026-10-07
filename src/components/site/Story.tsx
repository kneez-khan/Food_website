import { Clock, Sprout, ChefHat, MapPinned } from "lucide-react";
import { images } from "@/data/site";
import { useParallax } from "@/hooks/use-motion";

const benefits = [
  { icon: Sprout, t: "Fresh ingredients", d: "Produce in every morning. What we don't use, we don't sell tomorrow." },
  { icon: Clock, t: "Fast & convenient", d: "Order ahead, skip the line. Most pickups ready in six minutes." },
  { icon: ChefHat, t: "Made to order", d: "Prepped at dawn, assembled when you ask. Never sitting under a lamp." },
  { icon: MapPinned, t: "City-friendly", d: "Packaging that survives the subway, the desk and the park bench." },
];

export function Story() {
  const p = useParallax<HTMLDivElement>(-0.06);
  return (
    <>
      <section id="story" className="mx-auto grid max-w-7xl items-center gap-14 px-5 py-24 md:px-8 md:py-36 lg:grid-cols-2 lg:gap-20">
        <div className="relative order-2 lg:order-1">
          <div className="overflow-hidden rounded-[2.5rem]">
            <div ref={p} className="scale-110">
              <img src={images.story} alt="Our team preparing food together in the kitchen" loading="lazy" className="aspect-[4/5] w-full object-cover md:aspect-[5/6]" />
            </div>
          </div>
          <div className="reveal absolute -bottom-8 right-4 max-w-[15rem] rounded-3xl bg-accent p-6 text-accent-foreground shadow-lift md:-right-8">
            <p className="font-serif text-3xl italic leading-tight">"Fast shouldn't mean forgettable."</p>
            <p className="eyebrow mt-4 opacity-80">— The kitchen</p>
          </div>
        </div>
        <div className="order-1 lg:order-2">
          <p className="reveal eyebrow text-accent">03 — Our story</p>
          <h2 className="reveal mt-4 text-5xl font-bold leading-[0.95] md:text-6xl">
            Made for the way <span className="font-serif font-normal italic tracking-normal">NYC</span> eats.
          </h2>
          <div className="mt-8 space-y-5 text-lg leading-relaxed text-muted-foreground">
            <p className="reveal">You eat between meetings, on the walk, at your desk. We built a kitchen for that — real food, cooked properly, packed to travel.</p>
            <p className="reveal">Short menu. Good produce. Grains cooked in small batches, sauces made in-house, nothing frozen that should be fresh.</p>
          </div>
          <ul className="reveal mt-10 grid grid-cols-3 gap-6 border-t pt-6">
            {[["Local", "Greens"], ["Daily", "Bread"], ["In-house", "Sauces"]].map(([a, b]) => (
              <li key={b}><p className="font-display text-2xl font-semibold">{a}</p><p className="text-sm text-muted-foreground">{b}</p></li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-sand/60 py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 className="reveal max-w-xl text-4xl font-bold leading-[1] md:text-5xl">Why people keep coming back.</h2>
            <p className="reveal eyebrow text-muted-foreground">04 — The details</p>
          </div>
          <div className="mt-14 grid gap-px overflow-hidden rounded-3xl bg-foreground/10 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((b, i) => (
              <div key={b.t} className="reveal group bg-background p-8 transition-colors duration-500 hover:bg-card" style={{ ["--d" as string]: `${i * 90}ms` }}>
                <b.icon className="h-6 w-6 text-accent transition-transform duration-500 ease-premium group-hover:-translate-y-1" strokeWidth={1.4} />
                <p className="mt-10 font-display text-sm text-muted-foreground">0{i + 1}</p>
                <h3 className="mt-1 text-xl font-semibold uppercase tracking-tight">{b.t}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{b.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
