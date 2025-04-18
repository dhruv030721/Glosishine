import { useCallback, useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeFromWatchlist } from "../../Slice/watchlistSlice";
import { getFavProduct } from "../../Services/Operations/ProductServices";
import ProductList from "../../Components/ProductList/ProductList";
import Cookies from "universal-cookie";
import { AppContext } from "../../App";
import yellowLine from "../../assets/Yellow-Line.svg";
import { ring2 } from "ldrs";

export const WatchList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [watchlistItems, setWatchlistItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const userContext = useContext(AppContext);
  const cookies = new Cookies();
  const token = cookies.get("Access-Token");
  const allProducts = userContext.getdata || [];

  ring2.register();

  useEffect(() => {
    if (!token || !userContext.user) {
      navigate("/login");
    }
  }, [token, userContext.user, navigate]);

  const getData = useCallback(() => {
    const email = userContext?.user?.[0]?.email;
    if (!email) return;

    setLoading(true);
    getFavProduct(email)
      .then((res) => {
        const updatedWatchlistItems = res.data.data.map((item) => {
          const fullProductDetails = allProducts.find(
            (product) => product.product_id === item.product_id
          );
          return { ...item, ...fullProductDetails };
        });
        setWatchlistItems(updatedWatchlistItems);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching watchlist:", err);
        setLoading(false);
      });
  }, [userContext, allProducts]);

  useEffect(() => {
    getData();
  }, [getData]);

  const handleRemove = (id) => {
    dispatch(removeFromWatchlist(id));
    setWatchlistItems((prev) => prev.filter((item) => item.id !== id));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <l-ring-2 size="40" speed="1.75" color="rgb(6, 68, 59)"></l-ring-2>
      </div>
    );
  }

  return (
    <div className="container p-6 bg-gray-100 !min-w-full font-signika">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-bg-green mb-2 font-signika">
          Watchlist
        </h1>
        <img
          src={yellowLine}
          alt="scribble"
          className="w-24 sm:w-20 md:w-24 lg:w-24 xl:w-24"
        />
      </div>

      <div className="mb-12 ml-5">
        <h2 className="text-2xl font-semibold text-bg-green py-0">
          {watchlistItems.length}{" "}
          {watchlistItems.length === 1 ? "item" : "items"} in your watchlist
        </h2>
        <img
          src={yellowLine}
          alt="scribble"
          className="w-24 sm:w-20 md:w-24 lg:w-24 xl:w-24 mb-2"
        />

        {watchlistItems.length > 0 ? (
          <div className="w-full px-4 sm:px-6 md:px-8 pt-4">
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 xl:grid-cols-6 gap-6 lg:gap-6">
              {watchlistItems.map((product, index) => (
                <div
                  key={product.id}
                  className="transform transition-transform duration-300 hover:scale-[1.02]"
                >
                  <ProductList
                    product={product}
                    index={index}
                    onRemove={handleRemove}
                    watchlistItems={watchlistItems}
                    setWatchlistItems={setWatchlistItems}
                  />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center h-48 bg-white rounded-lg shadow-sm">
            <div className="flex flex-col items-center justify-center py-8 px-4 bg-white rounded-lg">
              <h3 className="text-xl font-semibold text-bg-green mb-2">
                No Watchlist Items Found
              </h3>
              <p className="text-gray-500 text-center mb-6">
                You haven&apos;t added any items to your watchlist yet. Start
                shopping to see your watchlist here!
              </p>
              <button
                onClick={() => navigate("/newdrops")}
                className="px-6 py-2 bg-bg-green text-white rounded-lg hover:bg-green-700 transition-colors duration-300 font-medium"
              >
                Start Shopping
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
