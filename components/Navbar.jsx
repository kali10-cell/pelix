"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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
  const pathname = usePathname();

  function closeMenu() {
    setOpen(false);
  }

  return (
    <>
      <nav className="hidden h-full flex-col border-r border-red-900/40 bg-black px-6 py-7 shadow-2xl shadow-black/80 md:flex">
        <Link href="/" className="mb-6 font-mono text-3xl font-black tracking-widest text-white">
          <span className="text-red-600">P</span>epe<span className="text-red-600">F</span>lix
        </Link>

        <ul className="flex flex-col gap-2">
          {links.map(({ href, label }) => {
            const active = pathname === href;

            return (
              <li key={href}>
                <Link
                  href={href}
                  className={`flex items-center rounded-xl px-4 py-3 text-sm font-semibold transition-all ${
                    active
                      ? "bg-red-600 text-white shadow-lg shadow-red-950/50"
                      : "text-zinc-300 hover:bg-zinc-900 hover:text-white"
                  }`}
                >
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <nav className="relative flex h-full items-center justify-between border-b border-red-900/40 bg-black px-4 shadow-lg shadow-black/60 md:hidden">
        <Link href="/" onClick={closeMenu} className="font-mono text-2xl font-black tracking-widest text-white">
          <span className="text-red-600">P</span>epe<span className="text-red-600">F</span>lix
        </Link>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="rounded-lg border border-red-900/60 bg-red-600 px-3 py-2 text-sm font-bold text-white"
        >
          {open ? "Cerrar" : "Menú"}
        </button>

        {open && (
          <div className="absolute left-0 right-0 top-14 z-50 border-t border-red-900/40 bg-black shadow-2xl shadow-black">
            <ul className="flex flex-col p-3">
              {links.map(({ href, label }) => {
                const active = pathname === href;

                return (
                  <li key={href}>
                    <Link
                      href={href}
                      onClick={closeMenu}
                      className={`block rounded-lg px-4 py-3 text-sm font-semibold ${
                        active
                          ? "bg-red-600 text-white"
                          : "text-zinc-300 hover:bg-zinc-900 hover:text-white"
                      }`}
                    >
                      {label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </nav>
    </>
  );
}