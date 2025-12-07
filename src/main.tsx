import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router";
import UsersList from "./pages/UsersList/UsersList.tsx";
import Home from "./pages/Home/Home.tsx";
import AuthPage from "./pages/AuthPage/AuthPage.tsx";
const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/users",
        element: <UsersList />,
      },
      {
        path: "/home",
        element: <Home />,
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
