/* eslint-disable react/no-unescaped-entities */
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
import {
  createRazorpayOrder,
  verifyRazorpayPayment,
} from "../../Services/Operations/ProductServices";
import {
  AddOrder,
  GetBilling,
  GetShipping,
} from "../../Services/Operations/Auth";
import CartTable from "./CartTable";
import CartCheckout from "./CartCheckout";

const MAX_QUANTITY = 10; // Set the maximum quantity limit

export const CartPage = () => {
  const { user } = useContext(AppContext);
  const cartItems = useSelector((state) => state.cart.items);
  const cartStatus = useSelector((state) => state.cart.status);
  const cartError = useSelector((state) => state.cart.error);
  const dispatch = useDispatch();
  const [retryCount, setRetryCount] = useState(0);
  const [loadingItems, setLoadingItems] = useState({});
  const [couponCode, setCouponCode] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState(null);
  const [addressModalOpen, setAddressModalOpen] = useState(false);
  const [addressType, setAddressType] = useState("billing");
  const [billingAddresses, setBillingAddresses] = useState([]);
  const [shippingAddresses, setShippingAddresses] = useState([]);
  const [selectedBillingId, setSelectedBillingId] = useState(null);
  const [selectedShippingId, setSelectedShippingId] = useState(null);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [editingAddress, setEditingAddress] = useState(null);

  const fetchCartItems = () => {
    if (user?.[0]?.email) {
      dispatch(fetchCartItemsAsync(user?.[0]?.email))
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
  }, [user]); // Dependency on user ensures it refetches if the user changes

  useEffect(() => {
    if (cartStatus === "failed" && retryCount < 3) {
      fetchCartItems();
    }
  }, [cartStatus, retryCount]);

  useEffect(() => {
    if (user?.[0]?.email) {
      fetchCartItems();
      fetchAddresses();
    }
  }, [user]);

  const fetchAddresses = async () => {
    try {
      const email = user?.[0]?.email;
      if (email) {
        const billingResponse = await GetBilling(email);
        const shippingResponse = await GetShipping(email);

        const billingData = billingResponse.data.data || [];
        const shippingData = shippingResponse.data.data || [];

        setBillingAddresses(billingData);
        setShippingAddresses(shippingData);

        if (billingData.length > 0) {
          setSelectedBillingId(billingData[0].id);
        }
        if (shippingData.length > 0) {
          setSelectedShippingId(shippingData[0].id);
        }
      }
    } catch (error) {
      console.error("Error fetching addresses:", error);
    }
  };

  const openAddressModal = (type) => {
    setAddressType(type);
    setAddressModalOpen(true);
  };

  const handleQuantityChange = (itemId, delta) => {
    if (!user?.[0]?.email) {
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
        dispatch(
          updateQuantityAsync({ email: user?.[0]?.email, id: itemId, delta })
        ).unwrap(),
        {
          loading: "Updating quantity...",
          success: "Quantity updated",
          error: "Failed to update quantity",
        },
        {
          position: "bottom-right",
        }
      )
      .finally(
        () => {
          setLoadingItems((prev) => ({ ...prev, [itemId]: false }));
          fetchCartItems();
        },
        {
          position: "bottom-right",
        }
      );
  };

  const handleDeleteItem = (itemId, size) => {
    if (!user?.[0]?.email) {
      toast.error("Please log in to update your cart", {
        position: "bottom-right",
      });
      return;
    }
    setLoadingItems((prev) => ({ ...prev, [itemId]: true }));
    toast
      .promise(
        dispatch(
          removeItemAsync({
            email: user?.[0]?.email,
            product_id: itemId,
            size: size,
          })
        ).unwrap(),
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
        toast.error("Razorpay SDK failed to load. Please try again later.", {
          position: "bottom-right",
        });
        return;
      }

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: finalTotal * 100, // Amount in paise
        currency: "INR",
        name: "Glosishine",
        description: "Purchase from Your Store",
        order_id: orderData.data,
        handler: async (response) => {
          try {
            const verifyResponse = await verifyRazorpayPayment(response);
            if (verifyResponse.success) {
              const orderData = {
                email: user?.[0]?.email,
                order_details: {
                  razorpay_order_id: response.razorpay_order_id,
                  payment_id: response.razorpay_payment_id,
                  amount: finalTotal.toString(),
                  billing_details_id: selectedBillingId.toString(),
                  shipping_details_id: selectedShippingId.toString(),
                  payment_type: "Online",
                  order_status: "PENDING",
                  discount: appliedDiscount
                    ? appliedDiscount.discount.toString()
                    : "",
                },
                order_items: cartItems.map((item) => ({
                  product_id: item.product_id,
                  size: item.size,
                  quantity: item.quantity.toString(),
                  price: (item.regular_price * item.quantity).toString(),
                })),
              };

              const addOrderResponse = await AddOrder(orderData);
              if (addOrderResponse.success) {
                await clearAllCart(user?.[0]?.email);
                navigate("/ordersuccess");
                toast.success("Payment successful & Order placed!", {
                  position: "bottom-right",
                });
              } else if (
                addOrderResponse.message ===
                "Transaction failed: BIGINT UNSIGNED value is out of range in '`u555091804_glosishine`.`product_stocks`.`S` - 1'"
              ) {
                toast.error(
                  "We're sorry, but one or more products in your cart are out of stock",
                  {
                    position: "bottom-right",
                  }
                );
              } else {
                throw new Error("Failed to place order");
              }
            } else {
              throw new Error("Payment verification failed");
            }
          } catch (error) {
            console.error("Error processing payment:", error);
            toast.error("Payment failed. Please try again.", {
              position: "bottom-right",
            });
          }
        },
        prefill: {
          name: user?.[0]?.name || "",
          email: user?.[0]?.email || "",
        },
        theme: {
          color: "#F37254",
        },
      };

      const razorpayInstance = new window.Razorpay(options);
      razorpayInstance.open();
    } catch (error) {
      console.error("Error creating Razorpay order:", error);
      toast.error("An error occurred while initiating the payment.", {
        position: "bottom-right",
      });
    }
  };

  const handleCODPayment = async () => {
    const orderData = {
      email: user?.[0]?.email,
      order_details: {
        razorpay_order_id: "", // Leave empty for COD
        payment_id: "", // Leave empty for COD
        amount: finalTotal.toString(),
        billing_details_id: selectedBillingId.toString(),
        shipping_details_id: selectedShippingId.toString(),
        payment_type: "COD",
        order_status: "PENDING",
        discount: appliedDiscount ? appliedDiscount.discount.toString() : "",
      },
      order_items: cartItems.map((item) => ({
        product_id: item.product_id,
        size: item.size,
        quantity: item.quantity.toString(),
        price: (item.regular_price * item.quantity).toString(),
      })),
    };

    toast.promise(
      (async () => {
        const response = await AddOrder(orderData);
        if (!response.success) {
          throw new Error("Failed to place order");
        }
        await clearAllCart(user?.[0]?.email);
        navigate("/ordersuccess");
        return response.message;
      })(),
      {
        loading: "Placing your order...",
        success: (message) => `${message}`,
        error: (err) => `${err.message}`,
      },
      {
        position: "bottom-right",
      }
    );
  };

  const handleProceedToPayment = () => {
    if (!selectedBillingId || !selectedShippingId) {
      toast.error("Please select both billing and shipping addresses", {
        position: "bottom-right",
      });
      return;
    }
    setIsPaymentModalOpen(true);
  };

  const handlePaymentMethodSelect = (method) => {
    setSelectedPaymentMethod(method);
    setIsPaymentModalOpen(false);
    if (method === "online") {
      handleRazorpayPayment();
    } else {
      handleCODPayment();
    }
  };

  const handleAddressUpdate = (type, newAddress) => {
    console.log("Updating address of type:", type); // Add this log
    if (type === "billing") {
      setBillingAddresses((prev) => {
        const index = prev.findIndex((addr) => addr?.id === newAddress?.id);
        if (index !== -1) {
          return prev.map((addr, i) => (i === index ? newAddress : addr));
        } else {
          return [...prev, newAddress];
        }
      });
      setSelectedBillingId(newAddress?.id);
    } else {
      setShippingAddresses((prev) => {
        const index = prev.findIndex((addr) => addr?.id === newAddress?.id);
        if (index !== -1) {
          return prev.map((addr, i) => (i === index ? newAddress : addr));
        } else {
          return [...prev, newAddress];
        }
      });
      setSelectedShippingId(newAddress?.id);
    }

    window.location.reload();
  };

  const handleEditAddress = (id, address, type) => {
    setEditingAddress({ ...address, id });
    setAddressType(type);
    setAddressModalOpen(true);
  };

  useEffect(() => {
    // Fetch billing and shipping addresses
    const fetchAddresses = async () => {
      try {
        const billingResponse = await GetBilling(user?.[0]?.email);
        const shippingResponse = await GetShipping(user?.[0]?.email);

        setBillingAddresses(billingResponse?.data?.data || []);
        setShippingAddresses(shippingResponse?.data?.data || []);

        // Set the first address as selected if available
        if (billingResponse?.data?.data?.length > 0) {
          setSelectedBillingId(billingResponse?.data?.data[0].id);
        }
        if (shippingResponse?.data?.data?.length > 0) {
          setSelectedShippingId(shippingResponse?.data?.data[0].id);
        }
      } catch (error) {
        console.error("Error fetching addresses:", error);
        toast.error("Failed to load addresses", { position: "bottom-right" });
      }
    };

    if (user?.[0]?.email) {
      fetchAddresses();
    }
  }, [user]);

  if (cartStatus === "loading") {
    return (
      <div className="flex flex-col justify-center items-center h-screen relative overflow-hidden">
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

  if (!user?.[0]?.email && cartStatus !== "loading") {
    return (
      <div className="text-center font-monserrat text-bg-green h-80 flex flex-col justify-center items-center">
        <h1 className="text-4xl font-bold">Please log in to view your cart.</h1>
        <Link
          to="/login"
          className="mt-4 px-6 py-2 bg-bg-green font-semibold text-white rounded-md hover:bg-green-800 transition-colors"
        >
          Log In
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full h-full p-2 sm:p-4 md:p-6 bg-gray-100 font-signika">
      <h1 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-4">
        Shopping Bag
      </h1>
      <h2 className="text-base sm:text-lg mb-4 sm:mb-6">
        {cartItems.length} {cartItems.length === 1 ? "item" : "items"} in your
        bag.
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        <div className="md:col-span-2">
          <CartTable
            cartItems={cartItems}
            loadingItems={loadingItems}
            setLoadingItems={setLoadingItems}
            handleQuantityChange={handleQuantityChange}
            handleDeleteItem={handleDeleteItem}
            MAX_QUANTITY={MAX_QUANTITY}
          />
        </div>

        <div className="md:col-span-1">
          <CartCheckout
            cartItems={cartItems}
            billingAddresses={billingAddresses}
            selectedBillingId={selectedBillingId}
            setSelectedBillingId={setSelectedBillingId}
            shippingAddresses={shippingAddresses}
            selectedShippingId={selectedShippingId}
            setSelectedShippingId={setSelectedShippingId}
            handleEditAddress={handleEditAddress}
            setEditingAddress={setEditingAddress}
            setAddressType={setAddressType}
            setAddressModalOpen={setAddressModalOpen}
            handleApplyCoupon={handleApplyCoupon}
            couponCode={couponCode}
            setCouponCode={setCouponCode}
            cartTotal={cartTotal}
            totalDiscount={totalDiscount}
            finalTotal={finalTotal}
            appliedDiscount={appliedDiscount}
            handleProceedToPayment={handleProceedToPayment}
            isPaymentModalOpen={isPaymentModalOpen}
            setIsPaymentModalOpen={setIsPaymentModalOpen}
            handlePaymentMethodSelect={handlePaymentMethodSelect}
            addressModalOpen={addressModalOpen}
            editingAddress={editingAddress}
            handleAddressUpdate={handleAddressUpdate}
            addressType={addressType}
            couponDiscountAmount={couponDiscountAmount}
          />
        </div>
      </div>
    </div>
  );
};

export default CartPage;
