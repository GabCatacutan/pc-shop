import { Outlet } from "react-router-dom";
import AdminNavBar from "../../components/AdminComponents/AdminNavBar";


function Admin() {
  return (
    <>
    <AdminNavBar />
    <Outlet></Outlet>
    </>
  );
}

export default Admin;
