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

const DashboardContent = () => {
  const [data, setData] = useState(null);
  const [view, setView] = useState("latestOrders");
  const [orderStatuses, setOrderStatuses] = useState({});
  const [expandedOrder, setExpandedOrder] = useState(null);

  useEffect(() => {
    setData(fetchDashboardData());
  }, []);

  const handleChange = (event) => {
    setView(event.target.value);
  };

  const handleStatusChange = (orderId, newStatus) => {
    setOrderStatuses((prev) => ({
      ...prev,
      [orderId]: newStatus,
    }));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Processing":
        return "bg-yellow-100 text-yellow-800";
      case "Accepted":
        return "bg-green-100 text-green-800";
      case "Cancelled":
        return "bg-red-100 text-red-800";
      case "Shipped":
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
          title: "Latest 5 Orders",
          count: data.latestOrders.length,
          earnings: data.latestOrders.reduce(
            (acc, order) => acc + order.amount,
            0
          ),
        };
      case "todayOrders":
        return {
          title: "Today's Orders",
          count: data.todayOrders,
          earnings: data.latestOrders
            .filter(
              (order) => order.date === new Date().toISOString().split("T")[0]
            )
            .reduce((acc, order) => acc + order.amount, 0),
        };
      case "totalOrders":
        return {
          title: "Total Orders",
          count: data.totalOrders,
          earnings: data.totalEarnings,
        };
      default:
        return { title: "Overview", count: 0, earnings: 0 };
    }
  };

  const summaryData = getSummaryData();

  const renderRow = (order, index) => (
    <React.Fragment key={order.id}>
      <tr>
        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
          {index + 1}
        </td>
        <td className="px-4 py-4 whitespace-nowrap">
          <div className="text-sm font-medium text-bg-green">{`SC${order.date.replace(
            /-/g,
            "/"
          )}/000${order.id}`}</div>
          <div className="text-sm text-gray-500">
            {order.date} - {order.time}
          </div>
        </td>
        <td className="px-4 py-4 whitespace-nowrap">
          <div className="flex items-center">
            <div className="flex-shrink-0 h-10 w-10">
              <img
                className="h-10 w-10 rounded-full object-cover"
                src={defaultImage}
                alt=""
              />
            </div>
            <div className="ml-4">
              <div className="text-sm font-medium text-bg-green">
                {order?.items?.map((item, index) => (
                  <p key={index}>{item.name}</p>
                ))}
              </div>
              <div className="text-sm text-gray-500">{order.email}</div>
            </div>
          </div>
        </td>
        <td className="px-4 py-4 whitespace-nowrap text-sm text-bg-green">
          ₹ {order.amount}
        </td>
        <td className="px-4 py-4 whitespace-nowrap">
          <Select
            value={orderStatuses[order.id] || "Processing"}
            onChange={(e) => handleStatusChange(order.id, e.target.value)}
            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
              orderStatuses[order.id] || "Processing"
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
            <MenuItem value="Processing">Processing</MenuItem>
            <MenuItem value="Accepted">Accepted</MenuItem>
            <MenuItem value="Cancelled">Cancelled</MenuItem>
            <MenuItem value="Shipped">Shipped</MenuItem>
          </Select>
        </td>
        <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
          <button
            className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded transition-colors duration-200"
            onClick={() => toggleOrderDetails(order.id)}
          >
            {expandedOrder === order.id ? "Hide details" : "See details"}
          </button>
        </td>
      </tr>
      <tr>
        <td colSpan="6" className="px-4 py-4">
          <Collapse in={expandedOrder === order.id}>
            <div className="bg-gray-50 p-4 rounded-md">
              <h4 className="font-bold mb-2">Order Details</h4>
              <table className="min-w-full bg-white border border-gray-200">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="px-4 py-2 text-left">Product</th>
                    <th className="px-4 py-2 text-left">SKU</th>
                    <th className="px-4 py-2 text-left">Price</th>
                    <th className="px-4 py-2 text-left">Quantity</th>
                    <th className="px-4 py-2 text-left">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {order.items &&
                    order.items.map((item, itemIndex) => (
                      <tr key={itemIndex} className="border-t border-gray-200">
                        <td className="px-4 py-2">
                          <div className="flex items-center">
                            <img
                              src={defaultImage}
                              alt={item.name}
                              className="w-10 h-10 object-cover mr-2"
                            />
                            {item.name}
                          </div>
                        </td>
                        <td className="px-4 py-2">{item.sku}</td>
                        <td className="px-4 py-2 text-bg-green">
                          ₹{item.price}
                        </td>
                        <td className="px-4 py-2">{item.quantity}</td>
                        <td className="px-4 py-2">
                          ₹{item.price * item.quantity}
                        </td>
                      </tr>
                    ))}
                </tbody>
                <tfoot>
                  <tr className="border-t border-gray-200 font-bold">
                    <td colSpan="4" className="px-4 py-2 text-right">
                      Total:
                    </td>
                    <td className="px-4 py-2">₹{order.amount}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </Collapse>
        </td>
      </tr>
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

  if (!data) return <div>Loading...</div>;

  return (
    <Box className="p-2 sm:p-4 md:p-6 font-dm-sans">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4 sm:gap-0">
        <Typography
          variant="h4"
          className="font-bold text-green-600 text-2xl sm:text-3xl mb-2 sm:mb-0"
        >
          Dashboard Overview
        </Typography>
        <FormControl variant="outlined" className="w-full sm:w-1/2 md:w-1/4">
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
      <Grid container spacing={3} className="mb-6">
        <Grid item xs={12} sm={6} md={3}>
          <Card className="bg-white shadow-lg">
            <CardContent className="flex items-center p-4">
              <InventoryIcon
                fontSize="48"
                className="text-green-600 bg-green-100 rounded-full text-4xl sm:text-5xl mr-4 p-2 sm:p-3"
              />
              <div>
                <Typography
                  variant="h6"
                  className="font-bold text-gray-600 text-sm sm:text-base"
                >
                  Products
                </Typography>
                <Typography
                  variant="h4"
                  className="text-green-600 text-xl sm:text-2xl font-bold"
                >
                  {data?.products || 0}
                </Typography>
              </div>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card className="bg-white shadow-lg">
            <CardContent className="flex items-center p-4">
              <ShoppingCartIcon
                fontSize="48"
                className="text-green-600 bg-green-100 rounded-full text-4xl sm:text-5xl mr-4 p-2 sm:p-3"
              />
              <div>
                <Typography
                  variant="h6"
                  className="font-bold text-gray-600 text-sm sm:text-base"
                >
                  Today Orders
                </Typography>
                <Typography
                  variant="h4"
                  className="text-green-600 text-xl sm:text-2xl font-bold"
                >
                  {data?.todayOrders || 0}
                </Typography>
              </div>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card className="bg-white shadow-lg">
            <CardContent className="flex items-center p-4">
              <ReceiptIcon
                fontSize="48"
                className="text-green-600 bg-green-100 rounded-full text-4xl sm:text-5xl mr-4 p-2 sm:p-3"
              />
              <div>
                <Typography
                  variant="h6"
                  className="font-bold text-gray-600 text-sm sm:text-base"
                >
                  Total Orders
                </Typography>
                <Typography
                  variant="h4"
                  className="text-green-600 text-xl sm:text-2xl font-bold"
                >
                  {data?.totalOrders || 0}
                </Typography>
              </div>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card className="bg-white shadow-lg">
            <CardContent className="flex items-center p-4">
              <MonetizationOnIcon
                fontSize="48"
                className="text-green-600 bg-green-100 rounded-full text-4xl sm:text-5xl mr-4 p-2 sm:p-3"
              />
              <div>
                <Typography
                  variant="h6"
                  className="font-bold text-gray-600 text-sm sm:text-base"
                >
                  Total Earning
                </Typography>
                <Typography
                  variant="h4"
                  className="text-green-600 text-xl sm:text-2xl font-bold"
                >
                  ₹ {data?.totalEarnings || 0}
                </Typography>
              </div>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Card className="bg-white shadow-lg">
          <CardContent>
            <Typography variant="h6" className="font-bold mb-4 text-green-600">
              {summaryData.title}
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
        </Card>
      </Grid>
    </Box>
  );
};

export default DashboardContent;
