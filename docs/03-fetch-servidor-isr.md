# Fetch de Datos en el Servidor e ISR

## Fetch en Server Components: sin useEffect

En React clásico, para traer datos de una API hacías esto:

```jsx
// ❌ Patrón React clásico (NO lo usamos en Next.js para la mayoría de casos)
function MiComponente() {
  const [datos, setDatos] = useState(null)

  useEffect(() => {
    fetch('/api/...')
      .then(res => res.json())
      .then(data => setDatos(data))
  }, [])

  return <div>{datos?.titulo}</div>
}
```

Con los Server Components de Next.js puedes hacer esto directamente:

```jsx
// ✅ Patrón Next.js moderno
async function MiComponente() {
  const datos = await fetch('https://api.ejemplo.com/datos').then(r => r.json())

  return <div>{datos.titulo}</div>
}
```

El fetch ocurre **en el servidor**, antes de que el usuario reciba nada. El HTML ya llega con los datos incluidos.

## El código real de PepeFlix

Todas las funciones de fetch están en `lib/tmdbApi.js`:

```js
// lib/tmdbApi.js

export async function fetchPeliculasPopulares() {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.API_KEY}`,
    { next: { revalidate: 60 } }  // ← ISR: cachear 60 segundos
  );
  if (!res.ok) throw new Error(`Error: ${res.status}`);
  const data = await res.json();
  return data;
}

export async function fetchBusqueda(query) {
  const res = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${process.env.API_KEY}&query=${encodeURIComponent(query)}&language=es-ES`
  );
  if (!res.ok) throw new Error(`Error: ${res.status}`);
  return res.json();
}
```

Y se usan directamente en las páginas (que son Server Components):

```jsx
// app/buscar/page.jsx
export default async function Buscar({ searchParams }) {
  const { q } = await searchParams;
  const data = q ? await fetchBusqueda(q) : null;

  return (
    <div>
      <BarraBusqueda />
      {data?.results?.map(p => <TarjetaPeli key={p.id} peliData={p} />)}
    </div>
  );
}
```

## ISR: Incremental Static Regeneration

ISR es una característica clave de Next.js. Permite que una página se sirva **de caché** (muy rápido) pero se **regenere automáticamente** cada cierto tiempo.

```js
const res = await fetch(url, {
  next: { revalidate: 60 }  // regenerar cada 60 segundos
})
```

### ¿Cómo funciona?

```
Primera visita (segundo 0):
  → Next.js hace fetch a TMDB
  → Guarda el resultado en caché
  → Sirve la página al usuario

Visitas mientras el caché es válido (segundos 1-60):
  → Next.js sirve la página desde caché (instantáneo)
  → No hace ninguna petición a TMDB

Primera visita después de los 60s:
  → Next.js sirve la caché antigua al usuario (rápido)
  → En segundo plano regenera la página
  → Las siguientes visitas ya verán el nuevo contenido
```

### Sin revalidate vs con revalidate

```js
// Sin opciones → Next.js decide (caché agresivo en producción)
await fetch(url)

// Con revalidate: 60 → ISR, refresca cada minuto
await fetch(url, { next: { revalidate: 60 } })

// Sin caché → datos siempre frescos (más lento)
await fetch(url, { cache: 'no-store' })
```

En PepeFlix, las películas populares cambian poco, por eso usamos 60 segundos. La ficha de una película usa `no-store` implícito (sin configuración) porque puede cambiar (nuevos ratings, etc.).

## searchParams en páginas de búsqueda

`searchParams` es un objeto que contiene los parámetros de la URL. En `/buscar?q=batman`, sería `{ q: "batman" }`.

```jsx
// app/buscar/page.jsx
export default async function Buscar({ searchParams }) {
  const { q } = await searchParams  // En Next.js 15+, searchParams es una Promise

  // Si hay query, buscar. Si no, no hacer fetch.
  const data = q ? await fetchBusqueda(q) : null

  return (
    <div>
      {q ? (
        // Hay resultados
        data?.results?.map(p => <TarjetaPeli key={p.id} peliData={p} />)
      ) : (
        // Estado vacío
        <p>Escribe algo para buscar</p>
      )}
    </div>
  );
}
```

> En Next.js 15+, tanto `params` como `searchParams` son Promises. Siempre usa `await` al leerlos.

## generateMetadata también puede hacer fetch

La función `generateMetadata` también se ejecuta en el servidor y puede llamar a la API para generar el título/descripción de la página dinámicamente:

```jsx
// app/pelicula/[id]/page.jsx
export async function generateMetadata({ params }) {
  const { id } = await params;
  const peli = await fetchPelicula(id)  // ← fetch en el servidor
  return {
    title: `Pepeflix | ${peli.title}`,
    description: peli.overview
  };
}
```

Esto hace que cada página de película tenga su propio título en la pestaña del navegador y mejora el SEO.

## Comparativa: fetch servidor vs fetch cliente

| | Servidor (Server Component) | Cliente (useEffect) |
|---|---|---|
| **Velocidad inicial** | Más rápido (HTML llega con datos) | Más lento (página carga vacía, luego pide datos) |
| **SEO** | Excelente (bots ven el contenido) | Malo (bots ven página vacía) |
| **Usa hooks** | No | Sí |
| **Puede usar variables de entorno secretas** | Sí ✅ | No ❌ (se exponen al navegador) |
| **Cuándo usarlo** | Datos iniciales de la página | Datos que cambian por interacción del usuario |

En PepeFlix, usamos fetch en servidor para cargar las películas iniciales, y fetch en cliente (en `ContenedorPelisFavs`) porque los favoritos dependen de la interacción del usuario y del estado de Zustand.
