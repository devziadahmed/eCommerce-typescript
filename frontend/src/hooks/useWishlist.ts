import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { actGetWishlist, cleanWishlist } from "@store/wishlist/wishlistSlice";

const useWishlist = () => {
  const dispatch = useAppDispatch();
  const { status, error, productsFullInfo } = useAppSelector((state) => state.wishlist);
  const cartItems = useAppSelector((state) => state.cart.items);

  useEffect(() => {
    const promise = dispatch(actGetWishlist());

    return () => {
      if (promise) {
        promise.abort();
      }

      dispatch(cleanWishlist());
    };
  }, []);

  const records = productsFullInfo.map((el) => ({
    ...el,
    quantity: el.id && cartItems[el.id],
    isLiked: true,
  }));

  return { status, error, records };
};

export default useWishlist;
