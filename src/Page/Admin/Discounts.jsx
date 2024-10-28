/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Switch,
  Grid,
  useMediaQuery,
  useTheme,
  Card,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import EditIcon from "@mui/icons-material/Edit";
import { FaTrash } from "react-icons/fa";
import {
  getAllDiscounts,
  addDiscount,
  updateDiscountStatus,
  deleteDiscount,
  updateDiscount,
} from "../../Services/Operations/ProductServices";
import CommonTable from "../../Components/CommonTable/CommonTable";
import toast from "react-hot-toast";
import { ring2 } from "ldrs";

const GreenButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#064C3A",
  color: "white",
  "&:hover": {
    backgroundColor: "#053C2E",
  },
}));

const CustomDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialog-paper": {
    backgroundColor: "white",
    color: "#1B1B1B",
    borderRadius: "8px",
    width: "100%",
    maxWidth: "600px",
  },
}));

const BorderedCard = styled(Card)({
  boxShadow: "none",
  border: "1px solid #e0e0e0", // Light gray border
  borderRadius: "8px",
});

const Discounts = () => {
  const [discounts, setDiscounts] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingDiscount, setEditingDiscount] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    coupon_code: "",
    discount: "",
    start_date: "",
    end_date: "",
    active: true,
  });

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));

  useEffect(() => {
    fetchDiscounts();
  }, []);

  const fetchDiscounts = async () => {
    try {
      setLoading(true);
      const response = await getAllDiscounts();
      if (response.success) {
        setDiscounts(response.data);
      } else {
        console.error("Failed to fetch discounts:", response.message);
      }
    } catch (error) {
      console.error("Error fetching discounts:", error);
    } finally {
      setLoading(false); // Ensure loading is set to false in all cases
    }
  };

  const handleOpenDialog = (discount = null) => {
    if (discount) {
      setEditingDiscount(discount);
      setFormData({
        coupon_code: discount.coupon_code,
        discount: discount.discount,
        start_date: formatDateForInput(discount.start_date),
        end_date: formatDateForInput(discount.end_date),
        active: discount.active === 1,
      });
    } else {
      setEditingDiscount(null);
      setFormData({
        coupon_code: "",
        discount: "",
        start_date: "",
        end_date: "",
        active: true,
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingDiscount(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSwitchChange = (e) => {
    setFormData({ ...formData, active: e.target.checked });
  };

  const handleSubmit = async () => {
    const actionData = {
      ...formData,
      active: formData.active ? 1 : 0, // Convert boolean to 1 or 0
    };

    if (editingDiscount) {
      actionData.id = editingDiscount.id;
    }

    const action = editingDiscount
      ? updateDiscount(actionData)
      : addDiscount(actionData);

    await toast.promise(
      action,
      {
        loading: "Processing...",
        success: (response) => {
          fetchDiscounts();
          handleCloseDialog();
          return editingDiscount
            ? "Discount updated successfully"
            : "New discount added successfully";
        },
        error: (error) => {
          console.error("Error saving discount:", error);
          return "Failed to save discount";
        },
      },
      {
        position: "bottom-right",
      }
    );
  };

  const handleDelete = async (id) => {
    await toast.promise(
      deleteDiscount(id),
      {
        loading: "Deleting...",
        success: () => {
          fetchDiscounts();
          return "Discount deleted successfully";
        },
        error: "Failed to delete discount",
      },
      {
        position: "bottom-right",
      }
    );
  };

  const handleStatusChange = async (id, newStatus) => {
    await toast.promise(
      updateDiscountStatus({ id, active: newStatus }),
      {
        loading: "Updating status...",
        success: () => {
          fetchDiscounts();
          return "Discount status updated successfully";
        },
        error: "Failed to update discount status",
      },
      {
        position: "bottom-right",
      }
    );
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const formatDateForInput = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };

  const renderHeader = () => (
    <thead>
      <tr className="bg-bg-green text-white">
        <th className="px-2 py-2 text-left text-xs font-medium uppercase tracking-wider">
          #
        </th>
        <th className="px-2 py-2 text-left text-xs font-medium uppercase tracking-wider">
          Coupon Code
        </th>
        <th className="px-2 py-2 text-left text-xs font-medium uppercase tracking-wider">
          Discount (%)
        </th>
        {!isMobile && (
          <>
            <th className="px-2 py-2 text-left text-xs font-medium uppercase tracking-wider">
              Start Date
            </th>
            <th className="px-2 py-2 text-left text-xs font-medium uppercase tracking-wider">
              End Date
            </th>
          </>
        )}
        <th className="px-2 py-2 text-left text-xs font-medium uppercase tracking-wider">
          Status
        </th>
        <th className="px-2 py-2 text-left text-xs font-medium uppercase tracking-wider">
          Actions
        </th>
      </tr>
    </thead>
  );

  const renderRow = (discount, index) => (
    <tr
      key={discount.id}
      className="bg-white border-b border-gray-200 text-bg-green"
    >
      <td className="px-2 py-4 whitespace-nowrap text-sm">{index + 1}</td>
      <td className="px-2 py-4 whitespace-nowrap text-sm">
        {discount.coupon_code}
      </td>
      <td className="px-2 py-4 whitespace-nowrap text-sm">
        {discount.discount}%
      </td>
      {!isMobile && (
        <>
          <td className="px-2 py-4 whitespace-nowrap text-sm">
            {formatDate(discount.start_date)}
          </td>
          <td className="px-2 py-4 whitespace-nowrap text-sm">
            {formatDate(discount.end_date)}
          </td>
        </>
      )}
      <td className="px-2 py-4 whitespace-nowrap text-sm">
        <Switch
          checked={discount.active === 1}
          onChange={(e) => handleStatusChange(discount.id, e.target.checked)}
          color="success"
          size={isMobile ? "small" : "medium"}
        />
      </td>
      <td className="px-2 py-4 whitespace-nowrap text-sm font-medium">
        <div className="flex gap-2">
          <button
            onClick={() => handleOpenDialog(discount)}
            className="border-2 border-blue-500 border-dashed rounded-lg p-2"
          >
            <EditIcon
              style={{ color: "blue", fontSize: isMobile ? "1rem" : "1.25rem" }}
            />
          </button>
          <button
            onClick={() => handleDelete(discount.id)}
            className="border-2 border-red-500 border-dashed rounded-lg p-2 ml-2"
          >
            <FaTrash size={isMobile ? 16 : 20} color="red" />
          </button>
        </div>
      </td>
    </tr>
  );

  const isFormValid = () => {
    return (
      formData.coupon_code &&
      formData.discount &&
      formData.start_date &&
      formData.end_date
    );
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
    <Box className="p-2 sm:p-4 bg-gray-100 font-dm-sans">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4 sm:gap-0">
        <Typography
          variant={isMobile ? "h5" : "h4"}
          className="font-bold text-bg-green mb-2 sm:mb-0"
        >
          Discount Management
        </Typography>
        <GreenButton
          variant="contained"
          onClick={() => handleOpenDialog()}
          size={isMobile ? "small" : "medium"}
        >
          Add New Discount
        </GreenButton>
      </div>

      <BorderedCard>
        <div className="overflow-x-auto">
          <CommonTable
            renderHeader={renderHeader}
            data={discounts}
            renderRow={renderRow}
          />
        </div>
      </BorderedCard>

      <CustomDialog
        open={openDialog}
        onClose={handleCloseDialog}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle className="bg-bg-green text-white">
          {editingDiscount ? "Edit Discount" : "Add New Discount"}
        </DialogTitle>
        <DialogContent className="mt-4">
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                margin="normal"
                name="coupon_code"
                label="Coupon Code"
                type="text"
                value={formData.coupon_code}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                margin="normal"
                name="discount"
                label="Discount (%)"
                type="number"
                value={formData.discount}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                margin="normal"
                name="start_date"
                label="Start Date"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={formData.start_date}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                margin="normal"
                name="end_date"
                label="End Date"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={formData.end_date}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <div className="flex items-center mt-4">
                <Typography>Active</Typography>
                <Switch
                  checked={formData.active}
                  onChange={handleSwitchChange}
                  color="primary"
                />
              </div>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions className="bg-gray-100">
          <Button
            onClick={handleCloseDialog}
            className="text-secondary"
            color="error"
          >
            Cancel
          </Button>
          <GreenButton
            onClick={handleSubmit}
            disabled={!isFormValid()}
            style={{
              backgroundColor: isFormValid() ? "#064C3A" : "lightgray",
              color: isFormValid() ? "white" : "darkgray",
              cursor: isFormValid() ? "pointer" : "not-allowed",
            }}
          >
            {editingDiscount ? "Update" : "Add"}
          </GreenButton>
        </DialogActions>
      </CustomDialog>
    </Box>
  );
};

export default Discounts;
