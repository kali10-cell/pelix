import Link from "next/link";

const links = [
  { href: "/", label: "Destacadas" },
  { href: "/buscar", label: "Buscar" },
  { href: "/favoritos", label: "Favoritos" },
];

export default function Navbar() {
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
      <nav className="md:hidden flex items-center justify-between px-4 h-full">
        <Link href="/" className="font-mono text-xl tracking-widest">
          <span className="text-red-600">P</span>epe<span className="text-red-600">F</span>lix
        </Link>
        <ul className="flex items-center gap-1">
          {links.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className="px-3 py-1.5 rounded-lg text-sm font-medium text-zinc-400 hover:text-white hover:bg-zinc-700/60 transition-all duration-200"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
