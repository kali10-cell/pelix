import ContenedorPelisFavs from "@/components/ContenedorPelisFavs";

export default async function Favoritos() {
  return (
    <div className="min-h-screen w-full bg-zinc-950 px-6 py-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-6">
        <div className="rounded-3xl border border-red-900/40 bg-gradient-to-br from-black via-zinc-950 to-red-950/20 p-6">
          <h1 className="text-3xl font-black tracking-tight text-white">
            Películas Favoritas
          </h1>

          <p className="mt-2 text-sm text-zinc-400">
            Tu colección personal de películas guardadas.
          </p>
        </div>

        <ContenedorPelisFavs />
      </div>
    </div>
  );
}