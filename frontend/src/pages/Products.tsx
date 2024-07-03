import { useEffect } from "react";
import { Link, LoaderFunction, useParams } from "react-router-dom";
import { Row } from "react-bootstrap";

import { useAppDispatch, useAppSelector } from "@store/hooks";
import { actGetProductsByCat, cleanProducts } from "@store/products/productsSlice";

import { Product } from "@components/eCommerce";
import Loading from "@components/feedback/Loading/Loading";
import { GridList, Heading } from "@components/shared";

import LeftArrow from "@assets/left-arrow.svg?react";

const Products = () => {
  const { prefix } = useParams();

  const dispatch = useAppDispatch();
  const { error, status, records } = useAppSelector((state) => state.products);
  const cartItems = useAppSelector((state) => state.cart.items);

  const productsFullInfo = records.map((record) => ({
    ...record,
    quantity: record.id ? cartItems[record.id] || 0 : 0,
  }));

  useEffect(() => {
    dispatch(actGetProductsByCat(prefix as string));

    return () => {
      dispatch(cleanProducts());
    };
  }, [dispatch]);

  return (
    <>
      <Link to="/categories" className="basic-link mb-2">
        <LeftArrow /> Go back to <span className="fw-bold">Categories</span>
      </Link>

      <Heading>
        <span className="text-capitalize">{prefix}</span> Products
      </Heading>

      <Loading status={status} error={error}>
        <Row>
          <GridList<Product>
            records={productsFullInfo}
            renderItem={(record) => <Product {...record} />}
          />
        </Row>
      </Loading>
    </>
  );
};

export default Products;

export const loader: LoaderFunction = ({ params }) => {
  if (typeof params.prefix !== "string" || !/^[a-z]+$/i.test(params.prefix)) {
    throw new Response("Bad request", {
      statusText: "Category not found",
      status: 400,
    });
  }
  return { success: true };
};
