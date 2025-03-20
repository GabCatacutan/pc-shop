import { Navigate, Outlet } from "react-router-dom";
import AdminNavBar from "../../components/AdminComponents/AdminNavBar";
import { Box, Toolbar } from "@mui/material";
import { useAuth } from "../../context/AuthContext";

function Admin({ allowedRoles }: { allowedRoles: string[] }) {
  const { role, loading } = useAuth();

  if (loading || role == null) {
    return <div>Loading ... </div>;
  }

  return allowedRoles.includes(role!) ? (
    <>
      <div className="flex">
        <AdminNavBar />
        <div className="flex-grow-1">
          <Outlet></Outlet>
        </div>
      </div>
    </>
  ) : (
    <Navigate to="/" />
  );
}

export default Admin;
