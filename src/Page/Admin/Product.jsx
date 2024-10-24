import { useCallback, useContext, useState, useEffect } from "react";
import { FaTrash } from "react-icons/fa";
import toast from "react-hot-toast";
import { AppContext } from "../../App.jsx";
import {
  deleteProduct,
  getProduct,
} from "../../Services/Operations/ProductServices.js";
import EditProduct from "./EditProduct.jsx";
import { tailChase } from "ldrs";
import { Typography } from "@mui/material";

const Product = () => {
  const Appcontext = useContext(AppContext);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  tailChase.register();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const productData = await getProduct();
      setProducts(productData.data.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  };

  const handleProductUpdate = (updatedProducts) => {
    setProducts(updatedProducts);
  };

  const deleteProductHandler = useCallback(
    async (id) => {
      await toast.promise(
        deleteProduct(id),
        {
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
        },
        {
          position: "bottom-right", // Set toast position here
        },
        {
          style: {
            fontFamily: "'dm-sans', sans-serif",
            fontSize: "14px",
            fontWeight: "400",
            lineHeight: "1.5",
          },
        }
      );
    },
    [Appcontext.setGetdata]
  );

  console.log(products);

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen relative overflow-hidden">
        <l-tail-chase
          size="60"
          speed="2"
          color="rgb(6,68,59)"
          className="w-1/6 sm:w-1/12 md:w-1/10 lg:w-1/10 xl:w-1/20 2xl:w-1/24"
        ></l-tail-chase>
      </div>
    );
  }

  return (
    <div className="w-full h-full p-2 sm:p-4 md:p-6 bg-gray-100 font-dm-sans">
      <Typography
        variant="h4"
        className="font-bold text-bg-green text-2xl sm:text-3xl mb-2 sm:mb-0"
      >
        Products
      </Typography>

      <div className="grid grid-cols-1 gap-4 sm:gap-6">
        <div className="col-span-1">
          <div className="p-3 sm:p-4 md:p-6 bg-white border-2 border-gray-200 rounded-md">
            <div className="hidden sm:grid grid-cols-12 gap-2 mb-4 p-2 sm:p-4 bg-gray-100 rounded-md">
              <div className="col-span-5 text-left">
                <h3 className="font-semibold">Product</h3>
              </div>
              <div className="col-span-2 text-center">
                <h3 className="font-semibold">Price</h3>
              </div>
              <div className="col-span-2 text-center">
                <h3 className="font-semibold">Size</h3>
              </div>
              <div className="col-span-3 text-center">
                <h3 className="font-semibold">Actions</h3>
              </div>
            </div>

            {products.length > 0 ? (
              products.map((product) => (
                <div
                  key={product.product_id}
                  className="flex flex-col sm:grid sm:grid-cols-12 gap-4 items-center mb-6 p-3 sm:p-4 bg-white rounded-md shadow-sm"
                >
                  <div className="w-full sm:col-span-5 flex items-center">
                    <img
                      src={product.images[0] || "default-image-url"}
                      alt={product.product_name}
                      className="w-20 sm:w-24 h-20 sm:h-24 object-cover rounded-md"
                    />
                    <div className="ml-3 sm:ml-4">
                      <h3 className="font-semibold text-base sm:text-lg">
                        {product.product_name}
                      </h3>
                      <p className="text-gray-500 text-sm">
                        Brand: {product.brand_name}
                      </p>
                      <p className="text-gray-500 text-sm">
                        Product ID: {product.product_id}
                      </p>
                    </div>
                  </div>
                  <div className="w-full sm:col-span-7 flex justify-between sm:justify-around items-center mt-3 sm:mt-0">
                    <div className="text-center">
                      <p className="text-base sm:text-lg font-semibold">
                        ₹{product.sale_price}
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-base sm:text-lg font-semibold">
                        {product.size}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <EditProduct
                        id={product.product_id}
                        onProductUpdate={handleProductUpdate}
                      />
                      <button
                        onClick={() => deleteProductHandler(product.product_id)}
                        className="border-2 border-red-500 border-dashed rounded-lg p-2"
                      >
                        <FaTrash
                          className="w-4 h-4 sm:w-5 sm:h-5"
                          color="red"
                        />
                      </button>
                    </div>
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
