import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableCell,
  TableBody,
  Button,
  CircularProgress,
} from "@mui/material";
import { useState } from "react";
import CreateCategoryModal from "../../components/AdminComponents/CreateCategoryModal";
import supabase from "../../config/supabase";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const AdminCategories: React.FC = () => {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  // Create category
  const handleCreateCategory = async (newCategory: string) => {
    console.log("Category submitted", newCategory);
    try {
      const { error } = await supabase.from("categories").insert({
        category_name: newCategory,
      });
      if (error) throw error;

      queryClient.invalidateQueries({queryKey: ["categories"]}); // Refresh categories
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch categories
  const { data, isLoading, isError } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data, error } = await supabase.from("categories").select();
      if (error) throw error;
      return data || [];
    },
  });

  // Delete category
  const handleDeleteCategory = async (id: number) => {
    try {
      const { error } = await supabase.from("categories").delete().eq("id", id);
      if (error) throw error;

      queryClient.invalidateQueries({queryKey: ["categories"]}); // Refresh after delete
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h2>Categories</h2>
      <Button onClick={() => setOpen(true)} variant="contained">
        Add Category
      </Button>
      <CreateCategoryModal
        open={open}
        handleClose={() => setOpen(false)}
        onCreateCategory={handleCreateCategory}
      />

      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
            <TableRow>
              <TableCell>Category ID</TableCell>
              <TableCell>Category Name</TableCell>
              <TableCell align="right">Actions</TableCell>
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
                  Error loading categories
                </TableCell>
              </TableRow>
            ) : (
              data?.map((category) => (
                <TableRow key={category.id}>
                  <TableCell>{category.id}</TableCell>
                  <TableCell>{category.category_name}</TableCell>
                  <TableCell align="right">
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => handleDeleteCategory(category.id)}
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
};

export default AdminCategories;
