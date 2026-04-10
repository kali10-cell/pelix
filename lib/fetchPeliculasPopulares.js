export async function fetchPeliculasPopulares() {
    const res = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.TMDB_API_KEY}`,
        { next: { revalidate: 60 } } // opcional (cache)
    )

    const data = await res.json()
    console.log(data)
    return data.results
}