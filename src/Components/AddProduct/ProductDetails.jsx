/* eslint-disable no-unused-vars */
import { FormControl, Grid, InputLabel, MenuItem, Select } from "@mui/material";
import CommonInput from "../CommonInput/CommonInput";
import { useState } from "react";

const ProductDetails = ({ formdata, setFormdata }) => {
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormdata({ ...formdata, [name]: value });
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateField = (name, value) => {
    let error = "";
    switch (name) {
      case "countryorigin":
      case "nack":
      case "occupation":
      case "patent":
      case "patenttype":
      case "sleevelength":
      case "chestsize":
      case "lengthsize":
      case "sku":
      case "length":
      case "sleevestyle":
        if (!value.trim())
          error = `${name.charAt(0).toUpperCase() + name.slice(1)} is required`;
        break;
      case "numberofpockets":
        if (!value) error = "Number of pockets is required";
        if (isNaN(value) || value < 0)
          error = "Number of pockets must be a non-negative integer";
        if (!Number.isInteger(Number(value)))
          error = "Number of pockets must be an integer";
        break;
      case "weight":
        if (!value) error = "Weight is required";
        if (isNaN(value) || value <= 0)
          error = "Weight must be a positive number";
        break;
      case "stretchability":
        if (!value) error = "Stretchability is required";
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
          label="Country & Origin"
          type="text"
          name="countryorigin"
          value={formdata.countryorigin}
          onChange={handleChange}
          variant="outlined"
          className="font-poppins"
          onBlur={handleBlur}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <CommonInput
          fullWidth
          label="Neck"
          type="text"
          name="nack"
          value={formdata.nack}
          onChange={handleChange}
          variant="outlined"
          className="font-poppins"
          onBlur={handleBlur}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <CommonInput
          fullWidth
          label="Occupation"
          type="text"
          name="occupation"
          value={formdata.occupation}
          onChange={handleChange}
          variant="outlined"
          className="font-poppins"
          onBlur={handleBlur}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <CommonInput
          fullWidth
          label="Patent"
          type="text"
          name="patent"
          value={formdata.patent}
          onChange={handleChange}
          variant="outlined"
          className="font-poppins"
          onBlur={handleBlur}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <CommonInput
          fullWidth
          label="Print of Patent Type"
          type="text"
          name="patenttype"
          value={formdata.patenttype}
          onChange={handleChange}
          variant="outlined"
          className="font-poppins"
          onBlur={handleBlur}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <CommonInput
          fullWidth
          label="Sleeve Length"
          type="text"
          name="sleevelength"
          value={formdata.sleevelength}
          onChange={handleChange}
          variant="outlined"
          className="font-poppins"
          onBlur={handleBlur}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <CommonInput
          fullWidth
          label="Chest Size"
          type="text"
          name="chestsize"
          value={formdata.chestsize}
          onChange={handleChange}
          variant="outlined"
          className="font-poppins"
          onBlur={handleBlur}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <CommonInput
          fullWidth
          label="Length Size"
          type="text"
          name="lengthsize"
          value={formdata.lengthsize}
          onChange={handleChange}
          variant="outlined"
          className="font-poppins"
          onBlur={handleBlur}
        />
      </Grid>
      {/* <Grid item xs={12} md={6}>
                        <CommonInput fullWidth type="file" variant="outlined"
                            name="productphoto"
                            value={formdata.productphoto}
                            inputProps={{ multiple: true }}
                            onChange={(e) => setFormdata({ ...formdata, productphoto: e.target.value })}
                            label="Product Photos" InputLabelProps={{ shrink: true }} />
                    </Grid> */}

      <Grid item xs={12} md={6}>
        <CommonInput
          fullWidth
          label="SKU"
          type="text"
          name="sku"
          value={formdata.sku}
          onChange={handleChange}
          variant="outlined"
          className="font-poppins"
          onBlur={handleBlur}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <CommonInput
          fullWidth
          label="Length"
          type="text"
          name="length"
          value={formdata.length}
          onChange={handleChange}
          variant="outlined"
          className="font-poppins"
          onBlur={handleBlur}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <CommonInput
          fullWidth
          label="Number of Pockets"
          type="number"
          name="noofpocket"
          value={parseInt(formdata.noofpocket)}
          onChange={handleChange}
          variant="outlined"
          className="font-poppins"
          onBlur={handleBlur}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <CommonInput
          fullWidth
          label="Sleeve Style"
          type="text"
          name="sleevestyle"
          value={formdata.sleevestyle}
          onChange={handleChange}
          variant="outlined"
          className="font-poppins"
          onBlur={handleBlur}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <CommonInput
          type="select"
          label="Stretchability"
          name="stretchability"
          value={formdata.stretchability}
          onChange={handleChange}
          options={[
            { value: "Yes", label: "Yes" },
            { value: "No", label: "No" },
          ]}
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

export default ProductDetails;
