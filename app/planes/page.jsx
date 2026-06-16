import Link from "next/link";
import BotonPlanStripe from "@/components/BotonPlanStripe";
import GuardarPlanCheckout from "@/components/GuardarPlanCheckout";
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
  const planId = searchParams?.plan;
  const planes = getPlanes();

  return (
    <div className="min-h-screen w-full bg-zinc-950 px-6 py-10 text-white">
      <GuardarPlanCheckout checkout={checkout} planId={planId} />

      <div className="mx-auto flex max-w-6xl flex-col gap-10">
        <section className="rounded-3xl border border-red-900/40 bg-gradient-to-br from-black via-zinc-950 to-red-950/30 p-8 shadow-2xl shadow-black/60">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-red-500">
            Membresías PepeFlix
          </p>

          <h1 className="mt-4 max-w-3xl text-4xl font-black tracking-tight text-white sm:text-5xl">
            Elige tu plan y disfruta películas sin límites
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-6 text-zinc-300 sm:text-base">
            Accede a contenido premium, guarda favoritos y disfruta una
            experiencia de streaming más completa.
          </p>

          <div className="mt-6 flex flex-wrap gap-3 text-xs text-zinc-300">
            <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2">
              Cancelación desde Stripe
            </span>
            <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2">
              Pago seguro
            </span>
            <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2">
              Acceso inmediato
            </span>
          </div>
        </section>

        {checkout === "success" && (
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-green-500/40 bg-green-500/10 px-5 py-4 text-sm text-green-200">
            <span>Suscripción creada correctamente.</span>
            <Link href="/cuenta" className="font-bold text-white underline">
              Ver mi plan
            </Link>
          </div>
        )}

        {checkout === "cancelled" && (
          <p className="rounded-2xl border border-yellow-500/40 bg-yellow-500/10 px-5 py-4 text-sm text-yellow-100">
            Pago cancelado. Puedes elegir otro plan cuando quieras.
          </p>
        )}

        <section className="grid gap-6 md:grid-cols-3">
          {planes.map((plan) => (
            <article
              key={plan.id}
              className={`relative flex min-h-[420px] flex-col gap-6 overflow-hidden rounded-3xl border p-6 transition duration-300 hover:-translate-y-1 ${
                plan.destacado
                  ? "border-red-500 bg-gradient-to-b from-red-950/50 via-zinc-950 to-black shadow-2xl shadow-red-950/40"
                  : "border-white/10 bg-black shadow-xl shadow-black/40 hover:border-red-500/40"
              }`}
            >
              {plan.destacado && (
                <div className="absolute right-4 top-4 rounded-full bg-red-600 px-3 py-1 text-xs font-black uppercase tracking-wide text-white shadow-lg shadow-red-950/60">
                  Recomendado
                </div>
              )}

              <div className="flex flex-col gap-3 pt-5">
                <h2 className="text-2xl font-black text-white">
                  {plan.nombre}
                </h2>

                <p className="min-h-12 text-sm leading-6 text-zinc-300">
                  {plan.descripcion}
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <span className="text-5xl font-black text-white">
                  {formatPrecio(plan.precio)}
                </span>
                <span className="ml-1 text-sm text-zinc-400">/ mes</span>
              </div>

              <ul className="flex flex-col gap-3 text-sm text-zinc-300">
                <li className="flex gap-2">
                  <span className="text-red-500">✓</span>
                  <span>{plan.calidad}</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-red-500">✓</span>
                  <span>{plan.pantallas}</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-red-500">✓</span>
                  <span>Cancelación desde Stripe</span>
                </li>
              </ul>

              <div className="mt-auto">
                <BotonPlanStripe
                  planId={plan.id}
                  destacado={plan.destacado}
                />
              </div>
            </article>
          ))}
        </section>
      </div>
    </div>
  );
}