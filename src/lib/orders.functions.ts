import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { orderSchema, priceLines } from "./checkout";

export const placeOrder = createServerFn({ method: "POST" })
  .inputValidator((d) => orderSchema.parse(d))
  .handler(async ({ data }) => {
    const { lines, total } = priceLines(data.items);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: id, error } = await supabaseAdmin.rpc("place_order", {
      _key: data.key,
      _name: data.name,
      _phone: data.phone,
      _address: data.address,
      _notes: data.notes ?? "",
      _total: total,
      _items: lines,
    });
    if (error || !id) {
      console.error("place_order failed", error);
      return { ok: false as const, error: "We couldn't save your order. Please try again in a moment." };
    }
    return { ok: true as const, id: id as string };
  });

export const getOrder = createServerFn({ method: "GET" })
  .inputValidator((d) => z.object({ id: z.string().uuid() }).parse(d))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: order, error } = await supabaseAdmin
      .from("orders")
      .select("order_number, customer_name, total, payment_method, order_items(name, unit_price, quantity, line_total)")
      .eq("id", data.id)
      .maybeSingle();
    if (error) {
      console.error("getOrder failed", error);
      throw new Error("Could not load this order.");
    }
    if (!order) return null;
    return {
      orderNumber: order.order_number,
      customerName: order.customer_name,
      total: Number(order.total),
      paymentMethod: order.payment_method,
      items: order.order_items.map((i) => ({
        name: i.name,
        unitPrice: Number(i.unit_price),
        quantity: i.quantity,
        lineTotal: Number(i.line_total),
      })),
    };
  });
