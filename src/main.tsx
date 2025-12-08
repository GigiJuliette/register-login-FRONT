import "./index.css";

import App from "./App.tsx";
import AuthPage from "./pages/AuthPage/AuthPage.tsx";
import Dashboard from "./pages/Dashboard.tsx/Dashboard.tsx";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
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
    ],
  },
]);
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
