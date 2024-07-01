import { memo } from "react";
import { Button } from "react-bootstrap";

import type { Product } from "@apptypes/product";

import { useAppDispatch } from "@store/hooks";
import { addToCart } from "@store/cart/cartSlice";

import { formatPrice, throttle } from "@utils/index";

import styles from "./styles.module.css";
const { product, productImg, error, permissible } = styles;

const Product = memo(
  ({ id, title, price, img, max, quantity }: Product & { quantity?: number }) => {
    const dispatch = useAppDispatch();

    const throttledAddToCart = throttle(() => dispatch(addToCart(id)), 300);

    const remainingQuantity = max - (quantity ?? 0);
    const reachedMaxQuantity = remainingQuantity <= 0;

    return (
      <div className={product}>
        <div className={productImg}>
          <img src={img} alt={title} />
        </div>
        <h2>{title}</h2>
        <h3>{formatPrice(price)}</h3>
        <p>
          {reachedMaxQuantity ? (
            <span className={error}>Limit exceeded</span>
          ) : (
            <span className={permissible}>You can add {remainingQuantity} to cart</span>
          )}
        </p>
        <Button
          variant="info"
          style={{ color: "white" }}
          onClick={throttledAddToCart}
          disabled={reachedMaxQuantity}
        >
          {reachedMaxQuantity ? "Limit exceeded" : "Add to cart"}
        </Button>
      </div>
    );
  }
);

export default Product;
