import { Minus, Plus, ShoppingBag, X } from "lucide-react";
import { useCart } from "@/lib/cart";
import { Button } from "./Btn";
import { CheckoutForm } from "./CheckoutForm";
import { cn } from "@/lib/utils";

export function CartDrawer() {
  const { lines, total, count, open, setOpen, change, clear } = useCart();
  return (
    <>
      <div onClick={() => setOpen(false)} className={cn("fixed inset-0 z-[60] bg-ink/40 backdrop-blur-sm transition-opacity duration-500", open ? "opacity-100" : "pointer-events-none opacity-0")} />
      <aside
        aria-label="Your order"
        className={cn("fixed inset-y-0 right-0 z-[61] flex w-full max-w-md flex-col bg-background shadow-lift transition-transform duration-700 ease-premium", open ? "translate-x-0" : "translate-x-full")}
      >
        <div className="flex items-center justify-between border-b p-6">
          <h2 className="text-2xl font-bold">Your order</h2>
          <button onClick={() => setOpen(false)} aria-label="Close" className="grid h-10 w-10 place-items-center rounded-full hover:bg-muted"><X className="h-5 w-5" /></button>
        </div>
        <div className="flex-1 overflow-y-auto p-6">
          {lines.length === 0 ? (
            <div className="grid h-full place-items-center text-center">
              <div>
                <ShoppingBag className="mx-auto h-8 w-8 text-muted-foreground" strokeWidth={1.4} />
                <p className="mt-4 text-muted-foreground">Nothing here yet.</p>
                <Button variant="outline" size="sm" className="mt-6" onClick={() => { setOpen(false); document.getElementById("menu")?.scrollIntoView(); }}>Browse menu</Button>
              </div>
            </div>
          ) : (
            <ul className="space-y-4">
              {lines.map(({ item, qty }) => (
                <li key={item.id} className="flex gap-4">
                  <img src={item.img} alt="" className="h-20 w-20 rounded-2xl object-cover" />
                  <div className="flex flex-1 flex-col">
                    <div className="flex justify-between gap-2"><p className="font-semibold">{item.name}</p><p className="font-display">${item.price * qty}</p></div>
                    <div className="mt-auto flex items-center gap-3">
                      <button onClick={() => change(item.id, -1)} aria-label="Decrease" className="grid h-8 w-8 place-items-center rounded-full border hover:bg-muted"><Minus className="h-3.5 w-3.5" /></button>
                      <span className="w-4 text-center text-sm">{qty}</span>
                      <button onClick={() => change(item.id, 1)} aria-label="Increase" className="grid h-8 w-8 place-items-center rounded-full border hover:bg-muted"><Plus className="h-3.5 w-3.5" /></button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        {lines.length > 0 && (
          <div className="max-h-[65vh] overflow-y-auto border-t p-6">
            <div className="flex justify-between text-lg"><span>Subtotal · {count} items</span><span className="font-display font-semibold">${total.toFixed(2)}</span></div>
            <CheckoutForm />
          </div>
        )}
      </aside>
    </>
  );
}

export function MobileOrderBar() {
  const { count, total, setOpen } = useCart();
  return (
    <div className="fixed inset-x-3 bottom-3 z-40 md:hidden">
      {count > 0 ? (
        <Button size="lg" className="w-full justify-between" onClick={() => setOpen(true)}>
          <span>View order · {count}</span><span>${total.toFixed(2)}</span>
        </Button>
      ) : (
        <Button size="lg" className="w-full" onClick={() => document.getElementById("menu")?.scrollIntoView()}>Order Now</Button>
      )}
    </div>
  );
}
