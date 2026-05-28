/**
 * Pregunta y respuesta individual del FAQ.
 */
export interface FaqItem {
  /** Pregunta frecuente. */
  question: string;
  /** Respuesta a la pregunta. */
  answer: string;
}

/** Lista de preguntas frecuentes mostradas en {@link FaqAccordion}. */
export const faqItems: FaqItem[] = [
  {
    question: "¿Cómo contacto a un vendedor?",
    answer: "Entrá al producto y tocá la pestaña Vendedor. Ahí encontrás el perfil del vendedor para coordinar la entrega.",
  },
  {
    question: "¿Cómo publico un producto?",
    answer: "Tocá el botón + en la barra de navegación, completá el formulario con fotos, nombre, precio y estado del producto.",
  },
  {
    question: "¿Es seguro comprar aquí?",
    answer: "Todos los usuarios son estudiantes verificados de la universidad. Recomendamos hacer los intercambios en lugares públicos del campus.",
  },
  {
    question: "¿Puedo eliminar mi producto?",
    answer: "Sí. Andá a Ajustes → Mis Productos y tocá ELIMINAR en el producto que querés quitar.",
  },
  {
    question: "¿Cómo funciona el intercambio?",
    answer: "Podés publicar tu producto indicando que aceptás intercambios en la descripción y coordinar directamente con el vendedor.",
  },
];