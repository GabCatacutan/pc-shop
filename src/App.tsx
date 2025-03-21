import { Outlet } from "react-router-dom";
import CustomerHeader from "./components/CustomerHeader";
import CustomerNavBar from "./components/CustomerNavBar";
import { CartProvider } from "./context/CartContext";
import { CategoriesProvider } from "./context/NavBarCategoriesContext";

function App() {
  return (
    <>
      <CartProvider>
        <CustomerHeader />
        <CategoriesProvider>
          <CustomerNavBar />
        </CategoriesProvider>
        {/* ✅ Prevents unnecessary re-renders */}
        <Outlet />
      </CartProvider>
    </>
  );
}

export default App;
