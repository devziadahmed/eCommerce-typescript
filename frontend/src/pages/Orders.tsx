import { Table, Modal } from "react-bootstrap";

import { formatPrice } from "@utils/index";

import { Heading } from "@components/shared";
import Loading from "@components/feedback/Loading/Loading";
import ProductInfo from "@components/eCommerce/ProductInfo/ProductInfo";
import useOrders from "@hooks/useOrders";

const Orders = () => {
  const { showModal, selectedProduct, status, error, orderList, handleClick, handleClose } =
    useOrders();

  return (
    <>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedProduct.map((el) => (
            <ProductInfo
              key={el.id}
              title={el.title}
              img={el.img}
              price={el.price}
              quantity={el.quantity}
              direction="column"
              style={{ marginBottom: "10px" }}
            />
          ))}
        </Modal.Body>
      </Modal>

      <Heading title="My Order" />

      <Loading status={status} error={error} type="table">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Order Name</th>
              <th>Items</th>
              <th>Total Price</th>
            </tr>
          </thead>

          <tbody>
            {orderList?.map((el) => (
              <tr key={el.id}>
                <td># {el.id}</td>
                <td>
                  {el.items.length} item{el.items.length > 1 ? "s" : ""}
                  {" / "}
                  <span
                    onClick={() => handleClick(el.id)}
                    style={{ textDecoration: "underline", cursor: "pointer" }}
                  >
                    Product Details
                  </span>
                </td>
                <td>{formatPrice(el.subtotal)}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Loading>
    </>
  );
};

export default Orders;
