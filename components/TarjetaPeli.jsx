import Image from "next/image";
import Like from "@/components/Like";
import Link from "next/link";

export default function TarjetaPeli({ peliData }) {
  const rating = Math.round(peliData.vote_average * 10) / 10;
  const year = peliData.release_date?.slice(0, 4);

  return (
    <div className="relative group">
      <Link href={`/pelicula/${peliData.id}`} className="block">
        <article className="relative overflow-hidden rounded-2xl border border-zinc-800 bg-black shadow-xl transition-all duration-300 ease-out group-hover:-translate-y-1 group-hover:border-red-600/50 group-hover:shadow-2xl group-hover:shadow-red-950/40">
          <div className="relative aspect-2/3 w-full">
            <Image
              className="object-cover transition duration-500 group-hover:scale-105"
              loading="eager"
              src={
                peliData.poster_path
                  ? `https://image.tmdb.org/t/p/w500${peliData.poster_path}`
                  : "/poster-not-found.avif"
              }
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              alt={`Poster de ${peliData.title}`}
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-transparent" />

            <div className="absolute bottom-0 left-0 right-0 p-3">
              <h2 className="line-clamp-2 text-sm font-bold leading-tight text-white">
                {peliData.title}
              </h2>

              <div className="mt-1 flex items-center justify-between">
                {year && <span className="text-xs text-zinc-400">{year}</span>}

                {peliData.vote_average > 0 && (
                  <span className="flex items-center gap-1 text-xs">
                    <span className="text-yellow-400">★</span>
                    <span className="font-bold text-white">{rating}</span>
                  </span>
                )}
              </div>
            </div>

            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-gradient-to-t from-black via-black/90 to-black/40 p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <span className="rounded-full border border-red-500/60 bg-red-600 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-white">
                Ver ficha
              </span>

              {peliData.overview && (
                <p className="line-clamp-4 text-center text-xs leading-relaxed text-zinc-300">
                  {peliData.overview}
                </p>
              )}
            </div>
          </div>
        </article>
      </Link>

      <div className="absolute right-2 top-2 z-10">
        <Like idPeli={peliData.id} />
      </div>
    </div>
  );
}