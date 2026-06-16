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
      <nav className="md:hidden relative flex items-center justify-between px-4 h-full bg-black">
        <Link href="/" onClick={closeMenu} className="font-mono text-2xl font-bold tracking-widest text-red-600">
          PepeFlix
        </Link>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-label={open ? "Cerrar menu" : "Abrir menu"}
            aria-expanded={open}
            className="h-8 rounded border border-zinc-500 bg-black px-3 text-sm font-medium text-white"
          >
            Menu {open ? "▲" : "▼"}
          </button>
          <Link
            href="/login"
            onClick={closeMenu}
            className="h-8 rounded bg-red-600 px-3 py-1.5 text-sm font-semibold text-white hover:bg-red-500"
          >
            Entrar
          </Link>
        </div>

        {open && (
          <div className="absolute left-0 right-0 top-14 z-50 border-t border-zinc-800 bg-black shadow-2xl shadow-black/70">
            <ul className="flex flex-col px-4 py-3">
              {links.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    onClick={closeMenu}
                    className="block border-b border-zinc-900 py-3 text-sm font-medium text-zinc-200 hover:text-white"
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
