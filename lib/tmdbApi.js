export async function fetchPeliculasPopulares() {
    const res = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.API_KEY}`,
        { next: { revalidate: 60 } } // opcional (cache)
    )

    const data = await res.json()
    console.log(data)
    return data
}

// Trae los datos de una película
export async function fetchPelicula(idPeli) {
    const res = await fetch(`https://api.themoviedb.org/3/movie/${idPeli}?api_key=${process.env.API_KEY}`)
    const data = await res.json()
    console.log(data)
    return data
}

// Trae los vídeos de las pelis
export async function fetchPeliTrailer(idPeli) {
    const res = await fetch(`https://api.themoviedb.org/3/movie/${idPeli}?api_key=${process.env.API_KEY}&append_to_response=videos`)
    const data = await res.json()
    const allTrailers = data.videos.results
    // Pilla el primer trailer que encuentres
    const trailer = allTrailers.find(
        (video) =>
            video.type === "Trailer" &&
            video.site === "YouTube"
    )
    return trailer
}