export type Product = {
  id?: number;
  title: string;
  price: number;
  cat_prefix: string;
  img: string;
  max: number;
};

export type ProductWithQuantity = Product & { quantity: number };
