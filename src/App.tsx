import { Outlet } from "react-router-dom";
import CustomerHeader from "./components/CustomerHeader";
import CustomerNavBar from "./components/CustomerNavBar";
import { useContext } from "react";
import { NavBarProps } from "./common/types";
import { useQuery } from "@tanstack/react-query";
import supabase from "./config/supabase";


function App() {
  // Fetch categories
  const { data, isLoading, isError } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data, error } = await supabase.from("categories").select();
      if (error) throw error;
      return data || [];
    },
  });

  return (
    <>
      <CustomerHeader></CustomerHeader>
      <CustomerNavBar navBarItems={data ?? []}></CustomerNavBar>
      <Outlet></Outlet>
    </>
  );
}

export default App;
