# Imágenes Optimizadas y SEO

## next/image: optimización automática

Next.js incluye un componente `<Image>` que optimiza las imágenes automáticamente. Usar `<img>` de HTML estándar funciona, pero pierdes todas estas ventajas:

| Característica | `<img>` HTML | `<Image>` Next.js |
|---|---|---|
| Lazy loading | Manual | Automático ✅ |
| Formato moderno (WebP/AVIF) | No | Automático ✅ |
| Redimensionado según pantalla | No | Automático ✅ |
| Evita el layout shift (CLS) | No | Automático ✅ |

### Uso básico en TarjetaPeli

```jsx
import Image from "next/image"

// Imagen con dimensiones conocidas
<Image
  src={`https://image.tmdb.org/t/p/w500${peliData.poster_path}`}
  width={500}
  height={750}
  alt={`Poster de ${peliData.title}`}
/>

// Imagen que rellena su contenedor (fill)
<div className="relative aspect-2/3 w-full">
  <Image
    className="object-cover"
    src={...}
    fill                // ← rellena el contenedor padre
    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
    alt={...}
  />
</div>
```

### El prop `sizes`

`sizes` le dice al navegador qué tamaño tendrá la imagen en función del ancho de pantalla. Esto permite descargar exactamente la resolución necesaria, no más:

```jsx
sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
//     ↑ en móvil (<640px): ocupa el 50% del viewport
//                            ↑ en tablet (<1024px): ocupa el 33%
//                                                    ↑ en desktop: ocupa el 25%
```

Sin `sizes`, el navegador descarga la imagen más grande disponible. Con `sizes`, descarga solo la que necesita. En un grid de 4 columnas en desktop, la imagen ocupa 25% de la pantalla, no 100%.

### Fallback para posters no encontrados

```jsx
src={peliData.poster_path
  ? `https://image.tmdb.org/t/p/w500${peliData.poster_path}`
  : "/poster-not-found.avif"  // imagen local de fallback
}
```

Si la película no tiene poster en TMDB, se muestra una imagen de reemplazo local.

## Permitir imágenes externas

Por seguridad, Next.js bloquea las imágenes de dominios externos por defecto. Hay que declarar explícitamente qué dominios están permitidos en `next.config.mjs`:

```js
// next.config.mjs
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'image.tmdb.org',  // ← permitir imágenes de TMDB
      }
    ],
  },
};
```

Si intentas cargar una imagen de un dominio no permitido, Next.js lanzará un error. Si añades una nueva fuente de imágenes, añádela aquí.

## Metadata estática

La metadata define el `<title>` y `<meta description>` que ve el navegador. Es importante para SEO (posicionamiento en buscadores) y para el texto que aparece al compartir un link.

En el layout raíz se define la metadata global:

```jsx
// app/layout.jsx
export const metadata = {
  title: "PepeFlix | Peliculas populares",
  description: "Streaming de películas",
};
```

Esto se aplica a todas las páginas que no definan su propia metadata. También puedes definirla en páginas individuales:

```jsx
// app/buscar/page.jsx
export const metadata = {
  title: "PepeFlix | Buscar",
  description: "Encuentra cualquier película",
};
```

## Metadata dinámica con generateMetadata

Para páginas dinámicas (como la ficha de una película), el título debe cambiar según el contenido. Exportas una función `generateMetadata` que hace fetch y devuelve el objeto de metadata:

```jsx
// app/pelicula/[id]/page.jsx

export async function generateMetadata({ params }) {
  const { id } = await params;
  const peli = await fetchPelicula(id)  // trae los datos de la película

  return {
    title: `Pepeflix | ${peli.title}`,  // "Pepeflix | The Dark Knight"
    description: peli.overview           // sinopsis de la película
  };
}

export default async function FichaPelicula({ params }) {
  const { id } = await params;
  const peli = await fetchPelicula(id)
  const trailer = await fetchPeliTrailer(id)
  return <FichaPeliculaComponente peli={peli} trailer={trailer} />
}
```

Next.js ejecuta `generateMetadata` antes de renderizar la página. El resultado aparece en el `<head>` del HTML.

> Puedes ver el título dinámico cambiando de película: cada una tiene su propio título en la pestaña del navegador.

## URL de imágenes de TMDB

TMDB ofrece imágenes en diferentes tamaños. El tamaño va en la URL:

```
https://image.tmdb.org/t/p/w500/poster.jpg   ← 500px de ancho
https://image.tmdb.org/t/p/w780/poster.jpg   ← 780px de ancho
https://image.tmdb.org/t/p/original/poster.jpg  ← tamaño original
```

En PepeFlix:
- Posters de tarjetas: `w500` (suficiente para tarjetas pequeñas)
- Backdrop de la ficha: `original` (ocupa toda la pantalla, necesita máxima calidad)
