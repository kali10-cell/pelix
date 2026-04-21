import ContenedorPelisFavs from "@/components/ContenedorPelisFavs";
export default async function Favoritos() {
    

    return (
        <div className="w-full px-6 py-8 flex flex-col gap-6">
            <div className="flex flex-col gap-1">
                <h1 className="text-3xl font-bold text-white tracking-tight">Películas Favoritas</h1>
                <p className="text-zinc-400 text-sm">Mis películas favoritas</p>
            </div>
            <ContenedorPelisFavs/>
        </div>
    );
}
