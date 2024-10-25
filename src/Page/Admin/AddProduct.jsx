/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import {
  addProduct,
  updateProduct,
} from "../../Services/Operations/ProductServices";
import toast from "react-hot-toast";

import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Grid from "@mui/material/Grid";

import BasicInformation from "../../Components/AddProduct/BasicInformation";
import PricingStock from "../../Components/AddProduct/PricingStock";
import ProductDetails from "../../Components/AddProduct/ProductDetails";
import ImagesUpload from "../../Components/AddProduct/ImagesUpload";

import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import Check from "@mui/icons-material/Check";
import InfoRoundedIcon from "@mui/icons-material/InfoRounded";
import WarehouseRoundedIcon from "@mui/icons-material/WarehouseRounded";
import ProductionQuantityLimitsRoundedIcon from "@mui/icons-material/ProductionQuantityLimitsRounded";
import CollectionsRoundedIcon from "@mui/icons-material/CollectionsRounded";
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
import {
  ColorlibConnector,
  ColorlibStepIcon,
} from "../../Components/AddProduct/StepperFormIcons";

const AddProduct = ({ product }) => {
  const steps = [
    "Basic Information",
    "Pricing and Stock",
    "Product Details",
    "Image Upload",
  ];

  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState({});
  const [formdata, setFormdata] = useState({
    name: product?.name || "",
    size: product?.size || [],
    regularprize: product?.regularprize || "",
    saleprize: product?.saleprize || "",
    weight: product?.weight || "",
    stock: product?.stock || "",
    countryorigin: product?.countryorigin || "",
    fabric: product?.fabric || "",
    fitshape: product?.fitshape || "",
    nack: product?.nack || "",
    quantity: product?.quantity || "",
    occupation: product?.occupation || "",
    patent: product?.patent || "",
    patenttype: product?.patenttype || "",
    sleevelength: product?.sleevelength || "",
    chestsize: product?.chestsize || "",
    lengthsize: product?.lengthsize || "",
    designname: product?.designname || "",
    sku: product?.sku || "",
    brandname: product?.brandname || "",
    productdesc: product?.productdesc || "",
    noofpocket: product?.noofpocket || "",
    sleevestyle: product?.sleevestyle || "",
    productid: product?.productid || "",
    stretchability: product?.stretchability || "",
    productphoto: product?.productphoto || [],
    category: product?.category || "",
    subcategory: product?.subcategory || "",
  });

  const [errors, setErrors] = useState({});
  const [isStepValid, setIsStepValid] = useState(false);

  useEffect(() => {
    validateStep(activeStep);
  }, [formdata, activeStep]);

  const validateStep = (step) => {
    let stepErrors = {};
    let isValid = true;

    switch (step) {
      case 0: // Basic Information
        if (!formdata.name.trim()) stepErrors.name = "Product name is required";
        if (formdata.size.length === 0)
          stepErrors.size = "At least one size is required";
        // Add more validations for Basic Information fields
        break;
      case 1: // Pricing and Stock
        if (!formdata.regularprize)
          stepErrors.regularprize = "Regular prize is required";
        break;
      case 2: // Product Details
        if (!formdata.countryorigin.trim())
          stepErrors.countryorigin = "Country of origin is required";
        else if (!formdata.stretchability.trim())
          stepErrors.stretchability = "Stretchability is required";
        break;
      case 3: // Image Upload
        if (formdata.productphoto.length === 0)
          stepErrors.images = "At least one image is required";
        break;
    }

    setErrors(stepErrors);
    isValid = Object.keys(stepErrors).length === 0;
    setIsStepValid(isValid);
    return isValid;
  };

  const totalSteps = () => steps.length;
  const completedSteps = () => Object.keys(completed).length;
  const isLastStep = () => activeStep === totalSteps() - 1;
  const allStepsCompleted = () => completedSteps() === totalSteps();

  const handleNext = () => {
    if (validateStep(activeStep)) {
      const newActiveStep =
        isLastStep() && !allStepsCompleted()
          ? steps.findIndex((step, i) => !(i in completed))
          : activeStep + 1;
      setActiveStep(newActiveStep);
    }
  };

  const handleBack = () =>
    setActiveStep((prevActiveStep) => prevActiveStep - 1);

  const handleStep = (step) => () => setActiveStep(step);

  const handleComplete = () => {
    setCompleted({
      ...completed,
      [activeStep]: true,
    });
    handleNext();
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      if (product) {
        // Editing product
        await toast.promise(
          updateProduct({ id: product.id, productData: formdata }),
          {
            loading: "Updating....",
            success: "Product updated successfully!",
            error: (error) => `${error.message}`,
          },
          {
            position: "bottom-right", // Set toast position here
          },
          {
            style: {
              fontFamily: "'Poppins', sans-serif",
              fontSize: "14px",
              fontWeight: "400",
              lineHeight: "1.5",
            },
          }
        );
      } else {
        // Adding new product
        await toast.promise(
          addProduct({ productData: formdata }),
          {
            loading: "Processing....",
            success: "Product added successfully!",
            error: (error) => `${error.message}`,
          },
          {
            position: "bottom-right", // Set toast position here
          }
        );

        // Reload the page after successful product addition
        window.location.reload();
      }
    } catch (error) {
      console.error("Submit failed:", error);
    }
  };

  const handleImageUpload = (event) => {
    const files = event.target.files;
    const imagesArray = Array.from(files);
    setFormdata((prevProduct) => ({
      ...prevProduct,
      productphoto: prevProduct.productphoto.concat(imagesArray),
    }));
  };

  const handleRemoveImage = (index) => {
    const updatedImages = [...formdata.productphoto];
    updatedImages.splice(index, 1);
    setFormdata({ ...formdata, productphoto: updatedImages });
  };

  const handleSizeChange = (event) => {
    const {
      target: { value },
    } = event;
    setFormdata({
      ...formdata,
      size: typeof value === "string" ? value.split(",") : value,
    });
  };

  return (
    <Box className="w-full h-[93vh] flex flex-col font-dm-sans">
      <Box className="sticky top-0 z-30 bg-white mb-4 sm:mb-10 p-2 sm:p-4">
        <Stepper
          alternativeLabel
          activeStep={activeStep}
          connector={<ColorlibConnector />}
        >
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel StepIconComponent={ColorlibStepIcon}>
                <span className="hidden sm:inline">{label}</span>
              </StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>

      {/* Scrollable content in the middle */}
      <Box className="grow overflow-y-auto p-2 sm:p-4 font-dm-sans">
        <Grid container spacing={2}>
          {activeStep === 0 && (
            <BasicInformation
              formdata={formdata}
              setFormdata={setFormdata}
              handleSizeChange={handleSizeChange}
            />
          )}
          {activeStep === 1 && (
            <PricingStock formdata={formdata} setFormdata={setFormdata} />
          )}
          {activeStep === 2 && (
            <ProductDetails formdata={formdata} setFormdata={setFormdata} />
          )}
          {activeStep === 3 && (
            <ImagesUpload
              formdata={formdata}
              handleImageUpload={handleImageUpload}
              handleRemoveImage={handleRemoveImage}
            />
          )}
        </Grid>
      </Box>

      {/* Button section at the bottom */}
      <Box className="sticky bottom-0 z-30 bg-white p-2 sm:p-4 flex flex-col sm:flex-row justify-between gap-2 sm:gap-4">
        <button
          disabled={activeStep <= 0}
          onClick={handleBack}
          className="w-full sm:w-auto bg-red-700 text-white uppercase tracking-wider py-2 px-4 sm:py-3 sm:px-10 cursor-pointer rounded-lg border-2 border-dashed border-red-700 shadow-md transition-colors duration-400 hover:bg-[#fff] hover:text-red-700 active:bg-white active:text-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Back
        </button>
        {activeStep === steps.length - 1 ? (
          <button
            onClick={submitHandler}
            disabled={!isStepValid}
            className={`w-full sm:w-auto bg-bg-green text-white uppercase tracking-wider py-2 px-4 sm:py-3 sm:px-10 cursor-pointer rounded-lg border-2 border-dashed border-bg-green shadow-md transition-colors duration-400 hover:bg-[#fff] hover:text-bg-green active:bg-white ${
              !isStepValid ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {product ? "Update" : "Submit"}
          </button>
        ) : (
          <button
            onClick={handleNext}
            disabled={!isStepValid}
            className={`w-full sm:w-auto bg-bg-green text-white uppercase tracking-wider py-2 px-4 sm:py-3 sm:px-10 cursor-pointer rounded-lg border-2 border-dashed border-bg-green shadow-md transition-colors duration-400 hover:bg-[#fff] hover:text-bg-green active:bg-white ${
              !isStepValid ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            Next
          </button>
        )}
      </Box>
    </Box>
  );
};

export default AddProduct;
