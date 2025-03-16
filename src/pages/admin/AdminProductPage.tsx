import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableCell,
  TableBody,
  CircularProgress,
  Button,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import supabase from "../../config/supabase";
import CreateProductModal from "../../components/AdminComponents/CreateProductModal";
import { useState } from "react";

interface Product {
  id: number;
  name: string;
  category_id: number;
  category_name?: string; // Fetched via JOIN
}

// Fetch products with category names
const fetchProducts = async (): Promise<Product[]> => {
  const { data, error } = await supabase.from("products").select("*, categories(category_name)");

  console.log(data)

  if (error) throw error;

  return data.map((product) => ({
    ...product,
    category_name: product.categories?.category_name || "Unknown",
  }));
};

function AdminProductPage() {
  const [open, setOpen] = useState(false);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  // Create product
  const handleCreateProduct = async (newProduct: Product) => {
    console.log("Product submitted", newProduct);
    try {
      queryClient.invalidateQueries(["products"]); // Refresh products
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h2>Products</h2>
      <Button onClick={() => setOpen(true)} variant="contained">
        Create Product
      </Button>
      <CreateProductModal
        open={open}
        handleClose={() => setOpen(false)}
        onCreateProduct={handleCreateProduct}
      />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Product ID</TableCell>
              <TableCell>Product Name</TableCell>
              <TableCell>Category</TableCell>
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
              data?.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>{product.id}</TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.category_name}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default AdminProductPage;
