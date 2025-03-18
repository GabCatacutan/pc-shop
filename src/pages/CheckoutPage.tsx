import { Button, Divider, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { CheckoutFormData } from "../common/types";

export default function CheckoutPage() {
  const [formData, setFormData] = useState<CheckoutFormData>({
    email: "",
    first_name: "",
    last_name: "",
    address: "",
    city: "",
    zip: "",
  });

  function handleOrderSubmit() {
    console.log(formData);
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="text-center m-10">
        <h2>Checkout</h2>
      </div>
      <div className="flex w-1/2 mx-auto space-x-10">
        <form className="flex flex-col flex-grow-2 px-20 border border-black shadow space-y-3 p-10">
          <h3>Email</h3>
          <TextField label="Email" variant="standard" required></TextField>
          <Divider sx={{ my: 2 }} />
          <h3> Shipping Details </h3>
          <TextField
            label="First name"
            variant="standard"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            required
          ></TextField>
          <TextField
            label="Last name"
            variant="standard"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            required
          ></TextField>
          <TextField
            label="Address"
            name="address"
            variant="standard"
            value={formData.address}
            onChange={handleChange}
            required
          ></TextField>
          <TextField
            label="City"
            variant="standard"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
          ></TextField>
          <TextField
            label="Zip / Postal Code"
            variant="standard"
            name="zip"
            value={formData.zip}
            onChange={handleChange}
            required
          ></TextField>
        </form>
        <div className="flex flex-col flex-grow-1 border border-black shadow">
          <p>Products</p>
          <p>Total Price: </p>
          <p>Mode of Payment: Cash on Deli</p>
          <Button onClick={handleOrderSubmit}>Place Order</Button>
        </div>
      </div>
    </>
  );
}
