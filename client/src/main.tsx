import React from "react";
import ReactDOM from "react-dom/client";
import Login from "./Login/Login.tsx";
import PrivateRoutes from "./PrivateRoutes.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./dashboard/dashboard.tsx";
import Home from "./Home/Home.tsx";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home/>
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/dashboard",
    element: <PrivateRoutes />,
    children: [
      {
        path: "/dashboard/",
        element: <Dashboard />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
