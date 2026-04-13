import { Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata = {
  title: "PepeFlix | Peliculas populares",
  description: "Streaming de películas",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={`${outfit.className} h-full`}>
      <body className="min-h-full bg-zinc-700 text-white">
        {/* Sidebar en desktop / barra superior en móvil */}
        <aside className="
          fixed top-0 left-0 z-50 bg-zinc-800
          w-full h-14 md:w-1/5 md:h-screen
        ">
          <Navbar />
        </aside>

        {/* Contenido — margen superior en móvil, margen izquierdo en desktop */}
        <main className="
          flex flex-col items-center bg-zinc-700
          pt-14 md:pt-0 md:ml-[20%]
        ">
          {children}
        </main>
      </body>
    </html>
  );
}
