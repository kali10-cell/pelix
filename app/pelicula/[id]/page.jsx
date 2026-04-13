import FichaPeliculaComponente from "@/components/FichaPeliculaComponente";

async function fetchPeli(idPeli) {
    const res = await fetch(`https://api.themoviedb.org/3/movie/${idPeli}?api_key=${process.env.API_KEY}`)
    const data = await res.json()
    console.log(data)
    return data
}

export async function generateMetadata({ params }) {
    const { id } = await params;
    const peli = await fetchPeli(id)
    return {
        title: `Pepeflix | ${peli.title} `,
        description: `${peli.description}`
    };
}


export default async function FichaPelicula({ params }) {
    const { id } = await params;

    const peli = await fetchPeli(id)
    return (
        <>
            <h1>Ficha de película de la película: {id}</h1>
            <FichaPeliculaComponente peli={peli} />
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