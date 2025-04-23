import RecentProducts from "../components/RecentProducts";
import heroBanner from "../assets/byteMartBanner.png"; // Adjust the path if needed

function HomePage() {
  return (
    <div>
      {/* Hero Banner Section */}
      <section className="w-full">
        <a href="/products">
        <img
          src={heroBanner}
          alt="ByteMart Hero Banner"
          className="w-full h-auto object-cover"
        />
        </a>
      </section>

      {/* Recent Products Section */}
      <section className="px-4 py-8">
        <RecentProducts />
      </section>
    </div>
  );
}

export default HomePage;