import { Button } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import { useAuth } from "../context/AuthContext";

function LoginComponent() {
  const { user, handleLogout } = useAuth();

  if (!user) {
    return (
      <>
        <Button variant="text" href="/login" className="float-right">
          <LoginIcon></LoginIcon>Login
        </Button>
      </>
    );
  } else {
    return (
      <div className="float-right">
        <Button onClick={handleLogout}>
          Logout
        </Button>
      </div>
    );
  }
}

export default LoginComponent;
