import { useCart } from "../context/CartContext";
import { Button } from "@mui/material";

export default function CartPage() {
  const { cart, removeFromCart, clearCart } = useCart();
  console.log("Cart on page", cart)

  return (
    <div className="p-4 max-w-lg mx-auto">
      <h1 className="text-xl font-semibold mb-4">Shopping Cart</h1>
      {cart.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        cart.map((item) => (
          <div key={item.id} className="border p-4 rounded-lg shadow-md mb-2">
            <h2 className="text-lg">{item.name}</h2>
            <p className="text-gray-500">${item.price} x {item.quantity}</p>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => removeFromCart(item.id)}
              className="mt-2"
            >
              Remove
            </Button>
          </div>
        ))
      )}
      {cart.length > 0 && (
        <Button
          variant="contained"
          color="error"
          onClick={clearCart}
          className="mt-4 w-full"
        >
          Clear Cart
        </Button>
      )}
      {cart? <Button href="/checkout">Proceed To Checkout</Button> : <></>}
    </div>
  );
}