import Image from "next/image";
import Like from "@/components/Like"
import Link from "next/link";

export default function TarjetaPeli({ peliData }) {
    return (
        <div className="relative">
            <Link href={`/pelicula/${peliData.id}`} className="w-full group overflow-visible p-16">
                <article className="p-4 bg-zinc-800 flex flex-col justify-around items-center rounded-2xl relative group-hover:scale-105 transition-all duration-300 ease-in group-hover:bg-zinc-500 overflow-visible">
                    <div>
                        <Image className="rounded-2xl" src={`https://image.tmdb.org/t/p/w500/${peliData.poster_path}`} width="500" height="500" alt="Tremenda peli" />
                    </div>
                    <div className="flex flex-col justify-center text-white items-center gap-4">
                        <h2>{peliData.title}</h2>
                        <span className="text-xs">Estreno: {peliData.release_date}</span>
                        <span className="text-xs">Valoración: {Math.round(peliData.vote_average)} estrellas</span>
                    </div>
                </article >
            </Link>
            <Like />
        </div>
    )
}