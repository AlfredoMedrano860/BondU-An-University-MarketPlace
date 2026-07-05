import { useRef } from "react";

const digitCount = 4;

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
 * Usa un único `useRef` con array de elementos del DOM para mover el foco
 * entre cajas sin pasar por el estado de React, y sin violar las Reglas de
 * Hooks que prohíben llamar a `useRef` dentro de arrays u otras estructuras.
 *
 * Usado en {@link ForgotPassword} en el paso de verificación.
 *
 * @see {@link https://react.dev/reference/react/useRef useRef}
 * @see {@link https://react.dev/learn/manipulating-the-dom-with-refs Manipular el DOM con refs}
 *
 * @param value - Valor actual del código como string de hasta 4 dígitos.
 * @param onChange - Se ejecuta al cambiar el código con el nuevo valor.
 */
function CodeInput({ value, onChange }: CodeInputProps) {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  /**
   * Actualiza el dígito en la posición indicada y avanza al siguiente input.
   * Ignora caracteres que no sean dígitos.
   * @param index - Posición de la caja (0–3).
   * @param newChar - Carácter ingresado por el usuario.
   */
  function handleDigitChange(index: number, newChar: string) {
    if (!/^\d$/.test(newChar) && newChar !== "") return;

    const digits = value.padEnd(digitCount, "").split("");
    digits[index] = newChar;
    onChange(digits.join(""));

    if (newChar && index < digitCount - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  }

  /**
   * Retrocede al input anterior si la caja actual está vacía y no es la primera.
   * @param index - Posición de la caja (0–3).
   */
  function handleBackspace(index: number) {
    if (!value[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  }

  return (
    <div className="flex justify-center gap-3">
      {Array.from({ length: digitCount }, (_, index) => (
        <input
          key={index}
          ref={(el) => { inputRefs.current[index] = el; }}
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
