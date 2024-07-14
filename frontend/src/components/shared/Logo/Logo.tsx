import { Badge } from "react-bootstrap";
import styles from "./styles.module.css";

const { headerLogo } = styles;

const Logo = () => {
  return (
    <h1 className={headerLogo}>
      <span>our</span> <Badge bg="info">eCom</Badge>
    </h1>
  );
};

export default Logo;
