async function fetchPeli(idPeli) {
    const res = await fetch(`https://api.themoviedb.org/3/movie/${idPeli}?api_key=${process.env.API_KEY}`)
    const data = await res.json()
    console.log(data)
    return data
}

export default async function FichaPelicula({ params }) {
    const { id } = await params;

    await fetchPeli(id)
    return (
        <h1>Ficha de película de la película: {id}</h1>
    )
}