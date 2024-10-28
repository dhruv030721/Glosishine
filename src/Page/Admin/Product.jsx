/* eslint-disable no-unused-vars */
import { useCallback, useContext, useState, useEffect } from "react";
import { FaTrash } from "react-icons/fa";
import toast from "react-hot-toast";
import { AppContext } from "../../App.jsx";
import {
  deleteProduct,
  getProduct,
  getNewDropProduct,
  updateNewDropStatus,
} from "../../Services/Operations/ProductServices.js";
import EditProduct from "./EditProduct.jsx";
import { ring2 } from "ldrs";
import { Typography, Switch } from "@mui/material";
import CommonTable from "../../Components/CommonTable/CommonTable.jsx";

const Product = () => {
  const Appcontext = useContext(AppContext);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newDropProducts, setNewDropProducts] = useState({});

  ring2.register();

  useEffect(() => {
    fetchProducts();
    fetchNewDropProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const productData = await getProduct();
      setProducts(productData.data.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchNewDropProducts = async () => {
    try {
      const newDropData = await getNewDropProduct();
      const newDropMap = {};
      newDropData.data.data.forEach((product) => {
        newDropMap[product.product_id] = product.new_drops === 1;
      });
      setNewDropProducts(newDropMap);
    } catch (error) {
      console.error("Error fetching new drop products:", error);
    }
  };

  const handleProductUpdate = (updatedProducts) => {
    setProducts(updatedProducts);
  };

  const handleNewDropToggle = async (productId, currentStatus) => {
    const newStatus = !currentStatus;
    try {
      await updateNewDropStatus(productId, newStatus.toString());
      setNewDropProducts((prev) => ({ ...prev, [productId]: newStatus }));
      toast.success(`New Drop status updated for product ${productId}`, {
        style: {
          backgroundColor: "#064C3A",
          color: "#FFFFFF",
          fontFamily: "signika",
        },
        position: "bottom-right",
      });
    } catch (error) {
      console.error("Error updating new drop status:", error);
      toast.error("Failed to update New Drop status", {
        style: {
          backgroundColor: "#064C3A",
          color: "#FFFFFF",
          fontFamily: "signika",
        },
        position: "bottom-right",
      });
    }
  };

  const deleteProductHandler = useCallback(async (id) => {
    await toast.promise(
      deleteProduct(id),
      {
        loading: "Processing....",
        success: (response) => {
          setProducts((prevProducts) =>
            prevProducts.filter((product) => product.product_id !== id)
          );
          return `${response.data.message}`;
        },
        error: (error) => {
          return `${error.response.data.message}`;
        },
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
  }, []);

  const renderHeader = () => (
    <thead className="w-full">
      <tr className="bg-bg-green text-white">
        <th className="px-2 sm:px-4 py-2 text-left text-xs font-medium uppercase tracking-wider">
          #
        </th>
        <th className="px-2 sm:px-4 py-2 text-left text-xs font-medium uppercase tracking-wider">
          Product
        </th>
        <th className="px-2 sm:px-4 py-2 text-center text-xs font-medium uppercase tracking-wider hidden sm:table-cell">
          Price
        </th>
        <th className="px-2 sm:px-4 py-2 text-center text-xs font-medium uppercase tracking-wider hidden md:table-cell">
          Size
        </th>
        <th className="px-2 sm:px-4 py-2 text-center text-xs font-medium uppercase tracking-wider">
          New Drop
        </th>
        <th className="px-2 sm:px-4 py-2 text-center text-xs font-medium uppercase tracking-wider">
          Action
        </th>
      </tr>
    </thead>
  );

  const renderRow = (product, index) => (
    <tr
      key={product.product_id}
      className="border-t border-gray-200 text-bg-green"
    >
      <td className="px-2 sm:px-4 py-4">
        <div className="text-sm font-medium text-bg-green">{index + 1}</div>
      </td>
      <td className="px-2 sm:px-4 py-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center">
          <img
            src={product.images[0] || "default-image-url"}
            alt={product.product_name}
            className="w-16 h-16 sm:w-28 sm:h-full object-cover rounded-md mr-0 sm:mr-4 mb-2 sm:mb-0"
          />
          <div>
            <h3 className="font-semibold text-sm sm:text-base">
              {product.product_name}
            </h3>
            <p className="text-gray-500 text-xs sm:text-sm">
              Brand: {product.brand_name}
            </p>
            <p className="text-gray-500 text-xs sm:text-sm">
              Product ID: {product.product_id}
            </p>
            <p className="text-gray-500 text-xs sm:text-sm sm:hidden">
              Price: ₹{product.sale_price}
            </p>
            <p className="text-gray-500 text-xs sm:text-sm md:hidden">
              Size: {product.size}
            </p>
          </div>
        </div>
      </td>
      <td className="px-2 sm:px-4 py-4 text-center hidden sm:table-cell">
        ₹{product.sale_price}
      </td>
      <td className="px-2 sm:px-4 py-4 text-center hidden md:table-cell">
        {product.size}
      </td>
      <td className="px-2 sm:px-4 py-4 text-center">
        <Switch
          checked={newDropProducts[product.product_id] || false}
          onChange={() =>
            handleNewDropToggle(
              product.product_id,
              newDropProducts[product.product_id]
            )
          }
          color="success"
        />
      </td>
      <td className="px-2 sm:px-4 py-4 text-center">
        <div className="flex justify-center gap-2">
          <EditProduct
            id={product.product_id}
            onProductUpdate={handleProductUpdate}
          />
          <button
            onClick={() => deleteProductHandler(product.product_id)}
            className="border-2 border-red-500 border-dashed rounded-lg p-2"
          >
            <FaTrash className="w-3 h-3 sm:w-4 sm:h-4" color="red" />
          </button>
        </div>
      </td>
    </tr>
  );

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen relative overflow-hidden">
        <l-ring-2
          size="40"
          speed="0.5"
          color="rgb(6,68,59)"
          className="w-1/6 sm:w-1/12 md:w-1/10 lg:w-1/10 xl:w-1/20 2xl:w-1/24"
        ></l-ring-2>
      </div>
    );
  }

  return (
    <div className="w-full h-full p-2 sm:p-4 md:p-6 bg-gray-100 font-signika">
      <Typography
        variant="h4"
        className="font-bold text-bg-green text-xl sm:text-2xl md:text-3xl mb-4"
      >
        Products
      </Typography>

      <div className="bg-white border-2 border-gray-200 rounded-md overflow-x-auto">
        {products.length > 0 ? (
          <CommonTable
            data={products}
            renderHeader={renderHeader}
            renderRow={renderRow}
          />
        ) : (
          <div className="p-4 text-center text-gray-500">
            No products found.
          </div>
        )}
      </div>
    </div>
  );
};

export default Product;
