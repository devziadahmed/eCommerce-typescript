import { Product } from "./product";

export type OrderProduct = {
  id: number;
  userId: number;
  items: Product[];
  subtotal: number;
};
