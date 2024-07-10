import { Product } from "@components/eCommerce";
import Loading from "@components/feedback/Loading/Loading";
import { GridList, Heading } from "@components/shared";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import actGetWishlist from "@store/wishlist/thunk/actGetWishlist";
import { cleanWishlist } from "@store/wishlist/wishlistSlice";
import { useEffect } from "react";
import { Row } from "react-bootstrap";

const Wishlist = () => {
  const dispatch = useAppDispatch();
  const { status, error, productsFullInfo } = useAppSelector((state) => state.wishlist);
  const cartItems = useAppSelector((state) => state.cart.items);

  useEffect(() => {
    dispatch(actGetWishlist());

    return () => {
      dispatch(cleanWishlist());
    };
  }, []);

  const records = productsFullInfo.map((el) => ({
    ...el,
    quantity: el.id && cartItems[el.id],
    isLiked: true,
  }));

  return (
    <>
      <Heading>Your Wishlist</Heading>
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
