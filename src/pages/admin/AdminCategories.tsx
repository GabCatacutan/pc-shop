import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableCell,
  TableBody,
  Button
} from "@mui/material";

const AdminCategories: React.FC = () => {
  return (
    <>
    <Button variant="contained" className="mx-5 mb-2">Add Category</Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Category ID</TableCell>
              <TableCell>Category Name</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody></TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default AdminCategories;
