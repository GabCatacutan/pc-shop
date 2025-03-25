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

  // Map product data
  const productData =
    products?.map((product) => ({
      ...product,
      image: product.image_url,
    })) ?? [];

  return (
    <div className="flex flex-col md:flex-row mx-4 md:mx-10 my-6 min-h-screen">
      {/* Sidebar (Filters) */}
      <div className="w-full md:w-1/4 border border-black p-4 mb-6 md:mb-0">
        <ProductFilters />
      </div>
      {/* Product List */}
      <div className="w-full md:w-3/4 border border-black p-4">
        {isLoading ? <LoadingComponent /> : <ProductList products={productData} />}
      </div>
    </div>
  );
}

export default ProductListing;
