/* eslint-disable no-unused-vars */
import { useContext, useState, useEffect, useCallback } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Box,
  Grid,
  Stepper,
  StepLabel,
  Step,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { updateProduct } from "../../Services/Operations/ProductServices";
import toast from "react-hot-toast";
import { AppContext } from "../../App";
import {
  ColorlibConnector,
  ColorlibStepIcon,
} from "../../Components/AddProduct/StepperFormIcons";
import BasicInformation from "../../Components/AddProduct/BasicInformation";
import PricingStock from "../../Components/AddProduct/PricingStock";
import ProductDetails from "../../Components/AddProduct/ProductDetails";
import ImagesUpload from "../../Components/AddProduct/ImagesUpload";
import { FaEdit } from "react-icons/fa";

const EditProduct = ({ id }) => {
  const context = useContext(AppContext);
  const [open, setOpen] = useState(false);
  const [filteredProduct, setFilteredProduct] = useState(null);
  const [key, setKey] = useState(0);

  useEffect(() => {
    if (context && context.getdata) {
      const product = context.getdata.find(
        (product) => product.product_id === id
      );
      setFilteredProduct(product);
    }
  }, [context, id]);
  // console.log("filteredProduct", filteredProduct);
  const steps = [
    "Basic Information",
    "Pricing and Stock",
    "Product Details",
    "Image Upload",
  ];

  const [activeStep, setActiveStep] = useState(0);
  const [formdata, setFormdata] = useState({
    name: "",
    size: [],
    color: [], // Added color field as an array
    regularprize: "",
    saleprize: "",
    gst: "",
    weight: "",
    stock: "",
    countryorigin: "",
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
    sku: "", // Changed from sku1 and sku2 to single sku
    brandname: "",
    productdesc: "",
    length: "",
    noofpocket: "",
    sleevestyle: "",
    productid: "", // Changed from orderid to productid
    stretchability: "",
    productphoto: [],
    discount: "", // Added discount field
    category: "",
    subcategory: "",
  });

  useEffect(() => {
    if (filteredProduct) {
      setFormdata({
        name: filteredProduct.product_name || "",
        size: Array.isArray(filteredProduct.size)
          ? filteredProduct.size
          : filteredProduct.size
          ? filteredProduct.size.split(",")
          : [],
        color: Array.isArray(filteredProduct.color)
          ? filteredProduct.color
          : filteredProduct.color
          ? filteredProduct.color.split(",")
          : [],
        regularprize: filteredProduct.regular_price || "",
        saleprize: filteredProduct.sale_price || "",
        gst: filteredProduct.gst || "",
        weight: filteredProduct.weight_gram || "",
        stock: filteredProduct.stock || "",
        countryorigin: filteredProduct.country_origin || "",
        fabric: filteredProduct.fabric || "",
        fitshape: filteredProduct.fit_shape || "",
        nack: filteredProduct.neck || "",
        quantity: filteredProduct.net_quantity || "",
        occupation: filteredProduct.occupation || "",
        patent: filteredProduct.patent || "",
        patenttype: filteredProduct.print_of_patent_type || "",
        sleevelength: filteredProduct.sleeve_length || "",
        chestsize: filteredProduct.chest_size || "",
        lengthsize: filteredProduct.length_size || "",
        designname: filteredProduct.design_name || "",
        sku: filteredProduct.sku || "",
        brandname: filteredProduct.brand_name || "",
        productdesc: filteredProduct.product_description || "",
        length: filteredProduct.length || "",
        noofpocket: filteredProduct.number_of_pockets || "",
        sleevestyle: filteredProduct.sleeve_style || "",
        productid: filteredProduct.product_id || "",
        stretchability: filteredProduct.stretchability || "",
        productphoto: filteredProduct.images || [],
        discount: filteredProduct.discount || "",
        category: filteredProduct.category || "",
        subcategory: filteredProduct.subcategory || "",
      });
    }
  }, [filteredProduct]);

  const handleSizeChange = (event) => {
    const {
      target: { value },
    } = event;
    setFormdata({
      ...formdata,
      size: typeof value === "string" ? value.split(",") : value,
    });
  };

  const handleColorChange = (event) => {
    const {
      target: { value },
    } = event;
    setFormdata({
      ...formdata,
      color: typeof value === "string" ? value.split(",") : value,
    });
  };

  const handleImageUpload = (e) => {
    const files = e.target.files;

    setFormdata((prevData) => ({
      ...prevData,
      productphoto: [...prevData.productphoto, ...files],
    }));
  };
  const handleRemoveImage = (index) => {
    const updatedImages = [...formdata.productphoto];
    updatedImages.splice(index, 1);
    setFormdata({ ...formdata, productphoto: updatedImages });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = useCallback(() => {
    setOpen(false);
    setActiveStep(0);
    setKey((prevKey) => prevKey + 1);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormdata({
      ...formdata,
      [name]: value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      // Ensure all fields are properly formatted
      const updatedFormData = {
        ...formdata,
        regularprize: formdata.regularprize.toString(),
        saleprize: formdata.saleprize.toString(),
        gst: formdata.gst.toString(),
        weight: formdata.weight.toString(),
        noofpocket: formdata.noofpocket.toString(),
        discount: formdata.discount.toString(),
      };

      await toast.promise(
        updateProduct({ id, productData: updatedFormData }),
        {
          loading: "Updating Product...",
          success: (response) => {
            // console.log(response);
            handleClose();
            // Update the context with the new product data
            context.setGetdata((prevData) =>
              prevData.map((product) =>
                product.product_id === id
                  ? { ...product, ...updatedFormData }
                  : product
              )
            );
            return `${response.data.message}`;
          },
          error: (error) => {
            return `${error.message}`;
          },
        },
        {
          style: {
            backgroundColor: "#064C3A",
            color: "#FFFFFF",
            fontFamily: "signika",
          },
          position: "bottom-right",
        }
      );
    } catch (error) {
      console.error("Error occurred:", error);
    }
  };

  if (!filteredProduct) {
    return <div>Loading...</div>;
  }

  return (
    <div key={key}>
      <button
        className="border-2 border-green-700 border-dashed rounded-lg p-2"
        onClick={handleClickOpen}
      >
        <FaEdit size={20} color="green" />
      </button>
      <Dialog open={open} onClose={handleClose} maxWidth="lg" fullWidth>
        <DialogTitle>
          Edit Product
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers sx={{ paddingBlock: "0px" }}>
          <Box className="w-full h-full flex flex-col">
            {/* Stepper at the top */}
            <Box
              className="sticky top-0 z-[1000] bg-white mb-10 pt-4
            "
            >
              <Stepper
                alternativeLabel
                activeStep={activeStep}
                connector={<ColorlibConnector />}
                className="mt-4"
              >
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel StepIconComponent={ColorlibStepIcon}>
                      {label}
                    </StepLabel>
                  </Step>
                ))}
              </Stepper>
            </Box>

            {/* Scrollable content in the middle */}
            <Box className="grow-[1] overflow-y-auto p-4">
              <Grid container spacing={2}>
                {activeStep === 0 && (
                  <BasicInformation
                    formdata={formdata}
                    setFormdata={setFormdata}
                    handleSizeChange={handleSizeChange}
                    handleColorChange={handleColorChange}
                  />
                )}
                {activeStep === 1 && (
                  <PricingStock formdata={formdata} setFormdata={setFormdata} />
                )}
                {activeStep === 2 && (
                  <ProductDetails
                    formdata={formdata}
                    setFormdata={setFormdata}
                  />
                )}
                {activeStep === 3 && (
                  <ImagesUpload
                    formdata={formdata}
                    handleImageUpload={handleImageUpload}
                    handleRemoveImage={handleRemoveImage}
                    popup={true}
                  />
                )}
              </Grid>
            </Box>

            {/* Button section at the bottom */}
            <Box className="sticky bottom-0 z-[1000] bg-white p-2 sm:p-4 flex flex-col sm:flex-row justify-between gap-2 sm:gap-4">
              <button
                disabled={activeStep <= 0}
                onClick={() => setActiveStep((prevStep) => prevStep - 1)}
                className="w-full sm:w-auto bg-red-700 text-white uppercase tracking-wider py-2 px-4 sm:py-3 sm:px-10 text-sm sm:text-base cursor-pointer rounded-lg border-2 border-dashed border-red-700 shadow-md transition-colors duration-400 hover:bg-[#fff] hover:text-red-700 active:bg-white active:text-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Back
              </button>
              {activeStep === steps.length - 1 ? (
                <button
                  onClick={submitHandler}
                  className="w-full sm:w-auto bg-bg-green text-white uppercase tracking-wider py-2 px-4 sm:py-3 sm:px-10 text-sm sm:text-base cursor-pointer rounded-lg border-2 border-dashed border-bg-green shadow-md transition-colors duration-400 hover:bg-[#fff] hover:text-bg-green active:bg-white"
                >
                  Update
                </button>
              ) : (
                <button
                  onClick={() => setActiveStep((prevStep) => prevStep + 1)}
                  className="w-full sm:w-auto bg-bg-green text-white uppercase tracking-wider py-2 px-4 sm:py-3 sm:px-10 text-sm sm:text-base cursor-pointer rounded-lg border-2 border-dashed border-bg-green shadow-md transition-colors duration-400 hover:bg-[#fff] hover:text-bg-green active:bg-white"
                >
                  Next
                </button>
              )}
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EditProduct;
