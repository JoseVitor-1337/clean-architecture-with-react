import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "@presentation/styles/global.scss";

import { Login } from "@presentation/pages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
]);

export const Router: React.FC = () => {
  return <RouterProvider router={router} />;
};
