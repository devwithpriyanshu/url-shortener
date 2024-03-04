import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const backend_url = import.meta.env.VITE_BACKEND_URL;

const loader = async ({ params }) => {
  window.location.href = `${backend_url}/${params.shortId}`;
  return null;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: (error) => (
      <div>An error occurred loading the page: {error.message}</div>
    ),
  },
  {
    path: "/:shortId",
    loader: loader,
    errorElement: (error) => (
      <div>An error occurred loading the page: {error.message}</div>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
