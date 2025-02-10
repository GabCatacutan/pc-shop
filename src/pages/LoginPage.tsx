import React from "react";
import { TextField, Button, Card } from "@mui/material";

const LoginPage = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <Card className="p-8 w-96 shadow-lg">
        <h2 className="text-center mb-6">Login</h2>
        <form className="space-y-4">
          <TextField 
            fullWidth 
            label="Email" 
            variant="outlined" 
            type="email" 
            className="mb-4"
          />
          <TextField 
            fullWidth 
            label="Password" 
            variant="outlined" 
            type="password" 
            className="mb-4"
          />
          <div className="text-right">
            <a href="#" className="text-blue-500 text-sm">Forgot Password?</a>
          </div>
          <Button 
            fullWidth 
            variant="contained" 
            color="primary"
            className="mt-4"
          >
            Login
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default LoginPage;
