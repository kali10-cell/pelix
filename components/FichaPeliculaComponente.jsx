import Image from "next/image";
import Link from "next/link";

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
    <div className="w-full min-h-screen">
      {/* Hero con backdrop */}
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
          <div className="w-full h-full bg-zinc-900" />
        )}
        {/* Gradientes */}
        <div className="absolute inset-0 bg-linear-to-t from-zinc-900 via-zinc-900/60 to-transparent" />
        <div className="absolute inset-0 bg-linear-to-r from-zinc-900/80 via-transparent to-transparent" />

        {/* Botón atrás */}
        <div className="absolute top-6 left-6">
          <Link
            href="/"
            className="flex items-center gap-2 bg-zinc-800/80 hover:bg-zinc-700 backdrop-blur-sm text-white text-sm font-medium px-4 py-2 rounded-full transition-all duration-200 border border-zinc-600/50"
          >
            ← Volver
          </Link>
        </div>
      </div>

      {/* Contenido principal — se superpone al hero */}
      <div className="relative -mt-48 px-6 pb-12 max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          {/* Poster */}
          {posterUrl && (
            <div className="shrink-0">
              <Image
                src={posterUrl}
                width={240}
                height={360}
                className="rounded-2xl shadow-2xl border border-zinc-700/50"
                alt={`Poster de ${peli.title}`}
              />
            </div>
          )}

          {/* Info */}
          <div className="flex flex-col gap-4 pt-4 md:pt-32">
            <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight">
              {peli.title}
            </h1>

            {peli.tagline && (
              <p className="text-zinc-400 italic text-sm">&ldquo;{peli.tagline}&rdquo;</p>
            )}

            {/* Metadatos */}
            <div className="flex flex-wrap items-center gap-3 text-sm text-zinc-400">
              {peli.release_date && (
                <span>{new Date(peli.release_date).getFullYear()}</span>
              )}
              {runtime && (
                <>
                  <span className="text-zinc-600">·</span>
                  <span>{runtime}</span>
                </>
              )}
              {peli.vote_count > 0 && (
                <>
                  <span className="text-zinc-600">·</span>
                  <span className="flex items-center gap-1">
                    <span className="text-yellow-400">
                      {"★".repeat(stars)}{"☆".repeat(5 - stars)}
                    </span>
                    <span className="text-zinc-300 font-medium">{rating}</span>
                    <span className="text-zinc-500">/ 10</span>
                  </span>
                </>
              )}
            </div>

            {/* Géneros */}
            {peli.genres?.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {peli.genres.map((genre) => (
                  <span
                    key={genre.id}
                    className="px-3 py-1 bg-zinc-700/80 border border-zinc-600/50 text-zinc-300 text-xs font-medium rounded-full"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>
            )}

            {/* Sinopsis */}
            {peli.overview && (
              <div className="mt-2">
                <h2 className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-2">
                  Sinopsis
                </h2>
                <p className="text-zinc-300 text-sm leading-relaxed max-w-xl">
                  {peli.overview}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Trailer */}
        {trailer?.key ? (
          <div className="mt-12">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-4">
              Tráiler oficial
            </h2>
            <div className="relative pb-[56.25%] h-0 overflow-hidden rounded-2xl shadow-2xl border border-zinc-700/50">
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src={`https://www.youtube-nocookie.com/embed/${trailer.key}?rel=0&modestbranding=1`}
                title={`Tráiler de ${peli.title}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          </div>
        ) : (
          <div className="mt-12 flex items-center justify-center h-32 rounded-2xl bg-zinc-800/50 border border-zinc-700/50">
            <p className="text-zinc-500 text-sm">No hay tráiler disponible</p>
          </div>
        )}
      </div>
    </div>
  );
}
