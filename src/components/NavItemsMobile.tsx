import { Box, Button } from "@mui/material";
import LoginComponent from "./LoginComponent";
import { NavBarProps } from "../common/types";

function NavItemsMobile({
  mobileNavBarItems,
}: {
  mobileNavBarItems: string[];
}) {
  return (
    <>
      <Box className="flex flex-col gap-4">
        {mobileNavBarItems.map((item, index) => (
          <Button
            variant="text"
            href={`/products?category=${encodeURIComponent(item)}`}
          >
            {item}
          </Button>
        ))}
        <div className="justify-end">
          <LoginComponent />
        </div>
      </Box>
    </>
  );
}

export default NavItemsMobile;
