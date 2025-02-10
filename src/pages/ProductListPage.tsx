import ProductFilters from "../components/ProductFilters";
import ProductList from "../components/ProductList";
import testImage from "../assets/product_icon.png";

const testProducts = [
  {
    name: "test1",
    image: testImage,
    price: 50,
  },
  {
    name: "test2",
    image: testImage,
    price: 55,
  },
  {
    name: "test1",
    image: testImage,
    price: 60,
  },
  {
    name: "test1",
    image: testImage,
    price: 60,
  },
  {
    name: "test1",
    image: testImage,
    price: 60,
  },
  {
    name: "test1",
    image: testImage,
    price: 60,
  },
  {
    name: "test1",
    image: testImage,
    price: 60,
  },
  {
    name: "test1",
    image: testImage,
    price: 60,
  },
  {
    name: "test1",
    image: testImage,
    price: 60,
  },
  {
    name: "test1",
    image: testImage,
    price: 60,
  },
];

function ProductListing() {
  return (
    <>
      <p>ProductListing</p>
      <div className="flex mx-35">
        <div className="w-1/5 border-black border">
          <ProductFilters></ProductFilters>
        </div>
        <div className="w-4/5 border-black border">
          <ProductList></ProductList>
        </div>
      </div>
    </>
  );
}

export default ProductListing;
