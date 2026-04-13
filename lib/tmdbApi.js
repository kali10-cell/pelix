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
    if (!res.ok) {
      throw new Error(`Error: ${res.status}`);
    }
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
