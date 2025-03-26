import { useState } from "react";
import ProductCard from "./ProductCard";
import { ProductListProps } from "../common/types";
import { Pagination } from "@mui/material";

const itemsPerPage = 6; // Adjust this based on how many products you want per page

function ProductList({ products }: ProductListProps) {
  const [page, setPage] = useState(1);
  
  // Calculate total pages
  const pageCount = Math.ceil(products.length / itemsPerPage);

  // Get products for the current page
  const startIndex = (page - 1) * itemsPerPage;
  const currentProducts = products.slice(startIndex, startIndex + itemsPerPage);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3 gap-4">
        {currentProducts.map((product, index) => (
          <ProductCard key={index} {...product} />
        ))}
      </div>
      
      {/* Pagination component */}
      {products.length > itemsPerPage && (
        <div className="flex justify-center mt-4">
          <Pagination count={pageCount} page={page} onChange={handleChange} color="primary" />
        </div>
      )}
    </>
  );
}

export default ProductList;
