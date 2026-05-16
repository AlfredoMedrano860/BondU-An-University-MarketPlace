import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface InputSpaceProps {
  type?: "text" | "password";
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  multiline?: boolean;
}
// https://react.dev/learn/conditional-rendering
// https://react.dev/reference/react-dom/components/input

function InputSpace({ type = "text", placeholder, value, onChange, multiline = false }: InputSpaceProps) {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";
  const inputType = isPassword ? (showPassword ? "text" : "password") : type;

  if (multiline) {
    return (
      <textarea placeholder={placeholder} value={value} onChange={(e) => onChange(e.target.value)} rows={4} className="w-full rounded-3xl px-5 py-4 bg-input text-black text-sm outline-none placeholder:text-gray-400 resize-none"/>
    );
  }

  return (
    <div className="w-full relative">
      <input type={inputType} placeholder={placeholder} value={value} onChange={(e) => onChange(e.target.value)} className="w-full h-14 rounded-full px-5 pr-12 bg-input text-black text-sm outline-none placeholder:text-gray-400"/>
      {isPassword && (
        <button onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
          {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
        </button>
      )}
    </div>
  );
}

export default InputSpace;