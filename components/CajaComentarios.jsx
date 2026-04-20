export default function CajaComentarios() {

    async function enviarFormulario(dataFormulario) {
        "use server"
        const comentario = dataFormulario.get("caja-comentarios")
        console.log("El comentario del usuario es: " + comentario)
    }

    return (
        <form action={enviarFormulario} className="flex flex-col p-4 gap-4">

            <textarea name="caja-comentarios" id="" placeholder="Escribe tu opinión..."></textarea>
            <button className="bg-red-800 p-4 rounded-sm">Enviar Comentario</button>
        </form>
    )
}