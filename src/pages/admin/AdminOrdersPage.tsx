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
} from "@mui/material";
import { Order } from "../../common/types";
import supabase from "../../config/supabase";
import { useQuery } from "@tanstack/react-query";

const fetchOrders = async (): Promise<Order[]> => {
  const { data, error } = await supabase
    .from("orders")
    .select("*");

    console.log("Order Data", data)

  if (error) throw error;

  // return data.map((product) => ({
  //   ...product,
  //   category_name: product.categories?.category_name || "Unknown",
  // }));

  return data
};

function AdminOrdersPage() {

  const { data, isLoading, isError } = useQuery({
    queryKey: ["orders"],
    queryFn: fetchOrders,
  });

  return (
    <>
      <h2>Products</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
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
                  <TableCell>{order.user_id.first_name}</TableCell>
                  <TableCell>{order.product_name}</TableCell>
                  <TableCell>{order.price}</TableCell>
                  <TableCell>{order.description}</TableCell>
                  <TableCell align="right">
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => handleDeleteProduct(product.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default AdminOrdersPage;
