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
          <div className="text-sm font-medium text-palette">{`SC${order.date.replace(
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
              <div className="text-sm font-medium text-palette">
                {order?.items?.map((item, index) => (
                  <p key={index}>{item.name}</p>
                ))}
              </div>
              <div className="text-sm text-gray-500">{order.email}</div>
            </div>
          </div>
        </td>
        <td className="px-4 py-4 whitespace-nowrap text-sm text-palette">
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
                        <td className="px-4 py-2 text-palette">
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
      <tr className="bg-gray-100">
        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          #
        </th>
        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Order ID
        </th>
        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Product
        </th>
        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Amount
        </th>
        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Status
        </th>
        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Action
        </th>
      </tr>
    </thead>
  );

  if (!data) return <div>Loading...</div>;

  return (
    <Box className="p-4">
      <div className="flex justify-between items-center mb-4">
        <Typography variant="h4" className="font-bold text-green-600">
          Dashboard Overview
        </Typography>
        <FormControl variant="outlined" className="w-full md:w-1/4">
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
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <Card className="bg-white shadow-lg">
            <CardContent className="flex items-center">
              <InventoryIcon className="text-green-600 bg-green-100 rounded-full text-4xl mr-4" />
              <div>
                <Typography
                  variant="h6"
                  className="font-bold text-gray-600"
                  sx={{
                    fontFamily: "montserrat",
                    fontWeight: "bold",
                    fontSize: "16px",
                  }}
                >
                  Products
                </Typography>
                <Typography
                  variant="h4"
                  className="text-green-600 px-2 rounded"
                  sx={{
                    fontFamily: "montserrat",
                    fontWeight: "bold",
                    fontSize: "22px",
                  }}
                >
                  {data.products}
                </Typography>
              </div>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card className="bg-white shadow-lg">
            <CardContent className="flex items-center">
              <ShoppingCartIcon className="text-green-600 bg-green-100 rounded-full text-4xl mr-4" />
              <div>
                <Typography
                  variant="h6"
                  className="font-bold text-gray-600"
                  sx={{
                    fontFamily: "montserrat",
                    fontWeight: "bold",
                    fontSize: "16px",
                  }}
                >
                  Today Orders
                </Typography>
                <Typography
                  variant="h4"
                  className="text-green-600 px-2 rounded"
                  sx={{
                    fontFamily: "montserrat",
                    fontWeight: "bold",
                    fontSize: "22px",
                  }}
                >
                  {data.todayOrders}
                </Typography>
              </div>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card className="bg-white shadow-lg">
            <CardContent className="flex items-center">
              <ReceiptIcon className="text-green-600 bg-green-100 rounded-full text-4xl mr-4" />
              <div>
                <Typography
                  variant="h6"
                  className="text-gray-600"
                  sx={{
                    fontFamily: "montserrat",
                    fontWeight: "bold",
                    fontSize: "16px",
                  }}
                >
                  Total Orders
                </Typography>
                <Typography
                  variant="h4"
                  className="text-green-600 px-2 rounded"
                  sx={{
                    fontFamily: "montserrat",
                    fontWeight: "bold",
                    fontSize: "22px",
                  }}
                >
                  {data.totalOrders}
                </Typography>
              </div>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card className="bg-white shadow-lg">
            <CardContent className="flex items-center">
              <MonetizationOnIcon className="bg-green-100 rounded-full text-green-600 text-4xl mr-4" />
              <div>
                <Typography
                  variant="h6"
                  className="font-bold text-gray-600"
                  sx={{
                    fontFamily: "montserrat",
                    fontWeight: "bold",
                    fontSize: "16px",
                  }}
                >
                  Total Earning
                </Typography>
                <Typography
                  variant="h4"
                  className="text-green-600 px-2 rounded"
                  sx={{
                    fontFamily: "montserrat",
                    fontWeight: "bold",
                    fontSize: "22px",
                  }}
                >
                  ₹ {data.totalEarnings}
                </Typography>
              </div>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card className="bg-white shadow-lg">
            <CardContent>
              <Typography
                variant="h6"
                className="font-bold mb-4 text-green-600"
              >
                {summaryData.title}
              </Typography>
              {view === "latestOrders" && (
                <CommonTable
                  data={data.latestOrders}
                  renderHeader={renderHeader}
                  renderRow={renderRow}
                />
              )}
              <div className="hidden grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                {data.latestOrders.map((order) => (
                  <div key={order.id} className="bg-gray-100 rounded-md p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold">{`SC${order.date.replace(
                        /-/g,
                        "/"
                      )}/000${order.id}`}</span>
                      <span>
                        {order.date} - {new Date().toLocaleTimeString()}
                      </span>
                    </div>
                    <span className="inline-block bg-yellow-200 text-yellow-800 px-2 py-1 rounded mb-2">
                      Processing
                    </span>
                    <div className="flex items-center">
                      <img
                        src={defaultImage}
                        alt={order.product}
                        className="w-16 h-16 object-cover rounded mr-4"
                      />
                      <div>
                        <h3 className="font-semibold">{order.product}</h3>
                        <p>₹ {order.amount}</p>
                      </div>
                    </div>
                    <button className="mt-2 bg-green-500 text-white px-4 py-2 rounded">
                      See details
                    </button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardContent;
