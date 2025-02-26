import { Outlet } from "react-router-dom";
import CustomerHeader from "./components/CustomerHeader";
import CustomerNavBar from "./components/CustomerNavBar";
import { useContext } from "react";
import { NavBarProps } from "./common/types";

//INSERT NAVBAR ITEMS FETCHING HERE

const navBarItems = [
  "PC Case",
  "Processor",
  "Motherboard",
  "Graphics Card",
  "Memory",
  "Storage",
  "Power Supply",
];

function App() {
  return (
    <>
      <CustomerHeader></CustomerHeader>
      <CustomerNavBar navBarItems={navBarItems}></CustomerNavBar>
      <Outlet></Outlet>
    </>
  );
}

export default App;
