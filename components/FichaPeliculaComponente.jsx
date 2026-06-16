import Image from "next/image";
import Link from "next/link";
import CajaComentarios from "./CajaComentarios";

export default function FichaPeliculaComponente({ peli, trailer }) {
  const backdropUrl = peli.backdrop_path
    ? `https://image.tmdb.org/t/p/original${peli.backdrop_path}`
    : null;

  const posterUrl = peli.poster_path
    ? `https://image.tmdb.org/t/p/w500${peli.poster_path}`
    : null;

  const rating = Math.round(peli.vote_average * 10) / 10;
  const stars = Math.round(peli.vote_average / 2);
  const runtime = peli.runtime
    ? `${Math.floor(peli.runtime / 60)}h ${peli.runtime % 60}min`
    : null;

  return (
    <div className="w-full min-h-screen bg-[#080808] text-white">
      <div className="relative w-full h-[60vh] min-h-[400px] overflow-hidden">
        {backdropUrl ? (
          <Image
            src={backdropUrl}
            fill
            className="object-cover object-top"
            alt={`Backdrop de ${peli.title}`}
            priority
          />
        ) : (
          <div className="w-full h-full bg-[#111]" />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/75 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#080808]/95 via-[#080808]/40 to-transparent" />

        <div className="absolute top-6 left-6">
          <Link
            href="/"
            className="flex items-center gap-2 rounded-full border border-white/10 bg-black/50 px-4 py-2 text-sm font-medium text-white backdrop-blur-md transition hover:bg-red-600"
          >
            ← Volver
          </Link>
        </div>
      </div>

      <div className="relative -mt-48 px-6 pb-12 max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          <div className="shrink-0">
            <Image
              src={posterUrl ? posterUrl : "/poster-not-found.avif"}
              width={240}
              height={360}
              className="rounded-2xl border border-white/10 shadow-2xl shadow-black/80"
              alt={`Poster de ${peli.title}`}
            />
          </div>

          <div className="flex flex-col gap-4 pt-4 md:pt-32">
            <h1 className="text-3xl md:text-5xl font-black text-white leading-tight">
              {peli.title}
            </h1>

            {peli.tagline && (
              <p className="text-zinc-300 italic text-sm">
                &ldquo;{peli.tagline}&rdquo;
              </p>
            )}

            <div className="flex flex-wrap items-center gap-3 text-sm text-zinc-300">
              {peli.release_date && (
                <span>{new Date(peli.release_date).getFullYear()}</span>
              )}

              {runtime && (
                <>
                  <span className="text-red-500">•</span>
                  <span>{runtime}</span>
                </>
              )}

              {peli.vote_count > 0 && (
                <>
                  <span className="text-red-500">•</span>
                  <span className="flex items-center gap-1">
                    <span className="text-yellow-400">
                      {"★".repeat(stars)}
                      {"☆".repeat(5 - stars)}
                    </span>
                    <span className="font-bold text-white">{rating}</span>
                    <span className="text-zinc-500">/ 10</span>
                  </span>
                </>
              )}
            </div>

            {peli.genres?.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {peli.genres.map((genre) => (
                  <span
                    key={genre.id}
                    className="rounded-full border border-red-500/30 bg-red-600/10 px-3 py-1 text-xs font-semibold text-red-200"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>
            )}

            <div className="flex flex-wrap gap-3">
              <Link
                href="/planes"
                className="inline-flex items-center justify-center rounded-full bg-red-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-red-950/50 transition hover:bg-red-500"
              >
                Ver planes
              </Link>

              {trailer?.key && (
                <a
                  href="#trailer"
                  className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white transition hover:border-red-500/60 hover:bg-red-600/20"
                >
                  Ver trailer
                </a>
              )}
            </div>

            {peli.overview && (
              <div className="mt-2 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                <h2 className="mb-2 text-xs font-bold uppercase tracking-widest text-red-400">
                  Sinopsis
                </h2>
                <p className="max-w-xl text-sm leading-relaxed text-zinc-300">
                  {peli.overview}
                </p>
              </div>
            )}
          </div>
        </div>

        {trailer?.key ? (
          <div id="trailer" className="mt-12">
            <h2 className="mb-4 text-xs font-bold uppercase tracking-widest text-red-400">
              Tráiler oficial
            </h2>

            <div className="relative h-0 overflow-hidden rounded-2xl border border-white/10 pb-[56.25%] shadow-2xl shadow-black/80">
              <iframe
                className="absolute left-0 top-0 h-full w-full"
                src={`https://www.youtube-nocookie.com/embed/${trailer.key}?rel=0&modestbranding=1`}
                title={`Tráiler de ${peli.title}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          </div>
        ) : (
          <div className="mt-12 flex h-32 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03]">
            <p className="text-sm text-zinc-500">No hay tráiler disponible</p>
          </div>
        )}
      </div>

      <CajaComentarios />
    </div>
  );
}