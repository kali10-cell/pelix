import ContenedorPelis from "@/components/ContenedorPelis";

export default async function Home() {

  return (
    <div className="w-full px-6 py-8 flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold text-white tracking-tight">Películas destacadas</h1>
        <p className="text-zinc-400 text-sm">Las más populares del momento</p>
      </div>
      <ContenedorPelis />
    </div>
  );
}
