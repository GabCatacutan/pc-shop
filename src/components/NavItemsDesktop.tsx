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
      <Box className="flex ">
      <div className="flex flex-1 justify-center space-x-4">
        {desktopNavBarItems.map((item, index) => (
          <Button
            variant="text"
            href={`/products?category=${encodeURIComponent(item.id)}`}
          >
            {item.category_name}
          </Button>
        ))}
        </div>
        <div className="flex justify-end ml-auto">
          <LoginComponent />
        </div>
      </Box>
    </>
  );
}

export default NavItemsDesktop;
