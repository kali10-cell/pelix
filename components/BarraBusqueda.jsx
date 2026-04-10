export default function BarraBusqueda() {
    return (
        <div className="w-full flex justify-center py-10 px-4">
            <input type="text" className="w-3/4 bg-white border-none rounded rounded-br-none rounded-tr-none py-2 text-zinc-800 px-2" />
            <button className="w-1/4 bg-red-800 hover:bg-red-700 active:bg-red-600 rounded rounded-bl-none rounded-tl-none py-2">Buscar</button>
        </div>
    );
}
