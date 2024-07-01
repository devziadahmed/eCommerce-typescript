import { useEffect, useState } from "react";
import Logo from "@assets/cart.svg?react";

import { useAppSelector } from "@store/hooks";
import { getCartTotalQuantity } from "@store/cart/cartSlice";

import styles from "./styles.module.css";
const { basketContainer, basketQuantity, pumpCartQuantity, basketCart } = styles;

const HeaderBasket = () => {
  const [isAnimate, setIsAnimate] = useState(false);
  const cartItemsQuantity = useAppSelector(getCartTotalQuantity);
  const cartBastketStyles = `${basketQuantity} ${isAnimate ? pumpCartQuantity : ""}`;

  useEffect(() => {
    if (!cartItemsQuantity) return;

    setIsAnimate(true);

    const debounce = setTimeout(() => setIsAnimate(false), 300);

    return () => clearTimeout(debounce);
  }, [cartItemsQuantity]);

  return (
    <div className={basketContainer}>
      <div className={basketCart}>
        <Logo title="basket icon" />
        <div className={cartBastketStyles}>{cartItemsQuantity}</div>
      </div>

      <h3>Cart</h3>
    </div>
  );
};

export default HeaderBasket;
