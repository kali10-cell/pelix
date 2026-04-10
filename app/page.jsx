import ContenedorPelis from "@/components/ContenedorPelis";

export default async function Home() {

  return (
    <>
      <h1 className="py-6 uppercase text-3xl">Películas destacadas</h1>
      <ContenedorPelis />

    </>
  );
}
