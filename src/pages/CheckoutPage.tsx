import {
  Button,
  Divider,
  TextField,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";
import { useState } from "react";
import { CheckoutFormData, CartItem } from "../common/types";
import { useCart } from "../context/CartContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import supabase from "../config/supabase";
import { useAuth } from "../context/AuthContext";

export default function CheckoutPage() {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const { cart, clearCart } = useCart();

  const [formData, setFormData] = useState<CheckoutFormData>({
    user_id: user.id,
    email: "",
    first_name: "",
    last_name: "",
    address: "",
    city: "",
    zip: "",
    total_price: 0,
  });

  const { mutate, isLoading, error, isSuccess } = useMutation({
    mutationFn: async () => {
      if (cart.length === 0) throw new Error("Your cart is empty!");

      const totalPrice = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );

      // Step 1: Insert Order
      const { data: order, error: orderError } = await supabase
        .from("orders")
        .insert([{ ...formData, total_price: totalPrice }])
        .select()
        .single();

      if (orderError) throw orderError;

      // Step 2: Insert Order Items
      const { error: orderItemsError } = await supabase
        .from("order_items")
        .insert(
          cart.map((item) => ({
            order_id: order.id,
            product_id: item.id,
            quantity: item.quantity,
            price: item.price,
          }))
        );

      if (orderItemsError) throw orderItemsError;

      return order;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["orders"]);
      clearCart(); // Clear the cart after successful checkout
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Box sx={{ maxWidth: "900px", mx: "auto", p: 3 }}>
      {isLoading && (
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            bgcolor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 1,
          }}
        >
          <CircularProgress color="inherit" />
        </Box>
      )}

      {isSuccess && (
        <Typography color="success.main" mt={1}>
          Order placed successfully!
        </Typography>
      )}

      {error && (
        <Typography color="error.main" mt={1}>
          Error: {error.message}
        </Typography>
      )}

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
              <Box
                key={item.id}
                sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
              >
                <Typography>
                  {item.name} (x{item.quantity})
                </Typography>
                <Typography>
                  ${(item.price * item.quantity).toFixed(2)}
                </Typography>
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

          <Typography color="text.secondary">
            Mode of Payment: Cash on Delivery
          </Typography>

          <Button
            variant="contained"
            color="primary"
            onClick={() => mutate()}
            disabled={isLoading || cart.length === 0}
          >
            {isLoading ? "Processing..." : "Place Order"}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
