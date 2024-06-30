import { useEffect } from "react";
import { LoaderFunction, useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

import { useAppDispatch, useAppSelector } from "@store/hooks";
import { actGetProductsByCat, cleanProducts } from "@store/products/productsSlice";

import { Product } from "@components/eCommerce";
import Loading from "@components/feedback/Loading/Loading";
import { GridList } from "@components/shared";

const Products = () => {
  const { prefix } = useParams();

  const dispatch = useAppDispatch();
  const { error, status, records } = useAppSelector((state) => state.products);

  useEffect(() => {
    dispatch(actGetProductsByCat(prefix as string));

    return () => {
      dispatch(cleanProducts());
    };
  }, [dispatch]);

  return (
    <Container>
      <Loading status={status} error={error}>
        <Row>
          <GridList<Product>
            records={records}
            renderItem={(record) => <Product {...record} />}
          />
        </Row>
      </Loading>
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
