import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  CircularProgress,
} from "@mui/material";
import { User } from "../../common/types";
import supabase from "../../config/supabase";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs"

const fetchUsers = async (): Promise<User[]> => {
  const { data, error } = await supabase.from("users").select();

  if (error) throw error;

  // return data.map((product) => ({
  //   ...product,
  //   category_name: product.categories?.category_name || "Unknown",
  // }));

  return data;
};

function AdminUsersPage() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  return (
    <>
      <h2>Products</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
            <TableRow>
              <TableCell>User_Id</TableCell>
              <TableCell>User Full Name</TableCell>
              <TableCell>Date Created</TableCell>
              <TableCell>Role</TableCell>
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
              data?.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>
                    {user.full_name}
                  </TableCell>
                  <TableCell>{dayjs(user.created_at).format("YYYY-MM-DD HH:mm:ss Z")}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell align="right">
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

export default AdminUsersPage;
