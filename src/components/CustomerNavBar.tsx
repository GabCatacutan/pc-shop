import Button from "@mui/material/Button";
import { Box, Drawer, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { useTheme } from "@mui/material/styles";
import NavItemsDesktop from "./NavItemsDesktop";
import NavItemsMobile from "./NavItemsMobile";
import { NavBarProps } from "../common/types";
import { useCategories } from "../context/NavBarCategoriesContext";

function CustomerNavBar() {
  const [open, setOpen] = useState(false);
  const { categories, isLoading } = useCategories();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md")); // Detects screen size below 'sm' (600px)

  console.log("Navbar items", categories);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  return (
    <nav className="px-3 border-b">
      {isMobile ? (
        <>
          <Button onClick={toggleDrawer(true)}>
            <MenuIcon />
          </Button>
          <Drawer open={open} onClose={toggleDrawer(false)}>
            <NavItemsMobile mobileNavBarItems={categories}></NavItemsMobile>
          </Drawer>
        </>
      ) : (
        <NavItemsDesktop desktopNavBarItems={categories}></NavItemsDesktop>
      )}
    </nav>
  );
}

export default CustomerNavBar;
