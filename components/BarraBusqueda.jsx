"use client";

import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function BarraBusqueda() {
    // El objetivo principal de la barra de búsqueda es:
        // 1. Escribir en el <input> y guardarlo en un estado
        // 2. Darle al botón de la lupa
        // 3. Limpiar lo que ha escrito el usuario
        // 4. Escribirlo en la URL
        // 5. Con el siguiente formato: ?q=mario+bross

    const router = useRouter(); // Es una función
    const pathname = usePathname(); // -> /buscar
    const searchParams = useSearchParams(); // Es otra función


  // Inicializar el input con lo que ya hay en la URL
  const [texto, setTexto] = useState(searchParams.get("q") ?? ""); // ?? '' (nullish coalescing operator) “Si lo de la izquierda es null o undefined, usa lo de la derecha”

  function buscar() {
    // Si le da a enviar sin texto, no envías nada
    if (!texto.trim()) return;

    // Construir nueva URL con el parámetro q
    const params = new URLSearchParams(searchParams);
    params.set("q", texto.trim());
    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="flex flex-col gap-8 w-full max-w-2xl">
      {/* Input de búsqueda */}
      <div className="flex w-full rounded-xl overflow-hidden shadow-lg border border-zinc-600/50 focus-within:border-zinc-400 transition-colors duration-200">
        <input
          placeholder="Nombre de la película..."
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          onKeyDown={(e) => e.key == "Enter" && buscar()}
          type="text"
          className="flex-1 bg-zinc-800 text-white placeholder:text-zinc-500 px-4 py-3 text-sm outline-none"
        />
        <button 
            className="bg-red-700 hover:bg-red-600 active:bg-red-500 px-5 flex items-center justify-center transition-colors duration-200 shrink-0"
            onClick={buscar}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="20px"
            viewBox="0 -960 960 960"
            width="20px"
            fill="white"
          >
            <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" />
          </svg>
        </button>
      </div>
    </div>
  );
}
