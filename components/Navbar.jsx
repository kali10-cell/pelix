import Link from "next/link";

export default function Navbar() {
    return (
        <ul className="flex flex-col justify-around items-center min-h-screen">
            <li className="h-full border-b-2">
                <span className=" font-mono text-2xl tracking-widest"><span className="text-red-700">P</span>epe<span className="text-red-700">F</span>lix</span>
            </li>
            <li className="h-full block border-b-2">
                <Link className="uppercase " href="/">Películas destacadas</Link>
            </li>
            <li className="h-full border-b-2">
                <Link className="uppercase" href="/buscar">Buscar</Link>
            </li>
            <li className="h-full border-b-2">
                <Link className="uppercase" href="/favoritos">Favoritos</Link>
            </li>
        </ul>
    )
}