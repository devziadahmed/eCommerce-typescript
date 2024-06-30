import { ReactNode } from "react";
import { Col } from "react-bootstrap";

type GridListProps<T> = {
  records: T[];
  renderItem: (record: T) => ReactNode;
};

const GridList = <T extends { id?: number }>({ records, renderItem }: GridListProps<T>) => {
  return records.length > 0 ? (
    records.map((record) => (
      <Col key={record.id} xs={6} md={3} className="d-flex justify-content-center mb-5 mt-2">
        {renderItem(record)}
      </Col>
    ))
  ) : (
    <b>There are no categories</b>
  );
};

export default GridList;
