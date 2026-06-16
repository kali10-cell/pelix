"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getPlan } from "@/lib/planes";
import { DEMO_PLAN_KEY, DEMO_USER_KEY } from "@/lib/demoSession";

function formatPrecio(cents) {
  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "EUR",
  }).format(cents / 100);
}

export default function CuentaPage() {
  const [user, setUser] = useState(null);
  const [plan, setPlan] = useState(null);

  useEffect(() => {
    const savedUser = window.localStorage.getItem(DEMO_USER_KEY);
    const savedPlan = window.localStorage.getItem(DEMO_PLAN_KEY);

    if (savedUser) setUser(JSON.parse(savedUser));
    if (savedPlan) setPlan(getPlan(savedPlan));
  }, []);

  function cerrarSesion() {
    window.localStorage.removeItem(DEMO_USER_KEY);
    setUser(null);
  }

  return (
    <div className="min-h-screen w-full bg-zinc-950 px-6 py-10 text-white">
      <section className="mx-auto flex max-w-5xl flex-col gap-8">
        <div className="overflow-hidden rounded-3xl border border-red-900/40 bg-gradient-to-br from-black via-zinc-950 to-red-950/30 p-8 shadow-2xl shadow-black/60">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-red-500">
            Panel de usuario
          </p>

          <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
            Mi cuenta PepeFlix
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-6 text-zinc-300 sm:text-base">
            Gestiona tu sesión demo, revisa tu plan activo y accede a las
            membresías premium.
          </p>
        </div>

        {!user ? (
          <div className="rounded-3xl border border-white/10 bg-black p-8 shadow-2xl shadow-black/50">
            <div className="flex flex-col gap-5">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-red-400">
                  Sesión no iniciada
                </p>
                <h2 className="mt-2 text-2xl font-black text-white">
                  Entra para ver tu plan activo
                </h2>
                <p className="mt-3 max-w-xl text-sm leading-6 text-zinc-400">
                  Inicia sesión para consultar tu membresía, cambiar de plan o
                  revisar el estado de tu cuenta.
                </p>
              </div>

              <Link
                href="/login"
                className="w-fit rounded-xl bg-red-600 px-5 py-3 text-sm font-black text-white shadow-lg shadow-red-950/50 transition hover:bg-red-500"
              >
                Ir al login
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-3xl border border-white/10 bg-black p-6 shadow-2xl shadow-black/50">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500">
                Usuario
              </p>

              <div className="mt-5 flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-red-600 text-2xl font-black text-white shadow-lg shadow-red-950/50">
                  {user.email?.[0]?.toUpperCase() || "P"}
                </div>

                <div>
                  <p className="break-all text-lg font-black text-white">
                    {user.email}
                  </p>
                  <p className="text-sm text-zinc-500">Cuenta demo activa</p>
                </div>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <p className="text-xs text-zinc-500">Estado</p>
                  <p className="mt-1 font-bold text-green-400">Activa</p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <p className="text-xs text-zinc-500">Tipo</p>
                  <p className="mt-1 font-bold text-white">Demo</p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <p className="text-xs text-zinc-500">Acceso</p>
                  <p className="mt-1 font-bold text-red-400">
                    {plan ? "Premium" : "Básico"}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-red-500/40 bg-gradient-to-b from-red-950/40 via-zinc-950 to-black p-6 shadow-2xl shadow-red-950/30">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-red-300">
                Plan actual
              </p>

              {plan ? (
                <div className="mt-5 flex flex-col gap-5">
                  <div>
                    <h2 className="text-4xl font-black text-white">
                      {plan.nombre}
                    </h2>
                    <p className="mt-2 text-zinc-300">
                      {formatPrecio(plan.precio)} / mes
                    </p>
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
                      <span>{plan.descripcion}</span>
                    </li>
                  </ul>
                </div>
              ) : (
                <div className="mt-5">
                  <h2 className="text-3xl font-black text-white">
                    Sin plan activo
                  </h2>
                  <p className="mt-3 text-sm leading-6 text-zinc-400">
                    Todavía no tienes una membresía elegida. Puedes activar una
                    desde la página de planes.
                  </p>
                </div>
              )}
            </div>

            <div className="flex flex-wrap gap-3 lg:col-span-2">
              <Link
                href="/planes"
                className="rounded-xl bg-red-600 px-5 py-3 text-sm font-black text-white shadow-lg shadow-red-950/50 transition hover:bg-red-500"
              >
                Cambiar plan
              </Link>

              <button
                type="button"
                onClick={cerrarSesion}
                className="rounded-xl border border-white/10 bg-white px-5 py-3 text-sm font-black text-zinc-950 transition hover:bg-zinc-200"
              >
                Cerrar sesión
              </button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}