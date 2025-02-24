import ProductCard from "./ProductCard";
import { ProductListProps } from "../common/types";

function ProductList({products}: ProductListProps) {
  return (
    <>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3">
        {products.map((product, index) => (
          <ProductCard key={index} {...product} />
        ))}
      </div>
    </>
  );
}

export default ProductList;
