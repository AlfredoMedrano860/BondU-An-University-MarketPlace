/** Valores posibles del filtro de estado de un producto. Usado en {@link Filters} y {@link ProductForm}. */
export const stateValues = ["Nuevo", "Usado", "Detalle"] as const;

/** Precio máximo del slider de filtros; también representa "sin límite de precio". */
export const maxPrice = 500;

/**
 * Filtros aplicados al listado de productos.
 * Usado en {@link AppShellLayout}, {@link Filters} y {@link MarketPlace}.
 */
export interface FilterValues {
  /** Estado seleccionado (Nuevo/Usado/Detalle), o vacío si no hay filtro. */
  state: string;
  /** Precio máximo seleccionado. `maxPrice` representa "sin límite". */
  price: number;
}
