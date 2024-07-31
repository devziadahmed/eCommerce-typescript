import { memo } from "react";
import { Button, Spinner } from "react-bootstrap";

import type { Product } from "@apptypes/product";

import { formatPrice } from "@utils/index";

import styles from "./styles.module.css";
const { product, productImg, error, permissible, wishlistBtn, liked } = styles;

import Like from "@assets/svg/like.svg?react";
import Liked from "@assets/svg/like-fill.svg?react";

import useProduct from "@hooks/useProduct";

const Product = memo(
  ({ id, title, price, img, max, quantity, isLiked }: Product & { quantity?: number }) => {
    const {
      isLoading,
      throttledAddToCart,
      handleLikeToggle,
      reachedMaxQuantity,
      remainingQuantity,
    } = useProduct(max, quantity, id);

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
