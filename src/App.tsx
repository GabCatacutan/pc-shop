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
        <div className="mx-64">
          <CustomerHeader />
          <CategoriesProvider>
            <CustomerNavBar />
          </CategoriesProvider>
          {/* ✅ Prevents unnecessary re-renders */}
          <Outlet />
        </div>
        <Footer></Footer>
      </CartProvider>
    </>
  );
}

export default App;
