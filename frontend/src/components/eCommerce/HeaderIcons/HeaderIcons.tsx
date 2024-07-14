import { useAppSelector } from "@store/hooks";
import HeaderIcon from "../HeaderIcon/HeaderIcon";
import { getCartTotalQuantity } from "@store/cart/cartSlice";
import { getWishlistTotalQuantity } from "@store/wishlist/wishlistSlice";

import CartIcon from "@assets/svg/cart.svg?react";
import WishlistIcon from "@assets/svg/wishlist.svg?react";

const HeaderIcons = () => {
  const cartItemsTotalQuantity = useAppSelector(getCartTotalQuantity);
  const wishlistItemsTotalQuantity = useAppSelector(getWishlistTotalQuantity);

  return (
    <>
      <HeaderIcon
        title="Wishlist"
        icon={<WishlistIcon />}
        to="/wishlist"
        totalQuantity={wishlistItemsTotalQuantity}
      />

      <HeaderIcon
        title="Cart"
        icon={<CartIcon />}
        to="/cart"
        totalQuantity={cartItemsTotalQuantity}
      />
    </>
  );
};

export default HeaderIcons;
