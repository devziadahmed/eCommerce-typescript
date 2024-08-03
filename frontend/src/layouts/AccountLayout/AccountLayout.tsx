import { NavLink, Outlet } from "react-router-dom";
import { Row, Col, ListGroup } from "react-bootstrap";

const ProfileLayout = () => {
  return (
    <Row>
      <Col md={3}>
        <ListGroup style={{ marginBottom: "2rem" }}>
          <ListGroup.Item as={NavLink} to="" end>
            Account Info
          </ListGroup.Item>
          <ListGroup.Item as={NavLink} to="orders">
            Orders
          </ListGroup.Item>
        </ListGroup>
      </Col>
      <Col>
        <Outlet />
      </Col>
    </Row>
  );
};

export default ProfileLayout;
