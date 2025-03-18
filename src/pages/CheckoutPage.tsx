import { Divider, TextField } from "@mui/material";

export default function CheckoutPage() {
  return (
    <>
      <div className="text-center m-10">
        <h2>Checkout</h2>
      </div>
      <div className="flex w-1/2 mx-auto space-x-10">
        <form className="flex flex-col flex-grow-2 px-20 border border-black shadow">
          <h3></h3>
          <TextField label="Email" variant="standard" required></TextField>
          <TextField label="First name" variant="standard" required></TextField>
          <TextField label="Last name" variant="standard" required></TextField>
          <TextField
            label="Address line 1"
            variant="standard"
            required
          ></TextField>
          <TextField
            label="Address line 2"
            variant="standard"
            required
          ></TextField>
          <TextField label="City" variant="standard" required></TextField>
          <TextField
            label="Zip / Postal Code"
            variant="standard"
            required
          ></TextField>
        </form>
        <div className="flex flex-col flex-grow-1 border border-black shadow">
          <p>Products</p>
          <p>Total Price: </p>
        </div>
      </div>
    </>
  );
}
