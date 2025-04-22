import { useParams } from "react-router-dom";
import supabase from "../config/supabase";
import { useQuery } from "@tanstack/react-query";
import { Product } from "../common/types";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
} from "@mui/material";
import { useCart } from "../context/CartContext";

function ProductPage() {
  const params = useParams();
  const productId = params.productId;
  const { addToCart } = useCart();

  const fetchProduct = async (): Promise<Product> => {
    const { data, error } = await supabase
      .from("products")
      .select()
      .eq("id", productId)
      .single();
    if (error) throw new Error(error.message);
    return data;
  };

  const { isLoading, error, data } = useQuery({
    queryKey: ["product"],
    queryFn: fetchProduct,
  });

  console.log("Fetched data", data);

  if (isLoading) {
    return <></>;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4 py-8">
      <Card className="flex flex-col md:flex shadow-2xl rounded-2xl overflow-hidden">
        {/* Product Image */}
        <CardMedia
          component="img"
          image={data.image_url}
          alt={data.product_name}
          className="md:wh-1/2 max-w-64 max-h-64 md:h-auto object-cover"
        />

        {/* Product Info */}
        <CardContent className="">
          <Typography variant="h4" component="h1" className="font-bold mb-4">
            {data.product_name}
          </Typography>
          <Typography variant="body1" className="text-gray-700 mb-6 text-lg">
            {data.description}
          </Typography>
          <Typography
            variant="h5"
            className="text-indigo-600 mb-8 font-semibold"
          >
            ${data.price}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="large"
            className="w-full md:w-auto"
            onClick={() => {
              if (data) {
                addToCart({
                  id: data.id,
                  name: data.product_name,
                  price: data.price,
                  quantity: 1,
                });
              }
            }}
          >
            Add to Cart
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default ProductPage;
