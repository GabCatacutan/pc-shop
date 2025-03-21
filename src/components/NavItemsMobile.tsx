import { Box, Button } from "@mui/material";
import LoginComponent from "./LoginComponent";
import { NavBarItem, NavBarProps } from "../common/types";

function NavItemsMobile({
  mobileNavBarItems,
}: {
  mobileNavBarItems: NavBarItem[];
}) {
  return (
    <>
      <Box className="flex flex-col gap-4 p-2">
        {mobileNavBarItems.map((item, index) => (
          <Button
            variant="text"
            href={`/products?category=${encodeURIComponent(item.category_id)}`}
          >
            {item.category_name}
          </Button>
        ))}
        <hr></hr>
        <div className="flex justify-center">
          <LoginComponent />
        </div>
      </Box>
    </>
  );
}

export default NavItemsMobile;
