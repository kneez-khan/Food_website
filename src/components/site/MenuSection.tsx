import { useMemo, useState } from "react";
import { Plus } from "lucide-react";
import { categories, menu } from "@/data/site";
import { useCart } from "@/lib/cart";
import { cn } from "@/lib/utils";

export function MenuSection() {
  const [cat, setCat] = useState<(typeof categories)[number]>("All");
  const items = useMemo(() => (cat === "All" ? menu : menu.filter((m) => m.category === cat)), [cat]);
  const { add } = useCart();

  return (
    <section id="menu" className="scroll-mt-20 bg-ink py-24 text-ink-foreground md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="reveal eyebrow text-saffron">02 — The menu</p>
            <h2 className="reveal mt-4 text-5xl font-bold leading-[0.95] md:text-7xl">Order something good.</h2>
          </div>
          <p className="reveal max-w-xs text-ink-muted">Everything made in-house, every day. Pickup in Manhattan or delivered to your desk.</p>
        </div>

        <div className="reveal sticky top-[4.5rem] z-20 -mx-5 mt-12 overflow-x-auto bg-ink/90 px-5 py-3 backdrop-blur-md md:mx-0 md:rounded-full md:px-2">
          <div className="flex w-max gap-1.5" role="tablist">
            {categories.map((c) => (
              <button
                key={c}
                role="tab"
                aria-selected={cat === c}
                onClick={() => setCat(c)}
                className={cn(
                  "eyebrow h-10 rounded-full px-4 transition-all duration-500 ease-premium",
                  cat === c ? "bg-ink-foreground text-ink" : "text-ink-muted hover:bg-ink-foreground/10 hover:text-ink-foreground",
                )}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div key={cat} className="mt-10 grid gap-4 md:grid-cols-2">
          {items.map((it, i) => (
            <article
              key={it.id}
              className="group flex overflow-hidden rounded-3xl bg-ink-foreground/[0.04] ring-1 ring-ink-foreground/10 transition-all duration-500 ease-premium hover:bg-ink-foreground/[0.07] hover:ring-ink-foreground/25 animate-in fade-in slide-in-from-bottom-4 fill-mode-both"
              style={{ animationDelay: `${Math.min(i, 8) * 50}ms`, animationDuration: "600ms" }}
            >
              <div className="relative w-[40%] shrink-0 overflow-hidden">
                <img src={it.img} alt={it.name} loading="lazy" className="h-full min-h-[200px] w-full object-cover transition-transform duration-[1.2s] ease-premium group-hover:scale-105 md:min-h-[240px]" />
                {it.badge && (
                  <span className={cn("absolute left-3 top-3 rounded-full px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-wider", it.badge === "New" ? "bg-saffron text-ink" : "bg-ink-foreground text-ink")}>
                    {it.badge}
                  </span>
                )}
              </div>
              <div className="flex flex-1 flex-col p-5 md:p-7">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-xl font-semibold md:text-2xl">{it.name}</h3>
                  <span className="font-display text-lg font-semibold">${it.price}</span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">{it.desc}</p>
                <div className="mt-auto flex items-center justify-between gap-3 pt-5">
                  <span className="text-xs text-ink-muted">{it.tag ?? it.category}</span>
                  <button
                    onClick={() => add(it.id)}
                    className="flex h-10 items-center gap-1.5 rounded-full border border-ink-foreground/25 px-4 transition-all duration-500 ease-premium hover:border-saffron hover:bg-saffron hover:text-ink"
                  >
                    <Plus className="h-3.5 w-3.5" /> <span className="eyebrow">Add to order</span>
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
