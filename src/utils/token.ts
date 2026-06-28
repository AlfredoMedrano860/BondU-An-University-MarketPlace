const TOKEN_KEY = 'bondu_auth_token';
const USER_KEY  = 'bondu_auth_user';
const LANG_KEY  = 'bondu_auth_lang';

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
    getLang(): string | null {
        return localStorage.getItem(LANG_KEY);
    },
    setLang(lang: string): void {
        localStorage.setItem(LANG_KEY, lang);
    },
    clear(): void {
        this.removeToken();
        this.removeUser();
        localStorage.removeItem(LANG_KEY);
    },
};

export const decodeToken = (token: string): { exp: number } | null => {
    try {
        const payload = token.split('.')[1];
        return JSON.parse(atob(payload));
    } catch {
        return null;
    }
};

export const isTokenExpired = (token: string): boolean => {
    const decoded = decodeToken(token);
    if (!decoded?.exp) return true;
    return decoded.exp < Date.now() / 1000;
};
