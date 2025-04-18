import { Box, Button } from "@mui/material";
import LoginComponent from "./LoginComponent";
import { NavBarItem } from "../common/types";
import CartButton from "./CartComponent";

function NavItemsDesktop({
  desktopNavBarItems,
}: {
  desktopNavBarItems: NavBarItem[];
}) {
  return (
    <Box sx={{ position: "relative", width: "100%", display: "flex", alignItems: "center", px: 2 }}>
      {/* Centered Categories */}
      <Box
        sx={{
          position: "absolute",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: 2,
        }}
      >
        {desktopNavBarItems.map((item) => (
          <Button
            key={item.id}
            variant="text"
            href={`/products?category=${encodeURIComponent(item.id)}`}
            sx={{
              color: "text.primary",
              textTransform: "none",
              fontWeight: 500,
              "&:hover": {
                color: "primary.main",
                backgroundColor: "transparent",
              },
            }}
          >
            {item.category_name}
          </Button>
        ))}
      </Box>

      {/* Cart and Login on the right */}
      <Box sx={{ marginLeft: "auto", display: "flex", gap: 2, alignItems: "center" }}>
        <CartButton />
        <LoginComponent />
      </Box>
    </Box>
  );
}

export default NavItemsDesktop;
