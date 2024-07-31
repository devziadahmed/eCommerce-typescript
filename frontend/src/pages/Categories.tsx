import { Row } from "react-bootstrap";

import { Category } from "@components/eCommerce";

import Loading from "@components/feedback/Loading/Loading";
import { GridList, Heading } from "@components/shared";
import useCategories from "@hooks/useCategory";

const Categories = () => {
  const { records, status, error } = useCategories();

  return (
    <>
      <Heading title="categories" />

      <Loading status={status} error={error} type="category">
        <Row className="p-2">
          <GridList records={records} renderItem={(record) => <Category {...record} />} />
        </Row>
      </Loading>
    </>
  );
};

export default Categories;
