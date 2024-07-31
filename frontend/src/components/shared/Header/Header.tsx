import { Link, NavLink } from "react-router-dom";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "@store/hooks";

import { logout } from "@store/auth/authSlice";

import styles from "./styles.module.css";
const { headerContainer, headerLeftBar } = styles;

import { HeaderIcons } from "@components/eCommerce";
import Logo from "../Logo/Logo";
import { useEffect } from "react";
import { actGetWishlist } from "@store/wishlist/wishlistSlice";

const Header = () => {
  const dispatch = useAppDispatch();
  const { accessToken, user } = useAppSelector((state) => state.auth);

  const handleClickLogout = () => dispatch(logout());

  useEffect(() => {
    if (accessToken) {
      dispatch(actGetWishlist("productIds"));
    }
  }, [accessToken]);

  return (
    <header>
      <div className={headerContainer}>
        <Link to="/">
          <Logo />
        </Link>

        <div className={headerLeftBar}>
          <HeaderIcons />
        </div>
      </div>

      <Navbar expand="lg" className="bg-body-tertiary" bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Toggle aria-controls="basic-navbar-nav" style={{ marginLeft: "auto" }} />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={NavLink} to="/">
                Home
              </Nav.Link>
              <Nav.Link as={NavLink} to="categories">
                Categories
              </Nav.Link>
              <Nav.Link as={NavLink} to="about-us">
                About
              </Nav.Link>
            </Nav>

            <Nav>
              {!accessToken ? (
                <>
                  <Nav.Link as={NavLink} to="login">
                    Login
                  </Nav.Link>
                  <Nav.Link as={NavLink} to="register">
                    Register
                  </Nav.Link>
                </>
              ) : (
                <>
                  <NavDropdown
                    title={`Welcome, ${user?.firstName} ${user?.lastName}`}
                    id="basic-nav-dropdown"
                  >
                    <NavDropdown.Item as={NavLink} to="/profile">
                      Profile
                    </NavDropdown.Item>
                    <NavDropdown.Item as={NavLink} to="/orders">
                      Orders
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item
                      as={Link}
                      to="/"
                      onClick={handleClickLogout}
                      style={{ color: "#ff4c4c" }}
                    >
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
