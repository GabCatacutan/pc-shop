import { Outlet } from "react-router-dom";
import AdminNavBar from "../../components/AdminComponents/AdminNavBar";
import { Box, Toolbar } from "@mui/material";

function Admin() {

  const navWidth = 240

  return (
    <>
      <div className="flex">
        <AdminNavBar />
        <div className="flex-grow-1">
          <Outlet></Outlet>
        </div>
      </div>
    </>
  );
}

export default Admin;
