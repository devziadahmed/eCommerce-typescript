import { Container } from "react-bootstrap";
import { Header, Footer } from "@components/shared";

import { Outlet } from "react-router-dom";

import styles from "./styles.module.css";
const { container, wrapper } = styles;

const MainLayout = () => {
  return (
    <div>
      <Container className={container}>
        <Header />
        <main className={wrapper}>
          <Outlet />
        </main>
      </Container>
      <Footer />
    </div>
  );
};

export default MainLayout;
