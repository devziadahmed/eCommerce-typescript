import { useCallback, useEffect } from "react";

import {
  actGetProductsByItems,
  cartItemChangeQuntity,
  cleanCartProducts,
} from "@store/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { Product } from "@apptypes/product";

import { ThunkPromise } from "@apptypes/shared";
import { resetOrders } from "@store/orders/ordersSlice";

const useCart = () => {
  const dispatch = useAppDispatch();
  const {
    items,
    productsFullInfo,
    status: cartStatus,
    error,
  } = useAppSelector((state) => state.cart);
  const userAccessToken = useAppSelector((state) => state.auth.accessToken);
  const { status: placeOrderStatus } = useAppSelector((state) => state.orders);

  useEffect(() => {
    let promise: ThunkPromise<Product[]>;

    if (Object.keys(items).length !== 0) promise = dispatch(actGetProductsByItems());

    return () => {
      if (promise) {
        promise.abort();
      }
      dispatch(cleanCartProducts());

      if (placeOrderStatus === "succeeded") {
        dispatch(resetOrders());
      }
    };
  }, [dispatch, items]);

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

  return {
    cartStatus,
    error,
    products,
    changeQuantityHandler,
    userAccessToken,
    placeOrderStatus,
  };
};

export default useCart;
