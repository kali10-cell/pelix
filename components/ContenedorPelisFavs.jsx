"use client"
import { useFavoritas } from "@/store/useFavoritasStorage";
import TarjetaPeli from "./TarjetaPeli";
import { useEffect, useState } from "react";



export default function ContenedorPelisFavs() {

    const favoritas = useFavoritas(state => state.favoritas) // Array de peliculas favoritas [121221,354345, 34234324]
    const [peliculasFavoritas, setPeliculasFavoritas] = useState([])

    useEffect(() => {
        const cargarFavoritas = async () => {
            const res = await fetch("/api/peliculas", {
                method: "POST",
                body: JSON.stringify({ ids: favoritas })
            })
            const data = await res.json()
            setPeliculasFavoritas(data)
        }
        if (favoritas.length) cargarFavoritas()
    }, [favoritas])

    return (
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full px-2 min-h-screen">
            {
                peliculasFavoritas.length > 0 ? peliculasFavoritas.map(p => <TarjetaPeli key={p.id} peliData={p} />) : <h1>No hay películas favoritas</h1>
            }
        </section>
    )
}