import { LoaderFunction } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { Product } from "@components/eCommerce";

const Products = () => {
  return (
    <Container>
      <Row>
        <Col xs={6} md={3} className="d-flex justify-content-center mb-5 mt-2">
          <Product />
        </Col>
        <Col xs={6} md={3} className="d-flex justify-content-center mb-5 mt-2">
          <Product />
        </Col>
        <Col xs={6} md={3} className="d-flex justify-content-center mb-5 mt-2">
          <Product />
        </Col>
        <Col xs={6} md={3} className="d-flex justify-content-center mb-5 mt-2">
          <Product />
        </Col>
        <Col xs={6} md={3} className="d-flex justify-content-center mb-5 mt-2">
          <Product />
        </Col>
      </Row>
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
