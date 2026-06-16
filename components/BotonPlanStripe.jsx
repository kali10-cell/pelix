"use client";

import { useState } from "react";

export default function BotonPlanStripe({ planId, destacado }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function suscribirse() {
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ planId }),
      });

      const data = await res.json();

      if (!res.ok || !data.url) {
        throw new Error(data.error ?? "No se pudo abrir Stripe.");
      }

      window.location.href = data.url;
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <button
        type="button"
        onClick={suscribirse}
        disabled={loading}
        className={`inline-flex w-full items-center justify-center rounded-md px-4 py-3 text-sm font-bold transition-colors disabled:cursor-not-allowed disabled:bg-zinc-600 ${
          destacado
            ? "bg-red-600 text-white hover:bg-red-500"
            : "bg-white text-zinc-950 hover:bg-zinc-200"
        }`}
      >
        {loading ? "Abriendo Stripe..." : "Suscribirse"}
      </button>
      {error && <p className="text-xs text-red-300">{error}</p>}
    </div>
  );
}
