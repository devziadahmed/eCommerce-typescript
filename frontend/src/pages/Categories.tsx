import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { Category } from "@components/eCommerce";
import { actGetCategories } from "@store/categories/categoriesSlice";

const Categories = () => {
  const dispatch = useAppDispatch();
  const { status, error, records } = useAppSelector((state) => state.categories);

  const isLoading = status === "pending";

  useEffect(() => {
    if (records.length === 0) dispatch(actGetCategories());
  }, []);

  const categoriesList =
    records.length > 0 ? (
      records.map((record) => (
        <Col key={record.id} xs={6} md={3} className="d-flex justify-content-center mb-5 mt-2">
          <Category {...record} />
        </Col>
      ))
    ) : (
      <b>There are no categories</b>
    );

  return (
    <Container>
      <Row>{categoriesList}</Row>
    </Container>
  );
};

export default Categories;
