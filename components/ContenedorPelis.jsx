import { fetchPeliculasPopulares } from "@/lib/fetchPeliculasPopulares";
import TarjetaPeli from "./TarjetaPeli";



export default async function ContenedorPelis() {
    const { results } = await fetchPeliculasPopulares() // Array
    return (
        <section className="grid lg:grid-cols-3 gap-4 justify-around">
            {
                results.map(p => <TarjetaPeli key={p.id} peliData={p} />)
            }
        </section>
    )
}