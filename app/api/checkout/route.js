import Stripe from "stripe";
import { getPlan } from "@/lib/planes";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
  if (!process.env.STRIPE_SECRET_KEY) {
    return Response.json(
      { error: "Falta STRIPE_SECRET_KEY en variables de entorno." },
      { status: 500 },
    );
  }

  const { planId } = await request.json();
  const origin = request.headers.get("origin") ?? "http://localhost:3000";
  const plan = getPlan(planId);

  if (!plan) {
    return Response.json(
      { error: "Plan no valido." },
      { status: 400 },
    );
  }

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    payment_method_types: ["card"],
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: "eur",
          unit_amount: plan.precio,
          recurring: {
            interval: "month",
          },
          product_data: {
            name: `PepeFlix ${plan.nombre}`,
            description: `${plan.calidad} · ${plan.pantallas}`,
            metadata: {
              plan: plan.id,
            },
          },
        },
      },
    ],
    metadata: {
      plan: plan.id,
    },
    success_url: `${origin}/planes?checkout=success&plan=${plan.id}`,
    cancel_url: `${origin}/planes?checkout=cancelled&plan=${plan.id}`,
  });

  return Response.json({ url: session.url });
}
