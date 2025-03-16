import {
  Button,
  Divider,
  Drawer,
  Link,
  List,
  ListItem,
  ListItemButton,
  useMediaQuery,
  useTheme,
  ListItemIcon,
  ListItemText,
  Box,
  IconButton,
} from "@mui/material";
import React from "react";
import { useState } from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import BorderAllIcon from "@mui/icons-material/BorderAll";
import BorderClearIcon from "@mui/icons-material/BorderClear";
import InventoryIcon from "@mui/icons-material/Inventory";

function AdminNavBar() {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.up("sm"));

  const drawerWidth = 240;

  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const adminNavItems = [
    {
      name: "Dashboard",
      icon: <DashboardIcon />,
      link: "/admin/dashboard",
    },

    {
      name: "Categories",
      icon: <BorderAllIcon></BorderAllIcon>,
      link: "/admin/categories",
    },
    {
      name: "Subcategories",
      icon: <BorderClearIcon></BorderClearIcon>,
      link: "/admin/subcategories",
    },
    {
      name: "Products",
      icon: <InventoryIcon />,
      link: "/admin/products",
    },
    {
      name: "Orders",
      icon: <ShoppingCartIcon></ShoppingCartIcon>,
      link: "/admin/orders",
    },
    {
      name: "Users",
      icon: <PeopleIcon></PeopleIcon>,
      link: "/admin/users",
    },
    {
      name: "Analytics",
      icon: <AnalyticsIcon />,
      link: "/admin/analytics",
    },
  ];

  const drawer = (
    <div className="flex flex-col">
      <Link href="/admin">
        <h2>Insert Title/Logo Here</h2>
      </Link>
      <nav>
        <Divider />
        <List>
          {adminNavItems.map((item) => (
            <ListItem key={item.name} disablePadding>
              <ListItemButton href={item.link}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
      </nav>
    </div>
  );

  return (
    <>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="start"
        onClick={handleDrawerToggle}
        sx={{ mr: 2, display: { sm: "none" } }}
      ></IconButton>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="navigation buttons"
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerClose}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </>
  );
}

export default AdminNavBar;
