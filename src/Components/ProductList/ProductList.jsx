import default_product_img from "../../assets/fation1.webp";
import default_product_img_1 from "../../assets/howtostyle.webp";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, removeFromWatchlist } from "../../Slice/watchlistSlice";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { AppContext } from "../../App";
import {
  addFavProduct,
  deleteFavProduct,
  getFavProduct,
} from "../../Services/Operations/ProductServices";
import toast from "react-hot-toast";
import { useContext, useEffect, useState } from "react";

const ProductList = ({ product, className, index, onRemove }) => {
  const dispatch = useDispatch();
  const watchlist = useSelector((state) => state.watchlist);
  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const [favProductId, setFavProductId] = useState(null);
  const userContext = useContext(AppContext);

  useEffect(() => {
    const checkIfInWatchlist = async () => {
      try {
        const favProducts = await getFavProduct();
        if (Array.isArray(favProducts.data.data)) {
          const favProduct = favProducts.data.data.find(
            (favItem) => favItem.product_id === product.product_id
          );
          if (favProduct) {
            setIsInWatchlist(true);
            setFavProductId(favProduct.id);
          } else {
            setIsInWatchlist(false);
          }
        } else {
          console.error("Expected an array for favorite products data.");
        }
      } catch (error) {
        console.error("Error fetching favorite products:", error);
      }
    };

    checkIfInWatchlist();
  }, [product, userContext.user, isInWatchlist]);

  const handleWatchlistToggle = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (isInWatchlist) {
      try {
        await toast.promise(
          deleteFavProduct(favProductId),
          {
            loading: "Removing product from watchlist...",
            success: "Product removed from watchlist!",
            error: "Failed to remove product from watchlist.",
          },
          {
            position: "bottom-right",
          }
        );
        dispatch(removeFromWatchlist(product.product_id));
        setIsInWatchlist(false);
        if (onRemove) {
          onRemove(product.product_id);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    } else {
      try {
        await toast.promise(
          addFavProduct({
            id: userContext.user[0].id
              ? userContext.user[0].id
              : product.product_id,
            email: userContext.user[0].email,
            product_id: product.product_id,
          }),
          {
            loading: "Adding product to watchlist...",
            success: "Product added to watchlist!",
            error: (err) =>
              err.response?.status === 409
                ? "Product already exists in your watchlist!"
                : "Failed to add product to watchlist.",
          },
          {
            position: "bottom-right",
          }
        );
        dispatch(addProduct(product));
        setIsInWatchlist(true);
      } catch (error) {
        toast.error("Are you sure you're logged in?", {
          position: "bottom-right",
        });
        console.error("Error:", error);
      }
    }
  };

  return (
    <div
      data-aos="fade-zoom-in"
      data-aos-easing="ease-in-back"
      data-aos-delay="200"
      data-aos-offset="0"
      className={`relative w-full h-full rounded-lg bg-white bg-opacity-30 backdrop-blur-lg border-2 border-bg-green transition-all duration-200 flex flex-col overflow-hidden ${className}`}
    >
      <div className="relative flex flex-col overflow-hidden">
        <a
          className="relative flex h-60 md:h-72 lg:h-80 xl:h-96 2xl:h-[28rem] 4xl:h-[40rem] overflow-hidden"
          href={`/${product.product_id}`}
        >
          <img
            className="peer absolute top-0 right-0 h-full w-full object-cover"
            src={product.images?.[0] || default_product_img}
            alt={product.product_name}
          />
          {product.images && product.images.length > 1 ? (
            <img
              className="peer-hover:right-0 absolute top-0 -right-[400px] md:-right-[500px] lg:-right-[700px] xl:-right-[800px] 2xl:-right-[900px] 4xl:-right-[1000px] h-full w-full object-cover transition-all delay-100 duration-1000 hover:right-0"
              src={product.images?.[index] || product.images?.[1]}
              alt={product.product_name}
            />
          ) : (
            <img
              className="peer-hover:right-0 absolute top-0 -right-[400px] md:-right-[500px] lg:-right-[700px] xl:-right-[800px] 2xl:-right-[900px] 4xl:-right-[1000px] h-full w-full object-cover transition-all delay-100 duration-1000 hover:right-0"
              src={default_product_img_1}
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
          <span className="absolute top-0 left-0 m-2 rounded-full bg-bg-green px-2 text-center text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl 4xl:text-3xl font-medium text-white">
            {product.discountPercentage}% OFF
          </span>
        </a>
        <button
          onClick={handleWatchlistToggle}
          className="absolute top-2 right-2 p-2 rounded-full bg-white bg-opacity-70 hover:bg-opacity-100 transition-all duration-200"
          style={{ zIndex: 100 }} // Increase the z-index
        >
          {isInWatchlist ? (
            <FaHeart className="text-red-500 text-xl" />
          ) : (
            <FaRegHeart className="text-gray-600 text-xl" />
          )}
        </button>

        <div className="mt-2 z-10">
          <a href={`/${product.product_id}`}>
            <h5 className="text-xs md:text-sm lg:text-base xl:text-lg 2xl:text-xl 4xl:text-2xl font-mono font-semibold flex justify-center w-full text-black">
              {product.product_name}
            </h5>
          </a>
          <div className="mt-1 mb-3 flex items-center justify-between">
            <p className="w-full flex justify-evenly">
              <span className="text-xs md:text-sm lg:text-base xl:text-lg 2xl:text-xl 4xl:text-2xl text-black font-bold line-through">
                Rs. {product.regular_price}
              </span>
              <span className="text-xs md:text-sm lg:text-base xl:text-lg 2xl:text-xl 4xl:text-2xl text-green-700 font-bold">
                Rs. {product.sale_price}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
