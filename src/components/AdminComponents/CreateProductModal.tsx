import { Button, Modal, Box, Typography, TextField } from "@mui/material";
import { ProductModalProps } from "../../common/types";
import { useState } from "react";

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

function CreateProductModal({ open, handleClose, onCreateProduct }: ProductModalProps) {
  const [productName, setCategoryName] = useState("");
  const [categoryId, setCategoryId] = useState(null);
  const [price, setPrice] = useState(null)
  const [description, setDescription] = useState("")

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log()
    onCreateProduct({name:productName, category_id:categoryId, price:price, description:description})
    setCategoryName("")
    setCategoryId(null)
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
            
            <TextField label="Product Name" onChange={(e) => setCategoryName(e.target.value)} required/>
            <TextField type="number" onChange={(e) => setCategoryName(e.target.value)} required />
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
