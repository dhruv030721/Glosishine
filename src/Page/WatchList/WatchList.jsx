import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setWatchlist } from "../../Slice/watchlistSlice"; // Adjust the path as needed
import { getFavProduct } from "../../Services/Operations/ProductServices";
import ProductList from "../../Components/ProductList/ProductList";

export const WatchList = () => {
  const dispatch = useDispatch();
  const watchlist = useSelector((state) => state.watchlist);

  // Fetch watchlist data and set it to Redux state
  useEffect(() => {
    const fetchWatchlist = async () => {
      try {
        const response = await getFavProduct();
        if (response && response.data.success) {
          dispatch(setWatchlist(response.data.data));
        } else {
          console.error("Failed to fetch watchlist");
        }
      } catch (error) {
        console.error("An error occurred while fetching watchlist:", error);
      }
    };

    fetchWatchlist();
  }, [dispatch]);

  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3 justify-center p-5 my-10">
      {watchlist.length > 0 ? (
        watchlist.map((product, index) => (
          <ProductList
            key={product.product_id}
            product={product}
            index={index}
          />
        ))
      ) : (
        <p>No products in your watchlist.</p>
      )}
    </div>
  );
};
