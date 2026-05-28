import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

// https://react.dev/learn/conditional-rendering
// https://react.dev/reference/react-dom/components/input

/**
 * Props de InputSpace.
 */
interface InputSpaceProps {
  /** Tipo de input. Por defecto "text". */
  type?: "text" | "password";
  /** Texto del label flotante. */
  placeholder?: string;
  /** Valor actual del input. */
  value: string;
  /** Se ejecuta al cambiar el valor con el nuevo texto. */
  onChange: (value: string) => void;
  /** Renderiza un textarea de múltiples líneas en lugar de un input. Por defecto `false`. */
  multiline?: boolean;
}

/**
 * Campo de entrada de texto con label flotante.
 *
 * El label sube y se achica cuando el campo tiene foco o contenido.
 * Soporta texto simple, contraseñas con toggle de visibilidad y texto multilínea.
 * Los inputs de contraseña ocultan los controles nativos del navegador.
 *
 * @see {@link https://react.dev/learn/conditional-rendering Conditional Rendering}
 * @see {@link https://react.dev/reference/react-dom/components/input Input}
 *
 * @param type - Tipo de input. Por defecto "text".
 * @param placeholder - Texto del label flotante.
 * @param value - Valor actual del input.
 * @param onChange - Se ejecuta al cambiar el valor con el nuevo texto.
 * @param multiline - Renderiza un textarea en lugar de un input. Por defecto `false`.
 */
function InputSpace({ type = "text", placeholder, value, onChange, multiline = false }: InputSpaceProps) {
  const [focused, setFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";
  const inputType = isPassword ? (showPassword ? "text" : "password") : type;
  const isFloating = focused || value.length > 0;

  if (multiline) {
    return (
      <div className="relative">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          rows={4}
          className="w-full rounded-3xl px-5 pt-6 pb-3 bg-input text-black text-sm outline-none resize-none peer"
        />
        <label
          className="absolute left-5 transition-all duration-200 pointer-events-none text-gray-400"
          style={{
            top: isFloating ? "8px" : "16px",
            fontSize: isFloating ? "10px" : "14px",
            color: focused ? "hsl(67, 100%, 35%)" : undefined,
          }}
        >
          {placeholder}
        </label>
      </div>
    );
  }

  return (
    <div className="w-full relative">
      <input
        type={inputType}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="w-full h-14 rounded-full px-5 pt-4 pb-1 pr-12 bg-input text-black text-sm outline-none [&::-ms-reveal]:hidden [&::-webkit-contacts-auto-fill-button]:hidden [&::-webkit-credentials-auto-fill-button]:hidden"
      />

      {/* Label flotante */}
      <label
        className="absolute left-5 transition-all duration-200 pointer-events-none text-gray-400"
        style={{
          top: isFloating ? "6px" : "50%",
          transform: isFloating ? "none" : "translateY(-50%)",
          fontSize: isFloating ? "10px" : "14px",
          color: focused ? "hsl(67, 100%, 35%)" : undefined,
        }}
      >
        {placeholder}
      </label>

      {/* Toggle visibilidad de contraseña */}
      {isPassword && (
        <button
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
        >
          {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
        </button>
      )}
    </div>
  );
}

export default InputSpace;