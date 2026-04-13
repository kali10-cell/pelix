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
    console.log(trailer)
    return (
        <>
            <h1>Ficha de película de la película: {id}</h1>
            <FichaPeliculaComponente peli={peli} trailer={trailer} />
        </>
    )
}


async function fetchMovieTrailer(idPeli) {
    const url = `https://api.themoviedb.org/3/movie/${idPeli}?api_key=${process.env.API_KEY}&append_to_response=videos,images`;

    try {
        const res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Error: ${res.status}`);
        }

        const data = await res.json();
        console.log(data);
        return data;

    } catch (error) {
        console.error("Error en la petición:", error);
    }
}