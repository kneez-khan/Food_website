import { useRef, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useCart } from "@/lib/cart";
import { customerSchema, type CustomerInput } from "@/lib/checkout";
import { placeOrder } from "@/lib/orders.functions";
import { Button } from "./Btn";

type Errors = Partial<Record<keyof CustomerInput, string>>;
const fields: { k: keyof CustomerInput; label: string; type?: string; area?: boolean; optional?: boolean }[] = [
  { k: "name", label: "Full name" },
  { k: "phone", label: "Phone number", type: "tel" },
  { k: "address", label: "Delivery address", area: true },
  { k: "notes", label: "Order notes", area: true, optional: true },
];

export function CheckoutForm() {
  const { lines, clear, setOpen } = useCart();
  const navigate = useNavigate();
  const submit = useServerFn(placeOrder);
  const [v, setV] = useState<CustomerInput>({ name: "", phone: "", address: "", notes: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [busy, setBusy] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const key = useRef<string>(crypto.randomUUID()); // same key for retries → no duplicate orders

  const validate = (next: CustomerInput) => {
    const r = customerSchema.safeParse(next);
    const e: Errors = {};
    if (!r.success) r.error.issues.forEach((i) => (e[i.path[0] as keyof CustomerInput] ??= i.message));
    return e;
  };

  const onSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (busy) return;
    const e = validate(v);
    setErrors(e);
    if (Object.keys(e).length) return;
    setBusy(true);
    setServerError(null);
    try {
      const res = await submit({
        data: { ...v, key: key.current, items: lines.map((l) => ({ id: l.item.id, qty: l.qty })) },
      });
      if (!res.ok) return setServerError(res.error);
      clear();
      setOpen(false);
      key.current = crypto.randomUUID();
      navigate({ to: "/order/$id", params: { id: res.id } });
    } catch {
      setServerError("We couldn't place your order. Check your connection and try again.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <form onSubmit={onSubmit} noValidate className="mt-5 space-y-3">
      <p className="eyebrow text-muted-foreground">Cash on Delivery</p>
      {fields.map((f) => {
        const props = {
          id: `co-${f.k}`,
          value: v[f.k] ?? "",
          "aria-invalid": !!errors[f.k],
          onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            const next = { ...v, [f.k]: e.target.value };
            setV(next);
            if (errors[f.k]) setErrors(validate(next));
          },
          className: "w-full rounded-2xl border bg-card px-4 py-2.5 text-sm outline-none focus:border-accent aria-[invalid=true]:border-destructive",
        };
        return (
          <div key={f.k}>
            <label htmlFor={props.id} className="text-sm font-medium">
              {f.label} {f.optional ? <span className="text-muted-foreground">(optional)</span> : <span className="text-destructive">*</span>}
            </label>
            {f.area ? <textarea rows={2} {...props} /> : <input type={f.type ?? "text"} {...props} />}
            {errors[f.k] && <p className="mt-1 text-xs text-destructive">{errors[f.k]}</p>}
          </div>
        );
      })}
      {serverError && <p role="alert" className="rounded-2xl bg-destructive/10 px-4 py-3 text-sm text-destructive">{serverError}</p>}
      <Button type="submit" size="lg" className="w-full" disabled={busy || Object.keys(errors).length > 0}>
        {busy ? "Placing order…" : "Place order · Pay on delivery"}
      </Button>
    </form>
  );
}
