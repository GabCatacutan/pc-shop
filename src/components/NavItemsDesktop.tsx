import { Box, Button } from "@mui/material";
import LoginComponent from "./LoginComponent";
import { NavBarProps } from "../common/types";

function NavItemsDesktop({
  desktopNavBarItems,
}: {
  desktopNavBarItems: string[];
}) {
  return (
    <>
      <Box className="flex">
        {desktopNavBarItems.map((item, index) => (
          <Button variant="text" href={`/products?category=${encodeURIComponent(item)}`}>
            {item}
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
