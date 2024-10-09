import { Grid } from "@mui/material";
import CommonInput from "../CommonInput/CommonInput";
import { useState } from "react";

const PricingStock = ({ formdata, setFormdata }) => {
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormdata({ ...formdata, [name]: value });
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateField = (name, value) => {
    let error = "";
    switch (name) {
      case "prize":
      case "regularprize":
      case "saleprize":
      case "gst":
      case "quantity":
      case "stock":
        if (!value) error = `${name} is required`;
        if (isNaN(value) || value < 0)
          error = `${name} must be a non-negative number`;
        break;
      case "brandname":
      case "color":
        if (!value.trim()) error = `${name} is required`;
        break;
    }
    return error;
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  return (
    <>
      <Grid item xs={12} md={6}>
        <CommonInput
          fullWidth
          label="Prize"
          type="number"
          name="prize"
          value={formdata.prize}
          onChange={(e) => setFormdata({ ...formdata, prize: e.target.value })}
          variant="outlined"
          className="font-poppins"
          onBlur={handleBlur}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <CommonInput
          fullWidth
          label="Brand Name"
          type="text"
          name="brandname"
          value={formdata.brandname}
          onChange={handleChange}
          variant="outlined"
          className="font-poppins"
          onBlur={handleBlur}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <CommonInput
          fullWidth
          label="Regular Prize"
          type="number"
          name="regularprize"
          value={formdata.regularprize}
          onChange={handleChange}
          variant="outlined"
          className="font-poppins"
          onBlur={handleBlur}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <CommonInput
          fullWidth
          label="Sale Prize"
          type="number"
          name="saleprize"
          value={formdata.saleprize}
          onChange={handleChange}
          variant="outlined"
          className="font-poppins"
          onBlur={handleBlur}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <CommonInput
          fullWidth
          label="GST %"
          type="number"
          name="gst"
          value={formdata.gst}
          onChange={handleChange}
          variant="outlined"
          className="font-poppins"
          onBlur={handleBlur}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <CommonInput
          fullWidth
          label="Net Quantity"
          type="number"
          name="quantity"
          value={formdata.quantity}
          onChange={handleChange}
          variant="outlined"
          className="font-poppins"
          onBlur={handleBlur}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <CommonInput
          fullWidth
          label="Stock (No of pieces)"
          type="number"
          name="stock"
          value={formdata.stock}
          onChange={handleChange}
          variant="outlined"
          className="font-poppins"
          onBlur={handleBlur}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <CommonInput
          fullWidth
          label="Color"
          type="text"
          name="color"
          value={formdata.color}
          onChange={handleChange}
          variant="outlined"
          className="font-poppins"
          onBlur={handleBlur}
        />
      </Grid>
    </>
  );
};

export default PricingStock;
