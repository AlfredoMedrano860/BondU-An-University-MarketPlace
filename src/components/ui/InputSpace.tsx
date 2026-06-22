import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

/**
 * Props de InputSpace.
 */
interface InputSpaceProps {
  /** Tipo del input. Por defecto `"text"`. */
  type?: "text" | "password";
  /** Etiqueta visible sobre el campo. Si se omite no se muestra label. */
  placeholder?: string;
  /** Texto placeholder dentro del campo. */
  hint?: string;
  /** Valor controlado del campo. */
  value: string;
  /** Callback que recibe el nuevo valor al escribir. Omitir junto con `readOnly` para campos de solo lectura. */
  onChange?: (value: string) => void;
  /** Si `true`, el campo no es editable. Por defecto `false`. */
  readOnly?: boolean;
  /** Clases adicionales aplicadas al elemento input o textarea. */
  className?: string;
  /** Si `true`, renderiza un `<textarea>` en lugar de un `<input>`. Por defecto `false`. */
  multiline?: boolean;
}

/**
 * Campo de texto estilizado con soporte para contraseñas, modo multilinea y solo lectura.
 *
 * En modo contraseña muestra un botón para alternar la visibilidad.
 * En modo `multiline` renderiza un `<textarea>` de 4 filas.
 *
 * @param type - Tipo del input. Por defecto `"text"`.
 * @param placeholder - Etiqueta visible sobre el campo.
 * @param hint - Placeholder dentro del campo.
 * @param value - Valor controlado.
 * @param onChange - Callback con el nuevo valor.
 * @param readOnly - Si `true`, el campo no es editable.
 * @param className - Clases adicionales para el input o textarea.
 * @param multiline - Si `true`, renderiza un textarea.
 */
function InputSpace({ type = "text", placeholder, hint, value, onChange, readOnly = false, className = "", multiline = false }: InputSpaceProps) {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";
  const inputType = isPassword ? (showPassword ? "text" : "password") : type;

  if (multiline) {
    return (
      <div className="w-full space-y-1.5">
        {placeholder && (
          <label className="block text-sm font-medium text-gray-700 px-1">{placeholder}</label>
        )}
        <textarea
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          placeholder={hint}
          readOnly={readOnly}
          rows={4}
          className={`w-full rounded-3xl px-5 py-3 bg-input text-black text-sm outline-none resize-none placeholder:text-gray-400 ${className}`}
        />
      </div>
    );
  }

  return (
    <div className="w-full space-y-1.5">
      {placeholder && (
        <label className="block text-sm font-medium text-gray-700 px-1">{placeholder}</label>
      )}
      <div className="relative">
        <input
          type={inputType}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          placeholder={hint}
          readOnly={readOnly}
          className={`w-full h-14 rounded-full px-5 bg-input text-black text-sm outline-none placeholder:text-gray-400 [&::-ms-reveal]:hidden [&::-webkit-contacts-auto-fill-button]:hidden [&::-webkit-credentials-auto-fill-button]:hidden${isPassword ? " pr-12" : ""} ${className}`}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
          </button>
        )}
      </div>
    </div>
  );
}

export default InputSpace;
