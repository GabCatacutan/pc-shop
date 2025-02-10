import Button from '@mui/material/Button';
import { useState } from 'react';
import LoginIcon from '@mui/icons-material/Login';
import {useAuth} from "../context/AuthContext"
import LoginComponent from './LoginComponent';

function CustomerNavBar() {

  return (
    <>
      <nav className="mx-3">
        <Button variant="text" href="/products">PC Case</Button>
        <Button variant="text" href="/products">Processors</Button>
        <Button variant="text" href="/products">Motherboard</Button>
        <Button variant="text" href="/products">Graphics Card</Button>
        <Button variant="text" href="/products">Memory</Button>
        <Button variant="text" href="/products">Storage</Button>
        <Button variant="text" href="/products">Power Supply</Button>
        <LoginComponent></LoginComponent>
        {/* <Button variant="text" href="/login" className="float-right"><LoginIcon></LoginIcon>Login</Button> */}
      </nav>
    </>
  );
}
export default CustomerNavBar;
