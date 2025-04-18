import { Box, Button, Divider } from "@mui/material";
import LoginComponent from "./LoginComponent";
import { NavBarItem } from "../common/types";

function NavItemsMobile({
  mobileNavBarItems,
}: {
  mobileNavBarItems: NavBarItem[];
}) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, p: 2, width: 250 }}>
      {/* Category Links */}
      {mobileNavBarItems.map((item) => (
        <Button
          key={item.category_id}
          variant="text"
          href={`/products?category=${encodeURIComponent(item.category_id)}`}
          sx={{
            justifyContent: "flex-start",
            textTransform: "none",
            fontSize: "1rem",
            color: "text.primary",
            "&:hover": {
              color: "primary.main",
              backgroundColor: "transparent",
            },
          }}
        >
          {item.category_name}
        </Button>
      ))}

      <Divider sx={{ my: 1 }} />

      {/* Login Section */}
      <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
        <LoginComponent />
      </Box>
    </Box>
  );
}

export default NavItemsMobile;
