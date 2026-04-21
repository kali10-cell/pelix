export async function fetchPeliculasPopulares() {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.API_KEY}`,
      { next: { revalidate: 60 } }, // opcional (cache)
    );
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

// Trae los datos de una película
export async function fetchPelicula(idPeli) {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${idPeli}?api_key=${process.env.API_KEY}`,
    );
    // if (!res.ok) {
    //   throw new Error(`Error: ${res.status}`);
    // }
    const data = await res.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error en la petición: ", error);
  }
}

// Trae los vídeos de las pelis
export async function fetchPeliTrailer(idPeli) {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${idPeli}?api_key=${process.env.API_KEY}&append_to_response=videos`,
    );
    if (!res.ok) {
      throw new Error(`Error: ${res.status}`);
    }
    const data = await res.json();
    const allTrailers = data.videos.results;
    // Pilla el primer trailer que encuentres
    const trailer = allTrailers.find(
      (video) => video.type === "Trailer" && video.site === "YouTube",
    );
    return trailer;
  } catch (error) {
    console.error("Error en la petición:", error);
  }
}

// Búsqueda de películas
export async function fetchBusqueda(query) {
  try {
    // Punto de aprendizaje: encodeURIComponent para que los caracteres especiales (espacios, acentos) no rompan la URL.
    const res = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${process.env.API_KEY}&query=${encodeURIComponent(query)}&language=es-ES`
    );
    if (!res.ok) throw new Error(`Error: ${res.status}`);
    const data = await res.json();
    console.log(data) // Siempre nos va a dar 20 resultados como máximo
    return data; // { results: [], total_results: N, ... }
  } catch (error) {
    console.error("Error en la búsqueda:", error);
  }
}

// Traer películas favoritas

export async function fetchPeliculasFavoritas(favoritas) {
  const peliculasFavoritas = favoritas.map(async (id) => {
    const res = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.API_KEY}`)
    const data = await res.json()
    return data
  })
  console.log(peliculasFavoritas)
}