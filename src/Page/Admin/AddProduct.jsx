import React, { useState } from "react";
import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Checkbox,
  Button,
  Box,
  Grid,
  Input,
} from "@mui/material";
import { addProduct } from "../../Services/Operations/ProductServices";
import toast from "react-hot-toast";

const AddProduct = () => {
  // const [selectedSizes, setSelectedSizes] = useState([]);
  const [formdata, setFormdata] = useState({
    name: "",
    prize: "",
    size: [],
    regularprize: "",
    saleprize: "",
    gst: "",
    weight: "",
    // inventory:"",
    stock: "",
    countryorigin: "",
    color: "",
    fabric: "",
    fitshape: "",
    nack: "",
    quantity: "",
    occupation: "",
    patent: "",
    patenttype: "",
    sleevelength: "",
    chestsize: "",
    lengthsize: "",
    designname: "",
    sku1: "",
    sku2: "",
    brandname: "",
    groupid: "",
    productdesc: "",
    headline: "",
    length: "",
    noofpocket: "",
    sleevestyle: "",
    orderid: "",
    stretchability: "",
    productphoto: [],
  });

  const handleImageUpload = (event) => {
    const files = event.target.files;
    const imagesArray = Array.from(files);

    setFormdata((prevProduct) => ({
      ...prevProduct,
      productphoto: prevProduct.productphoto.concat(imagesArray),
    }));
  };

  const handleSizeChange = (event) => {
    // console.log(event)
    const {
      target: { value },
    } = event;
    setFormdata({
      ...formdata,
      size: typeof value === "string" ? value.split(",") : value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log("data is1 ->", formdata);
    try {
      await toast.promise(addProduct({ productData: formdata }), {
        loading: "Processing....",
        success: (response) => {
          console.log(response);
          return `${response.data.message}`;
        },
        error: (error) => {
          return `${error.message}`;
        },
      });
    } catch (error) {
      console.error("Loggedin failed:", error);
    }
  };

  const handleRemoveImage = (index) => {
    const updatedImages = [...formdata.productphoto];
    updatedImages.splice(index, 1);
    setFormdata({ ...formdata, productphoto: updatedImages });
  };

  return (
    <Box maxWidth="76%" mx="auto" p={4}>
      <form onSubmit={submitHandler}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Product Name"
              type="text"
              name="name"
              value={formdata.name}
              onChange={(e) =>
                setFormdata({ ...formdata, name: e.target.value })
              }
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Size</InputLabel>
              <Select
                multiple
                name="size"
                value={formdata.size}
                onChange={handleSizeChange}
                input={<Input />}
                label="Size"
                renderValue={(selected) => selected.join(", ")}
              >
                {["S", "M", "L", "XL", "XXL", "XXXL"].map((size) => (
                  <MenuItem key={size} value={size}>
                    <Checkbox checked={formdata.size.includes(size)} />
                    {size}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Prize"
              type="number"
              name="prize"
              value={formdata.prize}
              onChange={(e) =>
                setFormdata({ ...formdata, prize: e.target.value })
              }
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Regular Prize"
              type="number"
              name="regularprize"
              value={formdata.regularprize}
              onChange={(e) =>
                setFormdata({ ...formdata, regularprize: e.target.value })
              }
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Sale Prize"
              type="number"
              name="saleprize"
              value={formdata.saleprize}
              onChange={(e) =>
                setFormdata({ ...formdata, saleprize: e.target.value })
              }
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="GST %"
              type="number"
              name="gst"
              value={formdata.gst}
              onChange={(e) =>
                setFormdata({ ...formdata, gst: e.target.value })
              }
              variant="outlined"
            />
          </Grid>
          {/* <Grid item xs={12} md={6}>
                        <TextField fullWidth label="HSN ID"
                        type=''
                         variant="outlined" />
                    </Grid> */}
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Weight (gram)"
              name="weight"
              value={formdata.weight}
              onChange={(e) =>
                setFormdata({ ...formdata, weight: e.target.value })
              }
              type="number"
              variant="outlined"
            />
          </Grid>
          {/* <Grid item xs={12} md={6}>
                        <TextField fullWidth label="Inventory"
                         type="number"
                         name='' variant="outlined" />
                    </Grid> */}
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Stock (No of pieces)"
              type="number"
              name="stock"
              value={formdata.stock}
              onChange={(e) =>
                setFormdata({ ...formdata, stock: e.target.value })
              }
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Country & Origin"
              type="text"
              name="countryorigin"
              value={formdata.countryorigin}
              onChange={(e) =>
                setFormdata({ ...formdata, countryorigin: e.target.value })
              }
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Color"
              type="text"
              name="color"
              value={formdata.color}
              onChange={(e) =>
                setFormdata({ ...formdata, color: e.target.value })
              }
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Fabric"
              type="text"
              name="fabric"
              value={formdata.fabric}
              onChange={(e) =>
                setFormdata({ ...formdata, fabric: e.target.value })
              }
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Fit / Shape"
              type="text"
              name="fitshape"
              value={formdata.fitshape}
              onChange={(e) =>
                setFormdata({ ...formdata, fitshape: e.target.value })
              }
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Neck"
              type="text"
              name="nack"
              value={formdata.nack}
              onChange={(e) =>
                setFormdata({ ...formdata, nack: e.target.value })
              }
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Net Quantity"
              type="number"
              name="quantity"
              value={formdata.quantity}
              onChange={(e) =>
                setFormdata({ ...formdata, quantity: e.target.value })
              }
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Occupation"
              type="text"
              name="occupation"
              value={formdata.occupation}
              onChange={(e) =>
                setFormdata({ ...formdata, occupation: e.target.value })
              }
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Patent"
              type="text"
              name="patent"
              value={formdata.patent}
              onChange={(e) =>
                setFormdata({ ...formdata, patent: e.target.value })
              }
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Print of Patent Type"
              type="text"
              name="patenttype"
              value={formdata.patenttype}
              onChange={(e) =>
                setFormdata({ ...formdata, patenttype: e.target.value })
              }
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Sleeve Length"
              type="text"
              name="sleevelength"
              value={formdata.sleevelength}
              onChange={(e) =>
                setFormdata({ ...formdata, sleevelength: e.target.value })
              }
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Chest Size"
              type="text"
              name="chestsize"
              value={formdata.chestsize}
              onChange={(e) =>
                setFormdata({ ...formdata, chestsize: e.target.value })
              }
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Length Size"
              type="text"
              name="lengthsize"
              value={formdata.lengthsize}
              onChange={(e) =>
                setFormdata({ ...formdata, lengthsize: e.target.value })
              }
              variant="outlined"
            />
          </Grid>
          {/* <Grid item xs={12} md={6}>
                        <TextField fullWidth type="file" variant="outlined"
                            name="productphoto"
                            value={formdata.productphoto}
                            inputProps={{ multiple: true }}
                            onChange={(e) => setFormdata({ ...formdata, productphoto: e.target.value })}
                            label="Product Photos" InputLabelProps={{ shrink: true }} />
                    </Grid> */}
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Design Name"
              type="text"
              name="designname"
              value={formdata.designname}
              onChange={(e) =>
                setFormdata({ ...formdata, designname: e.target.value })
              }
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="SKU1"
              type="text"
              name="sku1"
              value={formdata.sku1}
              onChange={(e) =>
                setFormdata({ ...formdata, sku1: e.target.value })
              }
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="SKU2"
              type="text"
              name="sku2"
              value={formdata.sku2}
              onChange={(e) =>
                setFormdata({ ...formdata, sku2: e.target.value })
              }
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Brand Name"
              type="text"
              name="brandname"
              value={formdata.brandname}
              onChange={(e) =>
                setFormdata({ ...formdata, brandname: e.target.value })
              }
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Group ID"
              type="text"
              name="groupid"
              value={formdata.groupid}
              onChange={(e) =>
                setFormdata({ ...formdata, groupid: e.target.value })
              }
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Product Description"
              type="text"
              name="productdesc"
              value={formdata.productdesc}
              onChange={(e) =>
                setFormdata({ ...formdata, productdesc: e.target.value })
              }
              multiline
              rows={4}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Headline"
              type="text"
              name="headline"
              value={formdata.headline}
              onChange={(e) =>
                setFormdata({ ...formdata, headline: e.target.value })
              }
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Length"
              type="text"
              name="length"
              value={formdata.length}
              onChange={(e) =>
                setFormdata({ ...formdata, length: e.target.value })
              }
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Number of Pockets"
              type="number"
              name="numberofpockets"
              value={formdata.numberofpockets}
              onChange={(e) =>
                setFormdata({ ...formdata, numberofpockets: e.target.value })
              }
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Sleeve Style"
              type="text"
              name="sleevestyle"
              value={formdata.sleevestyle}
              onChange={(e) =>
                setFormdata({ ...formdata, sleevestyle: e.target.value })
              }
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Stretchability</InputLabel>
              <Select
                label="Stretchability"
                name="stretchability"
                value={formdata.stretchability}
                onChange={(e) =>
                  setFormdata({ ...formdata, stretchability: e.target.value })
                }
              >
                <MenuItem value="Yes">Yes</MenuItem>
                <MenuItem value="No">No</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Order ID"
              name="orderid"
              value={formdata.orderid}
              onChange={(e) =>
                setFormdata({ ...formdata, orderid: e.target.value })
              }
              type="number"
              variant="outlined"
            />
          </Grid>
          <div className="container mx-auto p-4">
            <h2 className="text-2xl font-poppins font-bold mb-4">
              Upload Multiple Images
            </h2>
            <input
              type="file"
              multiple
              onChange={handleImageUpload}
              className="border p-2 mb-4"
            />
            <div className="grid grid-cols-3 gap-4">
              {formdata.productphoto.map((file, index) => (
                <div key={index} className="border p-2">
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`upload-${index}`}
                    className="max-w-full h-auto"
                  />
                  <button
                    onClick={() => handleRemoveImage(index)}
                    className="bg-red-500 font-poppins text-white px-2 py-1 rounded mt-2"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>
          <Grid item xs={12}>
            <Button fullWidth variant="contained" type="submit" color="success">
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default AddProduct;
