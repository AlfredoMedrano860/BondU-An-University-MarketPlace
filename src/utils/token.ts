const TOKEN_KEY = 'bondu_auth_token';
const USER_KEY  = 'bondu_auth_user';

/** Acceso al token y usuario de sesión persistidos en `localStorage`. */
export const tokenStorage = {
    getToken(): string | null {
        return localStorage.getItem(TOKEN_KEY);
    },
    setToken(token: string): void {
        localStorage.setItem(TOKEN_KEY, token);
    },
    removeToken(): void {
        localStorage.removeItem(TOKEN_KEY);
    },
    getUser(): string | null {
        return localStorage.getItem(USER_KEY);
    },
    setUser(user: string): void {
        localStorage.setItem(USER_KEY, user);
    },
    removeUser(): void {
        localStorage.removeItem(USER_KEY);
    },
    /** Limpia el token y el usuario de sesión (logout). */
    clear(): void {
        this.removeToken();
        this.removeUser();
    },
};

/** Decodifica el payload de un JWT sin verificar su firma. */
const decodeToken = (token: string): { exp: number } | null => {
    try {
        const payload = token.split('.')[1];
        return JSON.parse(atob(payload));
    } catch {
        return null;
    }
};

/** Indica si un JWT ya expiró según su claim `exp`. Trata un token indecodificable como expirado. */
export const isTokenExpired = (token: string): boolean => {
    const decoded = decodeToken(token);
    if (!decoded?.exp) return true;
    return decoded.exp < Date.now() / 1000;
};
