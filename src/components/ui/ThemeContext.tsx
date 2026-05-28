import { createContext, useContext, useState } from "react";

/**
 * Forma del contexto de tema.
 */
interface ThemeContextType {
  /** Indica si el tema oscuro está activo. */
  darkMode: boolean;
  /** Alterna entre tema claro y oscuro. */
  toggleDarkMode: () => void;
}

/**
 * Contexto de tema de la aplicación.
 * Provee `darkMode` y `toggleDarkMode` a cualquier componente del árbol.
 * @see ThemeProvider
 */
export const ThemeContext = createContext<ThemeContextType>({
  darkMode: false,
  toggleDarkMode: () => {},
});

/**
 * Hook para acceder al contexto de tema desde cualquier componente.
 *
 * @example
 * const { darkMode, toggleDarkMode } = useTheme();
 *
 * @see {@link https://react.dev/reference/react/useContext useContext}
 */
export function useTheme(): ThemeContextType {
  return useContext(ThemeContext);
}

/**
 * Proveedor del contexto de tema.
 *
 * Envuelve la app y aplica `data-theme="dark"` al div raíz
 * cuando el tema oscuro está activo, lo que activa las variables
 * CSS definidas en `_colors.css`.
 *
 * @see {@link https://react.dev/learn/passing-data-deeply-with-context Passing data deeply with context}
 */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [darkMode, setDarkMode] = useState(false);
  const toggleDarkMode = () => setDarkMode(prev => !prev);

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      <div data-theme={darkMode ? "dark" : "light"} className="contents">
        {children}
      </div>
    </ThemeContext.Provider>
  );
}