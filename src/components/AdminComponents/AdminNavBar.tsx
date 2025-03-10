import { Button, Link } from "@mui/material";

function AdminNavBar() {

  const productManagementNavItems = () => {
    return(
      <nav className="ml-5">
        <Button href="/admin/product-management">Category Management</Button>
        <Button>Subcategory Management</Button>
      </nav>
    )
  }

  return (
    <>
      <div className="flex">
        <Link href="/admin">
          <h2>Insert Title/Logo Here</h2>
        </Link>
      </div>
      <nav>
        <Button href="/admin/product-management">Product Management</Button>
        <Button>Order Management</Button>
        <Button>User Management</Button>
        {productManagementNavItems()}
      </nav>
      <hr></hr>
    </>
  );
}

export default AdminNavBar;
