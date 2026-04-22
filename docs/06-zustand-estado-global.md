# Estado Global con Zustand

## ¿Por qué necesitamos estado global?

Imagina este escenario en PepeFlix:
- El usuario da like a una película en `TarjetaPeli`
- Esa información tiene que estar disponible en `/favoritos`
- Y también en la tarjeta para saber si el corazón está relleno o vacío

Si solo usáramos `useState`, el estado vive dentro de un componente y **no se puede compartir** con otros. Para compartir estado entre componentes distantes necesitamos una solución de **estado global**.

## Zustand: estado global sin complejidad

Zustand es una librería de estado global para React. Es mucho más simple que Redux y tiene muy poco código repetitivo.

### Crear el store

```js
// store/useFavoritasStorage.js

import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useFavoritas = create(persist(
  set => ({
    // ── Estado ──────────────────────────────────
    favoritas: [],  // array de IDs: [123, 456, 789]

    // ── Acciones ────────────────────────────────
    añadirFavoritas: (idPeli) => set(state => ({
      favoritas: [...state.favoritas, idPeli]  // añadir sin mutar el array original
    })),

    eliminarFavoritas: (idPeli) => set(state => ({
      favoritas: state.favoritas.filter(f => f !== idPeli)  // quitar el ID
    }))
  }),
  {
    name: "favoritas-storage"  // clave en localStorage
  }
))
```

### Anatomía del store

```
create(            ← crea el store
  persist(         ← middleware: guarda en localStorage automáticamente
    set => ({
      favoritas: [],          ← estado inicial
      añadirFavoritas: ...,   ← acción que modifica el estado
      eliminarFavoritas: ..., ← acción que modifica el estado
    }),
    { name: "favoritas-storage" }  ← nombre de la clave en localStorage
  )
)
```

La función `set` actualiza el estado. Siempre recibe el estado anterior y devuelve el nuevo:

```js
set(state => ({
  favoritas: [...state.favoritas, idNuevo]
  //          ↑ copia el array original y añade el nuevo ID
}))
```

## Persist: localStorage automático

El middleware `persist` hace que el estado se guarde en `localStorage` automáticamente. Sin él:

```
Usuario añade película a favoritos
→ Estado en memoria: [123, 456]
→ Usuario recarga la página
→ Estado en memoria: []  ← ¡se pierde!
```

Con `persist`:

```
Usuario añade película a favoritos
→ Estado en memoria: [123, 456]
→ localStorage["favoritas-storage"]: "[123, 456]"
→ Usuario recarga la página
→ Zustand lee de localStorage automáticamente
→ Estado en memoria: [123, 456]  ← ¡se restaura!
```

Puedes verificarlo en DevTools: **Application → Local Storage → localhost:3000 → favoritas-storage**

## Usar el store en componentes

Para leer o escribir en el store, usas el hook `useFavoritas` que exportamos:

```jsx
// ✅ Buena práctica: selectores específicos
const favoritas = useFavoritas(state => state.favoritas)
const añadirFavoritas = useFavoritas(state => state.añadirFavoritas)
const eliminarFavoritas = useFavoritas(state => state.eliminarFavoritas)
```

El argumento que pasas se llama **selector**: una función que extrae exactamente lo que necesitas del store. Esto es importante para el rendimiento: el componente solo se re-renderiza cuando **esa parte específica** del estado cambia.

```jsx
// ❌ Mala práctica: suscribirse a todo el store
const store = useFavoritas()  // se re-renderiza con cualquier cambio del store
```

## Patrón en Like.jsx

```jsx
// components/Like.jsx
"use client"

export default function Like({ idPeli }) {
  const favoritas = useFavoritas(state => state.favoritas)
  const añadirFavoritas = useFavoritas(state => state.añadirFavoritas)
  const eliminarFavoritas = useFavoritas(state => state.eliminarFavoritas)

  const togglePeliFavorita = (idPeli) => {
    if (favoritas.includes(idPeli)) {
      eliminarFavoritas(idPeli)   // ya era favorita → quitar
    } else {
      añadirFavoritas(idPeli)     // no era favorita → añadir
    }
  }

  return (
    <button onClick={() => togglePeliFavorita(idPeli)}>
      <svg>
        <path
          // Si el ID está en favoritas → corazón relleno, si no → vacío
          className={favoritas.includes(idPeli) ? "fill-red-500" : "fill-red-500/20"}
        />
      </svg>
    </button>
  )
}
```

## Patrón en ContenedorPelisFavs.jsx

Este componente combina Zustand con `useEffect` y `useState`:

```jsx
// components/ContenedorPelisFavs.jsx
"use client"

export default function ContenedorPelisFavs() {
  // 1. Leer IDs de favoritas desde Zustand
  const favoritas = useFavoritas(state => state.favoritas)  // [123, 456, 789]

  // 2. Estado local para guardar los objetos completos de las películas
  const [peliculasFavoritas, setPeliculasFavoritas] = useState([])

  // 3. Cuando cambien los IDs de favoritas, traer los datos completos
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
  }, [favoritas])  // ← se ejecuta cada vez que favoritas cambia

  return (
    <section>
      {peliculasFavoritas.map(p => <TarjetaPeli key={p.id} peliData={p} />)}
    </section>
  )
}
```

### ¿Por qué necesitamos dos estados?

- `favoritas` (Zustand): array de IDs, como `[123, 456, 789]`. Es lo que persiste.
- `peliculasFavoritas` (useState): array de objetos película completos con título, poster, etc.

Zustand solo guarda los IDs porque son ligeros. Los datos completos los traemos desde la API cuando los necesitamos.

## Flujo completo de favoritos

```
1. Usuario hace click en ❤️ en TarjetaPeli
2. Like.jsx llama a añadirFavoritas(123)
3. Zustand actualiza favoritas: [123]
4. Zustand guarda en localStorage: "favoritas-storage" = "[123]"
5. ContenedorPelisFavs detecta el cambio (useEffect [favoritas])
6. Hace POST /api/peliculas con { ids: [123] }
7. API Route llama a TMDB y devuelve la película completa
8. setPeliculasFavoritas([{ id: 123, title: "...", poster: "..." }])
9. Se renderiza la TarjetaPeli en la página de favoritos
```
