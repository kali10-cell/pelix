# Server Actions

## ¿Qué es un Server Action?

Un Server Action es una **función que se ejecuta en el servidor** pero que puedes llamar desde un componente (incluso desde el cliente). Se declara con la directiva `"use server"`.

Es la forma que tiene Next.js de manejar formularios y mutaciones de datos sin necesidad de crear un API Route manualmente.

## El código en PepeFlix

```jsx
// components/CajaComentarios.jsx

export default function CajaComentarios() {

  async function enviarFormulario(dataFormulario) {
    "use server"  // ← esta función se ejecuta en el servidor
    const comentario = dataFormulario.get("caja-comentarios")
    console.log("El comentario del usuario es: " + comentario)
    // Aquí podrías guardar el comentario en una base de datos
  }

  return (
    <form action={enviarFormulario}>
      <textarea name="caja-comentarios" placeholder="Escribe tu opinión..." />
      <button>Enviar Comentario</button>
    </form>
  )
}
```

## ¿Cómo funciona?

La clave está en que el `<form>` recibe la función como `action`:

```jsx
<form action={enviarFormulario}>
```

Cuando el usuario envía el formulario, Next.js:
1. Serializa los datos del formulario
2. Los envía al servidor automáticamente
3. Ejecuta `enviarFormulario` en el servidor
4. El componente recibe un objeto `FormData` con todos los campos

Para leer un campo del formulario, usas `dataFormulario.get("nombre-del-campo")`:

```js
// El "nombre-del-campo" corresponde al atributo name del input
const comentario = dataFormulario.get("caja-comentarios")
//                                                  ↑
//                                    <textarea name="caja-comentarios">
```

## La directiva `"use server"`

`"use server"` puede ir:

- **Dentro de una función** (como en el ejemplo): solo esa función es un Server Action
- **Al principio del archivo**: todas las funciones exportadas del archivo son Server Actions

```js
// Opción 1: directiva en la función (lo que usa PepeFlix)
async function miAction(formData) {
  "use server"
  // ...
}

// Opción 2: directiva en el archivo (útil para agrupar actions)
"use server"

export async function crearComentario(formData) { /* ... */ }
export async function borrarComentario(id) { /* ... */ }
```

## Ventajas de los Server Actions

- **Sin API Route**: no necesitas crear `app/api/comentarios/route.js`
- **Funciona sin JavaScript**: el formulario HTML nativo funciona incluso si el JS del cliente falla
- **Acceso directo al servidor**: puedes escribir en base de datos, leer archivos, etc.
- **Seguro**: el código del servidor nunca llega al navegador

## Cuándo usar Server Action vs API Route

| | Server Action | API Route |
|---|---|---|
| **Uso típico** | Formularios, mutaciones | Peticiones desde JS del cliente |
| **Cómo se llama** | `<form action={fn}>` o `fn(data)` | `fetch("/api/...")` |
| **Requiere JS** | No (formulario HTML nativo) | Sí |
| **Cuándo elegirlo** | Envío de datos del usuario | Operaciones más complejas, paginación, batch |

En PepeFlix, los comentarios usan Server Action porque son un formulario simple. Los favoritos usan API Route porque se gestionan desde el estado de Zustand en el cliente y necesitan peticiones dinámicas.
