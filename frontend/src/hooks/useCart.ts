import { useCallback, useEffect } from "react";

import {
  actGetProductsByItems,
  cartItemChangeQuntity,
  cleanCartProducts,
} from "@store/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { Product } from "@apptypes/product";

import { ThunkPromise } from "@apptypes/shared";

const useCart = () => {
  const dispatch = useAppDispatch();
  const { items, productsFullInfo, status, error } = useAppSelector((state) => state.cart);

  useEffect(() => {
    let promise: ThunkPromise<Product[]>;

    if (Object.keys(items).length !== 0) promise = dispatch(actGetProductsByItems());

    return () => {
      if (promise) {
        promise.abort();
      }
      dispatch(cleanCartProducts());
    };
  }, [items]);

  const products = productsFullInfo.map((product) => ({
    ...product,
    quantity: items[product.id as keyof typeof items],
  }));

  const changeQuantityHandler = useCallback(
    (id: number, quantity: number) => {
      dispatch(cartItemChangeQuntity(id, quantity));
    },
    [dispatch]
  );

  return { status, error, products, changeQuantityHandler };
};

export default useCart;
