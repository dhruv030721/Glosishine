import { useState, useEffect } from "react";
import { getNewDropProduct } from "../../Services/Operations/ProductServices";
import ProductList from "../../Components/ProductList/ProductList";
import { tailChase } from "ldrs";
import toast from "react-hot-toast";
import yellowLine from "../../assets/Yellow-Line.svg";
const NewDrops = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [watchlistItems, setWatchlistItems] = useState([]);

  tailChase.register();

  useEffect(() => {
    fetchNewDropProducts();
  }, []);

  const fetchNewDropProducts = async () => {
    try {
      setLoading(true);
      const response = await getNewDropProduct();
      if (response.data && Array.isArray(response.data.data)) {
        setProducts(response.data.data);
      } else {
        toast.error("Failed to fetch new drop products", {
          position: "bottom-right",
        });
      }
    } catch (error) {
      console.error("Error fetching new drop products:", error);
      toast.error("An error occurred while fetching products", {
        position: "bottom-right",
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <l-tail-chase
          size="40"
          speed="1.75"
          color="rgb(6, 68, 59)"
        ></l-tail-chase>
      </div>
    );
  }

  return (
    <div className="container p-6 bg-gray-100 font-montserrat">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-bg-green mb-2 font-signika">
          New Drops
        </h1>
        <img
          src={yellowLine}
          alt="scribble"
          className="w-24 sm:w-20 md:w-24 lg:w-24 xl:w-24"
        />
      </div>
      {products.length === 0 ? (
        <p className="text-center text-gray-500">
          No new drop products available at the moment.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductList
              key={product.product_id}
              product={product}
              watchlistItems={watchlistItems}
              setWatchlistItems={setWatchlistItems}
              className="min-h-[500px]"
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default NewDrops;
