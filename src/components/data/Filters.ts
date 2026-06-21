export const stateValues = ["Nuevo", "Usado", "Detalle"] as const;
export const maxPrice = 500;

export interface FilterValues {
  state: string;
  price: number;
}
