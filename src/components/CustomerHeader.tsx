import { Link, TextField } from "@mui/material";

function CustomerHeader() {
  return (
    <div className="flex justify-center m-2 items-center gap-4">
      <Link href="/">
        <h1 className="text-2xl font-bold">ByteMart</h1>
      </Link>
      <form action="/products" method="GET">
        <TextField
          label="Search"
          variant="standard"
          name="productName"
        />
      </form>
    </div>
  );
}

export default CustomerHeader;
