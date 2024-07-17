import { Link, LoaderFunction } from "react-router-dom";
import { Row } from "react-bootstrap";

import useProducts from "@hooks/useProducts";

import { Product } from "@components/eCommerce";
import { GridList, Heading } from "@components/shared";
import Loading from "@components/feedback/Loading/Loading";
import LeftArrow from "@assets/svg/left-arrow.svg?react";
import { isCategoryPrefix } from "@apptypes/guards";

const Products = () => {
  const { error, status, productsFullInfo, prefix } = useProducts();

  return (
    <>
      <Link to="/categories" className="basic-link mb-2">
        <LeftArrow /> Go back to <span className="fw-bold">Categories</span>
      </Link>

      <Heading title={`${prefix} products`} />

      <Loading status={status} error={error} type="product">
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
  if (
    typeof params.prefix !== "string" ||
    !/^[a-z]+$/i.test(params.prefix) ||
    !isCategoryPrefix(params.prefix)
  ) {
    throw new Response("Bad request", {
      statusText: "Category not found",
      status: 400,
    });
  }
  return { success: true };
};
