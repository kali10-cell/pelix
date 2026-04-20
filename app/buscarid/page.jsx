import BarraBusqueda from "@/components/BarraBusqueda";
import TarjetaPeli from "@/components/TarjetaPeli";
import { fetchPelicula } from "@/lib/tmdbApi";

export default async function BuscarId({ searchParams }) {
    const { q } = await searchParams
    const peliData = q ? await fetchPelicula(q) : null

    return (
        <div>
            <h1>BuscarID</h1>
            <BarraBusqueda />
            {
                peliData ?
                    peliData.id ? <TarjetaPeli peliData={peliData} /> : <span>No se ha encotrado la pelicula con el id: {q}</span>
                    :
                    <span>Haz tu búsqueda</span>
            }
        </div>
    )
}