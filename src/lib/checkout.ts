import { z } from "zod";
import { menu } from "@/data/site";

export const customerSchema = z.object({
  name: z.string().trim().min(2, "Please enter your full name").max(100, "Name is too long"),
  phone: z
    .string()
    .trim()
    .regex(/^\+?[0-9\s().-]{7,20}$/, "Please enter a valid phone number"),
  address: z.string().trim().min(8, "Please enter a full delivery address").max(300, "Address is too long"),
  notes: z.string().trim().max(500, "Notes must be under 500 characters").optional().or(z.literal("")),
});

export const orderSchema = customerSchema.extend({
  key: z.string().uuid(),
  items: z
    .array(z.object({ id: z.string().max(60), qty: z.number().int().min(1).max(50) }))
    .min(1, "Your basket is empty")
    .max(50),
});

export type CustomerInput = z.infer<typeof customerSchema>;

/** Prices always come from the menu data, never from the client. */
export function priceLines(items: { id: string; qty: number }[]) {
  const lines = items.map(({ id, qty }) => {
    const m = menu.find((x) => x.id === id);
    if (!m) throw new Error(`Unknown item: ${id}`);
    return { item_id: m.id, name: m.name, unit_price: m.price, quantity: qty, line_total: m.price * qty };
  });
  return { lines, total: lines.reduce((s, l) => s + l.line_total, 0) };
}
