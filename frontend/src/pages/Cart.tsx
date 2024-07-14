import { createPortal } from "react-dom";

import { CartSubtotalPrice } from "@components/eCommerce";
import CartItemList from "@components/eCommerce/CartItem/CartItemList/CartItemList";
import Loading from "@components/feedback/Loading/Loading";
import { Heading } from "@components/shared";

import useCart from "@hooks/useCart";

const Cart = () => {
  const { status, error, products, changeQuantityHandler } = useCart();

  return (
    <>
      <Heading title="cart" />
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
