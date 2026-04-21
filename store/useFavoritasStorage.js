import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useFavoritas = create(persist(
    set => ({
        favoritas: [],
        añadirFavoritas: (idPeli) => set(state => ({
            favoritas: [...state.favoritas, idPeli]
        })),
        eliminarFavoritas: (idPeli) => set(state => ({
            favoritas: state.favoritas.filter(f => f !== idPeli)
        }))
    }),
    {
        name: "favoritas-storage"
    }
))