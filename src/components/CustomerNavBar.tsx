import Button from "@mui/material/Button";
import { Box, Drawer, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import MenuIcon from '@mui/icons-material/Menu';
import { useTheme } from "@mui/material/styles";
import NavItemsDesktop from "./NavItemsDesktop";
import NavItemsMobile from "./NavItemsMobile";
import { NavBarProps } from "../common/types";

function CustomerNavBar({navBarItems}: NavBarProps) {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md")); // Detects screen size below 'sm' (600px)

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  console.log("Nav bar rendered")

  return (
    <nav className="px-3 border-b">
      {isMobile ? (
        <>
          <Button onClick={toggleDrawer(true)}><MenuIcon /></Button>
          <Drawer open={open} onClose={toggleDrawer(false)}>
            <NavItemsMobile mobileNavBarItems={navBarItems}></NavItemsMobile>
          </Drawer>
        </>
      ) : (
        <NavItemsDesktop desktopNavBarItems={navBarItems}></NavItemsDesktop>
      )}
    </nav>
  );
}

export default CustomerNavBar;
