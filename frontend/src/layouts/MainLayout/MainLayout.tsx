import { Container } from "react-bootstrap";
import { Header, Footer } from "@components/shared";

import styles from "./styles.module.css";
import { Outlet } from "react-router-dom";
const { container, wrapper } = styles;

const MainLayout = () => {
  return (
    <Container className={container}>
      <Header />
      <main className={wrapper}>
        <Outlet />
      </main>
      <Footer />
    </Container>
  );
};

export default MainLayout;
