/**
 * Elimina tildes y convierte a minúsculas para comparaciones insensibles a acentos.
 * Usado en {@link useSearchBar} y {@link useMarketplaceProducts}.
 *
 * > **Pendiente:** mover al backend cuando se integre la búsqueda server-side.
 *
 * @param s - Cadena de texto a normalizar.
 * @returns Cadena sin tildes ni mayúsculas.
 */
export const normalize = (s: string) =>
  s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
