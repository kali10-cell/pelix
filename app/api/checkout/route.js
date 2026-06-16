import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
  if (!process.env.STRIPE_SECRET_KEY) {
    return Response.json(
      { error: "Falta STRIPE_SECRET_KEY en variables de entorno." },
      { status: 500 },
    );
  }

  const { id, title, posterPath } = await request.json();
  const origin = request.headers.get("origin") ?? "http://localhost:3000";

  if (!id || !title) {
    return Response.json(
      { error: "Faltan datos de la pelicula." },
      { status: 400 },
    );
  }

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: "eur",
          unit_amount: 499,
          product_data: {
            name: `Comprar ${title}`,
            images: posterPath
              ? [`https://image.tmdb.org/t/p/w500${posterPath}`]
              : undefined,
            metadata: {
              tmdb_id: String(id),
            },
          },
        },
      },
    ],
    metadata: {
      tmdb_id: String(id),
      title,
    },
    success_url: `${origin}/pelicula/${id}?comprado=1`,
    cancel_url: `${origin}/pelicula/${id}`,
  });

  return Response.json({ url: session.url });
}
