import { Button, Divider, TextField, Typography, Box } from "@mui/material";
import { useState } from "react";
import { CheckoutFormData, CartItem } from "../common/types";
import { useCart } from "../context/CartContext"; // Assuming you have a CartContext

export default function CheckoutPage() {
  const { cart } = useCart(); // Get cart items from context

  const [formData, setFormData] = useState<CheckoutFormData>({
    email: "",
    first_name: "",
    last_name: "",
    address: "",
    city: "",
    zip: "",
  });

  function handleOrderSubmit() {
    console.log("Order Details:", formData);
    console.log("Cart Details:", cart);
    // TODO: Add API call to process the order
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Box sx={{ maxWidth: "900px", mx: "auto", p: 3 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Checkout
      </Typography>

      <Box
        component="form"
        sx={{
          display: "flex",
          gap: 4,
          justifyContent: "space-between",
          flexDirection: { xs: "column", md: "row" },
        }}
      >
        {/* Left: Checkout Form */}
        <Box
          sx={{
            flex: 2,
            p: 3,
            border: "1px solid #ddd",
            borderRadius: 2,
            boxShadow: 2,
          }}
        >
          <Typography variant="h6">Email</Typography>
          <TextField
            fullWidth
            label="Email"
            variant="standard"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <Divider sx={{ my: 2 }} />

          <Typography variant="h6">Shipping Details</Typography>
          <TextField
            fullWidth
            label="First Name"
            variant="standard"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            label="Last Name"
            variant="standard"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            label="Address"
            variant="standard"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            label="City"
            variant="standard"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            label="Zip / Postal Code"
            variant="standard"
            name="zip"
            value={formData.zip}
            onChange={handleChange}
            required
          />
        </Box>

        {/* Right: Order Summary */}
        <Box
          sx={{
            flex: 1,
            p: 3,
            border: "1px solid #ddd",
            borderRadius: 2,
            boxShadow: 2,
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Typography variant="h6">Order Summary</Typography>
          <Divider />

          {/* Display Cart Items */}
          {cart.length > 0 ? (
            cart.map((item: CartItem) => (
              <Box key={item.id} sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                <Typography>{item.name} (x{item.quantity})</Typography>
                <Typography>${(item.price * item.quantity).toFixed(2)}</Typography>
              </Box>
            ))
          ) : (
            <Typography color="text.secondary">Your cart is empty.</Typography>
          )}

          <Divider />
          <Typography variant="h6">
            Total: $
            {cart
              .reduce((acc, item) => acc + item.price * item.quantity, 0)
              .toFixed(2)}
          </Typography>

          <Typography color="text.secondary">Mode of Payment: Cash on Delivery</Typography>

          <Button variant="contained" color="primary" onClick={handleOrderSubmit}>
            Place Order
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
