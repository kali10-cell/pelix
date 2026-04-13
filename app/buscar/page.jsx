import BarraBusqueda from "@/components/BarraBusqueda";

export const metadata = {
    title: "PepeFlix | Buscar",
    description: "Streaming de películas",
};

export default async function Buscar() {
    return (
        <>
            <h1 className="py-6 uppercase">Buscar película</h1>
            <BarraBusqueda />
        </>
    );
}
