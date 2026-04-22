# PepeFlix - Guía del Proyecto

PepeFlix es un clon de Netflix construido con **Next.js** que consume la API pública de TMDB (The Movie Database). Lo usamos como proyecto de aprendizaje para ver en acción los conceptos más importantes del desarrollo web moderno.

## Stack tecnológico

| Herramienta | Para qué sirve |
|---|---|
| **Next.js 15+** | Framework fullstack (páginas, API, Server Actions) |
| **React 19** | Librería de UI (componentes, hooks) |
| **Zustand** | Estado global (favoritos) |
| **Tailwind CSS v4** | Estilos y diseño responsive |
| **TMDB API** | Base de datos de películas |

## Cómo arrancar el proyecto

### 1. Variables de entorno
Crea un archivo `.env.local` en la raíz del proyecto con tu API Key de TMDB:

```
API_KEY=tu_api_key_de_tmdb
```

> Puedes obtener una API key gratis en [themoviedb.org](https://www.themoviedb.org/settings/api)

### 2. Instalar dependencias y arrancar

```bash
npm install
npm run dev
```

Abre `http://localhost:3000` en el navegador.

## Mapa del proyecto

```
pepeflix-ejemplo/
├── app/                    # Páginas y API (App Router de Next.js)
│   ├── layout.jsx          # Layout raíz (navbar + main)
│   ├── page.jsx            # Página de inicio (/)
│   ├── buscar/page.jsx     # Buscador (/buscar?q=...)
│   ├── favoritos/page.jsx  # Favoritos (/favoritos)
│   ├── pelicula/[id]/      # Ficha de película (/pelicula/123)
│   └── api/peliculas/      # Endpoint POST para batch de películas
│
├── components/             # Componentes reutilizables
│   ├── Navbar.jsx
│   ├── TarjetaPeli.jsx
│   ├── Like.jsx
│   ├── BarraBusqueda.jsx
│   ├── ContenedorPelis.jsx
│   ├── ContenedorPelisFavs.jsx
│   ├── FichaPeliculaComponente.jsx
│   └── CajaComentarios.jsx
│
├── lib/
│   └── tmdbApi.js          # Funciones para llamar a la API de TMDB
│
└── store/
    └── useFavoritasStorage.js  # Store de Zustand (favoritos)
```

## Flujo de datos principal

```
Usuario visita /
    → app/page.jsx (Server Component)
        → ContenedorPelis (Server Component)
            → fetchPeliculasPopulares() en lib/tmdbApi.js
                → API de TMDB
            → Renderiza TarjetaPeli[] (Server Component)
                → Cada tarjeta incluye Like (Client Component)
                    → Lee/escribe en Zustand store
```

## Índice de temas

| # | Tema | Archivo |
|---|------|---------|
| 01 | Estructura del proyecto y App Router | `01-estructura-proyecto.md` |
| 02 | Server Components vs Client Components | `02-server-vs-client-components.md` |
| 03 | Fetch de datos en el servidor e ISR | `03-fetch-servidor-isr.md` |
| 04 | API Routes y Promise.all | `04-api-routes-promise-all.md` |
| 05 | Server Actions | `05-server-actions.md` |
| 06 | Estado global con Zustand | `06-zustand-estado-global.md` |
| 07 | Hooks y navegación | `07-hooks-navegacion.md` |
| 08 | Tailwind CSS y diseño responsive | `08-tailwind-responsive.md` |
| 09 | Imágenes optimizadas y SEO | `09-imagenes-metadata-seo.md` |
