# Tailwind CSS y Diseño Responsive

## ¿Qué es Tailwind CSS?

Tailwind es un framework de CSS "utility-first". En lugar de escribir clases como `.card` con sus propios estilos, usas clases pequeñas predefinidas directamente en el HTML:

```jsx
// CSS clásico
<div className="card">...</div>
// .card { background: #333; border-radius: 8px; padding: 16px; }

// Tailwind
<div className="bg-zinc-800 rounded-xl p-4">...</div>
```

## Mobile-First: la filosofía de Tailwind

Tailwind sigue el enfoque **mobile-first**: las clases sin prefijo definen el estilo para **móvil** (pantalla pequeña), y los prefijos como `md:` o `lg:` añaden estilos para pantallas más grandes.

```
sin prefijo  →  todos los tamaños (base mobile)
sm:          →  ≥ 640px
md:          →  ≥ 768px
lg:          →  ≥ 1024px
xl:          →  ≥ 1280px
```

Piénsalo como: "esto es así por defecto, EXCEPTO en pantallas grandes donde es así".

## El sidebar responsive del layout

El ejemplo más claro del proyecto es la barra de navegación en `app/layout.jsx`:

```jsx
<aside className="
  fixed top-0 left-0 z-50 bg-zinc-800
  w-full h-14          ← en móvil: barra superior (ancho completo, 56px de alto)
  md:w-1/5 md:h-screen ← en desktop: sidebar lateral (20% de ancho, altura completa)
">
  <Navbar />
</aside>

<main className="
  pt-14        ← en móvil: margen arriba para no tapar el contenido con la barra
  md:pt-0      ← en desktop: sin margen arriba
  md:ml-[20%]  ← en desktop: margen izquierdo para no tapar con el sidebar
">
  {children}
</main>
```

Resultado:
- **Móvil**: navbar fija arriba, contenido empieza debajo
- **Desktop**: sidebar fijo a la izquierda, contenido a la derecha

## Grid responsive para tarjetas

Las cuadrículas de películas también son responsive:

```jsx
// app/buscar/page.jsx
<section className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
  {data.results.map(p => <TarjetaPeli key={p.id} peliData={p} />)}
</section>
```

| Pantalla | Columnas |
|---|---|
| < 640px (móvil) | 2 columnas |
| ≥ 640px (sm) | 3 columnas |
| ≥ 1024px (lg) | 4 columnas |

## Hover effects con Tailwind

En `TarjetaPeli`, la tarjeta tiene un overlay que aparece al hacer hover. Esto se consigue combinando `group`, `group-hover:`, y `opacity`:

```jsx
<div className="relative group">  {/* ← "group" en el contenedor padre */}
  
  {/* Imagen de fondo */}
  <Image ... />

  {/* Overlay que aparece al hacer hover */}
  <div className="
    absolute inset-0 bg-black/60
    opacity-0                        ← invisible por defecto
    group-hover:opacity-100          ← visible cuando el grupo tiene hover
    transition-opacity duration-300  ← transición suave
  ">
    <span>Ver ficha</span>
    <p>{peliData.overview}</p>
  </div>

</div>
```

La clase `group` se pone en el padre. Luego en los hijos usas `group-hover:` para aplicar estilos cuando el padre tiene hover. Esto es útil cuando el área de hover es más grande que el elemento que quieres cambiar.

## Posicionamiento absoluto para el botón Like

El botón de like se superpone sobre la imagen usando `absolute`:

```jsx
<div className="relative group">  {/* ← relative: referencia para los absolute hijos */}

  <Link href={...}>
    <article>...</article>
  </Link>

  {/* Fuera del Link para no activar la navegación al hacer click */}
  <div className="absolute top-2 right-2 z-10">  {/* ← posición: arriba-derecha */}
    <Like idPeli={peliData.id} />
  </div>

</div>
```

- `relative` en el padre: establece el contexto de posicionamiento
- `absolute` en el hijo: se posiciona relativo al padre `relative` más cercano
- `top-2 right-2`: 8px desde arriba y desde la derecha
- `z-10`: asegura que se muestre encima de otros elementos

## Degradado sobre la imagen

El texto del título se muestra sobre un degradado oscuro en la parte inferior de la imagen:

```jsx
{/* Gradiente de oscuro abajo a transparente arriba */}
<div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent" />

{/* Texto encima del gradiente */}
<div className="absolute bottom-0 left-0 right-0 p-3">
  <h2 className="text-white font-semibold text-sm">{peliData.title}</h2>
</div>
```

- `bg-linear-to-t`: gradiente de abajo hacia arriba
- `from-black/90`: comienza con negro 90% opaco
- `via-black/20`: pasa por negro 20% opaco
- `to-transparent`: termina transparente

## Aspect ratio para posters

Los pósters de películas tienen proporción 2:3 (más altos que anchos). Se garantiza con:

```jsx
<div className="relative aspect-2/3 w-full">
  <Image fill ... />
</div>
```

`aspect-2/3` aplica `aspect-ratio: 2 / 3`. La imagen con `fill` se expande para cubrir todo el contenedor.

## Clases de color del proyecto

| Clase | Color |
|---|---|
| `bg-zinc-700` | Fondo principal (gris oscuro) |
| `bg-zinc-800` | Sidebar y tarjetas (gris más oscuro) |
| `text-zinc-400` | Texto secundario (gris claro) |
| `bg-red-700` | Botones de acción y acento |
| `text-yellow-400` | Estrella de rating |
