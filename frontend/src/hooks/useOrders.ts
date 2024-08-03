import { useEffect, useState } from "react";
import { Product } from "@apptypes/product";

import { useAppDispatch, useAppSelector } from "@store/hooks";
import { resetOrders } from "@store/orders/ordersSlice";
import actGetOrders from "@store/orders/thunk/actGetOrders";

const useOrders = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product[]>([]);
  const dispatch = useAppDispatch();
  const { status, error, orderList } = useAppSelector((state) => state.orders);

  const handleClick = (id: number) => {
    const productDetails = orderList?.find((order) => order.id === id);
    const newItem = productDetails?.items ?? [];

    setShowModal(true);
    setSelectedProduct((prev) => [...prev, ...newItem]);
  };

  const handleClose = () => {
    setShowModal(false);
    setSelectedProduct([]);
  };

  useEffect(() => {
    const promise = dispatch(actGetOrders());

    return () => {
      promise.abort();
      dispatch(resetOrders());
    };
  }, [dispatch]);

  return {
    showModal,
    setShowModal,
    selectedProduct,
    setSelectedProduct,
    status,
    error,
    orderList,
    handleClick,
    handleClose,
  };
};

export default useOrders;
