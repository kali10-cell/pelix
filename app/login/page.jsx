"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function LoginPage() {
  const [modo, setModo] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [session, setSession] = useState(null);
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!supabase) return;

    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
    });

    const { data } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
    });

    return () => data.subscription.unsubscribe();
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setError("");
    setMensaje("");

    if (!supabase) {
      setError("Faltan las variables de Supabase.");
      setLoading(false);
      return;
    }

    const result = modo === "login"
      ? await supabase.auth.signInWithPassword({ email, password })
      : await supabase.auth.signUp({ email, password });

    if (result.error) {
      setError(result.error.message);
    } else if (modo === "registro") {
      setMensaje("Usuario creado. Revisa tu email si Supabase pide confirmacion.");
    } else {
      setMensaje("Sesion iniciada.");
    }

    setLoading(false);
  }

  async function cerrarSesion() {
    if (!supabase) return;

    await supabase.auth.signOut();
    setMensaje("Sesion cerrada.");
    setError("");
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center px-6 py-10">
      <section className="w-full max-w-md rounded-lg border border-zinc-700 bg-zinc-900 p-6 shadow-2xl shadow-black/40">
        <div className="mb-6 flex flex-col gap-2">
          <h1 className="text-3xl font-bold text-white">
            {session ? "Mi cuenta" : "Entrar en PepeFlix"}
          </h1>
          <p className="text-sm text-zinc-400">
            Accede para gestionar tu cuenta.
          </p>
        </div>

        {session ? (
          <div className="flex flex-col gap-4">
            <div className="rounded-md border border-zinc-700 bg-zinc-800 p-4">
              <p className="text-xs uppercase text-zinc-500">Conectado como</p>
              <p className="break-all text-sm font-semibold text-white">
                {session.user.email}
              </p>
            </div>
            <button
              type="button"
              onClick={cerrarSesion}
              className="rounded-md bg-white px-4 py-3 text-sm font-bold text-zinc-950 transition-colors hover:bg-zinc-200"
            >
              Cerrar sesion
            </button>
          </div>
        ) : (
          <>
            <div className="mb-5 grid grid-cols-2 rounded-md bg-zinc-800 p-1">
              <button
                type="button"
                onClick={() => setModo("login")}
                className={`rounded px-3 py-2 text-sm font-semibold ${
                  modo === "login"
                    ? "bg-red-600 text-white"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                Login
              </button>
              <button
                type="button"
                onClick={() => setModo("registro")}
                className={`rounded px-3 py-2 text-sm font-semibold ${
                  modo === "registro"
                    ? "bg-red-600 text-white"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                Registro
              </button>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <label className="flex flex-col gap-2 text-sm font-semibold text-zinc-200">
                Email
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                  className="rounded-md border border-zinc-700 bg-zinc-800 px-3 py-3 text-white outline-none focus:border-red-500"
                />
              </label>

              <label className="flex flex-col gap-2 text-sm font-semibold text-zinc-200">
                Password
                <input
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                  minLength={6}
                  className="rounded-md border border-zinc-700 bg-zinc-800 px-3 py-3 text-white outline-none focus:border-red-500"
                />
              </label>

              <button
                type="submit"
                disabled={loading}
                className="rounded-md bg-red-600 px-4 py-3 text-sm font-bold text-white transition-colors hover:bg-red-500 disabled:cursor-not-allowed disabled:bg-zinc-600"
              >
                {loading
                  ? "Cargando..."
                  : modo === "login"
                    ? "Entrar"
                    : "Crear cuenta"}
              </button>
            </form>
          </>
        )}

        {mensaje && (
          <p className="mt-4 rounded-md border border-green-500/40 bg-green-500/10 px-3 py-2 text-sm text-green-200">
            {mensaje}
          </p>
        )}
        {error && (
          <p className="mt-4 rounded-md border border-red-500/40 bg-red-500/10 px-3 py-2 text-sm text-red-200">
            {error}
          </p>
        )}
      </section>
    </div>
  );
}
