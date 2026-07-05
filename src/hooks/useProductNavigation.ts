import { useState } from "react";
import type { Product } from "../components/data/Product";

/**
 * Hook que gestiona qué producto se está viendo en "productdetail" y cuál se
 * está editando en "addproduct", junto con la pantalla a la que hay que
 * volver en cada caso.
 *
 * Usado en {@link App}.
 *
 * @param screen - Pantalla actual, para recordar desde dónde se abrió el detalle.
 * @param setScreen - Cambia la pantalla actual.
 * @returns `viewedProduct`/`productReturnScreen` — producto en detalle y su origen,
 * `editProduct`/`editReturnScreen` — producto en edición y su origen,
 * `openProductDetail` — abre el detalle de un producto,
 * `startEdit` — abre el formulario de edición para un producto,
 * `clearEdit` — limpia el producto en edición (llamado al navegar a otra pantalla).
 */
export function useProductNavigation(screen: string, setScreen: (screen: string) => void) {
  const [viewedProduct, setViewedProduct] = useState<Product | null>(null);
  const [productReturnScreen, setProductReturnScreen] = useState("home");
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [editReturnScreen, setEditReturnScreen] = useState("marketplace");

  function openProductDetail(product: Product) {
    setViewedProduct(product);
    setProductReturnScreen(screen);
    setScreen("productdetail");
  }

  function startEdit(product: Product, returnScreen: string) {
    setEditProduct(product);
    setEditReturnScreen(returnScreen);
    setScreen("addproduct");
  }

  function clearEdit() {
    setEditProduct(null);
  }

  return {
    viewedProduct,
    productReturnScreen,
    editProduct,
    editReturnScreen,
    openProductDetail,
    startEdit,
    clearEdit,
  };
}
