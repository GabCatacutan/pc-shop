import {
  Button,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { Order } from "../../common/types";
import supabase from "../../config/supabase";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ViewOrderModal from "../../components/AdminComponents/ViewOrderModal";

const fetchOrders = async (): Promise<Order[]> => {
  const { data, error } = await supabase.from("orders").select();

  console.log("Order Data", data);

  if (error) throw error;

  return data;
};

function AdminOrdersPage() {
  const [orderModalOpen, setOrderModalOpen] = useState<boolean>(false);
  const [orderId, setOrderId] = useState<number>();

  //Fetch all orders to be displayed in table
  const { data, isLoading, isError } = useQuery({
    queryKey: ["orders"],
    queryFn: fetchOrders,
  });

  function handleViewOrder(id: number): void {
    setOrderId(id);
    setOrderModalOpen(true);
  }

  //Fetch order to be displayed when viewing a single order
  return (
    <>
      <h2>Orders</h2>

      {/**Render Order Modal only when it is open */}
      {orderModalOpen && orderId !== undefined && (
        <ViewOrderModal
          open={orderModalOpen}
          orderId={orderId}
          handleClose={() => setOrderModalOpen(false)}
        />
      )}

      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
            <TableRow>
              <TableCell>Order ID/Order #</TableCell>
              <TableCell>User Full Name</TableCell>
              <TableCell>Date Ordered</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={3} align="center">
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : isError ? (
              <TableRow>
                <TableCell colSpan={3} align="center">
                  Error loading products
                </TableCell>
              </TableRow>
            ) : (
              data?.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>
                    {order.first_name + " " + order.last_name}
                  </TableCell>
                  <TableCell>
                    {dayjs(order.created_at).format("YYYY-MM-DD HH:mm:ss Z")}
                  </TableCell>
                  <TableCell align="right">
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleViewOrder(order.id)}
                    >
                      <VisibilityIcon />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default AdminOrdersPage;
