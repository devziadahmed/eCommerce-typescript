import { ReactNode } from "react";
import { Col } from "react-bootstrap";

import LottieHandler from "@components/feedback/LottieHandler/LottieHandler";
import useAnimate from "@hooks/useAnimateErrorMessage";

type GridListProps<T> = {
  records: T[];
  renderItem: (record: T) => ReactNode;
  emptyMessage?: string;
};

const GridList = <T extends { id?: number }>({
  records,
  renderItem,
  emptyMessage,
}: GridListProps<T>) => {
  const { animateError, handleComplete } = useAnimate(2000);

  return records.length > 0 ? (
    records.map((record) => (
      <Col key={record.id} xs={6} md={3} className="d-flex justify-content-center mb-5 mt-2">
        {renderItem(record)}
      </Col>
    ))
  ) : (
    <div className="d-flex flex-column align-items-center">
      <LottieHandler type="empty" width={300} height={240} onLoopComplete={handleComplete} />
      <b className={animateError ? "pumpAnimate error" : ""}>{emptyMessage}</b>
    </div>
  );
};

export default GridList;
