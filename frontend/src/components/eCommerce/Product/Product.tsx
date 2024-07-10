import { memo, useState } from "react";
import { Button, Spinner } from "react-bootstrap";

import type { Product } from "@apptypes/product";

import { useAppDispatch } from "@store/hooks";
import { addToCart } from "@store/cart/cartSlice";
import { actLikeToggle } from "@store/wishlist/wishlistSlice";

import { formatPrice, throttle } from "@utils/index";

import styles from "./styles.module.css";
const { product, productImg, error, permissible, wishlistBtn, liked } = styles;

import Like from "@assets/svg/like.svg?react";
import Liked from "@assets/svg/like-fill.svg?react";

const Product = memo(
  ({ id, title, price, img, max, quantity, isLiked }: Product & { quantity?: number }) => {
    const [isLoading, setIsLoading] = useState(false);

    const dispatch = useAppDispatch();

    const throttledAddToCart = throttle(() => dispatch(addToCart(id)), 300);

    const remainingQuantity = max - (quantity ?? 0);
    const reachedMaxQuantity = remainingQuantity <= 0;

    const handleLikeToggle = () => {
      setIsLoading(true);
      id &&
        dispatch(actLikeToggle(id))
          .unwrap()
          .then(() => setIsLoading(false));
    };

    return (
      <div className={product}>
        <div
          className={`${wishlistBtn} ${(isLiked || isLoading) && `${liked}`}`}
          onClick={handleLikeToggle}
          style={{ pointerEvents: isLoading ? "none" : "auto" }}
        >
          {isLoading ? (
            <Spinner animation="border" size="sm" variant="primary" />
          ) : isLiked ? (
            <Liked />
          ) : (
            <Like />
          )}
        </div>

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
