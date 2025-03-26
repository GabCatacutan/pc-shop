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
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import supabase from "../../config/supabase";
import CreateProductModal from "../../components/AdminComponents/CreateProductModal";
import { useState } from "react";
import { NewProduct, Product } from "../../common/types";
import VisibilityIcon from "@mui/icons-material/Visibility";

// Fetch products with category names
const fetchProducts = async (): Promise<Product[]> => {
  const { data, error } = await supabase
    .from("products")
    .select("*, categories(category_name)");

  if (error) throw error;

  return data.map((product) => ({
    ...product,
    category_name: product.categories?.category_name || "Unknown",
  }));
};

function AdminProductPage() {
  const [open, setOpen] = useState(false);
  const [imageOpen, setImageOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  // Create product
  const handleCreateProduct = async (
    newProduct: NewProduct,
    imageFile: File
  ) => {
    const fileName = `${Date.now()}-${imageFile.name}`;

    //Upload image to storage
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("images")
      .upload(`/product_images/${fileName}`, imageFile);

    if (uploadError) {
      console.error("Image upload error:", uploadError);
      return;
    }
    console.log("Uploaded image", uploadData);

    const uploadedImgURL = `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/${uploadData.fullPath}`;

    newProduct.image_url = uploadedImgURL;

    const { error } = await supabase.from("products").insert(newProduct);
    if (error) throw error;

    try {
      queryClient.invalidateQueries({ queryKey: ["products"] }); // Refreshes product list
    } catch (error) {
      console.log("Error in creating product", error);
    }
  };

  const handleDeleteProduct = async (id: number) => {
    try {
      const { error } = await supabase.from("products").delete().eq("id", id);
      if (error) throw error;

      queryClient.invalidateQueries({ queryKey: ["products"] }); // Refresh after delete
    } catch (error) {
      console.log(error);
    }
  };

  const handleOpenImage = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    setImageOpen(true);
    console.log(imageUrl)
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
          <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
            <TableRow >
              <TableCell>Product ID</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Product Name</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Description</TableCell>
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
              data?.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>{product.id}</TableCell>
                  <TableCell>{product.category_name}</TableCell>
                  <TableCell>{product.product_name}</TableCell>
                  <TableCell>{product.price}</TableCell>
                  <TableCell>{product.description}</TableCell>
                  <TableCell align="right">
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleOpenImage(product.image_url)}
                    >
                      <VisibilityIcon />
                    </Button>
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
      
      {/* modal for viewing product image */}
      <Dialog open={imageOpen} onClose={() => setImageOpen(false)}>
        <DialogTitle>Product Image</DialogTitle>
        <DialogContent>
          <img src={selectedImage} alt="Product" style={{ width: "100%" }} />
        </DialogContent>
      </Dialog>
    </>
  );
}

export default AdminProductPage;
