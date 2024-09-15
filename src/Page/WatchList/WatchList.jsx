import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setWatchlist } from "../../Slice/watchlistSlice"; // Adjust the path as needed
import { Link } from "react-router-dom";
import { getFavProduct } from "../../Services/Operations/ProductServices";
import defaultProductImage from "../../assets/summar1.jpg";

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
        watchlist.map((product) => (
          <div
            key={product.product_id}
            data-aos="fade-zoom-in"
            data-aos-easing="ease-in-back"
            data-aos-delay="200"
            data-aos-offset="0"
            className="flex flex-col overflow-hidden border rounded-lg shadow-lg"
          >
            <Link
              to={`/${product.product_id}`}
              className="relative flex h-96 overflow-hidden"
            >
              <img
                className="peer absolute top-0 right-0 h-full w-full object-cover"
                src={
                  // product.product_img ||
                  // product.images[0] ||
                  defaultProductImage
                }
                alt={product.product_name}
              />
              {product.images && product.images.length > 1 && (
                <img
                  className="peer-hover:right-0 absolute top-0 -right-96 h-full w-full object-cover transition-all delay-100 duration-1000 hover:right-0"
                  src={product.images[1]}
                  alt={product.product_name}
                />
              )}
              <svg
                className="group-hover:animate-ping group-hover:opacity-30 peer-hover:opacity-0 pointer-events-none absolute inset-x-0 bottom-5 mx-auto text-3xl text-white transition-opacity"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                role="img"
                width="1em"
                height="1em"
                preserveAspectRatio="xMidYMid meet"
                viewBox="0 0 32 32"
              >
                <path
                  fill="currentColor"
                  d="M2 10a4 4 0 0 1 4-4h20a4 4 0 0 1 4 4v10a4 4 0 0 1-2.328 3.635a2.996 2.996 0 0 0-.55-.756l-8-8A3 3 0 0 0 14 17v7H6a4 4 0 0 1-4-4V10Zm14 19a1 1 0 0 0 1.8.6l2.7-3.6H25a1 1 0 0 0 .707-1.707l-8-8A1 1 0 0 0 16 17v12Z"
                />
              </svg>
              {product.discountPercentage && (
                <span className="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white">
                  {product.discountPercentage}% OFF
                </span>
              )}
            </Link>
            <div className="mt-4 p-4">
              <Link to={`/${product.product_id}`}>
                <h5 className="text-sm font-mono font-semibold text-center text-black">
                  {product.product_name}
                </h5>
              </Link>
              <div className="mt-2 mb-5 flex items-center justify-between">
                <p className="w-full flex justify-evenly">
                  <span className="text-sm text-black font-bold line-through">
                    Rs. {product.regular_price}
                  </span>
                  <span className="text-sm text-green-700 font-bold">
                    Rs. {product.sale_price}
                  </span>
                </p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>No products in your watchlist.</p>
      )}
    </div>
  );
};
