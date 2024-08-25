import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaTrash } from "react-icons/fa";
import { removeItem, updateQuantity, clearCart } from "../../Slice/CartSlice"; // Adjust the path to your cartSlice
import toast from "react-hot-toast";

export const CartPage = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const handleQuantityChange = (itemId, delta) => {
    const item = cartItems.find((item) => item.product_id === itemId);
    if (!item) return;

    const currentQuantity = item.quantity || 1;
    let newQuantity = currentQuantity + delta;

    if (newQuantity > 10) {
      newQuantity = 10;
      toast.error("Maximum quantity reached.");
    } else if (newQuantity < 1) {
      newQuantity = 1;
      toast.error("Minimum quantity reached.");
    } else {
      dispatch(updateQuantity({ id: itemId, delta }));
      toast.success(`Quantity updated to ${newQuantity}`);
      return; // Exit early to prevent duplicate updates
    }

    // Update the quantity in the cart
    dispatch(
      updateQuantity({ id: itemId, delta: newQuantity - currentQuantity })
    );
  };

  const handleDeleteItem = (itemId) => {
    dispatch(removeItem(itemId));
    toast.success("Item removed from cart");
  };

  const cartTotal = cartItems.reduce(
    (acc, item) => acc + item.sale_price * (item.quantity || 1),
    0
  );

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
              cartItems.map((item) => (
                <div
                  key={item.product_id}
                  className="flex justify-between items-center mb-6 p-4 bg-white rounded-md h-auto flex-wrap md:flex-nowrap"
                >
                  <div className="flex-1 flex items-center text-left">
                    <img
                      src={
                        (item.images && item.images[0]) || "default-image-url"
                      } // Replace with a default image URL
                      alt={item.product_name}
                      className="w-24 object-cover rounded-md h-full"
                    />
                    <div className="ml-4">
                      <h3 className="font-semibold text-base md:text-lg">
                        {item.product_name}
                      </h3>
                      <p className="text-gray-500 text-sm md:text-base">
                        Size: {item.size}
                      </p>
                      <p className="text-gray-500 text-sm md:text-base">
                        Color: {item.color}
                      </p>
                    </div>
                  </div>
                  <div className="w-1/5 text-center mt-4 md:mt-0">
                    <p className="text-lg font-semibold">₹{item.sale_price}</p>
                  </div>
                  <div className="w-1/5 text-center mt-4 md:mt-0">
                    <div className="flex justify-center items-center px-2 py-1 rounded w-auto">
                      <div className="flex justify-between items-center w-28">
                        <button
                          className="text-gray-500 border-black border-solid border-0"
                          onClick={() =>
                            handleQuantityChange(item.product_id, -1)
                          }
                        >
                          -
                        </button>
                        <span className="px-2">{item.quantity || 1}</span>
                        <button
                          className="text-gray-500"
                          onClick={() =>
                            handleQuantityChange(item.product_id, 1)
                          }
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="w-1/5 text-center mt-4 md:mt-0">
                    <p className="text-lg font-semibold text-orange-400">
                      ₹
                      {(
                        (parseFloat(item.sale_price) || 0) *
                        (item.quantity || 1)
                      ).toFixed(2)}
                    </p>
                  </div>
                  <div className="text-center mt-4 md:mt-0">
                    <button
                      onClick={() => handleDeleteItem(item.product_id)}
                      className="border-2 border-red-500 border-dashed rounded-lg p-2"
                    >
                      <FaTrash size={20} color="red" />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-4 text-center text-gray-500">
                Your cart is empty.
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
          />
          <button
            className="w-full p-2 bg-black text-white rounded"
            disabled={cartItems.length === 0}
          >
            Apply
          </button>

          <div className="mt-6">
            <div className="flex justify-between mb-2">
              <p>Cart Subtotal</p>
              <p>₹{cartItems.length === 0 ? "0.00" : cartTotal.toFixed(2)}</p>
            </div>
            <div className="flex justify-between mb-2">
              <p>Discount</p>
              <p>−₹{cartItems.length === 0 ? "0.00" : "4.00"}</p>
            </div>
            <div className="flex justify-between text-lg font-semibold">
              <p>Cart Total</p>
              <p>
                ₹{cartItems.length === 0 ? "0.00" : (cartTotal - 4).toFixed(2)}
              </p>
            </div>
            <button
              className="w-full mt-4 p-2 bg-orange-400 text-white rounded"
              disabled={cartItems.length === 0}
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
