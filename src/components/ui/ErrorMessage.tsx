/**
 * Props de ErrorMessage.
 */
interface ErrorMessageProps {
  /** Texto de error a mostrar. Si está vacío el componente no renderiza nada. */
  message: string;
}

/**
 * Muestra un mensaje de error en rojo debajo de un campo de formulario.
 * Retorna `null` si `message` está vacío.
 *
 * @param message - Texto del error.
 */
export default function ErrorMessage({ message }: ErrorMessageProps) {
  if (!message) return null;
  return <p className="text-red-500 text-sm text-center -mt-2">{message}</p>;
}
