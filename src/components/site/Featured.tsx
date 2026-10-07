import { Plus } from "lucide-react";
import { featuredIds, menu } from "@/data/site";
import { useCart } from "@/lib/cart";
import { cn } from "@/lib/utils";

const layout = [
  "md:col-span-7 md:row-span-2",
  "md:col-span-5 md:mt-24",
  "md:col-span-5",
  "md:col-span-4 md:-mt-16",
  "md:col-span-3 md:mt-10",
];
const ratio = ["aspect-[5/4]", "aspect-[4/3]", "aspect-[4/3]", "aspect-[4/5]", "aspect-[3/4]"];

export function Featured() {
  const items = featuredIds.map((id) => menu.find((m) => m.id === id)!);
  const { add } = useCart();

  return (
    <section id="about" className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-36">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="reveal eyebrow text-accent">01 — Featured favorites</p>
          <h2 className="reveal mt-4 text-5xl font-bold leading-[0.95] md:text-7xl">
            What we're <span className="font-serif font-normal italic tracking-normal">craving</span>.
          </h2>
        </div>
        <p className="reveal max-w-xs text-muted-foreground">The five orders New York keeps coming back for. Built in under six minutes.</p>
      </div>

      <div className="mt-16 grid gap-x-6 gap-y-12 md:grid-cols-12">
        {items.map((it, i) => (
          <article key={it.id} className={cn("reveal group", layout[i])} style={{ ["--d" as string]: `${i * 90}ms` }}>
            <div className="relative overflow-hidden rounded-[1.75rem] bg-muted transition-all duration-700 ease-premium group-hover:-translate-y-1.5 group-hover:shadow-lift">
              <img src={it.img} alt={it.name} loading="lazy" className={cn("w-full object-cover transition-transform duration-[1.2s] ease-premium group-hover:scale-[1.05]", ratio[i])} />
              {it.tag && <span className="absolute left-4 top-4 rounded-full bg-background/90 px-3 py-1 text-[0.68rem] font-semibold backdrop-blur">{it.tag}</span>}
              <button
                onClick={() => add(it.id)}
                aria-label={`Add ${it.name} to order`}
                className="absolute bottom-4 right-4 flex h-11 items-center gap-2 rounded-full bg-primary px-4 text-primary-foreground opacity-90 shadow-lift transition-all duration-500 ease-premium group-hover:opacity-100 hover:bg-accent md:translate-y-2 md:opacity-0 md:group-hover:translate-y-0"
              >
                <Plus className="h-4 w-4" /> <span className="eyebrow">Add</span>
              </button>
            </div>
            <div className="mt-5 flex items-start justify-between gap-4">
              <div>
                <p className="eyebrow text-muted-foreground">0{i + 1} · {it.category}</p>
                <h3 className={cn("mt-2 font-semibold transition-colors group-hover:text-accent", i === 0 ? "text-3xl md:text-4xl" : "text-2xl")}>{it.name}</h3>
                <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">{it.desc}</p>
              </div>
              <span className="font-display text-xl font-semibold">${it.price}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
