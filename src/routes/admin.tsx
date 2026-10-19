import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { useEffect, useState } from "react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";

// CHANGE: apni asli email yahan likho (wahi jo admin account mein use karogi)
const ADMIN_EMAIL = "kneezkhan12@gmail.com";

const STATUSES = ["new", "preparing", "out for delivery", "delivered", "cancelled"];

async function requireAdmin(token: string) {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { data, error } = await supabaseAdmin.auth.getUser(token);
  const u = data?.user;
  if (error || !u || !u.email_confirmed_at || u.email?.toLowerCase() !== ADMIN_EMAIL.toLowerCase()) {
    throw new Error("Not allowed");
  }
  return supabaseAdmin;
}

const listOrders = createServerFn({ method: "POST" })
  .inputValidator((d) => z.object({ token: z.string().min(10) }).parse(d))
  .handler(async ({ data }) => {
    const db = await requireAdmin(data.token);
    const { data: orders, error } = await db
      .from("orders")
      .select("*, order_items(*)")
      .order("created_at", { ascending: false });
    if (error) throw new Error("Could not load orders");
    return orders as any[];
  });

const setStatus = createServerFn({ method: "POST" })
  .inputValidator((d) =>
    z.object({ token: z.string().min(10), id: z.string().uuid(), status: z.enum(["new", "preparing", "out for delivery", "delivered", "cancelled"]) }).parse(d)
  )
  .handler(async ({ data }) => {
    const db = await requireAdmin(data.token);
    const { error } = await db.from("orders").update({ status: data.status }).eq("id", data.id);
    if (error) throw new Error("Could not update");
    return { ok: true };
  });

export const Route = createFileRoute("/admin")({
  component: Admin,
});

function Admin() {
  const [token, setToken] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [orders, setOrders] = useState<any[]>([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setToken(data.session?.access_token ?? null));
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setToken(s?.access_token ?? null));
    return () => sub.subscription.unsubscribe();
  }, []);

  const load = async (t: string) => {
    try {
      setOrders(await listOrders({ data: { token: t } }));
      setMsg("");
    } catch {
      setMsg("You are not allowed to view orders.");
      setOrders([]);
    }
  };

  useEffect(() => {
    if (!token) return;
    load(token);
    const t = setInterval(() => load(token), 15000);
    return () => clearInterval(t);
  }, [token]);

  const login = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    setMsg(error ? "Wrong email or password" : "");
  };

  const change = async (id: string, status: string) => {
    if (!token) return;
    await setStatus({ data: { token, id, status: status as any } });
    load(token);
  };

  if (!token) {
    return (
      <main className="mx-auto max-w-sm space-y-3 p-6">
        <h1 className="text-2xl font-bold">Admin login</h1>
        <input className="w-full rounded border bg-background p-3" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input className="w-full rounded border bg-background p-3" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        {msg && <p className="text-red-600">{msg}</p>}
        <button onClick={login} disabled={loading} className="w-full rounded bg-foreground py-3 text-background">
          {loading ? "..." : "Login"}
        </button>
      </main>
    );
  }

  const shown = filter === "all" ? orders : orders.filter((o) => o.status === filter);
  const newCount = orders.filter((o) => o.status === "new").length;

  return (
    <main className="mx-auto max-w-3xl space-y-4 p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Orders ({newCount} new)</h1>
        <button onClick={() => supabase.auth.signOut()} className="text-sm underline">Logout</button>
      </div>
      {msg && <p className="text-red-600">{msg}</p>}
      <select className="rounded border bg-background p-2" value={filter} onChange={(e) => setFilter(e.target.value)}>
        <option value="all">All</option>
        {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
      </select>
      {shown.map((o) => (
        <div key={o.id} className="space-y-1 rounded-lg border p-4">
          <div className="flex justify-between">
            <b>{o.order_number}</b>
            <span className="text-sm">{new Date(o.created_at).toLocaleString()}</span>
          </div>
          <p>{o.customer_name} · {o.phone}</p>
          <p>{o.address}</p>
          {o.notes && <p className="italic">Note: {o.notes}</p>}
          <ul className="text-sm">
            {(o.order_items ?? []).map((i: any) => (
              <li key={i.id}>{i.quantity} × {i.name}</li>
            ))}
          </ul>
          <p className="font-bold">Total: ${Number(o.total).toFixed(2)}</p>
          <select className="rounded border bg-background p-2" value={o.status ?? "new"} onChange={(e) => change(o.id, e.target.value)}>
            {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
      ))}
      {shown.length === 0 && <p className="text-muted-foreground">No orders.</p>}
    </main>
  );
}
