import hermanoOso from "@/public/hermano-oso.webp"
import Image from "next/image";

export default function TarjetaPeli() {
    return (
        <article className="w-1/4 p-4 bg-zinc-800 flex flex-col justify-around items-center rounded-2xl">
            <div>
                <Image className="rounded-2xl" src={hermanoOso} alt="Tremenda peli" />
            </div>
            <div className="flex flex-col justify-center text-white items-center gap-4">
                <h2>Hermano oso</h2>
                <span className="text-xs">Duración: 120 min</span>
                <span className="text-xs">Valoración: 5 estrellas</span>
            </div>
        </article>
    )
}