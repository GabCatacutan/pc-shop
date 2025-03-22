import React, { useState } from "react";
import { TextField, Button, Card, Tabs, Tab } from "@mui/material";
import { useAuth } from "../context/AuthContext";

const LoginPage: React.FC = () => {
  const { handleLogin, handleSignUp } = useAuth();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [fullname, setFullName] = useState<string>("");
  const [phonenumber, setPhoneNumber] = useState<string>("");
  const [tab, setTab] = useState<number>(0);

  const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await handleLogin(email, password);
    } catch (error: any) {
      alert(error.message);
    }
  };

  const handleSignUpSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await handleSignUp(email, password, fullname, phonenumber);
      alert("Sign Up Successful");
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <Card className="p-8 w-96 shadow-lg">
        <Tabs
          value={tab}
          onChange={(_e, newValue: number) => setTab(newValue)}
          variant="fullWidth"
        >
          <Tab label="Login" />
          <Tab label="Sign Up" />
        </Tabs>
        {tab === 0 ? (
          <form className="space-y-4" onSubmit={handleLoginSubmit}>
            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <TextField
              fullWidth
              label="Password"
              variant="outlined"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div className="text-right">
              <a href="#" className="text-blue-500 text-sm">
                Forgot Password?
              </a>
            </div>
            <Button fullWidth variant="contained" color="primary" type="submit">
              Login
            </Button>
          </form>
        ) : (
          <form className="space-y-4" onSubmit={handleSignUpSubmit}>
            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <TextField
              fullWidth
              label="Password"
              variant="outlined"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <TextField
              fullWidth
              label="Full Name"
              variant="outlined"
              value={fullname}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
            <TextField
              fullWidth
              label="Phone Number"
              variant="outlined"
              value={phonenumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
            <Button fullWidth variant="contained" color="primary" type="submit">
              Sign Up
            </Button>
          </form>
        )}
      </Card>
    </div>
  );
};

export default LoginPage;
