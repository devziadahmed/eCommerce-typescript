import styles from "./styles.module.css";
import { useState } from "react";
import { Button, Modal, Spinner } from "react-bootstrap";
import { ProductWithQuantity } from "@apptypes/product";
import { formatPrice } from "@utils/index";
import { useAppDispatch } from "@store/hooks";
import actPlaceOrder from "@store/orders/thunk/actPlaceOrder";
import { resetCart } from "@store/cart/cartSlice";

type CartSubtotalPriceProps = {
  products: ProductWithQuantity[];
  userAccessToken: string | null;
};

const CartSubtotalPrice = ({ products, userAccessToken }: CartSubtotalPriceProps) => {
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const subtotalPrice = products.reduce((acc, curr) => acc + curr.price * curr.quantity, 0);
  const formattedPrice = formatPrice(subtotalPrice);

  const modalHandler = () => {
    setShowModal(!showModal);
    setError(null);
  };

  const handlePlaceOrder = () => {
    setIsLoading(true);
    dispatch(actPlaceOrder(subtotalPrice))
      .unwrap()
      .then(() => {
        dispatch(resetCart());
        setShowModal(false);
      })
      .catch((error) => {
        setError(error.message || "An error occurred.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <>
      <Modal size="lg" show={showModal} backdrop="static" onHide={modalHandler}>
        <Modal.Header closeButton>
          <Modal.Title>Placing Order</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ fontWeight: "500" }}>
          Are You sure you want to place an order with a total price of{" "}
          <span style={{ color: "#0DCAF0" }}>{formattedPrice}</span>
          {!isLoading && error && (
            <p style={{ color: "#DC3545", marginTop: "10px" }}>{error}</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={modalHandler}>
            Close
          </Button>
          <Button variant="info" style={{ color: "white" }} onClick={handlePlaceOrder}>
            {isLoading ? (
              <>
                <Spinner animation="border" size="sm" /> Loading
              </>
            ) : (
              "Confirm"
            )}
          </Button>
        </Modal.Footer>
      </Modal>

      <div className={styles.container}>
        <span>Subtotal:</span>
        <span>{formattedPrice}</span>
      </div>

      {userAccessToken && (
        <div className={styles.container}>
          <span></span>
          <span>
            <Button variant="info" style={{ color: "white" }} onClick={modalHandler}>
              Place Order
            </Button>
          </span>
        </div>
      )}
    </>
  );
};

export default CartSubtotalPrice;
