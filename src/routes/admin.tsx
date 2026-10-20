import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/site/Btn";

export const Route = createFileRoute("/admin")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Admin — Fifth & Field" },
      { name: "description", content: "Fifth & Field order administration." },
      { property: "og:title", content: "Admin — Fifth & Field" },
      { property: "og:description", content: "Fifth & Field order administration." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminPage,
});

type Order = {
  id: string; order_number: string; customer_name: string; phone: string; address: string;
  notes: string | null; total: number; status: string; created_at: string;
  order_items: { name: string; unit_price: number; quantity: number; line_total: number }[];
};

function AdminPage() {
  const [session, setSession] = useState<Session | null>(null);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => { setSession(data.session); setReady(true); });
    const { data } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    return () => data.subscription.unsubscribe();
  }, []);
  if (!ready) return null;
  return <main className="mx-auto max-w-5xl px-5 py-16">{session ? <Dashboard session={session} /> : <Login />}</main>;
}

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true); setErr(null);
    const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
    setBusy(false);
    if (error) setErr(error.message);
  };
  const input = "w-full rounded-2xl border bg-card px-4 py-2.5 text-sm outline-none focus:border-accent";
  return (
    <form onSubmit={submit} className="mx-auto max-w-sm space-y-4">
      <h1 className="text-3xl font-bold">Admin sign in</h1>
      <input className={input} type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <input className={input} type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      {err && <p role="alert" className="text-sm text-destructive">{err}</p>}
      <Button type="submit" className="w-full" disabled={busy}>{busy ? "Signing in…" : "Sign in"}</Button>
    </form>
  );
}

function Dashboard({ session }: { session: Session }) {
  const [orders, setOrders] = useState<Order[] | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const { data: admin, error: rErr } = await supabase.rpc("has_role", { _user_id: session.user.id, _role: "admin" });
      if (rErr) return setErr("Could not verify admin access.");
      setIsAdmin(!!admin);
      if (!admin) return;
      const { data, error } = await supabase
        .from("orders")
        .select("id, order_number, customer_name, phone, address, notes, total, status, created_at, order_items(name, unit_price, quantity, line_total)")
        .order("created_at", { ascending: false });
      if (error) setErr("Could not load orders: " + error.message);
      else setOrders(data as unknown as Order[]);
    })();
  }, [session.user.id]);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div><h1 className="text-3xl font-bold">Orders</h1><p className="text-sm text-muted-foreground">{session.user.email}</p></div>
        <Button variant="outline" size="sm" onClick={() => supabase.auth.signOut()}>Sign out</Button>
      </div>
      {err && <p role="alert" className="mt-6 text-destructive">{err}</p>}
      {isAdmin === false && <p className="mt-6 text-destructive">This account does not have admin access.</p>}
      {orders && orders.length === 0 && <p className="mt-6 text-muted-foreground">No orders yet.</p>}
      <ul className="mt-8 space-y-4">
        {orders?.map((o) => (
          <li key={o.id} className="rounded-3xl bg-card p-6 shadow-soft">
            <div className="flex flex-wrap justify-between gap-2">
              <p className="font-display text-lg font-semibold">{o.order_number} · {o.customer_name}</p>
              <p className="text-sm text-muted-foreground">{new Date(o.created_at).toLocaleString()} · {o.status} · Cash on Delivery</p>
            </div>
            <p className="mt-1 text-sm">{o.phone} — {o.address}</p>
            {o.notes && <p className="mt-1 text-sm text-muted-foreground">Notes: {o.notes}</p>}
            <ul className="mt-3 divide-y text-sm">
              {o.order_items.map((i, k) => (
                <li key={k} className="flex justify-between py-2"><span>{i.quantity} × {i.name} @ ${Number(i.unit_price).toFixed(2)}</span><span>${Number(i.line_total).toFixed(2)}</span></li>
              ))}
            </ul>
            <p className="mt-2 text-right font-semibold">Total ${Number(o.total).toFixed(2)}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
