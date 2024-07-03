import { ChangeEvent, memo, useState } from "react";
import { Form, Button } from "react-bootstrap";

import { ProductWithQuantity } from "@apptypes/product";
import { formatPrice } from "@utils/index";

import styles from "./styles.module.css";
import { useAppDispatch } from "@store/hooks";
import { deleteCartItem } from "@store/cart/cartSlice";
const { cartItem, product, productImg, productInfo, cartItemControls } = styles;

type CartItemProps = ProductWithQuantity & {
  changeQuantityHandler: (id: number, quantity: number) => void;
};

const CartItem = memo(
  ({ id, title, img, price, quantity, changeQuantityHandler }: CartItemProps) => {
    const dispatch = useAppDispatch();
    const quantityOptions = Array.from({ length: quantity }, (_, index) => index + 1);
    const [selectValue, setSelectValue] = useState(quantity);

    const handleClick = () => id && dispatch(deleteCartItem(id));

    const onChangeQuantity = (e: ChangeEvent<HTMLSelectElement>) => {
      const quantity = +e.target.value;
      setSelectValue(quantity);
      id && changeQuantityHandler(id, quantity);
    };

    return (
      <div className={cartItem}>
        <div className={product}>
          <div className={productImg}>
            <img src={img} alt={title} />
          </div>
          <div className={productInfo}>
            <h2>{title}</h2>
            <h3>{formatPrice(price)}</h3>
          </div>
        </div>

        <div className={cartItemControls}>
          <div>
            <span className="d-block mb-1">Quantity</span>
            <Form.Select value={selectValue} onChange={onChangeQuantity}>
              {quantityOptions.map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </Form.Select>
          </div>

          <Button
            variant="secondary"
            style={{ color: "white", width: "100px" }}
            onClick={handleClick}
          >
            Remove
          </Button>
        </div>
      </div>
    );
  }
);

export default CartItem;
