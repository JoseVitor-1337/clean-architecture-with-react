import React, { ReactElement } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "@presentation/styles/global.scss";

type Props = {
  makeLogin: () => ReactElement;
};

export const Router: React.FC<Props> = ({ makeLogin }) => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: makeLogin(),
    },
    {
      path: "/signup",
      element: <h1>Sign up</h1>,
    },
  ]);

  return <RouterProvider router={router} />;
};
