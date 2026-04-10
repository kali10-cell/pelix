import Link from "next/link";

export default function Navbar() {
    return (
        <ul className="flex flex-col justify-around items-center min-h-screen">
            <li className="flex-1 flex justify-start items-start w-full absolute top-6 left-6 ">
                <span className=" font-mono text-2xl tracking-widest"><span className="text-red-700">P</span>epe<span className="text-red-700">F</span>lix</span>
            </li>
            <li className="flex-1 flex border-b-2 border-zinc-600 justify-center items-center w-full hover:bg-zinc-600 active:underline">
                <Link className="uppercase text-center" href="/">Películas destacadas</Link>
            </li>
            <li className="flex-1 border-b-2 border-zinc-600 flex justify-center items-center w-full hover:bg-zinc-600 active:underline">
                <Link className="uppercase" href="/buscar">Buscar</Link>
            </li>
            <li className="flex-1 border-b-2 border-zinc-600 flex justify-center items-center w-full hover:bg-zinc-600 active:underline">
                <Link className="uppercase" href="/favoritos">Favoritos</Link>
            </li>
        </ul>
    )
}