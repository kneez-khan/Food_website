import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { toast } from "sonner";
import { menu, type MenuItem } from "@/data/site";

type Line = { item: MenuItem; qty: number };
type Ctx = {
  lines: Line[];
  count: number;
  total: number;
  open: boolean;
  setOpen: (v: boolean) => void;
  add: (id: string) => void;
  change: (id: string, delta: number) => void;
  clear: () => void;
};

const CartCtx = createContext<Ctx | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [qty, setQty] = useState<Record<string, number>>({});
  const [open, setOpen] = useState(false);

  const value = useMemo<Ctx>(() => {
    const lines = Object.entries(qty)
      .filter(([, q]) => q > 0)
      .map(([id, q]) => ({ item: menu.find((m) => m.id === id)!, qty: q }));
    return {
      lines,
      count: lines.reduce((s, l) => s + l.qty, 0),
      total: lines.reduce((s, l) => s + l.qty * l.item.price, 0),
      open,
      setOpen,
      add: (id) => {
        setQty((p) => ({ ...p, [id]: (p[id] ?? 0) + 1 }));
        const it = menu.find((m) => m.id === id);
        toast.success(`${it?.name} added`, {
          action: { label: "View order", onClick: () => setOpen(true) },
        });
      },
      change: (id, d) => setQty((p) => ({ ...p, [id]: Math.max(0, (p[id] ?? 0) + d) })),
      clear: () => setQty({}),
    };
  }, [qty, open]);

  return <CartCtx.Provider value={value}>{children}</CartCtx.Provider>;
}

export function useCart() {
  const c = useContext(CartCtx);
  if (!c) throw new Error("useCart outside CartProvider");
  return c;
}
