/* eslint-disable no-unused-vars */
import default_product_img from "../../assets/fation1.webp";
import default_product_img_1 from "../../assets/howtostyle.webp";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, removeFromWatchlist } from "../../Slice/watchlistSlice";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { AppContext } from "../../App";
import {
  addFavProduct,
  deleteFavProduct,
} from "../../Services/Operations/ProductServices";
import toast from "react-hot-toast";
import { useContext, useEffect, useState } from "react";
import { addItemAsync, fetchCartItemsAsync } from "../../Slice/CartSlice";

const ProductList = ({
  product,
  className,
  index,
  onRemove,
  watchlistItems,
  setWatchlistItems,
}) => {
  const dispatch = useDispatch();
  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [favProductId, setFavProductId] = useState(null);
  const userContext = useContext(AppContext);
  const cartItems = useSelector((state) => state.cart.items);
  const [isInCart, setIsInCart] = useState(false);
  const email = userContext?.user?.[0]?.email;

  useEffect(() => {
    const favProduct = watchlistItems?.find(
      (favItem) => favItem.product_id === product.product_id
    );
    if (favProduct) {
      setIsInWatchlist(true);
      setFavProductId(favProduct.id);
    } else {
      setIsInWatchlist(false);
    }
  }, [watchlistItems, product.product_id]);

  useEffect(() => {
    setIsInCart(
      cartItems.some((item) => item?.product_id === product.product_id)
    );
  }, [cartItems, product.product_id]);

  const handleWatchlistToggle = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!email) {
      toast.error("Please log in to manage your watchlist", {
        style: {
          backgroundColor: "#064C3A",
          color: "#FFFFFF",
          fontFamily: "signika",
        },
        position: "bottom-right",
      });
      return;
    }

    if (isInWatchlist) {
      try {
        await toast.promise(
          deleteFavProduct(product.product_id, email),
          {
            loading: "Removing product from watchlist...",
            success: "Product removed from watchlist!",
            error: "Failed to remove product from watchlist.",
          },
          {
            style: {
              backgroundColor: "#064C3A",
              color: "#FFFFFF",
              fontFamily: "signika",
            },
            position: "bottom-right",
          }
        );
        dispatch(removeFromWatchlist(product.product_id));
        setIsInWatchlist(false);
        setWatchlistItems(
          watchlistItems.filter(
            (item) => item.product_id !== product.product_id
          )
        );
        if (onRemove) {
          onRemove(product.product_id);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    } else {
      try {
        const response = await addFavProduct(email, product.product_id);

        if (response.success) {
          toast.success(response.message || "Product added to watchlist!", {
            style: {
              backgroundColor: "#064C3A",
              color: "#FFFFFF",
              fontFamily: "signika",
            },
            position: "bottom-right",
          });

          dispatch(addProduct(product));
          setIsInWatchlist(true);
          setWatchlistItems([
            ...watchlistItems,
            { product_id: product.product_id },
          ]);
        } else {
          throw new Error(
            response.message || "Failed to add product to watchlist"
          );
        }
      } catch (error) {
        console.error("Error:", error);
        let errorMessage = "Failed to add product to watchlist.";
        if (error.message.includes("Out of range value")) {
          errorMessage = "Invalid product data. Please try again.";
        } else if (error.response?.status === 409) {
          errorMessage = "Product already exists in your watchlist!";
        }
        toast.error(errorMessage, {
          style: {
            backgroundColor: "#064C3A",
            color: "#FFFFFF",
            fontFamily: "signika",
          },
          position: "bottom-right",
        });
      }
    }
  };

  const handleAddToBag = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const email = userContext?.user?.[0]?.email;
    if (!email) {
      toast.error("Please log in to add items to your bag", {
        style: {
          backgroundColor: "#064C3A",
          color: "#FFFFFF",
          fontFamily: "signika",
        },
        position: "bottom-right",
      });
      return;
    }

    if (isInCart) {
      toast.error("This product is already in your bag", {
        style: {
          backgroundColor: "#064C3A",
          color: "#FFFFFF",
          fontFamily: "signika",
        },
        position: "bottom-right",
      });
      return;
    }

    // Parse the size string and select the first available size
    const availableSizes = product.size
      ? product.size.split(",").map((s) => s.trim())
      : [];
    const defaultSize = availableSizes.length > 0 ? availableSizes[0] : null;

    if (!defaultSize) {
      toast.error("No size available for this product", {
        style: {
          backgroundColor: "#064C3A",
          color: "#FFFFFF",
          fontFamily: "signika",
        },
        position: "bottom-right",
      });
      return;
    }

    try {
      await toast.promise(
        dispatch(
          addItemAsync({
            email,
            product_id: product.product_id,
            size: defaultSize,
            quantity: 1,
            // Add other necessary product details here
          })
        ).unwrap(),
        {
          loading: "Adding product to bag...",
          success: "Product added to bag!",
          error: (err) => {
            // console.log(err);
            return err.message;
          },
        },
        {
          style: {
            backgroundColor: "#064C3A",
            color: "#FFFFFF",
            fontFamily: "signika",
            fontSize: "14px",
            fontWeight: "400",
            lineHeight: "1.5",
          },
          position: "bottom-right",
        }
      );
      await dispatch(fetchCartItemsAsync(userContext.user[0].email));

      setIsInCart(true);
    } catch (error) {
      console.error("Error adding product to bag:", error);
    }
  };

  return (
    <div
      className={`relative w-full bg-white ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image Container with Fixed Aspect Ratio */}
      <div className="relative aspect-[3/4] w-full">
        <a href={`/product/${product.product_id}`}>
          <img
            className="absolute inset-0 w-full h-full object-cover"
            src={product.images?.[0] || default_product_img}
            alt={product.product_name}
          />
        </a>

        {/* Desktop Wishlist Button - Hidden on mobile */}
        <div className="hidden sm:block">
          {isHovered && (
            <button
              onClick={handleWatchlistToggle}
              className="absolute bottom-0 left-0 right-0 bg-white py-1 px-2 flex items-center justify-center gap-2"
            >
              {!isInWatchlist ? (
                <>
                  <FaRegHeart className="text-bg-green text-base" />
                  <span className="text-[10px] font-medium">WISHLIST</span>
                </>
              ) : (
                <>
                  <FaHeart className="text-bg-green text-base" />
                  <span className="text-[10px] font-medium">Remove</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>

      {/* Product Details with Consistent Padding */}
      <div className="p-1.5">
        <div className="flex items-start justify-between">
          <div>
            {/* Brand Name */}
            <h3 className="font-medium text-sm text-neutral-900 truncate">
              {product.brand}
            </h3>

            {/* Product Name */}
            <p className="text-sm text-neutral-600 truncate mt-0.5">
              {product.product_name}
            </p>
          </div>

          {/* Mobile Wishlist Button - Hidden on desktop */}
          <button onClick={handleWatchlistToggle} className="sm:hidden ml-1">
            {isInWatchlist ? (
              <FaHeart className="text-bg-green text-base" />
            ) : (
              <FaRegHeart className="text-bg-green text-base" />
            )}
          </button>
        </div>

        {/* Updated Price Section with better spacing */}
        <div className="flex flex-wrap items-center gap-x-1 mt-1">
          <span className="font-medium text-xs whitespace-nowrap">
            ₹{product.sale_price}
          </span>
          {product.regular_price && (
            <>
              <span className="text-neutral-500 line-through text-[10px] whitespace-nowrap">
                ₹{product.regular_price}
              </span>
              <span className="text-bg-green text-[10px] whitespace-nowrap">
                ({product.discount}% OFF)
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
