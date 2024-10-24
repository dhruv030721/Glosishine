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
      case "regularprize":
      case "saleprize":
      case "brandname":
        if (!value)
          error = `${name.charAt(0).toUpperCase() + name.slice(1)} is required`;
        if (isNaN(value) || value < 0)
          error = `${
            name.charAt(0).toUpperCase() + name.slice(1)
          } must be a non-negative number`;
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
      {Object.entries(errors).map(
        ([field, error]) =>
          error && (
            <span key={field} className="text-red-500">
              {error}
            </span>
          )
      )}
    </>
  );
};

export default PricingStock;
