import BarraBusqueda from "@/components/BarraBusqueda";
import TarjetaPeli from "@/components/TarjetaPeli";
import { fetchPelicula } from "@/lib/tmdbApi";

export default async function BuscarId({ searchParams }) {
  const { q } = await searchParams;
  const peliData = q ? await fetchPelicula(q) : null;

  return (
    <div className="min-h-screen w-full bg-zinc-950 px-6 py-8 text-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-8">
        <div className="rounded-3xl border border-red-900/40 bg-gradient-to-br from-black via-zinc-950 to-red-950/20 p-6">
          <h1 className="text-3xl font-black tracking-tight">
            Buscar Película por ID
          </h1>

          <p className="mt-2 text-sm text-zinc-400">
            Introduce el ID de TMDB para localizar una película concreta.
          </p>
        </div>

        <BarraBusqueda />

        {!q && (
          <div className="rounded-2xl border border-zinc-800 bg-black p-8 text-center">
            <p className="text-zinc-400">
              Introduce un ID para comenzar la búsqueda.
            </p>
          </div>
        )}

        {q && peliData && peliData.id && (
          <div className="max-w-sm">
            <TarjetaPeli peliData={peliData} />
          </div>
        )}

        {q && (!peliData || !peliData.id) && (
          <div className="rounded-2xl border border-red-900/40 bg-red-950/20 p-6 text-center">
            <p className="text-red-300">
              No se encontró ninguna película con el ID:{" "}
              <span className="font-bold">{q}</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}