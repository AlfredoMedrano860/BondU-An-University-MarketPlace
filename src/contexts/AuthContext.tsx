import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { AuthUser, AuthContextType, LoginCredentials } from '../types/auth';
import { authService } from '../services/auth';
import { tokenStorage, isTokenExpired } from '../utils/token';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuthContext = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuthContext must be used within AuthProvider');
    return ctx;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user,      setUser]    = useState<AuthUser | null>(null);
    const [token,     setToken]   = useState<string | null>(null);
    const [isLoading, setLoading] = useState(true);

    // Restaurar sesión desde localStorage al iniciar
    useEffect(() => {
        const storedToken = tokenStorage.getToken();
        const storedUser  = tokenStorage.getUser();

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

    // Escuchar token expirado / 401 del interceptor
    useEffect(() => {
        const handle401 = () => { setToken(null); setUser(null); };
        window.addEventListener('bondu:unauthorized', handle401);
        return () => window.removeEventListener('bondu:unauthorized', handle401);
    }, []);

    const login = async (credentials: LoginCredentials) => {
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
    };

    const logout = () => {
        tokenStorage.clear();
        setToken(null);
        setUser(null);
    };

    const updateUser = (updated: AuthUser) => {
        tokenStorage.setUser(JSON.stringify(updated));
        setUser(updated);
    };

    return (
        <AuthContext.Provider value={{ user, token, isAuthenticated: !!token && !!user, isLoading, login, logout, updateUser }}>
            {children}
        </AuthContext.Provider>
    );
};
