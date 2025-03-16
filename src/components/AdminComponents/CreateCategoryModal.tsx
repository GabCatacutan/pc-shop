import { Button, Modal, Box, Typography, TextField } from "@mui/material";
import { CategoryModalProps } from "../../common/types";
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

function CreateCategoryModal({ open, handleClose, onCreateCategory }: CategoryModalProps) {
  const [categoryName, setCategoryName] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log()
    onCreateCategory(categoryName)
    setCategoryName("")
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
            <TextField label="Category Name" onChange={(e) => setCategoryName(e.target.value)} required/>
            <Button variant="contained" color="primary" type="submit">
              Submit
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}

export default CreateCategoryModal;
