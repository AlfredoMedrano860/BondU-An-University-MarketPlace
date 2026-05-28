import { useRef } from "react";

/**
 * Props de CodeInput.
 */
interface CodeInputProps {
  /** Valor actual del código como string de hasta 4 dígitos. */
  value: string;
  /** Se ejecuta al cambiar el código con el nuevo valor. */
  onChange: (value: string) => void;
}

/**
 * Input de código de verificación con 4 cajas separadas.
 *
 * Cada caja acepta un solo dígito y avanza automáticamente al siguiente
 * cuando se escribe. Al borrar con Backspace en una caja vacía, retrocede
 * al campo anterior.
 *
 * Usa `useRef` para mantener referencias directas a cada input del DOM,
 * lo que permite mover el foco entre cajas sin pasar por el estado de React.
 *
 * Usado en {@link ForgotPasswordScreen} en el paso de verificación.
 *
 * @see {@link https://react.dev/reference/react/useRef useRef}
 * @see {@link https://react.dev/learn/manipulating-the-dom-with-refs Manipular el DOM con refs}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus HTMLElement.focus()}
 *
 * @param value - Valor actual del código como string de hasta 4 dígitos.
 * @param onChange - Se ejecuta al cambiar el código con el nuevo valor.
 */
function CodeInput({ value, onChange }: CodeInputProps) {

  /** Referencias directas a cada uno de los 4 inputs del DOM. */
  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  /**
   * Actualiza el dígito en la posición indicada y avanza al siguiente input.
   * Ignora caracteres que no sean dígitos.
   * @param index - Posición de la caja (0-3).
   * @param newChar - Carácter ingresado por el usuario.
   */
  function handleDigitChange(index: number, newChar: string) {
    const isDigit = /^\d$/.test(newChar);
    if (!isDigit && newChar !== "") return;

    const digits = value.padEnd(4, "").split("");
    digits[index] = newChar;
    onChange(digits.join(""));

    const isLastBox = index === 3;
    if (newChar && !isLastBox) {
      inputRefs[index + 1].current?.focus();
    }
  }

  /**
   * Retrocede al input anterior si la caja actual está vacía y no es la primera.
   * @param index - Posición de la caja (0-3).
   */
  function handleBackspace(index: number) {
    const isFirstBox = index === 0;
    const boxIsEmpty = !value[index];

    if (boxIsEmpty && !isFirstBox) {
      inputRefs[index - 1].current?.focus();
    }
  }

  return (
    <div className="flex justify-center gap-3">
      {inputRefs.map((ref, index) => (
        <input
          key={index}
          ref={ref}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={value[index] ?? ""}
          onChange={(e) => handleDigitChange(index, e.target.value)}
          onKeyDown={(e) => e.key === "Backspace" && handleBackspace(index)}
          className="w-16 h-16 rounded-2xl bg-input text-black text-2xl font-bold text-center outline-none focus:ring-2 focus:ring-[hsl(67,100%,35%)] transition-all"
        />
      ))}
    </div>
  );
}

export default CodeInput;