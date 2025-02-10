import ProductCard from "./ProductCard";
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

function ProductList() {
  return (
    <>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3">
        {testProducts.map((product, index) => (
          <ProductCard key={index} {...product} />
        ))}
      </div>
    </>
  );
}

export default ProductList;
