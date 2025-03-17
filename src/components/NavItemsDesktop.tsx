import { Box, Button } from "@mui/material";
import LoginComponent from "./LoginComponent";
import { NavBarItem, NavBarProps } from "../common/types";

function NavItemsDesktop({
  desktopNavBarItems,
}: {
  desktopNavBarItems: NavBarItem[];
}) {
  return (
    <>
      <Box className="flex">
        {desktopNavBarItems.map((item, index) => (
          <Button
            variant="text"
            href={`/products?category=${encodeURIComponent(item.category_id)}`}
          >
            {item.category_name}
          </Button>
        ))}
        <div className="flex justify-end ml-auto">
          <LoginComponent />
        </div>
      </Box>
    </>
  );
}

export default NavItemsDesktop;
