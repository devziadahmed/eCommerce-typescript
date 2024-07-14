import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const MainLayout = lazy(() =>
  import("@layouts/index").then((module) => ({ default: module.MainLayout }))
);

const Home = lazy(() => import("@pages/Home"));
const Categories = lazy(() => import("@pages/Categories"));
const Product = lazy(() => import("@pages/Products"));
const About = lazy(() => import("@pages/About"));
const Login = lazy(() => import("@pages/Login"));
const Register = lazy(() => import("@pages/Register"));
const Error = lazy(() => import("@pages/ErrorPage"));
const Cart = lazy(() => import("@pages/Cart"));
const Wishlist = lazy(() => import("@pages/Wishlist"));

import { loader as productLoader } from "@pages/Products";
import { Spinner } from "react-bootstrap";
import Logo from "@components/shared/Logo/Logo";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Suspense
          fallback={
            <div className="flex-screen-center">
              <Spinner variant="info" />
              <Logo />
            </div>
          }
        >
          <MainLayout />
        </Suspense>
      ),
      errorElement: (
        <Suspense
          fallback={
            <div className="position-center">
              <Spinner variant="info" />
            </div>
          }
        >
          <Error />
        </Suspense>
      ),
      children: [
        {
          index: true,
          element: (
            <Suspense
              fallback={
                <div className="position-center">
                  <Spinner variant="info" />
                </div>
              }
            >
              <Home />
            </Suspense>
          ),
        },
        {
          path: "categories",
          element: (
            <Suspense
              fallback={
                <div className="position-center">
                  <Spinner variant="info" />
                </div>
              }
            >
              <Categories />
            </Suspense>
          ),
        },
        {
          path: "categories/products/:prefix",
          element: (
            <Suspense
              fallback={
                <div className="position-center">
                  <Spinner variant="info" />
                </div>
              }
            >
              <Product />
            </Suspense>
          ),
          loader: productLoader,
        },
        {
          path: "cart",
          element: (
            <Suspense
              fallback={
                <div className="position-center">
                  <Spinner variant="info" />
                </div>
              }
            >
              <Cart />
            </Suspense>
          ),
        },
        {
          path: "wishlist",
          element: (
            <Suspense
              fallback={
                <div className="position-center">
                  <Spinner variant="info" />
                </div>
              }
            >
              <Wishlist />
            </Suspense>
          ),
        },
        {
          path: "about-us",
          element: (
            <Suspense
              fallback={
                <div className="position-center">
                  <Spinner variant="info" />
                </div>
              }
            >
              <About />
            </Suspense>
          ),
        },
        {
          path: "login",
          element: (
            <Suspense
              fallback={
                <div className="position-center">
                  <Spinner variant="info" />
                </div>
              }
            >
              <Login />
            </Suspense>
          ),
        },
        {
          path: "register",
          element: (
            <Suspense
              fallback={
                <div className="position-center">
                  <Spinner variant="info" />
                </div>
              }
            >
              <Register />
            </Suspense>
          ),
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
