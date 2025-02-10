import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import ProductListPage from "./pages/ProductListPage.tsx";
import HomePage from "./pages/HomePage.tsx";
import CustomerNavBar from "./components/CustomerNavBar.tsx";
import CustomerHeader from "./components/CustomerHeader.tsx";
import './index.css'
import LoginPage from "./pages/LoginPage.tsx";


const router = createBrowserRouter([
  {
    path: "/products",
    element: <ProductListPage></ProductListPage>,
  },
  {
    path: "/",
    element: <HomePage></HomePage>,
  },
  {
    path: "/login",
    element: <LoginPage></LoginPage>
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
      <link href="/src/styles.css" rel="stylesheet"></link>
    <CustomerHeader />
    <CustomerNavBar />
    {/* Insert Footer Here */}
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>
);
