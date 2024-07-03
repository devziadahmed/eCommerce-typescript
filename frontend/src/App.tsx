import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { MainLayout } from "@layouts/index";
import { Home, Categories, Product, About, Login, Register, Error, Cart } from "@pages/index";

import { loader as productLoader } from "@pages/Products";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      errorElement: <Error />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "categories",
          element: <Categories />,
        },
        {
          path: "categories/products/:prefix",
          element: <Product />,
          loader: productLoader,
        },
        {
          path: "cart",
          element: <Cart />,
        },
        {
          path: "about-us",
          element: <About />,
        },
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "register",
          element: <Register />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
