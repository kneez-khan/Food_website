import { images } from "@/data/site";
import { cn } from "@/lib/utils";

const spans = [
  "md:col-span-2 md:row-span-2", "", "md:row-span-2", "", "",
  "md:col-span-2", "", "md:row-span-2", "md:col-span-2", "",
];

export function Gallery() {
  return (
    <section className="bg-ink py-24 text-ink-foreground md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 className="reveal text-5xl font-bold leading-[0.95] md:text-7xl">The <span className="font-serif font-normal italic tracking-normal text-saffron">feed</span>.</h2>
          <p className="reveal eyebrow text-ink-muted">06 — Gallery</p>
        </div>
        <div className="mt-14 grid auto-rows-[160px] grid-cols-2 gap-3 md:auto-rows-[200px] md:grid-cols-4 md:gap-4">
          {images.gallery.map((g, i) => (
            <figure key={g.src} className={cn("reveal group relative overflow-hidden rounded-2xl", spans[i])} style={{ ["--d" as string]: `${(i % 4) * 70}ms` }}>
              <img src={g.src} alt={g.label} loading="lazy" className="h-full w-full object-cover transition-transform duration-[1.2s] ease-premium group-hover:scale-[1.06]" />
              <figcaption className="absolute inset-0 flex items-end bg-gradient-to-t from-ink/70 via-transparent to-transparent p-4 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <span className="translate-y-2 font-display text-lg font-semibold transition-transform duration-500 ease-premium group-hover:translate-y-0">{g.label}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
