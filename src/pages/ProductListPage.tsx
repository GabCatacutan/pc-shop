import ProductFilters from "../components/ProductFilters";
import ProductList from "../components/ProductList";
import testImage from "../assets/product_icon.png";
import { useSearchParams } from "react-router-dom";
import LoadingComponent from "../components/LoadingComponent";
import { useQuery } from "@tanstack/react-query";
import supabase from "../config/supabase";
import { Product } from "../common/types";

// Fetch products with category names
const fetchProducts = async (category_id: string | null): Promise<Product[]> => {
  const { data, error } = await supabase
    .from("products")
    .select("*, categories(category_name)")
    .eq("category_id", category_id);

    

  if (error) throw error;

  return (data ?? []).map((product) => ({
    ...product,
    category_name: product.categories?.category_name || "Unknown",
  }));
};

function ProductListing() {
  const [searchParams] = useSearchParams();
  const categoryId = searchParams.get("category");

  const { data: products, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: () => fetchProducts(categoryId),
  });

  // Ensure data is mapped correctly
  const productData = products?.map((product) => ({
    ...product,
    image: testImage,
  })) ?? [];

  console.log("Product data", productData);

  return (
    <>
      <p>Product Listing</p>
      <div className="flex mx-35 mb-35 min-h-screen">
        <div className="w-1/5 border-black border">
          <ProductFilters />
        </div>
        <div className="w-4/5 border-black border">
          {isLoading ? <LoadingComponent /> : <ProductList products={productData} />}
        </div>
      </div>
    </>
  );
}


export default ProductListing;
