import { useState, useEffect } from "react";
import type { UserProfile } from "../components/data/UserProfile";
import type { AuthUser } from "../types/auth";
import type { ApiUserContact, ApiUserPreferences } from "../types/user";
import { usersService } from "../services/users";
import { apiUserToProfile } from "../utils/adapters";

/**
 * Hook que arma el {@link UserProfile} del usuario autenticado, combinando
 * los datos básicos de sesión con su información de contacto y preferencias
 * (cargadas aparte porque viven en endpoints distintos del backend).
 *
 * Usado en {@link App}.
 *
 * @param authUser - Usuario autenticado según el contexto de auth, o `null` si no hay sesión.
 * @returns `currentUser` — perfil combinado, o `null` sin sesión,
 * `refreshContactInfo` — vuelve a cargar el contacto (tras guardar cambios en Account),
 * `updateNotificationsPreference` — actualiza `notifications` localmente sin refetch.
 */
export function useCurrentUserProfile(authUser: AuthUser | null) {
  const [contactInfo, setContactInfo] = useState<ApiUserContact | null>(null);
  const [preferences, setPreferences] = useState<ApiUserPreferences | null>(null);
  const currentUser: UserProfile | null = authUser ? apiUserToProfile(authUser, null, preferences, contactInfo) : null;

  // Carga la información de contacto (bio, instagram, telegram) y las preferencias
  // (notificaciones, idioma) del usuario autenticado.
  useEffect(() => {
    if (!authUser) { setContactInfo(null); setPreferences(null); return; }
    usersService.getContact(authUser.id).then(setContactInfo).catch(() => setContactInfo(null));
    usersService.getPreferences(authUser.id).then(setPreferences).catch(() => setPreferences(null));
  }, [authUser?.id]);

  /** Vuelve a cargar la info de contacto tras guardar cambios en Account. */
  function refreshContactInfo() {
    if (!authUser) return;
    usersService.getContact(authUser.id).then(setContactInfo).catch(() => {});
  }

  /** Actualiza `notifications` en memoria tras guardar el toggle en Settings, sin refetch. */
  function updateNotificationsPreference(value: boolean) {
    setPreferences(prev => prev ? Object.assign({}, prev, { notifications: value }) : prev);
  }

  return { currentUser, refreshContactInfo, updateNotificationsPreference };
}
