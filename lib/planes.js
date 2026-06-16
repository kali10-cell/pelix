export const planes = {
  basic: {
    id: "basic",
    nombre: "Basic",
    precio: 699,
    calidad: "HD",
    pantallas: "1 pantalla",
    descripcion: "Para ver PepeFlix en un solo dispositivo.",
    destacado: false,
  },
  standard: {
    id: "standard",
    nombre: "Standard",
    precio: 1099,
    calidad: "Full HD",
    pantallas: "2 pantallas",
    descripcion: "El plan equilibrado para compartir en casa.",
    destacado: true,
  },
  premium: {
    id: "premium",
    nombre: "Premium",
    precio: 1599,
    calidad: "Ultra HD",
    pantallas: "4 pantallas",
    descripcion: "Máxima calidad y más pantallas simultáneas.",
    destacado: false,
  },
};

export function getPlan(planId) {
  return planes[planId] ?? null;
}

export function getPlanes() {
  return Object.values(planes);
}
