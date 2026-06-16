const SUPABASE_PELIS_TABLES = ["pelis", "pelis_order", "pelis order"];

function getSupabaseConfig() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!url || !key) return null;

  return { url, key };
}

function getTmdbId(row) {
  return (
    row.tmdb_id ??
    row.tmdbId ??
    row.movie_id ??
    row.pelicula_id ??
    row.id_tmdb ??
    row.id
  );
}

async function fetchPelisFromTable(config, table) {
  const url = new URL(`/rest/v1/${table}`, config.url);
  url.searchParams.set("select", "*");
  url.searchParams.set("order", "order.asc");

  const res = await fetch(url, {
    headers: {
      apikey: config.key,
      Authorization: `Bearer ${config.key}`,
    },
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    return null;
  }

  const rows = await res.json();
  return rows.map(getTmdbId).filter(Boolean);
}

export async function fetchPelisOrdenadas() {
  const config = getSupabaseConfig();
  if (!config) return [];

  for (const table of SUPABASE_PELIS_TABLES) {
    const ids = await fetchPelisFromTable(config, table);
    if (ids?.length) return ids;
  }

  return [];
}
