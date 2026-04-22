# API Routes y Promise.all

## ¿Qué es un Route Handler (API Route)?

Un Route Handler es un endpoint de API que vive dentro de tu proyecto Next.js. Se crea poniendo un archivo `route.js` dentro de `app/api/`:

```
app/api/peliculas/route.js  →  POST /api/peliculas
```

La diferencia con un `page.jsx` es que **no devuelve HTML**, devuelve datos (JSON).

## ¿Cuándo usar un API Route?

- Cuando necesitas hacer fetch desde el **cliente** pero la API key no puede exponerse al navegador
- Cuando quieres hacer lógica en el servidor antes de devolver datos (filtrar, transformar, combinar)
- Cuando recibes datos desde el frontend (formularios, acciones del usuario)

En PepeFlix, `ContenedorPelisFavs` es un Client Component que necesita traer los datos de las películas favoritas. No puede llamar directamente a TMDB porque la API key estaría expuesta. Por eso llama a nuestro propio endpoint `/api/peliculas`.

## El código del Route Handler

```js
// app/api/peliculas/route.js

export async function POST(req) {
  const { ids } = await req.json()  // recibe: { ids: [3423432, 234324, 4324234] }

  const peliculas = await Promise.all(
    ids.map(async (id) => {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.API_KEY}`
      )
      return res.json()
    })
  )

  return Response.json(peliculas)  // devuelve: [{ id, title, ... }, ...]
}
```

### Anatomía del Route Handler

1. **El nombre de la función** define el método HTTP: `GET`, `POST`, `PUT`, `DELETE`...
2. **`req.json()`** lee el body de la petición como JSON
3. **`Response.json()`** devuelve la respuesta como JSON

## Promise.all: peticiones en paralelo

Esta es la parte más importante del archivo. Sin `Promise.all`, el código haría las peticiones **una por una**:

### ❌ Sin Promise.all (lento — secuencial)

```js
const peliculas = []
for (const id of ids) {
  const res = await fetch(`.../${id}`)  // espera a que termine antes de pasar al siguiente
  const data = await res.json()
  peliculas.push(data)
}
```

Si tienes 10 películas y cada petición tarda 200ms, esto tarda **2000ms (2 segundos)**.

```
id=1  →→→→ 200ms
              id=2  →→→→ 200ms
                            id=3  →→→→ 200ms
                                          ...
Total: 2000ms
```

### ✅ Con Promise.all (rápido — paralelo)

```js
const peliculas = await Promise.all(
  ids.map(async (id) => {
    const res = await fetch(`.../${id}`)
    return res.json()
  })
)
```

Con 10 películas y 200ms por petición, esto tarda **~200ms en total** porque todas las peticiones se lanzan a la vez.

```
id=1  →→→→ 200ms
id=2  →→→→ 200ms
id=3  →→→→ 200ms
...
Total: ~200ms (el tiempo de la más lenta)
```

### ¿Cómo funciona Promise.all?

```js
const promesas = ids.map(id => fetch(`.../${id}`))
// promesas = [Promise, Promise, Promise, ...]

const resultados = await Promise.all(promesas)
// Lanza todas las promesas a la vez
// Espera a que TODAS terminen
// Devuelve un array con todos los resultados, en el mismo orden
```

> **Importante**: `Promise.all` falla si **cualquiera** de las promesas falla. Si necesitas que fallen individualmente sin afectar al resto, usa `Promise.allSettled`.

## Cómo llama el cliente a este endpoint

```jsx
// components/ContenedorPelisFavs.jsx
useEffect(() => {
  const cargarFavoritas = async () => {
    const res = await fetch("/api/peliculas", {
      method: "POST",
      body: JSON.stringify({ ids: favoritas })  // envía los IDs favoritos
    })
    const data = await res.json()
    setPeliculasFavoritas(data)  // guarda las películas completas en estado local
  }

  if (favoritas.length) cargarFavoritas()
}, [favoritas])
```

El flujo completo es:

```
1. Usuario tiene favoritas = [123, 456, 789] en Zustand
2. ContenedorPelisFavs hace POST /api/peliculas con { ids: [123, 456, 789] }
3. El Route Handler llama a TMDB 3 veces en paralelo (Promise.all)
4. Devuelve [{ película 123 }, { película 456 }, { película 789 }]
5. El componente guarda los datos y renderiza las tarjetas
```

## Comparativa: API Route vs fetch directo

| | API Route (`/api/...`) | fetch directo en Server Component |
|---|---|---|
| **Dónde se ejecuta** | Servidor (en respuesta a petición cliente) | Servidor (al renderizar) |
| **Cuándo usarlo** | Peticiones desde componentes cliente | Datos para renderizar la página |
| **API key expuesta** | No ✅ | No ✅ |
| **Puede hacer lógica** | Sí (transformar, combinar datos) | Sí |
| **Necesita roundtrip extra** | Sí (cliente → servidor → TMDB → servidor → cliente) | No |
