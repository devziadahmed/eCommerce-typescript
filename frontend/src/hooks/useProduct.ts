import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { addToCart } from "@store/cart/cartSlice";
import { throttle } from "@utils/index";
import { actLikeToggle } from "@store/wishlist/wishlistSlice";
import { useNavigate } from "react-router-dom";

const useProduct = (max: number, quantity?: number, id?: number) => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { accessToken } = useAppSelector((state) => state.auth);
  const throttledAddToCart = throttle(() => dispatch(addToCart(id)), 300);

  const remainingQuantity = max - (quantity ?? 0);
  const reachedMaxQuantity = remainingQuantity <= 0;

  const handleLikeToggle = () => {
    if (!accessToken) return navigate("/login?message=login_required");
    setIsLoading(true);
    id &&
      dispatch(actLikeToggle(id))
        .unwrap()
        .then(() => setIsLoading(false));
  };

  return {
    isLoading,
    throttledAddToCart,
    handleLikeToggle,
    reachedMaxQuantity,
    remainingQuantity,
  };
};

export default useProduct;
