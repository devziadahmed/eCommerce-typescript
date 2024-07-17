import { Col, Row } from "react-bootstrap";
import ContentLoader from "react-content-loader";

const CategorySkeleton = () => {
  const renderSkeletons = Array(5)
    .fill(0)
    .map((_, i) => (
      <Col key={i}>
        <ContentLoader
          speed={2}
          width={300}
          height={209}
          viewBox="0 0 200 209"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
        >
          <rect x="69" y="185" rx="3" ry="3" width="52" height="7" />
          <circle cx="96" cy="86" r="88" />
        </ContentLoader>
      </Col>
    ));

  return <Row>{renderSkeletons}</Row>;
};

export default CategorySkeleton;
