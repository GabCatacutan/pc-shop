import { Button } from "@mui/material";
import testImage from "../assets/product_icon.png";

interface Product {
  image: string;
  name: string;
  price: number;
}

function ProductCard(product: Product) {
  return (
    <>
      <div className="border object-center justify-items-center p-3">
        <a href="/productpage">
          <img
            src={product.image}
            alt={product.name}
            className="w-[108px] h-[108px]"
          />
        </a>
        <h2>{product.name}</h2>
        <p className="text-gray-600">${product.price}</p>
        <Button
          variant="contained"
          className="mt-2 bg-blue-500 px-4 py-2 rounded"
        >
          Add to Cart
        </Button>
      </div>
    </>
  );
}

export default ProductCard;
