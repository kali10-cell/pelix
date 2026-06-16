"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  { href: "/", label: "Inicio" },
  { href: "/buscar", label: "Buscar" },
  { href: "/favoritos", label: "Favoritos" },
  { href: "/planes", label: "Planes" },
  { href: "/cuenta", label: "Mi cuenta" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      {/* DESKTOP */}
      <nav className="hidden h-full flex-col border-r border-red-900/40 bg-black px-6 py-7 md:flex">
        <Link href="/" className="mb-8 text-3xl font-black tracking-tight text-white">
          <span className="text-red-600">P</span>epe<span className="text-red-600">F</span>lix
        </Link>

        <ul className="flex flex-col gap-2">
          {links.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className={`block rounded-xl px-4 py-3 text-sm font-bold transition ${
                  pathname === href
                    ? "bg-red-600 text-white"
                    : "text-zinc-300 hover:bg-zinc-900 hover:text-white"
                }`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* MÓVIL estilo Netflix */}
      <nav className="fixed left-0 top-0 z-50 flex h-16 w-full items-center justify-between bg-black px-4 md:hidden">
        <Link href="/" className="text-2xl font-black tracking-tight text-white">
          <span className="text-red-600">P</span>epe<span className="text-red-600">F</span>lix
        </Link>

        <div className="flex items-center gap-4">
          <Link href="/buscar" className="text-sm font-semibold text-white">
            Buscar
          </Link>

          <button
            onClick={() => setOpen(!open)}
            className="text-sm font-bold text-white"
          >
            Menú ▾
          </button>
        </div>

        {open && (
          <div className="absolute left-0 top-16 w-full border-t border-zinc-800 bg-black px-4 py-4 shadow-2xl">
            <ul className="flex flex-col gap-2">
              {links.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    onClick={() => setOpen(false)}
                    className={`block rounded-lg px-3 py-3 text-sm font-bold ${
                      pathname === href
                        ? "bg-red-600 text-white"
                        : "text-zinc-300"
                    }`}
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