# Hooks y Navegación

## useState y useEffect en el proyecto

Los hooks de React solo funcionan en **Client Components** (con `"use client"`).

### useState

`useState` crea un estado local en un componente. Cuando el estado cambia, el componente se re-renderiza.

En `ContenedorPelisFavs` se usa para guardar las películas cargadas desde la API:

```jsx
const [peliculasFavoritas, setPeliculasFavoritas] = useState([])
//     ↑ valor actual         ↑ función para cambiarlo   ↑ valor inicial
```

Y en `BarraBusqueda` para el texto del input:

```jsx
// Inicializar con lo que ya hay en la URL (si el usuario viene de un link compartido)
const [texto, setTexto] = useState(searchParams.get("q") ?? "")
//                                  ↑ lee el param "q" de la URL
//                                                          ↑ si es null, usa ""
```

El operador `??` (nullish coalescing) devuelve el valor de la derecha si el de la izquierda es `null` o `undefined`.

### useEffect

`useEffect` ejecuta código como efecto secundario después de que el componente se renderiza. Acepta un **array de dependencias** que controla cuándo se ejecuta:

```jsx
// En ContenedorPelisFavs:
useEffect(() => {
  const cargarFavoritas = async () => {
    const res = await fetch("/api/peliculas", {
      method: "POST",
      body: JSON.stringify({ ids: favoritas })
    })
    const data = await res.json()
    setPeliculasFavoritas(data)
  }

  if (favoritas.length) cargarFavoritas()
}, [favoritas])  // ← se ejecuta cuando `favoritas` cambia
```

| Array de dependencias | Cuándo se ejecuta el efecto |
|---|---|
| `[]` (vacío) | Solo al montar el componente (una vez) |
| `[favoritas]` | Al montar + cada vez que `favoritas` cambia |
| Sin array | Después de cada render (casi nunca se usa) |

## Hooks de navegación de Next.js

Next.js incluye sus propios hooks para trabajar con la URL. Solo funcionan en Client Components.

```jsx
import { useRouter, usePathname, useSearchParams } from "next/navigation"
```

### useRouter

Permite **navegar programáticamente** (sin que el usuario haga click en un `<Link>`):

```jsx
const router = useRouter()

// Navegar a una ruta
router.push("/buscar?q=batman")

// Volver atrás
router.back()

// Refrescar la página actual
router.refresh()
```

### usePathname

Devuelve la ruta actual como string:

```jsx
const pathname = usePathname()
// Si estás en /buscar → pathname = "/buscar"
// Si estás en /pelicula/123 → pathname = "/pelicula/123"
```

### useSearchParams

Da acceso a los parámetros de búsqueda de la URL (lo que va después del `?`):

```jsx
const searchParams = useSearchParams()
// Si la URL es /buscar?q=batman&pagina=2:
searchParams.get("q")       // "batman"
searchParams.get("pagina")  // "2"
searchParams.get("otro")    // null (no existe)
```

## Patrón "URL como estado" en BarraBusqueda

Este es un patrón muy valioso que combina los tres hooks anteriores. La idea es **usar la URL como fuente de verdad** en lugar de solo el estado local.

```jsx
// components/BarraBusqueda.jsx
"use client"

export default function BarraBusqueda() {
  const router = useRouter()
  const pathname = usePathname()    // → "/buscar"
  const searchParams = useSearchParams()

  // Inicializar el input con lo que ya hay en la URL
  const [texto, setTexto] = useState(searchParams.get("q") ?? "")

  function buscar() {
    if (!texto.trim()) return  // no buscar si está vacío

    // Construir la nueva URL con el parámetro q
    const params = new URLSearchParams(searchParams)  // copia los params existentes
    params.set("q", texto.trim())                     // añade/actualiza "q"
    router.push(`${pathname}?${params.toString()}`)   // navega a /buscar?q=batman
  }

  return (
    <div>
      <input
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && buscar()}
      />
      <button onClick={buscar}>🔍</button>
    </div>
  )
}
```

### ¿Por qué usar la URL en lugar de solo useState?

```
Con solo useState:
  Usuario busca "batman" → URL sigue siendo /buscar
  Usuario copia y comparte el link → el receptor ve /buscar vacío
  Usuario recarga → la búsqueda desaparece

Con URL como estado:
  Usuario busca "batman" → URL cambia a /buscar?q=batman
  Usuario copia y comparte el link → el receptor también ve los resultados de batman
  Usuario recarga → la búsqueda se mantiene (se lee de la URL al montar)
```

La URL es **persistente** y **compartible**. Úsala como estado cuando quieras que el estado sobreviva a recargas o se pueda compartir.

### El flujo completo de búsqueda

```
1. Usuario escribe "batman" en el input
   → setTexto("batman") actualiza el estado local

2. Usuario hace click en el botón (o pulsa Enter)
   → buscar() construye /buscar?q=batman
   → router.push() navega a esa URL

3. Next.js detecta el cambio de URL
   → Llama a app/buscar/page.jsx con searchParams = { q: "batman" }
   → page.jsx llama a fetchBusqueda("batman")
   → Renderiza los resultados
```
