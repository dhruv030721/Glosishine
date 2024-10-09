import { Grid } from "@mui/material";
import CommonInput from "../CommonInput/CommonInput";
import { useState } from "react";

const BasicInformation = ({ formdata, setFormdata, handleSizeChange }) => {
  const [errors, setErrors] = useState({});

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
      case "weight":
        if (!value) error = "Weight is required";
        if (isNaN(value) || value <= 0)
          error = "Weight must be a positive number";
        break;
      case "orderid":
        if (!value) error = "Order ID is required";
        if (isNaN(value) || value <= 0)
          error = "Order ID must be a positive number";
        break;
      // Add more cases as needed
    }
    return error;
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  if (!formdata || !formdata.size) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Grid item xs={12} md={6}>
        <CommonInput
          fullWidth
          label="Product Name"
          type="text"
          name="name"
          value={formdata.name}
          onChange={handleChange}
          onBlur={handleBlur}
          variant="outlined"
          className="border-2 border-dashed border-bg-green"
          InputProps={{
            classes: { notchedOutline: "border-none" }, // Removes the default MUI border
          }}
        />
        {errors.name && <span className="text-red-500">{errors.name}</span>}
      </Grid>
      <Grid item xs={12} md={6}>
        <CommonInput
          label="Size"
          name="size"
          type="select"
          value={formdata.size}
          onChange={handleSizeChange}
          options={[
            { value: "S", label: "S" },
            { value: "M", label: "M" },
            { value: "L", label: "L" },
            { value: "XL", label: "XL" },
            { value: "XXL", label: "XXL" },
            { value: "XXXL", label: "XXXL" },
          ]}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <CommonInput
          fullWidth
          label="Weight (gram)"
          name="weight"
          value={formdata.weight}
          onChange={handleChange}
          onBlur={handleBlur}
          type="number"
          variant="outlined"
          className="border-2 border-dashed border-bg-green"
          InputProps={{
            classes: { notchedOutline: "border-none" },
          }}
        />
        {errors.weight && <span className="text-red-500">{errors.weight}</span>}
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
          fullWidth
          label="Headline"
          type="text"
          name="headline"
          value={formdata.headline}
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
          label="Order ID"
          name="orderid"
          value={formdata.orderid}
          onChange={handleChange}
          onBlur={handleBlur}
          type="number"
          variant="outlined"
          className="border-2 border-dashed border-bg-green outline-none"
          InputProps={{
            classes: { notchedOutline: "outline-none" },
          }}
        />
        {errors.orderid && (
          <span className="text-red-500">{errors.orderid}</span>
        )}
      </Grid>
      <Grid item xs={12}>
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
