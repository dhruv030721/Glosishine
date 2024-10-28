import { useCallback, useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeFromWatchlist } from "../../Slice/watchlistSlice";
import { getFavProduct } from "../../Services/Operations/ProductServices";
import ProductList from "../../Components/ProductList/ProductList";
import Cookies from "universal-cookie";
import { AppContext } from "../../App";
// import { ring2 } from "ldrs";

export const WatchList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [watchlistItems, setWatchlistItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const userContext = useContext(AppContext);
  const cookies = new Cookies();
  const token = cookies.get("Access-Token");
  const allProducts = userContext.getdata || [];

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
        setLoading(false);
        // Filter and merge watchlist items with full product details
        const updatedWatchlistItems = res.data.data.map((item) => {
          const fullProductDetails = allProducts.find(
            (product) => product.product_id === item.product_id
          );
          return { ...item, ...fullProductDetails };
        });
        setWatchlistItems(updatedWatchlistItems);
      })
      .catch((err) => {
        setLoading(false);
        console.error("Error fetching watchlist:", err);
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
      <div className="flex flex-col justify-center items-center h-screen">
        <l-ring-2
          size="40"
          bg-opacity="0.2"
          speed="0.5"
          color="rgb(6,68,59)"
          className="w-1/6 sm:w-1/12 md:w-1/10 lg:w-1/10 xl:w-1/20 2xl:w-1/24"
        ></l-ring-2>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-100 font-signika">
      <div>
        <h1 className="text-2xl font-bold mb-4">Shopping Bag</h1>
        <h2 className="text-lg mb-6">
          {watchlistItems.length}{" "}
          {watchlistItems.length === 1 ? "item" : "items"} in your bag.
        </h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5 gap-6">
        {watchlistItems.length > 0 ? (
          watchlistItems.map((product, index) => (
            <ProductList
              key={product.id}
              product={product}
              index={index}
              onRemove={handleRemove}
              watchlistItems={watchlistItems}
              setWatchlistItems={setWatchlistItems}
              className="min-h-[400px] sm:min-h-[400px] md:min-h-[500px]"
            />
          ))
        ) : (
          <p>No products in your watchlist.</p>
        )}
      </div>
    </div>
  );
};
