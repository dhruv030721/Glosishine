/* eslint-disable no-unused-vars */
import { FaSpinner, FaTrash } from "react-icons/fa";
import { useContext } from "react";
import { AppContext } from "../../App";

const CartTable = ({
  cartItems,
  loadingItems,
  setLoadingItems,
  handleQuantityChange,
  handleDeleteItem,
  MAX_QUANTITY,
}) => {
  const appContext = useContext(AppContext);

  return (
    <div className="p-3 sm:p-4 md:p-6 bg-white shadow-lg rounded-md">
      {/* Header Row (hidden on mobile) */}
      <div className="hidden sm:flex justify-between items-center mb-4 p-4 bg-gray-100 rounded-md">
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
          const product = appContext.getdata.find(
            (prod) => prod.product_id === item.product_id
          );
          const salePrice = product?.sale_price || item?.sale_price;
          const discountAmount =
            ((item?.discount || 0) / 100) * item?.regular_price;
          const discountedPrice = item?.regular_price - discountAmount;
          const totalDiscountedPrice = discountedPrice * (item?.quantity || 1);

          return (
            <div
              key={item?.product_id}
              className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 p-4 bg-white rounded-md h-auto"
            >
              {loadingItems[item?.product_id] ? (
                <div className="flex-1 flex items-center justify-center">
                  <FaSpinner className="animate-spin text-4xl text-gray-400" />
                </div>
              ) : (
                <>
                  <div className="flex-1 flex items-center text-left mb-4 sm:mb-0 w-full">
                    <img
                      src={item?.image_url}
                      alt={item?.product_name}
                      className="w-20 sm:w-24 object-cover rounded-md h-full"
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
                    <div className="ml-4 flex-grow">
                      <h3 className="font-semibold text-base md:text-lg">
                        {item?.product_name}
                      </h3>
                      <p className="text-gray-500 text-sm md:text-base">
                        Size: {item?.size}
                      </p>
                      <div className="flex justify-between items-center mt-2 sm:hidden">
                        <p className="text-sm font-semibold">₹{salePrice}</p>
                        <div className="flex items-center">
                          <button
                            className="text-gray-500 border border-gray-300 rounded-l px-2 py-1"
                            onClick={() =>
                              handleQuantityChange(
                                item?.product_id,
                                -1,
                                item?.size
                              )
                            }
                            disabled={
                              item?.quantity <= 1 ||
                              loadingItems[item?.product_id]
                            }
                          >
                            -
                          </button>
                          <span className="px-2 border-t border-b border-gray-300 py-1">
                            {item?.quantity || 1}
                          </span>
                          <button
                            className="text-gray-500 border border-gray-300 rounded-r px-2 py-1"
                            onClick={() =>
                              handleQuantityChange(
                                item?.product_id,
                                1,
                                item?.size
                              )
                            }
                            disabled={
                              item?.quantity >= MAX_QUANTITY ||
                              loadingItems[item?.product_id]
                            }
                          >
                            +
                          </button>
                        </div>
                        <button
                          onClick={() => handleDeleteItem(item?.product_id)}
                          className="text-red-500"
                          disabled={loadingItems[item?.product_id]}
                        >
                          <FaTrash size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="hidden sm:flex w-full sm:w-3/5 justify-between items-center">
                    <div className="w-1/3 text-center">
                      <p className="text-sm sm:text-base font-semibold">
                        ₹{salePrice}
                      </p>
                    </div>
                    <div className="w-1/3 flex justify-center items-center px-2 py-1 rounded">
                      <button
                        className="text-gray-500 border border-gray-300 rounded-l px-2 py-1"
                        onClick={() =>
                          handleQuantityChange(item?.product_id, -1, item?.size)
                        }
                        disabled={
                          item?.quantity <= 1 || loadingItems[item?.product_id]
                        }
                      >
                        -
                      </button>
                      <span className="px-2 border-t border-b border-gray-300 py-1">
                        {item?.quantity || 1}
                      </span>
                      <button
                        className="text-gray-500 border border-gray-300 rounded-r px-2 py-1"
                        onClick={() =>
                          handleQuantityChange(item?.product_id, 1, item?.size)
                        }
                        disabled={
                          item?.quantity >= MAX_QUANTITY ||
                          loadingItems[item?.product_id]
                        }
                      >
                        +
                      </button>
                    </div>
                    <div className="w-1/3 text-center">
                      <p className="text-sm sm:text-base font-semibold text-orange-400">
                        ₹{(salePrice * item?.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                  <div className="hidden sm:block">
                    <button
                      onClick={() =>
                        handleDeleteItem(item?.product_id, item?.size)
                      }
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
  );
};

export default CartTable;
