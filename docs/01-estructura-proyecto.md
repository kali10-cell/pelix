# Estructura del Proyecto y App Router

## El App Router de Next.js

Next.js usa un sistema de **rutas basado en carpetas**. Cualquier archivo `page.jsx` dentro de `app/` se convierte automáticamente en una ruta de la aplicación.

```
app/
├── page.jsx              →  /
├── buscar/page.jsx       →  /buscar
├── favoritos/page.jsx    →  /favoritos
└── pelicula/[id]/page.jsx →  /pelicula/123, /pelicula/456, ...
```

No hace falta configurar ningún router. **La carpeta ES la ruta.**

## Archivos especiales

Dentro de `app/` hay algunos archivos con nombres reservados que Next.js trata de forma especial:

| Archivo | Para qué sirve |
|---|---|
| `page.jsx` | La página visible en esa ruta |
| `layout.jsx` | Envuelve todas las páginas del nivel y los niveles inferiores |
| `route.js` | Define un endpoint de API (no es una página) |

### El layout raíz (`app/layout.jsx`)

El layout raíz es el componente que envuelve **toda** la aplicación. En PepeFlix define el HTML base, la fuente y el sidebar:

```jsx
// app/layout.jsx
export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className="min-h-full bg-zinc-700 text-white">
        <aside className="fixed top-0 left-0 z-50 bg-zinc-800 w-full h-14 md:w-1/5 md:h-screen">
          <Navbar />
        </aside>

        <main className="flex flex-col items-center bg-zinc-700 pt-14 md:pt-0 md:ml-[20%]">
          {children}  {/* ← aquí se inyecta cada página */}
        </main>
      </body>
    </html>
  );
}
```

El `{children}` se sustituye por la `page.jsx` que corresponda a la ruta actual. El layout **no se vuelve a montar** al navegar entre páginas, solo cambia el `children`.

## Rutas dinámicas

Cuando el nombre de la carpeta va entre corchetes `[id]`, significa que ese segmento de la URL es variable:

```
app/pelicula/[id]/page.jsx
```

Esto captura cualquier URL del tipo `/pelicula/123`, `/pelicula/456`, etc. El valor `123` llega al componente dentro de `params`:

```jsx
// app/pelicula/[id]/page.jsx
export default async function FichaPelicula({ params }) {
  const { id } = await params;  // id = "123"

  const peli = await fetchPelicula(id)
  return <FichaPeliculaComponente peli={peli} />
}
```

> En Next.js 15+, `params` es una **Promise**, por eso usamos `await params`.

## Path aliases con jsconfig.json

El archivo `jsconfig.json` en la raíz define un alias `@/` que apunta a la raíz del proyecto:

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

Esto permite escribir imports limpios sin importar rutas relativas complicadas:

```jsx
// Sin alias (incómodo)
import Navbar from "../../components/Navbar"

// Con alias (limpio)
import Navbar from "@/components/Navbar"
```

## Resumen de archivos importantes

| Archivo | Qué hace |
|---|---|
| `app/layout.jsx` | Layout raíz: HTML, fuente, sidebar |
| `app/page.jsx` | Página de inicio con películas populares |
| `app/buscar/page.jsx` | Buscador de películas |
| `app/favoritos/page.jsx` | Lista de favoritos del usuario |
| `app/pelicula/[id]/page.jsx` | Ficha detalle de una película |
| `app/api/peliculas/route.js` | Endpoint API para obtener varias películas |
| `lib/tmdbApi.js` | Funciones fetch hacia la API de TMDB |
| `store/useFavoritasStorage.js` | Estado global de favoritos (Zustand) |
