import { Grid } from "@mui/material";
import CommonInput from "../CommonInput/CommonInput";

const PricingStock = ({ formdata, setFormdata }) => {
  const handleChange = (e) => {
    setFormdata({ ...formdata, [e.target.name]: e.target.value });
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
        />
      </Grid>
    </>
  );
};

export default PricingStock;
