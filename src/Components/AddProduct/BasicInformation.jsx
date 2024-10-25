/* eslint-disable no-unused-vars */
import { Grid } from "@mui/material";
import CommonInput from "../CommonInput/CommonInput";
import { useState } from "react";
import { Checkbox } from "@mui/material";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  ListItemText,
} from "@mui/material";
import { styled } from "@mui/material/styles";

// Custom styled components
const CustomSelect = styled(Select)(({ theme }) => ({
  "&.MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "green", // Change this to match your theme
    },
    "&:hover fieldset": {
      borderColor: "darkgreen", // Change this to match your theme
    },
    "&.Mui-focused fieldset": {
      borderColor: "darkgreen", // Change this to match your theme
    },
  },
}));

const CustomMenuItem = styled(MenuItem)(({ theme }) => ({
  "&.MuiMenuItem-root": {
    "&.Mui-selected": {
      backgroundColor: "lightgreen", // Change this to match your theme
    },
    "&:hover": {
      backgroundColor: "rgba(0, 255, 0, 0.1)", // Change this to match your theme
    },
  },
}));

const CustomCheckbox = styled(Checkbox)(({ theme }) => ({
  color: "green", // Change this to match your theme
  "&.Mui-checked": {
    color: "darkgreen", // Change this to match your theme
  },
}));

// Add this new styled component for the color Select
const CustomColorSelect = styled(Select)(({ theme }) => ({
  "&.MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "green",
    },
    "&:hover fieldset": {
      borderColor: "darkgreen",
    },
    "&.Mui-focused fieldset": {
      borderColor: "darkgreen",
    },
  },
}));

const BasicInformation = ({ formdata, setFormdata, handleSizeChange }) => {
  const [errors, setErrors] = useState({});
  const [openSize, setOpenSize] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormdata((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    // Clear error when user starts typing
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateField = (name, value) => {
    let error = "";
    switch (name) {
      case "name":
        if (!value.trim()) error = "Product name is required";
        break;
      case "color":
        if (value.length === 0) error = "At least one color must be selected";
        break;
      case "fabric":
      case "fitshape":
      case "designname":
        if (!value.trim())
          error = `${name.charAt(0).toUpperCase() + name.slice(1)} is required`;
        break;
    }
    return error;
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleSizeClose = () => {
    setOpenSize(false);
  };

  const handleSizeOpen = () => {
    setOpenSize(true);
  };

  const sizeOptions = ["S", "M", "L", "XL"];

  if (!formdata || !formdata.size) {
    return <div>Loading...</div>;
  }

  const colorOptions = [
    "Red",
    "Blue",
    "Green",
    "Yellow",
    "Black",
    "White",
    "Purple",
    "Orange",
    "Pink",
    "Brown",
  ];

  const handleCategoryChange = (event) => {
    const category = event.target.value;
    setFormdata({
      ...formdata,
      category: category,
      subcategory: "", // Reset subcategory when category changes
    });
  };

  const handleSubcategoryChange = (event) => {
    setFormdata({
      ...formdata,
      subcategory: event.target.value,
    });
  };

  const categories = ["MENS", "WOMENS"];
  const subcategories = {
    MENS: ["Shirts", "Tshirts", "Pants", "Men's Cord Set"],
    WOMENS: ["Shirts", "Tshirts", "Kurtas", "Women's Cord Set"],
  };

  return (
    <>
      <Grid item xs={12} md={6} className="font-poppins">
        <CommonInput
          fullWidth
          label="Product Name"
          type="text"
          name="name"
          value={formdata.name}
          onChange={handleChange}
          onBlur={handleBlur}
          variant="outlined"
          className="border-2 border-dashed border-bg-green font-poppins"
          InputProps={{
            classes: { notchedOutline: "border-none" }, // Removes the default MUI border
          }}
        />
        {errors.name && <span className="text-red-500">{errors.name}</span>}
      </Grid>
      <Grid item xs={12} md={6}>
        <FormControl fullWidth>
          <InputLabel
            id="size-label"
            style={{
              color: "green",
              fontWeight: "bold",
              backgroundColor: "white",
              padding: "0px 5px",
            }}
          >
            Size
          </InputLabel>
          <CustomSelect
            labelId="size-label"
            id="size-checkbox"
            multiple
            value={formdata.size}
            onChange={handleSizeChange}
            onClose={handleSizeClose}
            onOpen={handleSizeOpen}
            open={openSize}
            renderValue={(selected) => selected.join(", ")}
          >
            {sizeOptions.map((size) => (
              <CustomMenuItem key={size} value={size}>
                <CustomCheckbox checked={formdata.size.indexOf(size) > -1} />
                <ListItemText primary={size} style={{ color: "green" }} />
              </CustomMenuItem>
            ))}
          </CustomSelect>
        </FormControl>
      </Grid>
      <Grid item xs={12} md={6}>
        <CommonInput
          fullWidth
          label="Fabric"
          type="text"
          name="fabric"
          value={formdata.fabric}
          onChange={handleChange}
          onBlur={handleBlur}
          variant="outlined"
          className="border-2 border-dashed border-bg-green"
          InputProps={{
            classes: { notchedOutline: "border-none" },
          }}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <CommonInput
          fullWidth
          label="Fit / Shape"
          type="text"
          name="fitshape"
          value={formdata.fitshape}
          onChange={handleChange}
          onBlur={handleBlur}
          variant="outlined"
          className="border-2 border-dashed border-bg-green"
          InputProps={{
            classes: { notchedOutline: "border-none" },
          }}
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <FormControl fullWidth>
          <InputLabel
            id="category-label"
            style={{
              color: "green",
              fontWeight: "bold",
              backgroundColor: "white",
              padding: "0px 5px",
            }}
          >
            Category
          </InputLabel>
          <CustomSelect
            labelId="category-label"
            id="category"
            value={formdata.category || ""}
            onChange={handleCategoryChange}
            renderValue={(selected) => selected}
          >
            {categories.map((category) => (
              <CustomMenuItem key={category} value={category}>
                {category}
              </CustomMenuItem>
            ))}
          </CustomSelect>
        </FormControl>
      </Grid>
      <Grid item xs={12} md={6}>
        <FormControl fullWidth>
          <InputLabel
            id="subcategory-label"
            style={{
              color: "green",
              fontWeight: "bold",
              backgroundColor: "white",
              padding: "0px 5px",
            }}
          >
            Sub-category
          </InputLabel>
          <CustomSelect
            labelId="subcategory-label"
            id="subcategory"
            value={formdata.subcategory || ""}
            onChange={handleSubcategoryChange}
            disabled={!formdata.category}
            renderValue={(selected) => selected}
          >
            {formdata.category &&
              subcategories[formdata.category].map((subcategory) => (
                <CustomMenuItem key={subcategory} value={subcategory}>
                  {subcategory}
                </CustomMenuItem>
              ))}
          </CustomSelect>
        </FormControl>
      </Grid>
      <Grid item xs={12} md={6}>
        <CommonInput
          fullWidth
          label="Design Name"
          type="text"
          name="designname"
          value={formdata.designname}
          onChange={handleChange}
          onBlur={handleBlur}
          variant="outlined"
          className="border-2 border-dashed border-bg-green"
          InputProps={{
            classes: { notchedOutline: "border-none" },
          }}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <CommonInput
          label="Product Description"
          name="productdesc"
          value={formdata.productdesc}
          onChange={handleChange}
          multiline={true}
          rows={4}
        />
      </Grid>
    </>
  );
};

export default BasicInformation;
