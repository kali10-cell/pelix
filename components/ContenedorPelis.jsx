import { fetchPeliculasPorIds, fetchPeliculasPopulares } from "@/lib/tmdbApi";
import { fetchPelisOrdenadas } from "@/lib/supabasePelis";
import TarjetaPeli from "./TarjetaPeli";



export default async function ContenedorPelis() {
    const idsOrdenados = await fetchPelisOrdenadas();
    const { results } = idsOrdenados.length
        ? await fetchPeliculasPorIds(idsOrdenados)
        : await fetchPeliculasPopulares(); // Array

    return (
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full px-2">
            {
                results?.map(p => <TarjetaPeli key={p.id} peliData={p} />)
            }
        </section>
    )
}
