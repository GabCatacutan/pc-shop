import ProductFilters from "../components/ProductFilters";
import ProductList from "../components/ProductList";
import testImage from "../assets/product_icon.png";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import LoadingComponent from "../components/LoadingComponent";

const testProducts = [
  {
    category: "case",
    name: "Case1",
    image: testImage,
    price: 50,
  },
  {
    category: "case",
    name: "Case2",
    image: testImage,
    price: 55,
  },
  {
    category: "processor",
    name: "CPU 1",
    image: testImage,
    price: 60,
  },
  {
    category: "processor",
    name: "CPU 2",
    image: testImage,
    price: 60,
  },
  {
    category: "motherboard",
    name: "Mobo 1",
    image: testImage,
    price: 60,
  },
  {
    category: "motherboard",
    name: "Mobo 2",
    image: testImage,
    price: 60,
  },
  {
    category: "graphics card",
    name: "GPU 1",
    image: testImage,
    price: 60,
  },
  {
    category: "graphics card",
    name: "GPU 2",
    image: testImage,
    price: 60,
  },
  {
    category: "memory",
    name: "Memory 1",
    image: testImage,
    price: 60,
  },
  {
    category: "memory",
    name: "Memory 2",
    image: testImage,
    price: 60,
  },
  {
    category: "storage",
    name: "Storage 1",
    image: testImage,
    price: 60,
  },
  {
    category: "storage",
    name: "Storage 2",
    image: testImage,
    price: 60,
  },
  {
    category: "power supply",
    name: "PSU 1",
    image: testImage,
    price: 60,
  },
  {
    category: "power supply",
    name: "PSU 2",
    image: testImage,
    price: 60,
  },
];


function ProductListing() {
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const categoryName = searchParams.get("category");
    console.log("category", categoryName);
    setLoading(false)
  },[]);

  

  return (
    <>
      <p>ProductListing </p>
      <div className="flex mx-35 mb-35 min-h-screen">
        <div className="w-1/5 border-black border">
          <ProductFilters/>
        </div>
        <div className="w-4/5 border-black border">
        {loading ? <LoadingComponent/> : <ProductList products={testProducts}></ProductList> }
        </div>
      </div>
    </>
  );
}

export default ProductListing;
