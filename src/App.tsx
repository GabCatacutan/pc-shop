import { Outlet } from "react-router-dom";
import CustomerHeader from "./components/CustomerHeader";
import CustomerNavBar from "./components/CustomerNavBar";
import { useContext } from "react";


function App() {
  return (
    <>
        <CustomerHeader></CustomerHeader>
        <CustomerNavBar></CustomerNavBar>
        <Outlet></Outlet>
    </>
  );
}

export default App;
