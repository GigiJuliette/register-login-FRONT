import "./index.css";

import App from "./App.tsx";
import AuthPage from "./pages/AuthPage/AuthPage.tsx";
import Dashboard from "./pages/Dashboard.tsx/Dashboard.tsx";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import ErrorPage from "./pages/Error/ErrorPage.tsx";
const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/authentication",
        element: <AuthPage />,
      },
      {
        path: "*",
        element: <ErrorPage />,
      },
    ],
  },
]);
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
