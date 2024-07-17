import { createPortal } from "react-dom";

import { CartSubtotalPrice } from "@components/eCommerce";
import CartItemList from "@components/eCommerce/CartItem/CartItemList/CartItemList";
import Loading from "@components/feedback/Loading/Loading";
import { Heading } from "@components/shared";

import useCart from "@hooks/useCart";
import LottieHandler from "@components/feedback/LottieHandler/LottieHandler";
import useAnimate from "@hooks/useAnimateErrorMessage";

const Cart = () => {
  const { status, error, products, changeQuantityHandler } = useCart();
  const { animateError, handleComplete } = useAnimate(2000);

  return (
    <>
      <Heading title="cart" />
      <Loading status={status} error={error} type="cart">
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
          <div className="d-flex flex-column align-items-center">
            <LottieHandler
              type="empty"
              width={300}
              height={240}
              onLoopComplete={handleComplete}
            />

            <strong
              className={animateError ? "pumpAnimate error" : ""}
              style={{ display: "block", textAlign: "center", letterSpacing: "0.6px" }}
            >
              Your cart is empty
            </strong>
          </div>
        )}
      </Loading>
    </>
  );
};

export default Cart;
