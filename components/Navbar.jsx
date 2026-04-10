import Link from "next/link";

export default function Navbar() {
    return (
        <>
            <Link href="/">Películas destacadas</Link>
            <Link href="/buscar">Buscar</Link>
            <Link href="/favoritos">Favoritos</Link>
        </>
    )
}