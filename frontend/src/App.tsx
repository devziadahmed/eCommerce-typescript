import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Spinner } from "react-bootstrap";

const MainLayout = lazy(() =>
  import("@layouts/index").then((module) => ({ default: module.MainLayout }))
);

const Home = lazy(() => import("@pages/Home"));
const Categories = lazy(() => import("@pages/Categories"));
const Product = lazy(() => import("@pages/Products"));
const About = lazy(() => import("@pages/About"));
const Login = lazy(() => import("@pages/Login"));
const Register = lazy(() => import("@pages/Register"));
const Cart = lazy(() => import("@pages/Cart"));
const Wishlist = lazy(() => import("@pages/Wishlist"));
const Account = lazy(() => import("@pages/Account"));
const Orders = lazy(() => import("@pages/Orders"));
const AccountLayout = lazy(() => import("@layouts/AccountLayout/AccountLayout"));
import ErrorPage from "@pages/ErrorPage";
import { loader as productLoader } from "@pages/Products";

import Logo from "@components/shared/Logo/Logo";
import PageSuspenseFallback from "@components/feedback/PageSuspenseFallback/PageSuspenseFallback";
import ProtectedRoute from "@components/Auth/ProtectedRoute";

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
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: (
            <PageSuspenseFallback>
              <Home />
            </PageSuspenseFallback>
          ),
        },
        {
          path: "categories",
          element: (
            <PageSuspenseFallback>
              <Categories />
            </PageSuspenseFallback>
          ),
        },
        {
          path: "categories/products/:prefix",
          element: (
            <PageSuspenseFallback>
              <Product />
            </PageSuspenseFallback>
          ),
          loader: productLoader,
        },
        {
          path: "cart",
          element: (
            <PageSuspenseFallback>
              <Cart />
            </PageSuspenseFallback>
          ),
        },
        {
          path: "wishlist",
          element: (
            <ProtectedRoute>
              <PageSuspenseFallback>
                <Wishlist />
              </PageSuspenseFallback>
            </ProtectedRoute>
          ),
        },
        {
          path: "about-us",
          element: (
            <PageSuspenseFallback>
              <About />
            </PageSuspenseFallback>
          ),
        },
        {
          path: "login",
          element: (
            <PageSuspenseFallback>
              <Login />
            </PageSuspenseFallback>
          ),
        },
        {
          path: "register",
          element: (
            <PageSuspenseFallback>
              <Register />
            </PageSuspenseFallback>
          ),
        },
        {
          path: "account",
          element: (
            <ProtectedRoute>
              <PageSuspenseFallback>
                <AccountLayout />
              </PageSuspenseFallback>
            </ProtectedRoute>
          ),
          children: [
            {
              index: true,
              element: (
                <PageSuspenseFallback>
                  <Account />
                </PageSuspenseFallback>
              ),
            },
            {
              path: "orders",
              element: <Orders />,
            },
          ],
        },
        {
          path: "orders",
          element: (
            <ProtectedRoute>
              <PageSuspenseFallback>
                <Orders />
              </PageSuspenseFallback>
            </ProtectedRoute>
          ),
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
