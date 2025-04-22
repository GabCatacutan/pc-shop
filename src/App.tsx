import { Outlet } from "react-router-dom";
import CustomerHeader from "./components/CustomerHeader";
import CustomerNavBar from "./components/CustomerNavBar";
import { CartProvider } from "./context/CartContext";
import { CategoriesProvider } from "./context/NavBarCategoriesContext";
import Footer from "./components/FooterComponent";

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
        <Footer></Footer>
      </CartProvider>
    </>
  );
}

export default App;
