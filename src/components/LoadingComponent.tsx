import { CircularProgress } from "@mui/material";

function LoadingComponent() {
  return (
    <>
      <div className="flex justify-center items-center w-full h-full">
        <CircularProgress className="align-middle"></CircularProgress>
      </div>
    </>
  );
}
export default LoadingComponent;
