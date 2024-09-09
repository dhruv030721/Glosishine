import React, { useCallback, useContext } from "react";
import { FaTrash } from "react-icons/fa";
import toast from "react-hot-toast";
import { AppContext } from "../../App.jsx";
import EditProduct from "./EditProduct.jsx";

const Product = () => {
  const Appcontext = useContext(AppContext);

  const deleteProductHandler = useCallback(
    async (id) => {
      await toast.promise(deleteProduct(id), {
        loading: "Processing....",
        success: (response) => {
          Appcontext.setGetdata((product) =>
            product.filter((product) => product.product_id !== id)
          );
          return `${response.data.message}`;
        },
        error: (error) => {
          return `${error.response.data.message}`;
        },
      });
    },
    [Appcontext.setGetdata]
  );

  return (
    <div className="w-full h-full p-6 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Products</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-3">
          <div className="p-6 bg-white shadow-lg rounded-md">
            <div className="flex justify-between items-center mb-4 p-4 bg-gray-100 rounded-md">
              <div className="flex-1 text-left">
                <h3 className="font-semibold">Product</h3>
              </div>
              <div className="w-1/5 text-center">
                <h3 className="font-semibold">Price</h3>
              </div>
              <div className="w-1/5 text-center">
                <h3 className="font-semibold">Size</h3>
              </div>
              <div className="w-1/7 text-center">
                <h3 className="font-semibold">Actions</h3>
              </div>
            </div>

            {Appcontext.getdata.length > 0 ? (
              Appcontext.getdata.map((product) => (
                <div
                  key={product.product_id}
                  className="flex justify-between items-center mb-6 p-4 bg-white rounded-md h-auto flex-wrap md:flex-nowrap"
                >
                  <div className="flex-1 flex items-center text-left">
                    <img
                      src={product.images[0] || "default-image-url"} // Replace with a default image URL
                      alt={product.product_name}
                      className="w-24 object-cover rounded-md h-full"
                    />
                    <div className="ml-4">
                      <h3 className="font-semibold text-base md:text-lg">
                        {product.product_name}
                      </h3>
                      <p className="text-gray-500 text-sm md:text-base">
                        Brand: {product.brand_name}
                      </p>
                      <p className="text-gray-500 text-sm md:text-base">
                        Product ID: {product.product_id}
                      </p>
                    </div>
                  </div>
                  <div className="w-1/5 text-center mt-4 md:mt-0">
                    <p className="text-lg font-semibold">
                      ₹{product.sale_price}
                    </p>
                  </div>
                  <div className="w-1/5 text-center mt-4 md:mt-0">
                    <p className="text-lg font-semibold">{product.size}</p>
                  </div>
                  <div className="text-center mt-4 md:mt-0">
                    <EditProduct id={product.product_id} />
                    <button
                      onClick={() => deleteProductHandler(product.product_id)}
                      className="border-2 border-red-500 border-dashed rounded-lg p-2 ml-2"
                    >
                      <FaTrash size={20} color="red" />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-4 text-center text-gray-500">
                No products found.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
