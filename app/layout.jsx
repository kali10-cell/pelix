import { Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata = {
  title: "PepeFlix | Películas populares",
  description: "Streaming de películas",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={`${outfit.className} h-full`}>
      <body className="min-h-full bg-black text-white">
        <aside className="fixed left-0 top-0 z-50 h-14 w-full bg-black md:h-screen md:w-1/5">
          <Navbar />
        </aside>

        <main className="flex min-h-screen flex-col items-center bg-black pt-14 md:ml-[20%] md:pt-0">
          {children}

          <section className="w-full px-6 pb-8">
            <div className="grid gap-8 rounded-2xl border border-red-900/40 bg-zinc-950 p-6 md:grid-cols-[1fr_220px] md:items-center">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-red-500 sm:text-sm">
                  ACCESO MÓVIL
                </p>

                <h2 className="mt-2 text-2xl font-bold text-white sm:text-4xl">
                  Escanea y abre Pelix
                </h2>

                <p className="mt-4 max-w-2xl text-sm leading-6 text-zinc-400 sm:text-base">
                  Escanea el código QR para acceder a Pelix desde tu móvil y
                  disfrutar de películas, favoritos y membresías premium.
                </p>

                <a
                  href="https://pelix-two.vercel.app/login"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-6 inline-flex items-center justify-center rounded-lg bg-red-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-700"
                >
                  Abrir Pelix
                </a>
              </div>

              <div className="mx-auto w-full max-w-44 rounded-3xl border border-red-900/40 bg-white p-3 shadow-lg sm:max-w-56 sm:p-4 md:max-w-none md:rounded-lg">
                <img
                  src="/pelix-qr.png"
                  alt="Código QR para abrir Pelix"
                  className="h-auto w-full"
                />
              </div>
            </div>
          </section>
        </main>
      </body>
    </html>
  );
}