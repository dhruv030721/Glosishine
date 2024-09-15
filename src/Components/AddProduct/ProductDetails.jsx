import { FormControl, Grid, InputLabel, MenuItem, Select } from "@mui/material";
import CommonInput from "../CommonInput/CommonInput";

const ProductDetails = ({ formdata, setFormdata }) => {
  const handleChange = (e) => {
    setFormdata({ ...formdata, [e.target.name]: e.target.value });
  };
  return (
    <>
      <Grid item xs={12} md={6}>
        <CommonInput
          fullWidth
          label="Country & Origin"
          type="text"
          name="countryorigin"
          value={formdata.countryorigin}
          onChange={handleChange}
          variant="outlined"
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
          label="SKU1"
          type="text"
          name="sku1"
          value={formdata.sku1}
          onChange={handleChange}
          variant="outlined"
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <CommonInput
          fullWidth
          label="SKU2"
          type="text"
          name="sku2"
          value={formdata.sku2}
          onChange={handleChange}
          variant="outlined"
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <CommonInput
          fullWidth
          label="Group ID"
          type="text"
          name="groupid"
          value={formdata.groupid}
          onChange={handleChange}
          variant="outlined"
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
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <CommonInput
          fullWidth
          label="Number of Pockets"
          type="number"
          name="numberofpockets"
          value={formdata.numberofpockets}
          onChange={handleChange}
          variant="outlined"
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
        />
      </Grid>
    </>
  );
};

export default ProductDetails;
