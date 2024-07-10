import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import { useAppSelector } from "@store/hooks";
import { getCartTotalQuantity } from "@store/cart/cartSlice";

import styles from "./styles.module.css";
const { container, totalNum, pumpAnimate, iconWrapper } = styles;

import Logo from "@assets/svg/cart.svg?react";

const HeaderBasket = () => {
  const [isAnimate, setIsAnimate] = useState(false);
  const cartItemsQuantity = useAppSelector(getCartTotalQuantity);
  const cartBastketStyles = `${totalNum} ${isAnimate ? pumpAnimate : ""}`;

  useEffect(() => {
    if (!cartItemsQuantity) return;

    setIsAnimate(true);

    const debounce = setTimeout(() => setIsAnimate(false), 300);

    return () => clearTimeout(debounce);
  }, [cartItemsQuantity]);

  return (
    <NavLink to="/cart">
      <div className={container}>
        <div className={iconWrapper}>
          <Logo title="basket icon" />

          {cartItemsQuantity > 0 && (
            <div className={cartBastketStyles}>{cartItemsQuantity}</div>
          )}
        </div>

        <h3>Cart</h3>
      </div>
    </NavLink>
  );
};

export default HeaderBasket;
