import { createContext, useContext, useState, useEffect, useCallback, useMemo, type ReactNode } from 'react';
import type { AuthUser, AuthContextType, LoginCredentials } from '../types/auth';
import { authService } from '../services/auth';
import { tokenStorage, isTokenExpired } from '../utils/token';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * Hook para consumir el contexto de autenticación.
 *
 * Debe usarse dentro de un {@link AuthProvider}; de lo contrario lanza un error.
 *
 * @returns `user` — usuario autenticado o `null`, `token` — JWT actual o `null`,
 * `isAuthenticated` — `true` si hay sesión válida, `isLoading` — `true` mientras
 * se restaura la sesión o se procesa un login, `login` — inicia sesión,
 * `logout` — cierra sesión, `updateUser` — actualiza el usuario en memoria y en `localStorage`.
 */
export const useAuthContext = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuthContext must be used within AuthProvider');
    return ctx;
};

/**
 * Proveedor del contexto de autenticación. Envuelve la app en {@link App}.
 *
 * Al montar, restaura la sesión desde `localStorage` (vía {@link tokenStorage})
 * si el token guardado todavía no expiró. También escucha el evento global
 * `bondu:unauthorized` (emitido por el interceptor de {@link apiClient} ante un
 * 401) para desloguear automáticamente al usuario cuando el token deja de ser válido.
 *
 * @param children - Árbol de la aplicación que tendrá acceso al contexto.
 */
export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<AuthUser | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [isLoading, setLoading] = useState(true);

    // Restaura la sesión guardada en localStorage al cargar la app, si el token no expiró
    useEffect(() => {
        const storedToken = tokenStorage.getToken();
        const storedUser = tokenStorage.getUser();

        if (storedToken && storedUser && !isTokenExpired(storedToken)) {
            try {
                setToken(storedToken);
                setUser(JSON.parse(storedUser));
            } catch {
                tokenStorage.clear();
            }
        } else {
            tokenStorage.clear();
        }
        setLoading(false);
    }, []);

    // Desloguea automáticamente ante un 401 emitido por el interceptor de apiClient
    useEffect(() => {
        const handle401 = () => { setToken(null); setUser(null); };
        window.addEventListener('bondu:unauthorized', handle401);
        return () => window.removeEventListener('bondu:unauthorized', handle401);
    }, []);

    /** Inicia sesión con las credenciales dadas y persiste el token y el usuario. */
    const login = useCallback(async (credentials: LoginCredentials) => {
        setLoading(true);
        try {
            const response = await authService.login(credentials);
            tokenStorage.setToken(response.token);
            tokenStorage.setUser(JSON.stringify(response.user));
            setToken(response.token);
            setUser(response.user);
        } finally {
            setLoading(false);
        }
    }, []);

    /** Cierra la sesión actual: limpia el token y el usuario del estado y de localStorage. */
    const logout = useCallback(() => {
        tokenStorage.clear();
        setToken(null);
        setUser(null);
    }, []);

    /** Actualiza el usuario en memoria y en localStorage, sin volver a autenticar. */
    const updateUser = useCallback((updated: AuthUser) => {
        tokenStorage.setUser(JSON.stringify(updated));
        setUser(updated);
    }, []);

    const value = useMemo(
        () => ({ user, token, isAuthenticated: !!token && !!user, isLoading, login, logout, updateUser }),
        [user, token, isLoading, login, logout, updateUser],
    );

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
