import {
  Button,
  Modal,
  Box,
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
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

function CreateProductModal({
  open,
  handleClose,
  onCreateProduct,
}: ProductModalProps) {
  const [productName, setProductName] = useState<string>("");
  const [categoryId, setCategoryId] = useState<number>(0);
  const [price, setPrice] = useState<number>(0);
  const [description, setDescription] = useState("");
  const [productImage, setProductImage] = useState(null);
  const [imageURL] = useState("")

  const {
    data: categories,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
    enabled: open, // Fetch only when modal is open
  });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onCreateProduct({
      product_name: productName,
      category_id: categoryId,
      price,
      description,
      image_url: imageURL
    },productImage);
    setProductName("");
    setCategoryId(0);
    handleClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Create Product
        </Typography>
      </Box>
    </Modal>
  );
}

export default CreateProductModal;
