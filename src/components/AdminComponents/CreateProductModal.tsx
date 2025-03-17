import { Button, Modal, Box, Typography, TextField, Select, MenuItem } from "@mui/material";
import { Category, ProductModalProps } from "../../common/types";
import { useState } from "react";
import supabase from "../../config/supabase";
import { useQuery } from "@tanstack/react-query";

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

// Fetch categories using React Query
const fetchCategories = async (): Promise<Category[]> => {
  const { data, error } = await supabase.from("categories").select();
  if (error) throw new Error(error.message);
  return data;
};

function CreateProductModal({ open, handleClose, onCreateProduct }: ProductModalProps) {
  const [productName, setProductName] = useState<string>("");
  const [categoryId, setCategoryId] = useState<number>(0);
  const [price, setPrice] = useState<number>(0)
  const [description, setDescription] = useState("")

  const { data: categories, isLoading, isError } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
    enabled: open, // Fetch only when modal is open
  });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onCreateProduct({product_name:productName, category_id:categoryId, price:price, description:description})
    setProductName("")
    setCategoryId(0)
    handleClose();
  }

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Create Category
          </Typography>
          <form className="flex flex-col" onSubmit={handleSubmit}>

          {/* Category Select Field */}
          {isLoading ? (
            <Typography>Loading categories...</Typography>
          ) : isError ? (
            <Typography color="error">Error loading categories</Typography>
          ) : (
            <Select
              value={categoryId ?? ""}
              onChange={(e) => setCategoryId(Number(e.target.value))}
              displayEmpty
              required
            >
              <MenuItem value="" disabled>Select a Category</MenuItem>
              {categories?.map((category) => (
                <MenuItem key={category.id} value={category.id}>
                  {category.category_name}
                </MenuItem>
              ))}
            </Select>
          )}
            
            <TextField label="Product Name" onChange={(e) => setProductName(e.target.value)} required/>
            <TextField label="Price" type="number" onChange={(e) => setPrice(Number(e.target.value))} required />
            <TextField label="Description" onChange={(e) => setDescription(e.target.value)} required/>
            <Button variant="contained" color="primary" type="submit">
              Submit
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}

export default CreateProductModal;
