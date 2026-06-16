"use client";

import { useEffect, useState } from "react";

const DEMO_USER_KEY = "pepeflix-demo-user";

export default function LoginPage() {
  const [email, setEmail] = useState("demo@pepeflix.com");
  const [password, setPassword] = useState("123456");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = window.localStorage.getItem(DEMO_USER_KEY);
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  function handleSubmit(event) {
    event.preventDefault();

    const demoUser = { email: email || "demo@pepeflix.com" };
    window.localStorage.setItem(DEMO_USER_KEY, JSON.stringify(demoUser));
    setUser(demoUser);
  }

  function cerrarSesion() {
    window.localStorage.removeItem(DEMO_USER_KEY);
    setUser(null);
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center px-6 py-10">
      <section className="w-full max-w-md rounded-lg border border-zinc-700 bg-zinc-900 p-6 shadow-2xl shadow-black/40">
        <div className="mb-6 flex flex-col gap-2">
          <h1 className="text-3xl font-bold text-white">
            {user ? "Mi cuenta" : "Login demo"}
          </h1>
          <p className="text-sm text-zinc-400">
            Demo sin confirmacion de email.
          </p>
        </div>

        {user ? (
          <div className="flex flex-col gap-4">
            <div className="rounded-md border border-zinc-700 bg-zinc-800 p-4">
              <p className="text-xs uppercase text-zinc-500">Conectado como</p>
              <p className="break-all text-sm font-semibold text-white">
                {user.email}
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
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <label className="flex flex-col gap-2 text-sm font-semibold text-zinc-200">
              Email
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="rounded-md border border-zinc-700 bg-zinc-800 px-3 py-3 text-white outline-none focus:border-red-500"
              />
            </label>

            <label className="flex flex-col gap-2 text-sm font-semibold text-zinc-200">
              Password
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="rounded-md border border-zinc-700 bg-zinc-800 px-3 py-3 text-white outline-none focus:border-red-500"
              />
            </label>

            <button
              type="submit"
              className="rounded-md bg-red-600 px-4 py-3 text-sm font-bold text-white transition-colors hover:bg-red-500"
            >
              Entrar
            </button>
          </form>
        )}
      </section>
    </div>
  );
}
