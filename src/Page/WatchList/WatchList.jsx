import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setWatchlist, removeFromWatchlist } from "../../Slice/watchlistSlice"; // Add removeFromWatchlist
import { getFavProduct } from "../../Services/Operations/ProductServices";
import ProductList from "../../Components/ProductList/ProductList";

export const WatchList = () => {
  const dispatch = useDispatch();
  const watchlist = useSelector((state) => state.watchlist);
  const [localWatchlist, setLocalWatchlist] = useState([]);

  // Fetch watchlist data and set it to Redux state
  useEffect(() => {
    const fetchWatchlist = async () => {
      try {
        const response = await getFavProduct();
        if (response && response.data.success) {
          dispatch(setWatchlist(response.data.data));
          setLocalWatchlist(response.data.data);
        } else {
          console.error("Failed to fetch watchlist");
        }
      } catch (error) {
        console.error("An error occurred while fetching watchlist:", error);
      }
    };

    fetchWatchlist();
  }, [dispatch]);

  const handleRemove = (productId) => {
    dispatch(removeFromWatchlist(productId));
    setLocalWatchlist((prev) =>
      prev.filter((item) => item.product_id !== productId)
    );
  };

  return (
    <div className="p-6 bg-gray-100">
      <div>
        <h1 className="text-2xl font-bold mb-4">Shopping Bag</h1>
        <h2 className="text-lg mb-6">
          {localWatchlist.length}{" "}
          {localWatchlist.length === 1 ? "item" : "items"} in your bag.
        </h2>
      </div>

      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3 justify-center p-5 my-10">
        {localWatchlist.length > 0 ? (
          localWatchlist.map((product, index) => (
            <ProductList
              key={product.product_id}
              product={product}
              index={index}
              onRemove={handleRemove}
            />
          ))
        ) : (
          <p>No products in your watchlist.</p>
        )}
      </div>
    </div>
  );
};
