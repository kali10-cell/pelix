import TarjetaPeli from "./TarjetaPeli";

async function fetchPelisFavoritas() {
    const URL = `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.API_KEY}`
    const res = await fetch(URL)
    const data = await res.json()
    console.log(data)
    return data
}


export default async function ContenedorPelis() {
    const { results } = await fetchPelisFavoritas() // Array
    return (
        <section className="flex flex-wrap gap-4 justify-around">
            {
                results.map(p => <TarjetaPeli key={p.id} peliData={p} />)
            }
        </section>
    )
}