import { useState, useEffect } from "react";
import {
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { ring2 } from "ldrs";
import { toast } from "react-hot-toast";
import defaultImage from "../../assets/photo11.jpg";
import { GetOrders, UpdateOrderStatus } from "../../Services/Operations/Auth";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("ALL");
  const [expandedOrder, setExpandedOrder] = useState(null);

  ring2.register();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await GetOrders();
      if (response.success) {
        setOrders(response.data);
      } else {
        toast.error("Failed to fetch orders", {
          position: "bottom-right",
        });
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("An error occurred while fetching orders", {
        position: "bottom-right",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    toast.promise(
      UpdateOrderStatus({ order_id: orderId, order_status: newStatus }),
      {
        loading: "Updating order status...",
        success: (response) => {
          if (response.data.success) {
            setOrders(
              orders.map((order) =>
                order.order_id === orderId
                  ? { ...order, order_status: newStatus }
                  : order
              )
            );
            return "Order status updated successfully";
          } else {
            throw new Error(
              response.data.message || "Failed to update order status"
            );
          }
        },
        error: (error) => {
          console.error("Error updating order status:", error);
          return (
            error.message || "An error occurred while updating order status"
          );
        },
      },
      { position: "bottom-right" }
    );
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "PROCESSING":
        return "bg-yellow-100 text-yellow-800";
      case "PENDING":
        return "bg-blue-100 text-blue-800";
      case "CANCELLED":
        return "bg-red-100 text-red-800";
      case "DELIVERED":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const toggleOrderDetails = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  const filteredOrders =
    filter === "ALL"
      ? orders
      : orders.filter((order) => order.order_status === filter);

  const calculateTotalAmount = (orderItems) => {
    return orderItems.reduce((total, item) => {
      return total + parseFloat(item.product_details.price) * item.quantity;
    }, 0);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
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
    <div className="w-full h-full p-2 sm:p-4 md:p-6 rounded-lg bg-gray-100 font-dm-sans">
      <Typography
        variant="h4"
        className="font-bold text-bg-green text-2xl sm:text-3xl mb-4"
      >
        Orders
      </Typography>

      <div className="my-4 flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <FormControl
          variant="outlined"
          className="w-full sm:w-1/4 mb-4 sm:mb-0"
        >
          <InputLabel style={{ color: "green" }}>Filter by Status</InputLabel>
          <Select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            label="Filter by Status"
            style={{ color: "green", borderColor: "green" }}
          >
            <MenuItem value="ALL">All Orders</MenuItem>
            <MenuItem value="PENDING">Pending</MenuItem>
            <MenuItem value="PROCESSING">Processing</MenuItem>
            <MenuItem value="DELIVERED">Delivered</MenuItem>
            <MenuItem value="CANCELLED">Cancelled</MenuItem>
          </Select>
        </FormControl>
      </div>

      <div className="overflow-x-auto">
        {filteredOrders.length > 0 ? (
          <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
            <thead className="bg-bg-green text-white">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider">
                  #
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider">
                  Order ID
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredOrders.map((order, index) => (
                <>
                  <tr key={order.order_id}>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-bg-green">
                        {index + 1}
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-bg-green">
                        {order.order_id}
                      </div>
                      <div className="text-sm text-gray-500">
                        {new Date(order.created_at).toLocaleDateString()} -{" "}
                        {new Date(order.created_at).toLocaleTimeString()}
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 sm:h-12 sm:w-12">
                          <img
                            className="h-full w-full rounded-full object-cover"
                            src={
                              order.order_items[0]?.product_details.image_url ||
                              defaultImage
                            }
                            alt=""
                          />
                        </div>
                        <div className="ml-4 max-w-xs sm:max-w-sm md:max-w-md">
                          <div className="text-sm font-medium text-bg-green">
                            {order.order_items
                              .slice(0, 3)
                              .map((item, index) => (
                                <div key={index} className="truncate">
                                  {item.product_details.name},
                                </div>
                              ))}
                            {order.order_items.length > 3 && (
                              <div className="text-gray-500">
                                +{order.order_items.length - 3} more
                              </div>
                            )}
                          </div>
                          <div className="text-sm text-gray-500 mt-1">
                            {order.email || "N/A"}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-bg-green">
                      ₹ {calculateTotalAmount(order.order_items).toFixed(2)}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <Select
                        value={order.order_status}
                        onChange={(e) =>
                          handleStatusChange(order.order_id, e.target.value)
                        }
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                          order.order_status
                        )}`}
                        sx={{
                          borderRadius: "9999px",
                          ".MuiOutlinedInput-notchedOutline": {
                            border: "none",
                          },
                          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                            border: "none",
                          },
                          "&:hover .MuiOutlinedInput-notchedOutline": {
                            border: "none",
                          },
                          ".MuiSelect-select": { py: 1 },
                        }}
                      >
                        <MenuItem value="PENDING">Pending</MenuItem>
                        <MenuItem value="PROCESSING">Processing</MenuItem>
                        <MenuItem value="DELIVERED">Delivered</MenuItem>
                        <MenuItem value="CANCELLED">Cancelled</MenuItem>
                      </Select>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded transition-colors duration-200"
                        onClick={() => toggleOrderDetails(order.order_id)}
                      >
                        {expandedOrder === order.order_id
                          ? "Hide details"
                          : "See details"}
                      </button>
                    </td>
                  </tr>
                  {expandedOrder === order.order_id && (
                    <tr>
                      <td colSpan="6" className="px-4 py-4 w-inherit">
                        <div className="bg-gray-50 p-4 rounded-md w-full">
                          <h4 className="font-bold mb-2">Order Details</h4>
                          <table className="min-w-full bg-white border border-gray-200">
                            <thead>
                              <tr className="bg-gray-100">
                                <th className="px-4 py-2 text-left">Product</th>
                                <th className="px-4 py-2 text-left">Size</th>
                                <th className="px-4 py-2 text-left">Price</th>
                                <th className="px-4 py-2 text-left">
                                  Quantity
                                </th>
                                <th className="px-4 py-2 text-left">Total</th>
                              </tr>
                            </thead>
                            <tbody>
                              {order.order_items.map((item, itemIndex) => (
                                <tr
                                  key={itemIndex}
                                  className="border-t border-gray-200"
                                >
                                  <td className="px-4 py-2">
                                    <div className="flex items-center">
                                      <img
                                        src={
                                          item.product_details.image_url ||
                                          defaultImage
                                        }
                                        alt={item.product_details.name}
                                        className="w-10 h-10 object-cover mr-2"
                                      />
                                      {item.product_details.name}
                                    </div>
                                  </td>
                                  <td className="px-4 py-2">{item.size}</td>
                                  <td className="px-4 py-2 text-bg-green">
                                    ₹
                                    {parseFloat(
                                      item.product_details.price
                                    ).toFixed(2)}
                                  </td>
                                  <td className="px-4 py-2">{item.quantity}</td>
                                  <td className="px-4 py-2">
                                    ₹
                                    {(
                                      parseFloat(item.product_details.price) *
                                      item.quantity
                                    ).toFixed(2)}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                            <tfoot>
                              <tr className="border-t border-gray-200 font-bold">
                                <td
                                  colSpan="4"
                                  className="px-4 py-2 text-right"
                                >
                                  Total:
                                </td>
                                <td className="px-4 py-2">
                                  ₹
                                  {calculateTotalAmount(
                                    order.order_items
                                  ).toFixed(2)}
                                </td>
                              </tr>
                            </tfoot>
                          </table>
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="flex justify-center items-center bg-white rounded-lg p-4">
            <Typography variant="h6" className="text-bg-green">
              No orders found
            </Typography>
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
