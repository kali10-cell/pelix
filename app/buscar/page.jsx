import BarraBusqueda from "@/components/BarraBusqueda";

export const metadata = {
  title: "PepeFlix | Buscar",
  description: "Streaming de películas",
};

export default async function Buscar() {
  return (
    <div className="w-full px-6 py-8 flex flex-col gap-6 min-h-screen">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold text-white tracking-tight">Buscar</h1>
        <p className="text-zinc-400 text-sm">Encuentra cualquier película</p>
      </div>
      <BarraBusqueda />
    </div>
  );
}
