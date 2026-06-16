import BotonPlanStripe from "@/components/BotonPlanStripe";
import { getPlanes } from "@/lib/planes";

export const metadata = {
  title: "PepeFlix | Planes",
  description: "Planes de suscripción de PepeFlix",
};

function formatPrecio(cents) {
  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "EUR",
  }).format(cents / 100);
}

export default function PlanesPage({ searchParams }) {
  const checkout = searchParams?.checkout;
  const planes = getPlanes();

  return (
    <div className="w-full min-h-screen px-6 py-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold text-white">Elige tu plan</h1>
          <p className="max-w-2xl text-sm text-zinc-300">
            Suscripciones mensuales con Stripe, al estilo Netflix.
          </p>
          {checkout === "success" && (
            <p className="rounded-md border border-green-500/40 bg-green-500/10 px-4 py-3 text-sm text-green-200">
              Suscripción creada correctamente.
            </p>
          )}
          {checkout === "cancelled" && (
            <p className="rounded-md border border-yellow-500/40 bg-yellow-500/10 px-4 py-3 text-sm text-yellow-100">
              Pago cancelado. Puedes elegir otro plan cuando quieras.
            </p>
          )}
        </div>

        <section className="grid gap-4 md:grid-cols-3">
          {planes.map((plan) => (
            <article
              key={plan.id}
              className={`flex flex-col gap-5 rounded-lg border p-6 ${
                plan.destacado
                  ? "border-red-500 bg-zinc-900 shadow-2xl shadow-black/40"
                  : "border-zinc-700 bg-zinc-800"
              }`}
            >
              <div className="flex flex-col gap-2">
                {plan.destacado && (
                  <span className="w-fit rounded-full bg-red-600 px-3 py-1 text-xs font-bold uppercase text-white">
                    Recomendado
                  </span>
                )}
                <h2 className="text-2xl font-bold text-white">{plan.nombre}</h2>
                <p className="text-sm text-zinc-300">{plan.descripcion}</p>
              </div>

              <div>
                <span className="text-4xl font-bold text-white">
                  {formatPrecio(plan.precio)}
                </span>
                <span className="text-sm text-zinc-400"> / mes</span>
              </div>

              <ul className="flex flex-col gap-2 text-sm text-zinc-300">
                <li>{plan.calidad}</li>
                <li>{plan.pantallas}</li>
                <li>Cancelación desde Stripe</li>
              </ul>

              <div className="mt-auto">
                <BotonPlanStripe planId={plan.id} destacado={plan.destacado} />
              </div>
            </article>
          ))}
        </section>
      </div>
    </div>
  );
}
