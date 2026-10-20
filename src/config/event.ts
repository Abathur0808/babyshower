/**
 * CONFIGURACIÓN CENTRAL DEL EVENTO — Te Hice Esto
 * --------------------------------------------------
 * Edita únicamente este archivo cuando lleguen los datos reales.
 * Los campos vacíos ("") muestran estados "por confirmar" en la invitación;
 * ningún botón ni cuenta regresiva funcionará con datos inventados.
 */
export const eventConfig = {
  /** Nombre del bebé. Vacío = se muestra texto genérico en el hero. */
  babyName: "",

  /** Nombres de los futuros padres, p. ej. "Ana & Luis". Vacío = se omite. */
  parents: "",

  /**
   * Fecha y hora de inicio en formato ISO 8601 con zona horaria local.
   * Ejemplo: "2026-04-18T15:00:00-03:00"
   * Vacío = la cuenta regresiva muestra "fecha por confirmar".
   */
  eventDateISO: "2026-12-05T19:30:00-03:00",

  /** Texto legible de fecha/hora si prefieres mostrarlo distinto al ISO. Vacío = se deriva de eventDateISO. */
  displayDate: "",
  displayTime: "7:30 PM",

  /** Nombre del lugar y dirección para Google Maps. */
  venueName: "",
  address: "Luis Cruz Martines 1316",

  /**
   * Contactos de WhatsApp para confirmar asistencia (mamá y papá).
   * Número en formato internacional, solo dígitos (sin "+", espacios ni guiones).
   * Ejemplo: "59899123456". Vacío = ese botón queda deshabilitado.
   * (wa.me solo permite un número por enlace: un botón por persona.)
   */
  whatsappContacts: [
    { name: "Mamá", number: "" },
    { name: "Papá", number: "" },
  ],

  /** Mensaje predefinido para la confirmación por WhatsApp. */
  whatsappMessage:
    "¡Hola! Quiero confirmar mi asistencia al Baby Shower. ¡Muchas gracias por la invitación!",

  /** Fecha límite para confirmar asistencia, texto libre. Ej.: "10 de abril". Vacío = se omite. */
  rsvpDeadline: "25 de noviembre",

  /**
   * Enlace a lista de regalos externa (ej. tienda o formulario).
   * Vacío = el botón "Sugerencia de Regalo" despliega el texto de giftSuggestions.
   */
  giftUrl: "",

  /** Texto de la lista de deseos que se despliega al tocar el botón. */
  giftSuggestions: `🎁 Lista de deseos para nuestro bebé 🩵

Si deseas regalarnos algo para esta nueva aventura, algunas cositas que nos vendrían muy bien son:

✨ Ropita de 3 a 6 meses.
✨ Pañales talla M en adelante.
✨ Bodys en colores neutros.
✨ Calcetinitos.
✨ Kits de higiene para bebé.

Y, por supuesto, ¡cualquier regalito que nazca de tu cariño será siempre bienvenido! Lo más importante es compartir contigo esta hermosa etapa y recibir todo el amor con el que quieras acompañarnos. 🩵☁️`,

  /** Mensaje personalizado de los anfitriones. */
  personalMessage:
    "Un pequeño guerrero está en camino y queremos celebrarlo contigo.",

  /**
   * Ruta de la pista de audio dentro de /public, p. ej. "/audio/baby-goku-theme.mp3".
   * Vacío = controles de audio deshabilitados. Usa solo música autorizada.
   */
  audioSrc: "/audio/angeles-fuimos.mp3",
} as const;

/** Contactos con URL wa.me (mensaje codificado) listos para usar; se omiten los sin número. */
export function whatsappContacts(): { name: string; url: string }[] {
  return eventConfig.whatsappContacts
    .map((c) => ({
      name: c.name,
      digits: c.number.replace(/\D/g, ""),
    }))
    .filter((c) => c.digits.length >= 8)
    .map((c) => ({
      name: c.name,
      url: `https://wa.me/${c.digits}?text=${encodeURIComponent(
        eventConfig.whatsappMessage
      )}`,
    }));
}

/** URL de Google Maps para la dirección configurada, o null si falta. */
export function mapsUrl(): string | null {
  if (!eventConfig.address.trim()) return null;
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    eventConfig.address
  )}`;
}

/** Fecha del evento como Date válida, o null si no está configurada/es inválida. */
export function eventDate(): Date | null {
  if (!eventConfig.eventDateISO.trim()) return null;
  const d = new Date(eventConfig.eventDateISO);
  return Number.isNaN(d.getTime()) ? null : d;
}
