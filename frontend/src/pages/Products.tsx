import { useEffect } from "react";
import { LoaderFunction, useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

import { Product } from "@components/eCommerce";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { actGetProductsByCat, cleanProducts } from "@store/products/productsSlice";

const Products = () => {
  const { prefix } = useParams();

  const dispatch = useAppDispatch();
  const { error, status, records } = useAppSelector((state) => state.products);
  const isLoading = status === "pending";

  useEffect(() => {
    dispatch(actGetProductsByCat(prefix as string));

    return () => {
      dispatch(cleanProducts());
    };
  }, [dispatch]);

  const productsList =
    records.length > 0 ? (
      records.map((record) => (
        <Col key={record.id} xs={6} md={3} className="d-flex justify-content-center mb-5 mt-2">
          <Product {...record} />
        </Col>
      ))
    ) : (
      <b>There are no categories</b>
    );

  return (
    <Container>
      <Row>{productsList}</Row>
    </Container>
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
