import Image from "next/image";
import Like from "@/components/Like";
import Link from "next/link";

export default function TarjetaPeli({ peliData }) {
  const rating = Math.round(peliData.vote_average * 10) / 10;
  const year = peliData.release_date?.slice(0, 4);

  return (
    <div className="relative group">
      <Link href={`/pelicula/${peliData.id}`} className="block">
        <article className="relative overflow-hidden rounded-2xl bg-zinc-800 shadow-lg transition-all duration-300 ease-out group-hover:shadow-2xl group-hover:shadow-black/50 group-hover:-translate-y-1">
          {/* Poster */}
          <div className="relative aspect-2/3 w-full">
            <Image
              className="object-cover"
              loading="eager"
              src={peliData.poster_path ? `https://image.tmdb.org/t/p/w500${peliData.poster_path}` : "/poster-not-found.avif"}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              alt={`Poster de ${peliData.title}`}
            />

            {/* Overlay gradiente inferior — siempre visible */}
            <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent" />

            {/* Info inferior */}
            <div className="absolute bottom-0 left-0 right-0 p-3">
              <h2 className="text-white font-semibold text-sm leading-tight line-clamp-2">
                {peliData.title}
              </h2>
              <div className="flex items-center justify-between mt-1">
                {year && (
                  <span className="text-zinc-400 text-xs">{year}</span>
                )}
                {peliData.vote_average > 0 && (
                  <span className="flex items-center gap-1 text-xs">
                    <span className="text-yellow-400">★</span>
                    <span className="text-zinc-300 font-medium">{rating}</span>
                  </span>
                )}
              </div>
            </div>

            {/* Overlay hover — info extra */}
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center p-4 gap-3">
              <span className="text-white text-xs font-semibold uppercase tracking-widest border border-white/30 px-3 py-1 rounded-full">
                Ver ficha
              </span>
              {peliData.overview && (
                <p className="text-zinc-300 text-xs text-center line-clamp-4 leading-relaxed">
                  {peliData.overview}
                </p>
              )}
            </div>
          </div>
        </article>
      </Link>

      {/* Like — fuera del Link para no activar navegación */}
      <div className="absolute top-2 right-2 z-10">
        <Like idPeli={peliData.id}/>
      </div>
    </div>
  );
}
