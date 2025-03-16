import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import ProductListPage from "./pages/ProductListPage.tsx";
import HomePage from "./pages/HomePage.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import "./index.css";
import App from "./App.tsx";
import { AuthProvider } from "./context/AuthContext.tsx";
import AdminDashboard from "./pages/admin/AdminDashboard.tsx";
import Admin from "./pages/admin/Admin.tsx";
import AdminCategories from "./pages/admin/AdminCategories.tsx";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query"
import AdminProductPage from "./pages/admin/AdminProductPage.tsx";

const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/products", element: <ProductListPage /> },
      { path: "/login", element: <LoginPage /> },
    ],
  },
  {
    path: "/admin",
    element: <Admin />,
    children: [
      { path: "/admin", element: <AdminDashboard /> },
      { path: "/admin/categories", element: <AdminCategories /> },
      { path: "/admin/products", element: <AdminProductPage/ >}
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <RouterProvider router={router}></RouterProvider>
    </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
);
