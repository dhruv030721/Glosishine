/* eslint-disable no-unused-vars */
import { useState } from "react";
import { addProduct } from "../../Services/Operations/ProductServices";
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

const AddProduct = () => {
  const QontoConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
      top: 10,
      left: "calc(-50% + 16px)",
      right: "calc(50% + 16px)",
    },
    [`&.${stepConnectorClasses.active}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        borderColor: "#784af4",
      },
    },
    [`&.${stepConnectorClasses.completed}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        borderColor: "#784af4",
      },
    },
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: "#eaeaf0",
      borderTopWidth: 3,
      borderRadius: 1,
      ...theme.applyStyles("dark", {
        borderColor: theme.palette.grey[800],
      }),
    },
  }));

  const QontoStepIconRoot = styled("div")(({ theme }) => ({
    color: "#eaeaf0",
    display: "flex",
    height: 22,
    alignItems: "center",
    "& .QontoStepIcon-completedIcon": {
      color: "#784af4",
      zIndex: 1,
      fontSize: 18,
    },
    "& .QontoStepIcon-circle": {
      width: 8,
      height: 8,
      borderRadius: "50%",
      backgroundColor: "currentColor",
    },
    ...theme.applyStyles("dark", {
      color: theme.palette.grey[700],
    }),
    variants: [
      {
        props: ({ ownerState }) => ownerState.active,
        style: {
          color: "#784af4",
        },
      },
    ],
  }));

  function QontoStepIcon(props) {
    const { active, completed, className } = props;

    return (
      <QontoStepIconRoot ownerState={{ active }} className={className}>
        {completed ? (
          <Check className="QontoStepIcon-completedIcon" />
        ) : (
          <div className="QontoStepIcon-circle" />
        )}
      </QontoStepIconRoot>
    );
  }

  QontoStepIcon.propTypes = {
    /**
     * Whether this step is active.
     * @default false
     */
    active: PropTypes.bool,
    className: PropTypes.string,
    /**
     * Mark the step as completed. Is passed to child components.
     * @default false
     */
    completed: PropTypes.bool,
  };

  const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
      top: 22,
    },
    [`&.${stepConnectorClasses.active}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        backgroundImage:
          "linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)",
      },
    },
    [`&.${stepConnectorClasses.completed}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        backgroundImage:
          "linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)",
      },
    },
    [`& .${stepConnectorClasses.line}`]: {
      height: 3,
      border: 0,
      backgroundColor: "#eaeaf0",
      borderRadius: 1,
      ...theme.applyStyles("dark", {
        backgroundColor: theme.palette.grey[800],
      }),
    },
  }));

  const ColorlibStepIconRoot = styled("div")(({ theme }) => ({
    backgroundColor: "#ccc",
    zIndex: 1,
    color: "#fff",
    width: 50,
    height: 50,
    display: "flex",
    borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center",
    ...theme.applyStyles("dark", {
      backgroundColor: theme.palette.grey[700],
    }),
    variants: [
      {
        props: ({ ownerState }) => ownerState.active,
        style: {
          backgroundImage:
            "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
          boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
        },
      },
      {
        props: ({ ownerState }) => ownerState.completed,
        style: {
          backgroundImage:
            "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
        },
      },
    ],
  }));

  function ColorlibStepIcon(props) {
    const { active, completed, className } = props;

    const icons = {
      1: <InfoRoundedIcon />,
      2: <WarehouseRoundedIcon />,
      3: <ProductionQuantityLimitsRoundedIcon />,
      4: <CollectionsRoundedIcon />,
    };

    return (
      <ColorlibStepIconRoot
        ownerState={{ completed, active }}
        className={className}
      >
        {icons[String(props.icon)]}
      </ColorlibStepIconRoot>
    );
  }

  ColorlibStepIcon.propTypes = {
    /**
     * Whether this step is active.
     * @default false
     */
    active: PropTypes.bool,
    className: PropTypes.string,
    /**
     * Mark the step as completed. Is passed to child components.
     * @default false
     */
    completed: PropTypes.bool,
    /**
     * The label displayed in the step icon.
     */
    icon: PropTypes.node,
  };

  const steps = [
    "Basic Information",
    "Pricing and Stock",
    "Product Details",
    "Image Upload",
  ];

  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState({});
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

  const totalSteps = () => steps.length;
  const completedSteps = () => Object.keys(completed).length;
  const isLastStep = () => activeStep === totalSteps() - 1;
  const allStepsCompleted = () => completedSteps() === totalSteps();

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
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
      await toast.promise(addProduct({ productData: formdata }), {
        loading: "Processing....",
        success: (response) => `${response.data.message}`,
        error: (error) => `${error.message}`,
      });
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
    <Box className="w-full h-[93vh] flex flex-col">
      {/* Stepper at the top */}
      <Box className="sticky top-0 z-[1000] bg-white mb-10">
        <Stepper
          alternativeLabel
          activeStep={activeStep}
          connector={<ColorlibConnector />}
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
      <Box className="sticky bottom-0 z-[1000] bg-white p-4 flex justify-between">
        <button
          disabled={activeStep <= 0}
          onClick={() => setActiveStep((prevStep) => prevStep - 1)}
          className="bg-red-700 text-white uppercase tracking-wider py-3 px-10 cursor-pointer rounded-lg border-2 border-dashed border-red-700 shadow-md transition-colors duration-400 hover:bg-[#fff] hover:text-red-700 active:bg-white active:text-red-600"
        >
          Back
        </button>
        {activeStep === steps.length - 1 ? (
          <button
            onClick={submitHandler}
            className="bg-bg-green text-white uppercase tracking-wider py-3 px-10 cursor-pointer rounded-lg border-2 border-dashed border-bg-green shadow-md transition-colors duration-400 hover:bg-[#fff] hover:text-bg-green active:bg-white"
          >
            Submit
          </button>
        ) : (
          <button
            onClick={() => setActiveStep((prevStep) => prevStep + 1)}
            className="bg-bg-green text-white uppercase tracking-wider py-3 px-10 cursor-pointer rounded-lg border-2 border-dashed border-bg-green shadow-md transition-colors duration-400 hover:bg-[#fff] hover:text-bg-green active:bg-white"
          >
            Next
          </button>
        )}
      </Box>
    </Box>
  );
};

export default AddProduct;
