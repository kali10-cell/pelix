export async function POST(req) {
  const { ids } = await req.json() // [3423432, 234324, 4324234]

  // Promise.all es necesario para que lo haga más rápido. Sin esto, haría las peticiones 1 por 1
  const peliculas = await Promise.all(
    ids.map(async (id) => {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.API_KEY}`
      )
      return res.json()
    })
  )

  return Response.json(peliculas)
}