import { useEffect } from "react";
import { Container, Row } from "react-bootstrap";

import { useAppDispatch, useAppSelector } from "@store/hooks";
import { Category } from "@components/eCommerce";
import { actGetCategories } from "@store/categories/categoriesSlice";
import Loading from "@components/feedback/Loading/Loading";
import { GridList, Heading } from "@components/shared";

const Categories = () => {
  const dispatch = useAppDispatch();
  const { status, error, records } = useAppSelector((state) => state.categories);

  useEffect(() => {
    if (records.length === 0) dispatch(actGetCategories());
  }, []);

  return (
    <>
      <Heading>Categories</Heading>

      <Loading status={status} error={error}>
        <Row>
          <GridList records={records} renderItem={(record) => <Category {...record} />} />
        </Row>
      </Loading>
    </>
  );
};

export default Categories;
