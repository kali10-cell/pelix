export default function BarraBusqueda() {
    return (
        <div className="w-full flex justify-center py-10 px-4">
            <input placeholder="Buscar películas..." type="text" className="w-5/6 bg-white border-none rounded rounded-br-none rounded-tr-none py-2 text-zinc-800 px-2" />
            <button className="w-1/6 bg-red-800 hover:bg-red-700 active:bg-red-600 rounded rounded-bl-none rounded-tl-none py-2 flex justify-center items-center">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" /></svg>
            </button>
        </div>
    );
}
