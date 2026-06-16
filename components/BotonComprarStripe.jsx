"use client";

import { useState } from "react";

export default function BotonComprarStripe({ peli }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function comprar() {
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: peli.id,
          title: peli.title,
          posterPath: peli.poster_path,
        }),
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
        onClick={comprar}
        disabled={loading}
        className="inline-flex items-center justify-center rounded-full bg-red-600 px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-red-500 disabled:cursor-not-allowed disabled:bg-zinc-600"
      >
        {loading ? "Abriendo Stripe..." : "Comprar con Stripe"}
      </button>
      {error && <p className="text-xs text-red-300">{error}</p>}
    </div>
  );
}
