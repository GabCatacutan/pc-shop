import { Navigate, Outlet } from "react-router-dom";
import AdminNavBar from "../../components/AdminComponents/AdminNavBar";
import { CircularProgress } from "@mui/material";
import { useAuth } from "../../context/AuthContext";

function Admin({ allowedRoles }: { allowedRoles: string[] }) {
  const { role, loading } = useAuth();

  console.log("Loading" ,loading, "role", role)

  if (loading && role == null) {
    return (
      <>
        <div className="flex">
          <AdminNavBar />
          <div className="flex-grow-1">
            <CircularProgress />
          </div>
        </div>
      </>
    );
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
