import { Modal, Box, Typography, Divider } from "@mui/material";
import { Order, ViewOrderModalProps } from "../../common/types";
import supabase from "../../config/supabase";
import { useQuery } from "@tanstack/react-query";

const fetchOrder = async (orderId: number) => {
  const { data, error } = await supabase
    .from("orders")
    .select("*, order_items(*, products(*))")
    .eq("id", orderId)
    .single()
  console.log("Fetched orders", data);

  if (error) throw error;
  return data;
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function ViewOrderModal({ open, orderId, handleClose }: ViewOrderModalProps) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["order"],
    queryFn: () => fetchOrder(orderId),
    enabled: open,
  });

  console.log("DATA", data)
  if(isError){
    console.error(isError)
  }

  if(isLoading){
    return <>Loading...</>
  }
  return (
    <>
      {" "}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
      <Box sx={style}>
      {isLoading ? (
          <div className="flex justify-center items-center py-10">
            <CircularProgress />
          </div>
        ) : (
          <>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              Order #{data.id}
            </Typography>

            <Typography variant="body1">
              <strong>Name:</strong> {data.first_name} {data.last_name}
            </Typography>
            <Typography variant="body1">
              <strong>Email:</strong> {data.email}
            </Typography>
            <Typography variant="body1">
              <strong>Address:</strong> {data.address}, {data.city}, {data.zip}
            </Typography>

            <Divider className="my-4" />

            <Typography variant="h6" gutterBottom>
              Order Items
            </Typography>

            {data.order_items.map((item: any, index: number) => (
              <Box key={item.id} className="mb-3">
                <Typography variant="body2">
                  <strong>Product Name: </strong> {item.products.product_name}
                </Typography>
                <Typography variant="body2">
                  <strong>Quantity: </strong> {item.quantity}
                </Typography>
                <Typography variant="body2">
                  <strong>Price:</strong> ₱{item.price.toLocaleString()}
                </Typography>
              </Box>
            ))}

            <Divider className="my-4" />

            <Typography variant="h6">
              <strong>Total:</strong> ₱{data.total_price.toLocaleString()}
            </Typography>
          </>
        )}
      </Box>
      </Modal>
    </>
  )
}

export default ViewOrderModal;
