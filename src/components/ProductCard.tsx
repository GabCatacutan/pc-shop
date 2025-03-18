import { Button } from "@mui/material";
import { Product } from "../common/types";
import { useCart } from "../context/CartContext";

function ProductCard(product: Product) {

  const {addToCart} = useCart();
  return (
    <>
      <div className="border object-center justify-items-center p-3 bg-">
        <a href="/productpage">
          <img
            src={product.image}
            alt={product.product_name}
            className="w-[108px] h-[108px]"
          />
        </a>
        <h2>{product.product_name}</h2>
        <p className="text-gray-600">${product.price}</p>
        <Button
          variant="contained"
          className="mt-2 bg-background px-4 py-2 rounded"
          onClick={()=> addToCart({id:product.id, name:product.product_name, price: product.price, quantity:1})}
        >
          Add to Cart
        </Button>
      </div>
    </>
  );
}

export default ProductCard;
