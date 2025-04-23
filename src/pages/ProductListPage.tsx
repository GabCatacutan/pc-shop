import ProductFilters from "../components/ProductFilters";
import ProductList from "../components/ProductList";
import LoadingComponent from "../components/LoadingComponent";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import supabase from "../config/supabase";
import { Product } from "../common/types";
import { useEffect, useState } from "react";

// Fetch products with price range filter
const fetchProducts = async (
  category_id: string | null,
  minPrice: number,
  maxPrice: number,
  productName: string | null
): Promise<Product[]> => {
  //Base query with no filters & search
  let productQuery = supabase
    .from("products")
    .select("*, categories(category_name)")
    .gte("price", minPrice) // Minimum price filter
    .lte("price", maxPrice); // Maximum price filter

    if (productName) {
      productQuery = productQuery.like("product_name", `%${productName}%`);
    }

    if(category_id){
      productQuery=productQuery.eq("category_id", category_id)
    }

  const { data, error } = await productQuery

  if (error) throw error;

  return (data ?? []).map((product) => ({
    ...product,
    category_name: product.categories?.category_name || "Unknown",
  }));
};

function ProductListing() {
  const [searchParams] = useSearchParams();
  const categoryId = searchParams.get("category");
  const productName = searchParams.get("productName");

  const [maxPrice, setMaxPrice] = useState(0);
  const [priceRange, setPriceRange] = useState<[number, number]>([
    0, 400000000,
  ]);
  const [initialized, setInitialized] = useState(false); // Prevent overwriting user-selected price

  const { data: products, isLoading } = useQuery({
    queryKey: ["products", categoryId, priceRange],
    queryFn: () =>
      fetchProducts(categoryId, priceRange[0], priceRange[1], productName),
  });

  useEffect(() => {
    if (products && products.length > 0 && !initialized) {
      const prices = products.map((p) => p.price);
      const max = Math.max(...prices);

      setMaxPrice(max);
      setPriceRange([0, max]); // Initialize range
      setInitialized(true); // Mark initialization of initial prices as true
    }
  }, [products, initialized]);

  const productData =
    products?.map((product) => ({
      ...product,
      image: product.image_url,
    })) ?? [];

  return (
    <div className="flex flex-col md:flex-row mx-4 md:mx-10 my-6 min-h-screen">
      <div className="w-full md:w-1/4 border border-black p-4 mb-6 md:mb-0">
        <ProductFilters
          maxPrice={maxPrice}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
        />
      </div>
      <div className="w-full md:w-3/4 border border-black p-4">
        {isLoading ? (
          <LoadingComponent />
        ) : (
          <ProductList products={productData} />
        )}
      </div>
    </div>
  );
}

export default ProductListing;
