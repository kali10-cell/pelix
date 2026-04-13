"use client"
import { useState } from "react"

export default function Like() {
  const [liked, setLiked] = useState(false)
  return (
    <button
      onClick={() => setLiked(!liked)}
      aria-label={liked ? "Quitar de favoritos" : "Añadir a favoritos"}
      className="p-1.5 rounded-full bg-black/40 backdrop-blur-sm hover:bg-black/60 transition-all duration-200"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="22px"
        viewBox="0 -960 960 960"
        width="22px"
      >
        <path
          d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Z"
          className={`stroke-red-800 transition-all duration-200 hover:scale-110 ${liked ? "fill-red-500" : "fill-red-500/20"}`}
        />
      </svg>
    </button>
  )
}
