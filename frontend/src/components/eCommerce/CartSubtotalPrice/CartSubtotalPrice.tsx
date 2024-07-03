import { ProductWithQuantity } from "@apptypes/product";
import styles from "./styles.module.css";
import { formatPrice } from "@utils/index";

type CartSubtotalPriceProps = { products: ProductWithQuantity[] };

const CartSubtotalPrice = ({ products }: CartSubtotalPriceProps) => {
  const subtotalPrice = products.reduce((acc, curr) => acc + curr.price * curr.quantity, 0);
  return (
    <div className={styles.container}>
      <span>Subtotal:</span>
      <span>{formatPrice(subtotalPrice)}</span>
    </div>
  );
};

export default CartSubtotalPrice;
