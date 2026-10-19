import { images } from "@/data/site";
import { useParallax } from "@/hooks/use-motion";
import { cn } from "@/lib/utils";

export function Lifestyle() {
  const a = useParallax<HTMLDivElement>(-0.05);
  const b = useParallax<HTMLDivElement>(0.07);
  const [l1, l2, l3, l4] = images.lifestyle;

  const Tile = ({ img, cls }: { img: { src: string; label: string }; cls: string }) => (
    <figure className={cn("group relative overflow-hidden rounded-[1.75rem]", cls)}>
      <img src={img.src} alt={img.label} loading="lazy" className="h-full w-full object-cover transition-transform duration-[1.4s] ease-premium group-hover:scale-105" />
      <figcaption className="absolute bottom-3 left-3 rounded-full bg-background/85 px-3 py-1 text-xs font-medium backdrop-blur">{img.label}</figcaption>
    </figure>
  );

  return (
    <section className="overflow-hidden py-24 md:py-36">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 md:px-8 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <p className="reveal eyebrow text-accent">05 — In the wild</p>
          <h2 className="reveal mt-4 text-5xl font-bold leading-[0.95] md:text-6xl">Lunch at the desk.<br /><span className="font-serif font-normal italic tracking-normal text-accent">Coffee</span> on the go.</h2>
          <p className="reveal mt-6 max-w-sm text-muted-foreground">Somewhere between your 9am and your 6pm, we fit in. Tag us — we repost the good ones.</p>
          <a href="https://instagram.com" target="_blank" rel="noreferrer" className="reveal eyebrow mt-8 inline-block border-b border-foreground pb-1 hover:text-accent hover:border-accent transition-colors">@fifthandfield</a>
        </div>
        <div className="grid grid-cols-2 gap-4 md:gap-6">
          <div ref={a} className="space-y-4 md:space-y-6">
            <Tile img={l1} cls="aspect-[4/5]" />
            <Tile img={l3} cls="aspect-square" />
          </div>
          <div ref={b} className="space-y-4 pt-16 md:space-y-6 md:pt-28">
            <Tile img={l2} cls="aspect-[3/4]" />
            <Tile img={l4} cls="aspect-[4/3]" />
          </div>
        </div>
      </div>
    </section>
  );
}
