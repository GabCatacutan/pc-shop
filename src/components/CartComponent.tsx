import { Badge, Button, IconButton } from "@mui/material";
import { useCart } from "../context/CartContext";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

function CartButton() {
  const { cart } = useCart();

  return (
    <div className=" flex justify-between items-center">
      <Button href={'/cart'}>
        <Badge badgeContent={cart.length} color="error">
          <ShoppingCartIcon />
        </Badge>
      </Button>
    </div>
  );
}

export default CartButton;
