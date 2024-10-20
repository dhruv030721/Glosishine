/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import VisibilityIcon from "@mui/icons-material/Visibility";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import CommonTable from "../../Components/CommonTable/CommonTable";
import { inventoryendpoints } from "../../Services/Apis";
import defaultImage from "../../assets/photo11.jpg";
import { AppContext } from "../../App";
import Collapse from "@mui/material/Collapse";
import { styled } from "@mui/material/styles";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import InventoryIcon from "@mui/icons-material/Inventory";

// Styled components for custom button and dialog
const GreenButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#064C3A",
  color: "white",
  "&:hover": {
    backgroundColor: "#064C3A",
  },
}));

const CustomDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialog-paper": {
    backgroundColor: "white",
    color: "#1B1B1B",
    borderRadius: "8px",
  },
}));

// Add this styled component
const BorderedCard = styled(Card)({
  boxShadow: "none",
  border: "1px solid #e0e0e0", // Light gray border
  borderRadius: "8px",
});

const BorderedTableContainer = styled("div")({
  border: "1px solid #e0e0e0", // Light gray border
  borderRadius: "8px",
  overflow: "hidden", // This ensures the border-radius is applied to the table as well
});

const Inventory = () => {
  const [inventoryData, setInventoryData] = useState([]);
  const [originalInventoryData, setOriginalInventoryData] = useState([]);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [expandedInventory, setExpandedInventory] = useState(null);
  const [newInventory, setNewInventory] = useState({
    date: "",
    product_id: "",
    S: "",
    M: "",
    L: "",
    XL: "",
    XXL: "",
  });
  const Appcontext = useContext(AppContext);
  const products = Appcontext.getdata || [];

  useEffect(() => {
    console.log("Products loaded:", products);
  }, [products]);

  const fetchInventoryData = async () => {
    try {
      const response = await axios.get(inventoryendpoints.GETINVENTORY_API);
      if (response.data.success) {
        setOriginalInventoryData(response.data.data); // Store original data
        const groupedData = response.data.data.reduce((acc, item) => {
          const existingItem = acc.find(
            (i) => i.product_id === item.product_id
          );
          if (
            !existingItem ||
            new Date(item.date) > new Date(existingItem.date)
          ) {
            return acc
              .filter((i) => i.product_id !== item.product_id)
              .concat(item);
          }
          return acc;
        }, []);
        setInventoryData(groupedData);
      } else {
        console.error("Failed to fetch inventory data:", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching inventory data:", error);
    }
  };

  useEffect(() => {
    fetchInventoryData();
  }, []);

  const handleAddInventory = async () => {
    try {
      const response = await axios.post(
        inventoryendpoints.ADDINVENTORY_API,
        newInventory
      );
      if (response.data.success) {
        fetchInventoryData();
        setOpenAddDialog(false);
        setNewInventory({
          date: "",
          product_id: "",
          S: "",
          M: "",
          L: "",
          XL: "",
          XXL: "",
        });
      } else {
        console.error("Failed to add inventory:", response.data.message);
      }
    } catch (error) {
      console.error("Error adding inventory:", error);
    }
  };

  const toggleInventoryDetails = (inventoryId) => {
    setExpandedInventory(
      expandedInventory === inventoryId ? null : inventoryId
    );
  };

  const renderHeader = () => (
    <thead>
      <tr className="bg-bg-green text-white">
        <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider hidden sm:table-cell">
          #
        </th>
        <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider">
          Product Info
        </th>
        <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider">
          Stock
        </th>
        <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider">
          View
        </th>
      </tr>
    </thead>
  );

  const renderRow = (item, index) => {
    const productInfo = products.find((p) => p.product_id === item.product_id);

    return (
      <React.Fragment key={item.product_id}>
        <tr className="border-y border-gray-200">
          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 hidden sm:table-cell">
            {index + 1}
          </td>
          <td className="px-4 py-4 whitespace-nowrap">
            <div className="flex items-center">
              <div className="flex-shrink-0 h-10 w-10">
                <img
                  className="h-10 w-10 rounded-full object-cover"
                  src={productInfo?.images?.[0] || defaultImage}
                  alt=""
                />
              </div>
              <div className="ml-4">
                <div className="text-sm text-bg-green font-bold">
                  {productInfo?.product_name || "Unknown Product"}
                </div>
                <div className="text-sm text-gray-500">{item.product_id}</div>
              </div>
            </div>
          </td>
          <td className="px-4 py-4 grid grid-cols-2 md:grid-cols-3 gap-0.5 whitespace-nowrap text-sm text-bg-green font-bold">
            <div>S - {item.S}</div>
            <div>M - {item.M}</div>
            <div>L - {item.L}</div>
            <div>XL - {item.XL}</div>
            <div>XXL - {item.XXL}</div>
          </td>
          <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
            <IconButton onClick={() => toggleInventoryDetails(item.product_id)}>
              <VisibilityIcon className="text-green-600" />
            </IconButton>
          </td>
        </tr>
        <tr>
          <td colSpan={4} className="px-4 py-4">
            <Collapse in={expandedInventory === item.product_id}>
              <div className="bg-gray-50 p-4 rounded-md">
                <h4 className="font-bold mb-2">Inventory Details</h4>
                <table className="min-w-full bg-white border border-gray-200">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="px-4 py-2 text-left">No</th>
                      <th className="px-4 py-2 text-left">Date</th>
                      <th className="px-4 py-2 text-left">S</th>
                      <th className="px-4 py-2 text-left">M</th>
                      <th className="px-4 py-2 text-left">L</th>
                      <th className="px-4 py-2 text-left">XL</th>
                      <th className="px-4 py-2 text-left">XXL</th>
                    </tr>
                  </thead>
                  <tbody>
                    {originalInventoryData
                      .filter(
                        (history) => history.product_id === item.product_id
                      )
                      .map((history, idx) => (
                        <tr
                          key={history.id}
                          className="border-t border-gray-200"
                        >
                          <td className="px-4 py-2">{idx + 1}</td>
                          <td className="px-4 py-2">{history.date}</td>
                          <td className="px-4 py-2">{history.S}</td>
                          <td className="px-4 py-2">{history.M}</td>
                          <td className="px-4 py-2">{history.L}</td>
                          <td className="px-4 py-2">{history.XL}</td>
                          <td className="px-4 py-2">{history.XXL}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </Collapse>
          </td>
        </tr>
      </React.Fragment>
    );
  };

  const handleProductChange = (event) => {
    const selectedProductId = event.target.value || "";
    console.log("Selected Product ID:", selectedProductId); // Debug log
    setNewInventory({ ...newInventory, product_id: selectedProductId });
  };

  const isFormValid = () => {
    return (
      newInventory.date &&
      newInventory.product_id &&
      ["S", "M", "L", "XL", "XXL"].every((size) => newInventory[size])
    );
  };

  return (
    <Box className="p-2 sm:p-4 md:p-6 bg-gray-100 font-dm-sans">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4 sm:gap-0">
        <Typography
          variant="h4"
          className="font-bold text-bg-green text-2xl sm:text-3xl mb-2 sm:mb-0"
        >
          Inventory Management
        </Typography>
        <GreenButton
          variant="contained"
          onClick={() => setOpenAddDialog(true)}
          className="font-semibold w-full sm:w-auto"
        >
          Add Inventory
        </GreenButton>
      </div>

      <Grid container spacing={3} className="mb-4">
        <Grid item xs={12} sm={6} md={3}>
          <BorderedCard>
            <CardContent className="flex items-center p-4">
              <InventoryIcon
                fontSize="48"
                className="text-green-600 bg-green-100 rounded-full text-4xl mr-4 p-2"
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
                  Products
                </Typography>
                <Typography
                  variant="h4"
                  className="text-green-600 px-2 rounded text-lg sm:text-xl"
                  sx={{
                    fontFamily: "montserrat",
                    fontWeight: "bold",
                  }}
                >
                  {inventoryData.length}
                </Typography>
              </div>
            </CardContent>
          </BorderedCard>
        </Grid>
      </Grid>

      <BorderedCard>
        <BorderedTableContainer>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              {renderHeader()}
              <tbody>
                {inventoryData.map((item, index) => renderRow(item, index))}
              </tbody>
            </table>
          </div>
        </BorderedTableContainer>
      </BorderedCard>

      {/* Add Inventory Dialog */}
      <CustomDialog
        open={openAddDialog}
        onClose={() => setOpenAddDialog(false)}
      >
        <DialogTitle className="bg-bg-green text-white">
          Add Inventory
        </DialogTitle>
        <DialogContent className="mt-4">
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                margin="normal"
                label="Date"
                type="date"
                value={newInventory.date}
                onChange={(e) =>
                  setNewInventory({ ...newInventory, date: e.target.value })
                }
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth margin="normal">
                <InputLabel id="product-select-label">Product</InputLabel>
                <Select
                  labelId="product-select-label"
                  id="product-select"
                  value={newInventory.product_id || ""}
                  label="Product"
                  onChange={handleProductChange}
                  MenuProps={{
                    PaperProps: {
                      style: {
                        maxHeight: 48 * 4.5 + 8,
                        width: 250,
                      },
                    },
                  }}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {products.map((product) => (
                    <MenuItem
                      key={product.product_id}
                      value={product.product_id}
                    >
                      {product.product_name || "Unknown Product"}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            {["S", "M", "L", "XL", "XXL"].map((size) => (
              <Grid item xs={6} sm={4} key={size}>
                <TextField
                  fullWidth
                  margin="normal"
                  label={size}
                  type="number"
                  value={newInventory[size]}
                  disabled={!newInventory.date || !newInventory.product_id}
                  onChange={(e) =>
                    setNewInventory({ ...newInventory, [size]: e.target.value })
                  }
                />
              </Grid>
            ))}
          </Grid>
        </DialogContent>
        <DialogActions className="bg-gray-100">
          <Button
            onClick={() => setOpenAddDialog(false)}
            className="text-secondary"
            color="error"
          >
            Cancel
          </Button>
          <GreenButton
            onClick={handleAddInventory}
            disabled={!isFormValid()}
            style={{
              backgroundColor: isFormValid() ? "#064C3A" : "lightgray",
              color: isFormValid() ? "white" : "darkgray",
              cursor: isFormValid() ? "pointer" : "not-allowed",
            }}
          >
            Add
          </GreenButton>
        </DialogActions>
      </CustomDialog>
    </Box>
  );
};

export default Inventory;
