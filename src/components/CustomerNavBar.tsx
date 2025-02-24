import Button from "@mui/material/Button";
import LoginComponent from "./LoginComponent";
import { Box, Drawer, useMediaQuery } from "@mui/material";
import { useState } from "react";
import MenuIcon from '@mui/icons-material/Menu';
import { useTheme } from "@mui/material/styles";

function CustomerNavBar() {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md")); // Detects screen size below 'sm' (600px)

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const NavItems = (
    <Box className="flex">
      <Button variant="text" href="/products?category=case">PC Case</Button>
      <Button variant="text" href="/products?category=processor">Processors</Button>
      <Button variant="text" href="/products?category=motherboard">Motherboard</Button>
      <Button variant="text" href="/products?category=graphics-card">Graphics Card</Button>
      <Button variant="text" href="/products?category=memory">Memory</Button>
      <Button variant="text" href="/products?category=storage">Storage</Button>
      <Button variant="text" href="/products?category=power-supply">Power Supply</Button>
      <LoginComponent />
    </Box>
  );

  return (
    <nav className="mx-3">
      {isMobile ? (
        <>
          <Button onClick={toggleDrawer(true)}><MenuIcon /></Button>
          <Drawer open={open} onClose={toggleDrawer(false)}>
            {NavItems}
          </Drawer>
        </>
      ) : (
        NavItems
      )}
    </nav>
  );
}

export default CustomerNavBar;
