# Server Components vs Client Components

Esta es una de las ideas más importantes de Next.js moderno. Entenderla bien cambia cómo piensas en el rendimiento y la arquitectura de una app.

## La pregunta clave: ¿dónde se ejecuta el código?

En Next.js, cada componente puede ejecutarse en uno de dos sitios:

| | Server Component | Client Component |
|---|---|---|
| **Dónde se ejecuta** | En el servidor (Node.js) | En el navegador del usuario |
| **Por defecto** | Sí ✅ | No, hay que declararlo explícitamente |
| **Cómo declararlo** | No hace falta nada | Añadir `"use client"` al principio del archivo |
| **Puede hacer fetch** | Sí ✅ | Sí (con useEffect) |
| **Puede usar hooks** | No ❌ | Sí ✅ |
| **Puede usar eventos** | No ❌ (onClick, onChange...) | Sí ✅ |
| **Puede usar localStorage** | No ❌ | Sí ✅ |
| **Se envía JS al navegador** | No (solo HTML) | Sí |

## Regla práctica

> **Usa Server Component por defecto. Solo cambia a Client Component cuando necesites: hooks, eventos de usuario, o APIs del navegador (localStorage, window...).**

## Ejemplo en PepeFlix: TarjetaPeli + Like

`TarjetaPeli` es un Server Component. Muestra la información de la película que le llega como prop. No necesita ningún hook ni evento propio.

`Like` es un Client Component porque necesita:
- Leer el store de Zustand (`useFavoritas`)
- Responder a `onClick`

```jsx
// components/TarjetaPeli.jsx — Server Component (sin "use client")
export default function TarjetaPeli({ peliData }) {
  return (
    <div className="relative group">
      <Link href={`/pelicula/${peliData.id}`}>
        <article>
          {/* ... imagen, título, rating ... */}
        </article>
      </Link>

      {/* Like es un Client Component anidado dentro de un Server Component */}
      <div className="absolute top-2 right-2 z-10">
        <Like idPeli={peliData.id} />
      </div>
    </div>
  );
}
```

```jsx
// components/Like.jsx — Client Component
"use client"

export default function Like({ idPeli }) {
  const favoritas = useFavoritas(state => state.favoritas)
  const añadirFavoritas = useFavoritas(state => state.añadirFavoritas)
  const eliminarFavoritas = useFavoritas(state => state.eliminarFavoritas)

  const togglePeliFavorita = (idPeli) => {
    if (favoritas.includes(idPeli)) {
      eliminarFavoritas(idPeli)
    } else {
      añadirFavoritas(idPeli)
    }
  }

  return (
    <button onClick={() => togglePeliFavorita(idPeli)}>
      {/* corazón */}
    </button>
  )
}
```

**Esto es un patrón muy importante**: un Server Component puede incluir Client Components como hijos. El límite server/client solo se define donde pones `"use client"`.

## Componentes del proyecto y su tipo

| Componente | Tipo | Por qué |
|---|---|---|
| `Navbar` | Server | Solo muestra links, sin interactividad |
| `TarjetaPeli` | Server | Solo muestra datos que recibe como props |
| `ContenedorPelis` | Server | Hace fetch directamente |
| `FichaPeliculaComponente` | Server | Muestra datos, sin estado |
| `CajaComentarios` | Server | Usa Server Action, no necesita estado cliente |
| `Like` | **Client** | Necesita Zustand + onClick |
| `BarraBusqueda` | **Client** | Necesita useState, useRouter, useSearchParams |
| `ContenedorPelisFavs` | **Client** | Necesita useState, useEffect, Zustand |

## ¿Por qué importa esto?

Los Server Components **no envían JavaScript al navegador**. Solo envían HTML ya renderizado. Esto hace que las páginas carguen más rápido y sean más ligeras.

Los Client Components sí envían su código JavaScript al navegador para poder ser interactivos.

Por eso la regla: empieza con Server, añade `"use client"` solo cuando lo necesites de verdad.
