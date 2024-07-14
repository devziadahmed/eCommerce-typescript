import { Row } from "react-bootstrap";

import { Product } from "@components/eCommerce";
import Loading from "@components/feedback/Loading/Loading";
import { GridList, Heading } from "@components/shared";
import useWishlist from "@hooks/useWishlist";

const Wishlist = () => {
  const { status, error, records } = useWishlist();

  return (
    <>
      <Heading title="your wishlist" />
      <Loading status={status} error={error}>
        <Row>
          <GridList<Product>
            records={records}
            renderItem={(record) => <Product {...record} />}
          />
        </Row>
      </Loading>
    </>
  );
};

export default Wishlist;
