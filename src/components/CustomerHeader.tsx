import { Link, TextField } from "@mui/material";

function CustomerHeader() {
  return (
    <>
      <div className="flex justify-center">
          <Link href="/"><h1>Insert Title/Logo Here</h1></Link>
          <form>
            <TextField label="Search" variant="standard"></TextField>
          </form>
      </div>
    </>
  );
}

export default CustomerHeader;
