import { ProductWithQuantity } from "@apptypes/product";
import CartItem from "../CartItem";

type CartItemListProps = {
  products: ProductWithQuantity[];
  changeQuantityHandler: (id: number, quantity: number) => void;
};

const CartItemList = ({ products, changeQuantityHandler }: CartItemListProps) => {
  const cartItemList = products.map((product) => (
    <CartItem key={product.id} {...product} changeQuantityHandler={changeQuantityHandler} />
  ));
  return <div style={{ maxHeight: "100vh", overflow: "auto" }}>{cartItemList}</div>;
};

export default CartItemList;
