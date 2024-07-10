import { useEffect, useState } from "react";
import Logo from "@assets/svg/wishlist.svg?react";

import { NavLink } from "react-router-dom";

import styles from "./styles.module.css";
import { useAppSelector } from "@store/hooks";
import { getWishlistTotalQuantity } from "@store/wishlist/wishlistSlice";
const { container, totalNum, pumpAnimate, iconWrapper } = styles;

const HeaderBasket = () => {
  const [isAnimate, setIsAnimate] = useState(false);
  const wishlistItemsQuantity = useAppSelector(getWishlistTotalQuantity);

  const wishlistBastketStyles = `${totalNum} ${isAnimate ? pumpAnimate : ""}`;

  useEffect(() => {
    if (!wishlistItemsQuantity) return;

    setIsAnimate(true);

    const debounce = setTimeout(() => setIsAnimate(false), 300);

    return () => clearTimeout(debounce);
  }, [wishlistItemsQuantity]);

  return (
    <NavLink to="/wishlist">
      <div className={container}>
        <div className={iconWrapper}>
          <Logo title="basket icon" />
          {wishlistItemsQuantity > 0 && (
            <div className={wishlistBastketStyles}>{wishlistItemsQuantity}</div>
          )}
        </div>

        <h3>Wishlist</h3>
      </div>
    </NavLink>
  );
};

export default HeaderBasket;
