import FichaPeliculaComponente from "@/components/FichaPeliculaComponente";
import { fetchPelicula, fetchPeliTrailer } from "@/lib/tmdbApi";




export async function generateMetadata({ params }) {
    const { id } = await params;
    const peli = await fetchPelicula(id)
    return {
        title: `Pepeflix | ${peli.title} `,
        description: `${peli.description}`
    };
}


export default async function FichaPelicula({ params }) {
    const { id } = await params;

    const peli = await fetchPelicula(id)
    const trailer = await fetchPeliTrailer(id)
    console.log("video:", trailer)
    return <FichaPeliculaComponente peli={peli} trailer={trailer} />
}