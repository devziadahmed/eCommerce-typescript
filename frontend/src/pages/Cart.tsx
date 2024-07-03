import { useCallback, useEffect } from "react";

import { CartSubtotalPrice } from "@components/eCommerce";
import CartItemList from "@components/eCommerce/CartItem/CartItemList/CartItemList";
import Loading from "@components/feedback/Loading/Loading";
import { Heading } from "@components/shared";
import { actGetProductsByItems, cartItemChangeQuntity } from "@store/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { createPortal } from "react-dom";

const Cart = () => {
  const dispatch = useAppDispatch();
  const { items, productsFullInfo, status, error } = useAppSelector((state) => state.cart);

  useEffect(() => {
    if (Object.keys(items).length !== 0) dispatch(actGetProductsByItems());
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

  return (
    <>
      <Heading>Cart</Heading>
      <Loading status={status} error={error}>
        {products.length > 0 ? (
          <>
            <CartItemList products={products} changeQuantityHandler={changeQuantityHandler} />

            {typeof document !== "undefined" &&
              document.getElementById("container") &&
              createPortal(
                <CartSubtotalPrice products={products} />,
                document.getElementById("container") as HTMLElement
              )}
          </>
        ) : (
          <strong style={{ display: "block", textAlign: "center", letterSpacing: "0.6px" }}>
            Your cart is empty
          </strong>
        )}
      </Loading>
    </>
  );
};

export default Cart;
