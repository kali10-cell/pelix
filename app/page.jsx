// import { getPeliculasPopulares } from "@/lib/apiSearch";

import ContenedorPelis from "@/components/ContenedorPelis";


export default async function Home() {
  // const peliculas = await getPeliculasPopulares()
  return (
    <>
      <h1 className="py-6 uppercase">Películas destacadas</h1>
      <ContenedorPelis />
      {/* {
        peliculas.map(p => <img src={`https://image.tmdb.org/t/p/w500/${p.backdrop_path}`} />)
      } */}
    </>
  );
}
