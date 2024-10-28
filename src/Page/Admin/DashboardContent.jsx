/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import React, { useState, useEffect } from "react";
import { fetchDashboardData } from "../../Services/MockApi";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import defaultImage from "../../assets/photo11.jpg";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import InventoryIcon from "@mui/icons-material/Inventory";
import ReceiptIcon from "@mui/icons-material/Receipt";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import Collapse from "@mui/material/Collapse";
import CommonTable from "../../Components/CommonTable/CommonTable";
import { styled } from "@mui/material/styles";
import { ring2 } from "ldrs";
import { getDashboardData } from "../../Services/Operations/ProductServices";
import { UpdateOrderStatus } from "../../Services/Operations/Auth";
import { toast } from "react-hot-toast";
const BorderedCard = styled(Card)({
  boxShadow: "none",
  border: "1px solid #e0e0e0", // Light gray border
  borderRadius: "8px",
});

const DashboardContent = () => {
  const [data, setData] = useState(null);
  const [view, setView] = useState("latestOrders");
  const [orderStatuses, setOrderStatuses] = useState({});
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await getDashboardData();
        if (response.success) {
          setData(response.data);
        } else {
          console.error("Failed to fetch dashboard data:", response.message);
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  ring2.register();

  const handleChange = (event) => {
    setView(event.target.value);
  };

  const handleStatusChange = async (orderId, newStatus) => {
    toast.promise(
      UpdateOrderStatus({
        order_id: orderId,
        order_status: newStatus,
      }),
      {
        loading: "Updating order status...",
        success: (response) => {
          if (response.data.success) {
            setOrderStatuses((prev) => ({
              ...prev,
              [orderId]: newStatus,
            }));
            setData((prevData) => ({
              ...prevData,
              latestOrders: prevData.latestOrders.map((order) =>
                order.order_id === orderId
                  ? { ...order, order_status: newStatus }
                  : order
              ),
            }));
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
        return "bg-green-100 text-green-800";
      case "CANCELLED":
        return "bg-red-100 text-red-800";
      case "DELIVERED":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const toggleOrderDetails = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  const getSummaryData = () => {
    if (!data) return { title: "Loading...", count: 0, earnings: 0 };

    switch (view) {
      case "latestOrders":
        return {
          title: "Latest Orders",
          count: data.latestOrders.length,
          earnings: parseFloat(data.totalEarnings),
        };
      case "todayOrders":
        return {
          title: "Today's Orders",
          count: data.todayOrders,
          earnings: parseFloat(data.totalEarnings),
        };
      case "totalOrders":
        return {
          title: "Total Orders",
          count: data.totalOrders,
          earnings: parseFloat(data.totalEarnings),
        };
      default:
        return { title: "Overview", count: 0, earnings: 0 };
    }
  };

  const formatToIST = (utcDateString) => {
    try {
      // Create a date object from the UTC string
      const date = new Date(utcDateString);

      // Add 5 hours and 30 minutes for IST conversion
      const istDate = new Date(date.getTime() + 5.5 * 60 * 60 * 1000);

      return istDate.toLocaleString("en-IN", {
        timeZone: "Asia/Kolkata",
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
    } catch (error) {
      console.error("Error formatting date:", error);
      return utcDateString; // Return original string if formatting fails
    }
  };

  const summaryData = getSummaryData();

  const renderRow = (order, index) => (
    <React.Fragment key={order.order_id}>
      <tr>
        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
          {index + 1}
        </td>
        <td className="px-4 py-4 whitespace-nowrap">
          <div className="text-sm font-medium text-bg-green">
            {order.order_id}
          </div>
          <div className="text-sm text-gray-500">
            {formatToIST(order.created_at)}
          </div>
        </td>
        <td className="px-4 py-4 whitespace-nowrap">
          <div className="flex items-center">
            <div className="flex-shrink-0 h-10 w-10">
              <img
                className="h-10 w-10 rounded-full object-cover"
                src={
                  order.order_items[0]?.product_details.image_url ||
                  defaultImage
                }
                alt=""
              />
            </div>
            <div className="ml-4">
              <div className="text-sm font-medium text-bg-green">
                {order.order_items.map((item, index) => (
                  <p key={index}>{item.product_details.name}</p>
                ))}
              </div>
              <div className="text-sm text-gray-500">{order.email}</div>
            </div>
          </div>
        </td>
        <td className="px-4 py-4 whitespace-nowrap text-sm text-bg-green">
          ₹{" "}
          {order.order_items
            .reduce(
              (total, item) =>
                total + parseFloat(item.product_details.price) * item.quantity,
              0
            )
            .toFixed(2)}
        </td>
        <td className="px-4 py-4 whitespace-nowrap">
          <Select
            value={orderStatuses[order.order_id] || order.order_status}
            onChange={(e) => handleStatusChange(order.order_id, e.target.value)}
            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
              orderStatuses[order.order_id] || order.order_status
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
              ".MuiSelect-select": { py: 1 }, // Adjust y-axis padding here
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
            {expandedOrder === order.order_id ? "Hide details" : "See details"}
          </button>
        </td>
      </tr>
      {expandedOrder === order.order_id && (
        <tr>
          <td colSpan="6" className="px-4 py-4">
            <div className="bg-gray-50 p-4 rounded-md">
              <h4 className="font-bold mb-2">Order Details</h4>
              <table className="min-w-full bg-white border border-gray-200">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="px-4 py-2 text-left">Product</th>
                    <th className="px-4 py-2 text-left">Size</th>
                    <th className="px-4 py-2 text-left">Price</th>
                    <th className="px-4 py-2 text-left">Quantity</th>
                    <th className="px-4 py-2 text-left">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {order.order_items.map((item, itemIndex) => (
                    <tr key={itemIndex} className="border-t border-gray-200">
                      <td className="px-4 py-2">
                        <div className="flex items-center">
                          <img
                            src={item.product_details.image_url || defaultImage}
                            alt={item.product_details.name}
                            className="w-10 h-10 object-cover mr-2"
                          />
                          {item.product_details.name}
                        </div>
                      </td>
                      <td className="px-4 py-2">{item.size}</td>
                      <td className="px-4 py-2 text-bg-green">
                        ₹{parseFloat(item.product_details.price).toFixed(2)}
                      </td>
                      <td className="px-4 py-2">{item.quantity}</td>
                      <td className="px-4 py-2">
                        ₹
                        {(
                          parseFloat(item.product_details.price) * item.quantity
                        ).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="border-t border-gray-200 font-bold">
                    <td colSpan="4" className="px-4 py-2 text-right">
                      Total:
                    </td>
                    <td className="px-4 py-2">
                      ₹
                      {order.order_items
                        .reduce(
                          (total, item) =>
                            total +
                            parseFloat(item.product_details.price) *
                              item.quantity,
                          0
                        )
                        .toFixed(2)}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </td>
        </tr>
      )}
    </React.Fragment>
  );

  const renderHeader = () => (
    <thead>
      <tr className="bg-bg-green text-white">
        <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider">
          #
        </th>
        <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider">
          Order ID
        </th>
        <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider">
          Product
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
  );
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
    <Box className="p-2 sm:p-4 md:p-6 font-dm-sans bg-gray-100">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4 sm:gap-0">
        <Typography
          variant="h4"
          className="font-bold text-bg-green text-2xl sm:text-3xl mb-2 sm:mb-0"
        >
          Dashboard Overview
        </Typography>
        <div className="hidden ">
          <FormControl
            variant="outlined"
            className="w-full sm:w-1/2 md:w-1/4 hidden"
          >
            <InputLabel style={{ color: "green" }}>View</InputLabel>
            <Select
              value={view}
              onChange={handleChange}
              label="View"
              style={{ color: "green", borderColor: "green" }}
            >
              <MenuItem value="latestOrders">Latest 5 Orders</MenuItem>
              <MenuItem value="todayOrders">Today's Orders</MenuItem>
              <MenuItem value="totalOrders">Total Orders</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>
      <Grid container spacing={3} className="mb-6">
        {[
          {
            icon: InventoryIcon,
            title: "Products",
            value: data?.totalProducts || 0,
          },
          {
            icon: ShoppingCartIcon,
            title: "Today Orders",
            value: data?.todayOrders || 0,
          },
          {
            icon: ReceiptIcon,
            title: "Total Orders",
            value: data?.totalOrders || 0,
          },
          {
            icon: MonetizationOnIcon,
            title: "Total Earning",
            value: `₹ ${parseFloat(data?.totalEarnings || 0).toFixed(2)}`,
          },
        ].map((item, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <BorderedCard>
              <CardContent className="flex items-center p-4">
                <item.icon
                  fontSize="48"
                  className="text-green-600 bg-green-100 rounded-full text-4xl sm:text-5xl mr-4 p-2 sm:p-3"
                />
                <div>
                  <Typography
                    variant="h6"
                    className="font-bold text-gray-600 text-sm sm:text-base"
                    sx={{
                      fontFamily: "montserrat",
                      fontWeight: "bold",
                    }}
                  >
                    {item.title}
                  </Typography>
                  <Typography
                    variant="h5"
                    className="text-green-600 text-sm sm:text-sm font-bold"
                  >
                    {item.value}
                  </Typography>
                </div>
              </CardContent>
            </BorderedCard>
          </Grid>
        ))}
      </Grid>
      <Grid item xs={12}>
        <BorderedCard>
          <CardContent>
            <Typography variant="h6" className="font-bold mb-4 text-green-600">
              {view === "latestOrders" ? "Latest Orders" : "Today's Orders"}
            </Typography>
            {view === "latestOrders" && (
              <div className="overflow-x-auto">
                <CommonTable
                  data={data?.latestOrders || []}
                  renderHeader={renderHeader}
                  renderRow={renderRow}
                />
              </div>
            )}
          </CardContent>
        </BorderedCard>
      </Grid>
    </Box>
  );
};

export default DashboardContent;
