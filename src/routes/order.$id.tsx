import { createFileRoute, Link, notFound, type ErrorComponentProps } from "@tanstack/react-router";
import { CheckCircle2 } from "lucide-react";
import { getOrder } from "@/lib/orders.functions";
import { btn } from "@/components/site/Btn";

export const Route = createFileRoute("/order/$id")({
  loader: async ({ params }) => {
    const order = await getOrder({ data: { id: params.id } });
    if (!order) throw notFound();
    return order;
  },
  head: () => ({
    meta: [
      { title: "Order confirmed — Fifth & Field" },
      { name: "description", content: "Your Fifth & Field order confirmation." },
      { property: "og:title", content: "Order confirmed — Fifth & Field" },
      { property: "og:description", content: "Your Fifth & Field order confirmation." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  notFoundComponent: () => (
    <div className="grid min-h-screen place-items-center px-5 text-center">
      <div>
        <h1 className="text-3xl font-bold">Order not found</h1>
        <Link to="/" className={btn({ className: "mt-6" })}>Continue shopping</Link>
      </div>
    </div>
  ),
  errorComponent: ({ error }: ErrorComponentProps) => (
    <div className="grid min-h-screen place-items-center px-5 text-center">
      <div>
        <h1 className="text-3xl font-bold">We couldn't load your order</h1>
        <p className="mt-2 text-muted-foreground">{error.message}</p>
        <Link to="/" className={btn({ className: "mt-6" })}>Continue shopping</Link>
      </div>
    </div>
  ),
  component: OrderPage,
});

function OrderPage() {
  const o = Route.useLoaderData()!;
  return (
    <main className="mx-auto max-w-2xl px-5 py-20 md:py-28">
      <CheckCircle2 className="h-10 w-10 text-accent" strokeWidth={1.4} />
      <p className="eyebrow mt-6 text-accent">Order confirmed</p>
      <h1 className="mt-3 text-4xl font-bold md:text-5xl">Thanks, {o.customerName}.</h1>
      <p className="mt-3 text-muted-foreground">We've received your order and will deliver it soon.</p>

      <div className="mt-10 rounded-3xl bg-card p-6 shadow-soft md:p-8">
        <div className="flex flex-wrap justify-between gap-4 border-b pb-5">
          <div><p className="eyebrow text-muted-foreground">Order number</p><p className="mt-1 font-display text-xl font-semibold">{o.orderNumber}</p></div>
          <div className="text-right"><p className="eyebrow text-muted-foreground">Delivery method</p><p className="mt-1 font-semibold">Cash on Delivery</p></div>
        </div>
        <ul className="divide-y">
          {o.items.map((i) => (
            <li key={i.name} className="flex justify-between gap-4 py-4">
              <div><p className="font-semibold">{i.name}</p><p className="text-sm text-muted-foreground">{i.quantity} × ${i.unitPrice.toFixed(2)}</p></div>
              <p className="font-display">${i.lineTotal.toFixed(2)}</p>
            </li>
          ))}
        </ul>
        <div className="flex justify-between border-t pt-5 text-lg">
          <span>Total due on delivery</span><span className="font-display font-semibold">${o.total.toFixed(2)}</span>
        </div>
      </div>

      <Link to="/" className={btn({ size: "lg", className: "mt-10" })}>Continue shopping</Link>
    </main>
  );
}
