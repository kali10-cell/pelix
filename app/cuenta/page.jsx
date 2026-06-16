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
    <div className="min-h-screen w-full px-6 py-10">
      <section className="mx-auto flex max-w-3xl flex-col gap-6 rounded-lg border border-zinc-700 bg-zinc-900 p-6 shadow-2xl shadow-black/40">
        <div>
          <h1 className="text-3xl font-bold text-white">Mi cuenta</h1>
          <p className="text-sm text-zinc-400">Panel demo de PepeFlix</p>
        </div>

        {!user ? (
          <div className="flex flex-col gap-4 rounded-md border border-zinc-700 bg-zinc-800 p-5">
            <p className="text-sm text-zinc-300">
              Entra para ver tu plan activo.
            </p>
            <Link
              href="/login"
              className="w-fit rounded-md bg-red-600 px-4 py-3 text-sm font-bold text-white transition-colors hover:bg-red-500"
            >
              Ir al login
            </Link>
          </div>
        ) : (
          <>
            <div className="rounded-md border border-zinc-700 bg-zinc-800 p-5">
              <p className="text-xs uppercase text-zinc-500">Usuario</p>
              <p className="break-all text-sm font-semibold text-white">
                {user.email}
              </p>
            </div>

            <div className="rounded-md border border-red-500/60 bg-red-950/30 p-5">
              <p className="text-xs uppercase text-red-200">Plan actual</p>
              {plan ? (
                <div className="mt-3 flex flex-col gap-3">
                  <div className="flex flex-wrap items-end gap-2">
                    <h2 className="text-3xl font-bold text-white">
                      {plan.nombre}
                    </h2>
                    <span className="pb-1 text-sm text-zinc-300">
                      {formatPrecio(plan.precio)} / mes
                    </span>
                  </div>
                  <ul className="flex flex-col gap-1 text-sm text-zinc-300">
                    <li>{plan.calidad}</li>
                    <li>{plan.pantallas}</li>
                    <li>{plan.descripcion}</li>
                  </ul>
                </div>
              ) : (
                <p className="mt-3 text-sm text-zinc-300">
                  Todavia no tienes un plan elegido.
                </p>
              )}
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/planes"
                className="rounded-md bg-red-600 px-4 py-3 text-sm font-bold text-white transition-colors hover:bg-red-500"
              >
                Cambiar plan
              </Link>
              <button
                type="button"
                onClick={cerrarSesion}
                className="rounded-md bg-white px-4 py-3 text-sm font-bold text-zinc-950 transition-colors hover:bg-zinc-200"
              >
                Cerrar sesion
              </button>
            </div>
          </>
        )}
      </section>
    </div>
  );
}
