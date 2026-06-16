import { getPlan } from "@/lib/planes";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

function canUseSupabase() {
  return Boolean(SUPABASE_URL && SUPABASE_KEY);
}

async function insertRow(table, payload) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}`, {
    method: "POST",
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
      "Content-Type": "application/json",
      Prefer: "return=representation",
    },
    body: JSON.stringify(payload),
  });

  const text = await res.text();
  const data = text ? JSON.parse(text) : null;

  if (!res.ok) {
    return {
      ok: false,
      table,
      status: res.status,
      error: data?.message ?? text,
    };
  }

  return { ok: true, table, data };
}

function demoStripeId(prefix) {
  return `${prefix}_demo_${Date.now()}`;
}

export async function POST(request) {
  if (!canUseSupabase()) {
    return Response.json(
      { ok: false, error: "Faltan variables de Supabase." },
      { status: 500 },
    );
  }

  const { action, email, nombre = "Demo User", planId = "standard" } =
    await request.json();
  const plan = getPlan(planId);

  if (!email) {
    return Response.json(
      { ok: false, error: "Falta email para guardar demo." },
      { status: 400 },
    );
  }

  if (action === "login") {
    const profile = await insertRow("pelix_profiles", {
      email,
      nombre,
      avatar_url: null,
    });

    const subscriber = await insertRow("pelix_subscribers", {
      email,
      nombre,
      stripe_customer_id: demoStripeId("cus"),
      estado: "active",
    });

    return Response.json({ ok: profile.ok && subscriber.ok, profile, subscriber });
  }

  if (action === "subscription") {
    if (!plan) {
      return Response.json(
        { ok: false, error: "Plan no valido." },
        { status: 400 },
      );
    }

    const subscriber = await insertRow("pelix_subscribers", {
      email,
      nombre,
      stripe_customer_id: demoStripeId("cus"),
      estado: "active",
    });

    const subscription = await insertRow("pelix_subscriptions", {
      subscriber_id: null,
      stripe_subscription_id: demoStripeId("sub"),
      plan: plan.id,
      status: "active",
      current_period_end: new Date(
        Date.now() + 30 * 24 * 60 * 60 * 1000,
      ).toISOString(),
    });

    const order = await insertRow("pelix_orders", {
      stripe_session_id: demoStripeId("cs"),
      customer_email: email,
      amount_total: plan.precio,
      payment_status: "paid",
    });

    return Response.json({
      ok: subscriber.ok && subscription.ok && order.ok,
      subscriber,
      subscription,
      order,
    });
  }

  return Response.json(
    { ok: false, error: "Accion demo no soportada." },
    { status: 400 },
  );
}
