import { useState } from "react";
import {
  Box,
  Drawer,
  IconButton,
  useMediaQuery,
  useTheme,
  AppBar,
  Toolbar,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import NavItemsDesktop from "./NavItemsDesktop";
import NavItemsMobile from "./NavItemsMobile";
import { useCategories } from "../context/NavBarCategoriesContext";

function CustomerNavBar() {
  const [open, setOpen] = useState(false);
  const { categories } = useCategories();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  return (
    <AppBar position="static" elevation={0} sx={{ backgroundColor: "#fff", borderBottom: "1px solid #e0e0e0" }}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {isMobile ? (
          <>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer(true)}
              sx={{ color: "black" }}
            >
              <MenuIcon />
            </IconButton>

            <Drawer
              anchor="left"
              open={open}
              onClose={toggleDrawer(false)}
              sx={{
                "& .MuiDrawer-paper": {
                  width: 250,
                  padding: 2,
                },
              }}
            >
              <NavItemsMobile mobileNavBarItems={categories} />
            </Drawer>
          </>
        ) : (
          <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
            <NavItemsDesktop desktopNavBarItems={categories} />
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default CustomerNavBar;
