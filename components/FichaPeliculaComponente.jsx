import Image from "next/image";
import Link from "next/link";

export default function FichaPeliculaComponente({ peli, trailer }) {
    return (
        <>
            <Link href="/">Atrás</Link >
            <article className="p-4 bg-zinc-800 flex flex-col justify-around items-center rounded-2xl relative group-hover:scale-105 transition-all duration-300 ease-in group-hover:bg-zinc-500 overflow-visible">
                <div>
                    <Image className="rounded-2xl" src={`https://image.tmdb.org/t/p/w500/${peli.poster_path}`} width="500" height="500" alt="Tremenda peli" />
                </div>
                <div className="flex flex-col justify-center text-white items-center gap-4">
                    <h2>{peli.title}</h2>
                    <span className="text-xs">Estreno: {peli.release_date}</span>
                    <span className="text-xs">Valoración: {Math.round(peli.vote_average)} estrellas</span>
                    <p>{peli.overview}</p>
                </div>
                <div>
                    
                </div>
            </article >
        </>
    )
}