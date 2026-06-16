import Image from "next/image";
import Link from "next/link";
import ContenedorPelis from "@/components/ContenedorPelis";

export default async function Home() {
  return (
    <div className="w-full px-6 py-8 flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold text-white tracking-tight">
          Películas destacadas
        </h1>
        <p className="text-zinc-400 text-sm">
          Las más populares del momento
        </p>
      </div>

      <ContenedorPelis />

      <section className="grid gap-8 rounded-2xl border border-red-900/40 bg-zinc-950 p-6 md:grid-cols-[1fr_220px] md:items-center">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-red-500 sm:text-sm">
            ACCESO MÓVIL
          </p>

          <h2 className="mt-2 text-2xl font-bold text-white sm:text-4xl">
            Escanea y abre Pelix
          </h2>

          <p className="mt-4 max-w-2xl text-sm leading-6 text-zinc-400 sm:text-base">
            Escanea el código QR para acceder a Pelix desde tu móvil y disfrutar
            de películas, favoritos y membresías premium.
          </p>

          <Link
            href="https://pelix-two.vercel.app/login"
            target="_blank"
            className="mt-6 inline-flex items-center justify-center rounded-lg bg-red-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-700"
          >
            Abrir Pelix
          </Link>
        </div>

        <div className="mx-auto w-full max-w-44 rounded-3xl border border-red-900/40 bg-white p-3 shadow-lg sm:max-w-56 sm:p-4 md:max-w-none md:rounded-lg">
          <Image
            src="/pelix-qr.png"
            alt="Código QR para abrir Pelix"
            width={512}
            height={512}
            className="h-auto w-full"
          />
        </div>
      </section>
    </div>
  );
}