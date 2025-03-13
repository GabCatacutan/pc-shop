import { Outlet } from "react-router-dom";
import AdminNavBar from "../../components/AdminComponents/AdminNavBar";
import { Box } from "@mui/material";

function Admin() {

  const navWidth = 240

  return (
    <>
      <div className="flex">
        <AdminNavBar />
        <div className="flex-grow-1 ml-[240px]">
          <Outlet></Outlet>
        </div>
      </div>
    </>
  );
}

export default Admin;
