import { fetchPeliculasPopulares } from "@/lib/tmdbApi";
import TarjetaPeli from "./TarjetaPeli";



export default async function ContenedorPelis() {
    const { results } = await fetchPeliculasPopulares() // Array
    return (
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full px-2">
            {
                results.map(p => <TarjetaPeli key={p.id} peliData={p} />)
            }
        </section>
    )
}