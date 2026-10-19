<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Architecture rules
- Brand info, image URLs and menu items live in `src/data/site.ts`; components only read from it — keeps content editable in one place.
- Landing sections are components under `src/components/site/`, composed in `src/routes/index.tsx` — single-page scroll site.
- Cart is client-side React context (`src/lib/cart.tsx`) — demo ordering, no payments yet.
- Motion uses small custom hooks in `src/hooks/use-motion.ts` (no animation library) — keeps bundle light and respects reduced motion.
