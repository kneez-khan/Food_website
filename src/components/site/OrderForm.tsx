
import { useRef, useState } from "react";
import { toast } from "sonner";
import { useCart } from "@/lib/cart";
import { customerSchema } from "@/lib/checkout";
import { placeOrder, getOrder } from "@/lib/orders.functions";

type Done = { orderNumber: string; total: number } | null;

export function OrderForm() {
  const { lines, clear, setOpen } = useCart();
  const [form, setForm] = useState({ name: "", phone: "", address: "", notes: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState<Done>(null);
  const key = useRef(crypto.randomUUID());

  const field =
    "w-full rounded-xl border bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-foreground/20";

  const submit = async () => {
    setError("");
    const parsed = customerSchema.safeParse(form);
    if (!parsed.success) {
      setError(parsed.error.issues[0].message);
      return;
    }
    setLoading(true);
    try {
      const res = await placeOrder({
        data: {
          ...parsed.data,
          key: key.current,
          items: lines.map((l) => ({ id: l.item.id, qty: l.qty })),
        },
      });
      if (!res.ok) {
        setError(res.error);
        return;
      }
      const order = await getOrder({ data: { id: res.id } });
      setDone({
        orderNumber: order?.orderNumber ?? "",
        total: order?.total ?? 0,
      });
      toast.success("Order placed");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (done) {
    return (
      <div className="mt-4 space-y-3 text-center">
        <h3 className="text-xl font-bold">Order placed!</h3>
        <p>
          Order number: <b>{done.orderNumber}</b>
        </p>
        <p>Total: ${done.total.toFixed(2)} (pay on delivery)</p>
        <button
          onClick={() => {
            clear();
            setOpen(false);
          }}
          className="w-full rounded-full bg-foreground py-3 text-background"
        >
          Back to menu
        </button>
      </div>
    );
  }

  return (
    <div className="mt-4 space-y-3">
      <input className={field} placeholder="Full name" value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })} />
      <input className={field} placeholder="Phone number" value={form.phone}
        onChange={(e) => setForm({ ...form, phone: e.target.value })} />
      <textarea className={field} placeholder="Delivery address" rows={2} value={form.address}
        onChange={(e) => setForm({ ...form, address: e.target.value })} />
      <textarea className={field} placeholder="Notes (optional)" rows={2} value={form.notes}
        onChange={(e) => setForm({ ...form, notes: e.target.value })} />
      <p className="text-xs text-muted-foreground">Payment: Cash on Delivery</p>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <button
        onClick={submit}
        disabled={loading}
        className="w-full rounded-full bg-foreground py-3 text-background disabled:opacity-50"
      >
        {loading ? "Placing order..." : "Place Order"}
      </button>
    </div>
  );
}
