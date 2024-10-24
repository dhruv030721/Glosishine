/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaTrash, FaSpinner } from "react-icons/fa";
import {
  removeItemAsync,
  updateQuantityAsync,
  clearCart,
  fetchCartItemsAsync,
} from "../../Slice/CartSlice";
import toast from "react-hot-toast";
import { AppContext } from "../../App"; // Adjust the import path as needed
import {
  clearAllCart,
  getDiscount,
} from "../../Services/Operations/ProductServices";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import {
  createRazorpayOrder,
  verifyRazorpayPayment,
} from "../../Services/Operations/ProductServices";
import logo from "../../assets/logos.jpg";

const MAX_QUANTITY = 10; // Set the maximum quantity limit

export const CartPage = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const cartStatus = useSelector((state) => state.cart.status);
  const cartError = useSelector((state) => state.cart.error);
  const dispatch = useDispatch();
  const [retryCount, setRetryCount] = useState(0);
  const userContext = useContext(AppContext);
  const email = userContext?.user?.[0]?.email || "";
  const [loadingItems, setLoadingItems] = useState({});
  const [couponCode, setCouponCode] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState(null);

  const fetchCartItems = () => {
    if (email) {
      dispatch(fetchCartItemsAsync(email))
        .unwrap()
        .then(() => {
          setLoadingItems({});
        })
        .catch((error) => {
          console.error("Failed to fetch cart items:", error);
          if (error.response && error.response.status !== 404) {
            toast.error(`Failed to load cart: ${error}`, {
              position: "bottom-right",
            });
          }
          setRetryCount((prev) => prev + 1);
        });
    }
  };

  useEffect(() => {
    // Fetch cart items when the component mounts
    fetchCartItems();
  }, [email]); // Dependency on email ensures it refetches if the user changes

  useEffect(() => {
    if (cartStatus === "failed" && retryCount < 3) {
      fetchCartItems();
    }
  }, [cartStatus, retryCount]);

  const handleQuantityChange = (itemId, delta) => {
    if (!email) {
      toast.error("Please log in to update your cart", {
        position: "bottom-right",
      });
      return;
    }

    const item = cartItems.find((item) => item?.product_id === itemId);
    if (!item) return;

    const newQuantity = item.quantity + delta;

    if (newQuantity < 1 && delta < 0) {
      toast.error("Quantity cannot be less than 1", {
        position: "bottom-right",
      });
      return;
    }

    if (newQuantity > MAX_QUANTITY && delta > 0) {
      toast.error(`Maximum quantity limit is ${MAX_QUANTITY}`, {
        position: "bottom-right",
      });
      return;
    }

    setLoadingItems((prev) => ({ ...prev, [itemId]: true }));
    toast
      .promise(
        dispatch(updateQuantityAsync({ email, id: itemId, delta })).unwrap(),
        {
          loading: "Updating quantity...",
          success: "Quantity updated",
          error: "Failed to update quantity",
        },
        {
          position: "bottom-right",
        }
      )
      .finally(() => {
        setLoadingItems((prev) => ({ ...prev, [itemId]: false }));
        fetchCartItems();
      });
  };

  const handleDeleteItem = (itemId) => {
    if (!email) {
      toast.error("Please log in to update your cart", {
        position: "bottom-right",
      });
      return;
    }
    setLoadingItems((prev) => ({ ...prev, [itemId]: true }));
    toast
      .promise(
        dispatch(removeItemAsync({ email, product_id: itemId })).unwrap(),
        {
          loading: "Removing item...",
          success: "Item removed from cart",
          error: "Failed to remove item from cart",
        },
        {
          position: "bottom-right",
        }
      )
      .finally(() => {
        setLoadingItems((prev) => ({ ...prev, [itemId]: false }));
        fetchCartItems();
      });
  };

  const handleApplyCoupon = async () => {
    if (!couponCode) {
      toast.error("Please enter a coupon code", {
        position: "bottom-right",
      });
      return;
    }

    toast.promise(
      getDiscount(couponCode),
      {
        loading: "Applying coupon...",
        success: (response) => {
          if (response.success && response.data.length > 0) {
            const discount = response.data[0];
            const currentDate = new Date();
            currentDate.setHours(0, 0, 0, 0); // Set to start of day
            const startDate = new Date(discount.start_date);
            startDate.setHours(0, 0, 0, 0);
            const endDate = new Date(discount.end_date);
            endDate.setHours(23, 59, 59, 999); // Set to end of day

            if (
              currentDate >= startDate &&
              currentDate <= endDate &&
              discount.active
            ) {
              setAppliedDiscount(discount);
              return `Coupon applied successfully! ${discount.discount}% off`;
            } else {
              throw new Error("This coupon is not valid or has expired");
            }
          } else {
            throw new Error("Invalid coupon code");
          }
        },
        error: (err) => `Failed to apply coupon: ${err.message}`,
      },
      {
        position: "bottom-right",
      }
    );
  };

  // Calculate cart total and total discount
  const cartTotal = cartItems.reduce(
    (total, item) => total + item?.regular_price * item?.quantity,
    0
  );
  const totalDiscount = cartItems.reduce((total, item) => {
    const discountAmount = ((item?.discount || 0) / 100) * item?.regular_price;
    return total + discountAmount * item?.quantity;
  }, 0);

  // Calculate coupon discount
  const couponDiscountAmount = appliedDiscount
    ? (cartTotal - totalDiscount) * (appliedDiscount.discount / 100)
    : 0;

  // Calculate final total
  const finalTotal = cartTotal - totalDiscount - couponDiscountAmount;

  const navigate = useNavigate();

  const handleRazorpayPayment = async () => {
    try {
      const orderData = await createRazorpayOrder(finalTotal);

      const loadRazorpay = () => {
        return new Promise((resolve) => {
          const script = document.createElement("script");
          script.src = "https://checkout.razorpay.com/v1/checkout.js";
          script.onload = () => {
            resolve(true);
          };
          script.onerror = () => {
            resolve(false);
          };
          document.body.appendChild(script);
        });
      };

      const isRazorpayLoaded = await loadRazorpay();

      if (!isRazorpayLoaded) {
        toast.error("Razorpay SDK failed to load. Please try again later.");
        return;
      }

      // Merge the received options with our custom options
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: finalTotal,
        currency: "INR",
        name: "Glosishine",
        description: "Purchase from Your Store",
        order_id: orderData.data,
        handler: async (response) => {
          toast.promise(
            verifyRazorpayPayment(response),
            {
              loading: "Verifying payment...",
              success: (verifyResponse) => {
                if (verifyResponse.success) {
                  clearAllCart(email);
                  navigate("/ordersuccess");
                  return "Payment successful & Cart has been cleared!";
                } else {
                  throw new Error("Payment verification failed");
                }
              },
              error: "Payment verification failed. Please contact support.",
            },
            {
              position: "bottom-right",
            }
          );
        },
        prefill: {
          name: userContext?.user?.[0]?.name || "",
          email: email,
        },
        theme: {
          color: "#F37254",
        },
        // Merge the received options
        ...orderData.options,
        // Override some options if needed
        remember_customer: true,
        image: logo,
      };

      // If the color is null in the received options, use our default
      if (!options.theme.color) {
        options.theme.color = "#F37254";
      }

      const razorpayInstance = new window.Razorpay(options);
      razorpayInstance.open();
    } catch (error) {
      console.error("Error creating Razorpay order:", error);
      toast.error("An error occurred while initiating the payment.");
    }
  };

  if (cartStatus === "loading") {
    return (
      <div className="flex flex-col justify-center items-center h-screen relative overflow-hidden">
        <l-tail-chase
          size="60"
          bg-opacity="0.2"
          speed="2"
          color="rgb(6,68,59)"
          className="w-1/6 sm:w-1/12 md:w-1/10 lg:w-1/10 xl:w-1/20 2xl:w-1/24"
        ></l-tail-chase>
      </div>
    );
  }

  if (!email && cartStatus !== "loading") {
    return (
      <div className="text-center text-bg-green h-80 flex flex-col justify-center items-center">
        <h1 className="text-4xl font-bold">Please log in to view your cart.</h1>
        <Link
          to="/login"
          className="mt-4 px-6 py-2 bg-bg-green text-white rounded-md hover:bg-green-800 transition-colors"
        >
          Log In
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full h-full p-6 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Shopping Bag</h1>
      <h2 className="text-lg mb-6">
        {cartItems.length} {cartItems.length === 1 ? "item" : "items"} in your
        bag.
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <div className="p-6 bg-white shadow-lg rounded-md">
            {/* Header Row */}
            <div className="flex justify-between items-center mb-4 p-4 bg-gray-100 rounded-md">
              <div className="flex-1 text-left">
                <h3 className="font-semibold">Product</h3>
              </div>
              <div className="w-1/5 text-center">
                <h3 className="font-semibold">Price</h3>
              </div>
              <div className="w-1/5 text-center">
                <h3 className="font-semibold">Quantity</h3>
              </div>
              <div className="w-1/5 text-center">
                <h3 className="font-semibold">Total Price</h3>
              </div>
              <div className="w-1/7 text-center">
                <h3 className="font-semibold">Action</h3>
              </div>
            </div>

            {/* Cart Items */}
            {cartItems.length > 0 ? (
              cartItems.map((item) => {
                const salePrice = item?.sale_price;
                const discountAmount =
                  ((item?.discount || 0) / 100) * item?.regular_price;
                const discountedPrice = item?.regular_price - discountAmount;
                const totalDiscountedPrice =
                  discountedPrice * (item?.quantity || 1);

                return (
                  <div
                    key={item?.product_id}
                    className="flex justify-between items-center mb-6 p-4 bg-white rounded-md h-auto flex-wrap md:flex-nowrap"
                  >
                    {loadingItems[item?.product_id] ? (
                      <div className="flex-1 flex items-center justify-center">
                        <FaSpinner className="animate-spin text-4xl text-gray-400" />
                      </div>
                    ) : (
                      <>
                        <div className="flex-1 flex items-center text-left">
                          <img
                            src={item?.image_url}
                            alt={item?.product_name}
                            className="w-24 object-cover rounded-md h-full"
                            onError={() => {
                              setLoadingItems((prev) => ({
                                ...prev,
                                [item.product_id]: true,
                              }));
                              // Attempt to reload the image after a short delay
                              setTimeout(() => {
                                setLoadingItems((prev) => ({
                                  ...prev,
                                  [item.product_id]: false,
                                }));
                              }, 2000);
                            }}
                          />
                          <div className="ml-4">
                            <h3 className="font-semibold text-base md:text-lg">
                              {item?.product_name}
                            </h3>
                            <p className="text-gray-500 text-sm md:text-base">
                              Size: {item?.size}
                            </p>
                          </div>
                        </div>
                        <div className="w-1/5 text-center mt-4 md:mt-0">
                          <p className="text-lg font-semibold">
                            ₹{item?.regular_price}
                          </p>
                          {/* {item?.discount > 0 && (
                            <p className="text-sm text-red-500">
                              (Sale Price: ₹{salePrice})
                            </p>
                          )} */}
                        </div>
                        <div className="w-1/5 text-center mt-4 md:mt-0">
                          <div className="flex justify-center items-center px-2 py-1 rounded w-auto">
                            <div className="flex justify-between items-center w-28">
                              <button
                                className="text-gray-500 border-black border-solid border-0"
                                onClick={() =>
                                  handleQuantityChange(item?.product_id, -1)
                                }
                                disabled={
                                  item?.quantity <= 1 ||
                                  loadingItems[item?.product_id]
                                }
                              >
                                -
                              </button>
                              <span className="px-2">
                                {item?.quantity || 1}
                              </span>
                              <button
                                className="text-gray-500"
                                onClick={() =>
                                  handleQuantityChange(item?.product_id, 1)
                                }
                                disabled={
                                  item?.quantity >= MAX_QUANTITY ||
                                  loadingItems[item?.product_id]
                                }
                              >
                                +
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="w-1/5 text-center mt-4 md:mt-0">
                          <p className="text-lg font-semibold text-orange-400">
                            ₹{(item?.regular_price * item?.quantity).toFixed(2)}
                          </p>
                          {/* <p className="text-sm text-red-500">
                            (Sale Total: ₹
                            {(item?.sale_price * item?.quantity).toFixed(2)})
                          </p> */}
                        </div>
                        <div className="text-center mt-4 md:mt-0">
                          <button
                            onClick={() => handleDeleteItem(item?.product_id)}
                            className="border-2 border-red-500 border-dashed rounded-lg p-2"
                            disabled={loadingItems[item?.product_id]}
                          >
                            <FaTrash size={20} color="red" />
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                );
              })
            ) : (
              <div className="p-4 text-center text-gray-500">
                Your cart is empty. Start shopping to add items to your cart!
              </div>
            )}
          </div>
        </div>

        <div className="bg-white shadow-lg rounded-md p-6">
          <h3 className="font-semibold text-lg mt-6 mb-4">Coupon Code</h3>
          <input
            type="text"
            placeholder="Coupon Code"
            className="w-full p-2 border rounded mb-4"
            disabled={cartItems.length === 0}
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
          />
          <button
            className="w-full p-2 bg-black text-white rounded disabled:cursor-not-allowed"
            disabled={cartItems.length === 0}
            onClick={handleApplyCoupon}
          >
            Apply
          </button>

          <div className="mt-6">
            <div className="flex justify-between mb-2">
              <p>Cart Subtotal</p>
              <p>₹{cartTotal.toFixed(2)}</p>
            </div>
            {totalDiscount > 0 && (
              <div className="flex justify-between mb-2">
                <p>Product Discount</p>
                <p>−₹{totalDiscount.toFixed(2)}</p>
              </div>
            )}
            {appliedDiscount && (
              <div className="flex justify-between mb-2">
                <p>Coupon Discount ({appliedDiscount.discount}%)</p>
                <p>−₹{couponDiscountAmount.toFixed(2)}</p>
              </div>
            )}
            <div className="flex justify-between text-lg font-semibold">
              <p>Cart Total</p>
              <p>₹{finalTotal.toFixed(2)}</p>
            </div>
            <button
              className="w-full mt-4 p-2 bg-bg-green text-white rounded disabled:cursor-not-allowed"
              disabled={cartItems.length === 0}
              onClick={handleRazorpayPayment}
            >
              Proceed to Payment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
