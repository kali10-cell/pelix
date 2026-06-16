"use client";

import Link from "next/link";
import { useState } from "react";

const links = [
  { href: "/", label: "Destacadas" },
  { href: "/buscar", label: "Buscar" },
  { href: "/buscarid", label: "Buscar ID" },
  { href: "/favoritos", label: "Favoritos" },
  { href: "/planes", label: "Planes" },
  { href: "/cuenta", label: "Mi cuenta" },
  { href: "/login", label: "Login" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  function closeMenu() {
    setOpen(false);
  }

  return (
    <>
      {/* Sidebar — solo en md+ */}
      <nav className="hidden md:flex flex-col gap-8 p-6 h-full">
        <Link href="/" className="font-mono text-2xl tracking-widest">
          <span className="text-red-600">P</span>epe<span className="text-red-600">F</span>lix
        </Link>
        <ul className="flex flex-col gap-1">
          {links.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className="flex items-center px-3 py-2.5 rounded-xl text-sm font-medium text-zinc-400 hover:text-white hover:bg-zinc-700/60 transition-all duration-200"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Barra superior — solo en móvil */}
      <nav className="md:hidden relative flex items-center justify-between px-4 h-full">
        <Link href="/" onClick={closeMenu} className="font-mono text-xl tracking-widest">
          <span className="text-red-600">P</span>epe<span className="text-red-600">F</span>lix
        </Link>
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-label={open ? "Cerrar menu" : "Abrir menu"}
          aria-expanded={open}
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-md border border-zinc-700 bg-zinc-900/80 text-white"
        >
          <span className={`h-0.5 w-5 rounded bg-white transition-transform ${open ? "translate-y-2 rotate-45" : ""}`} />
          <span className={`h-0.5 w-5 rounded bg-white transition-opacity ${open ? "opacity-0" : "opacity-100"}`} />
          <span className={`h-0.5 w-5 rounded bg-white transition-transform ${open ? "-translate-y-2 -rotate-45" : ""}`} />
        </button>

        {open && (
          <div className="absolute left-0 right-0 top-14 z-50 border-t border-zinc-700 bg-zinc-900 shadow-2xl shadow-black/50">
            <ul className="flex flex-col p-2">
              {links.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    onClick={closeMenu}
                    className="block rounded-md px-4 py-3 text-sm font-medium text-zinc-200 hover:bg-zinc-800 hover:text-white"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>
    </>
  );
}
