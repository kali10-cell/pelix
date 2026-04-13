import { Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";


const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"]
});

export const metadata = {
  title: "PepeFlix",
  description: "Streaming de películas",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="es"
      className={`${outfit.className} h-full`}
    >
      <body className="min-h-full flex  bg-zinc-700 text-white">
        <aside className="w-1/5 bg-zinc-800 text-white fixed min-h-screen top-0 left-0">
          <Navbar />
        </aside>
        <main className="w-4/5 flex flex-col items-center bg-zinc-700 text-white ml-[20%]">
          {children}
        </main>
      </body>
    </html>
  );
}
