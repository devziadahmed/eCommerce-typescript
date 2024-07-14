import { useAppDispatch, useAppSelector } from "@store/hooks";
import { actGetProductsByCat, cleanProducts } from "@store/products/productsSlice";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const useProducts = () => {
  const { prefix } = useParams();

  const dispatch = useAppDispatch();
  const { error, status, records } = useAppSelector((state) => state.products);
  const cartItems = useAppSelector((state) => state.cart.items);
  const wishListItemsId = useAppSelector((state) => state.wishlist);

  const productsFullInfo = records.map((record) => ({
    ...record,
    quantity: record.id ? cartItems[record.id] || 0 : 0,
    isLiked: record.id ? wishListItemsId.itemsId.includes(record.id) : false,
  }));

  useEffect(() => {
    const promise = dispatch(actGetProductsByCat(prefix as string));

    return () => {
      if (promise) {
        promise.abort();
      }

      dispatch(cleanProducts());
    };
  }, [dispatch]);

  return { prefix, records, error, status, productsFullInfo };
};

export default useProducts;
