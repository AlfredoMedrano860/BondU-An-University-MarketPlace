import { useState } from "react";
import type { UserProfile } from "../components/data/UserProfile";
import type { Seller } from "../components/data/Seller";
import { usersService } from "../services/users";
import { apiUserToProfile } from "../utils/adapters";

/**
 * Hook que gestiona la navegación entre perfiles de usuario en la pantalla
 * "sellerprofile", incluyendo la pila de perfiles para poder volver atrás
 * a través de una cadena (perfil → reseñador → producto → otro perfil → ...).
 *
 * Usado en {@link App}.
 *
 * @param screen - Pantalla actual (para decidir si se está continuando una cadena de perfiles).
 * @param productReturnScreen - Pantalla a la que vuelve `productdetail` (para detectar
 * si se llegó ahí desde un perfil, y así seguir considerando la cadena activa).
 * @param setScreen - Cambia la pantalla actual sin pasar por `navigate` (no limpia edición en curso).
 * @param navigate - Navega a otra pantalla (usado como fallback al agotar la pila).
 * @returns `viewedSeller` — perfil actualmente mostrado,
 * `openUserProfile` — abre el perfil de un usuario por ID, recargando sus datos del backend,
 * `openSellerProfile` — abre el perfil de un vendedor ya cargado,
 * `backFromSellerProfile` — retrocede un perfil en la pila, o navega afuera si está vacía.
 */
export function useProfileNavigation(
  screen: string,
  productReturnScreen: string,
  setScreen: (screen: string) => void,
  navigate: (screen: string) => void,
) {
  const [viewedSeller, setViewedSeller] = useState<UserProfile | null>(null);
  const [sellerReturnScreen, setSellerReturnScreen] = useState("home");
  const [sellerStack, setSellerStack] = useState<{ seller: UserProfile; returnScreen: string }[]>([]);

  /**
   * Muestra un perfil en la pantalla "sellerprofile". Si ya hay un perfil abierto
   * (o se llegó a un producto desde uno), apila el anterior para permitir volver.
   */
  function pushViewedProfile(profile: UserProfile) {
    const inProfileChain =
      !!viewedSeller &&
      (screen === "sellerprofile" || (screen === "productdetail" && productReturnScreen === "sellerprofile"));

    if (inProfileChain) {
      setSellerStack(prev => prev.concat([{ seller: viewedSeller!, returnScreen: sellerReturnScreen }]));
    } else {
      setSellerStack([]);
      setSellerReturnScreen(screen);
    }
    setViewedSeller(profile);
    setScreen("sellerprofile");
  }

  /**
   * Abre el perfil de un usuario, cargando sus datos reales (incluida la info
   * de contacto) del backend en vez de reutilizar lo que ya se tenía cargado.
   */
  async function openUserProfile(userId: string) {
    try {
      const [user, contact] = await Promise.all([
        usersService.getById(userId),
        usersService.getContact(userId).catch(() => null),
      ]);
      pushViewedProfile(apiUserToProfile(user, null, null, contact));
    } catch {
      // si falla la carga, simplemente no se abre el perfil
    }
  }

  /** Abre el perfil de un vendedor a partir de un producto ya cargado. */
  function openSellerProfile(seller: Seller) {
    openUserProfile(seller.id);
  }

  /** Retrocede un perfil en la pila, o navega a `sellerReturnScreen` si está vacía. */
  function backFromSellerProfile() {
    if (sellerStack.length > 0) {
      const prev = sellerStack[sellerStack.length - 1];
      setSellerStack(s => s.slice(0, -1));
      setViewedSeller(prev.seller);
      setSellerReturnScreen(prev.returnScreen);
    } else {
      navigate(sellerReturnScreen);
    }
  }

  return { viewedSeller, openUserProfile, openSellerProfile, backFromSellerProfile };
}
