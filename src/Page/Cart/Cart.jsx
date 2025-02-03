/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import { MdOutlineChevronRight } from "react-icons/md";
import { Form, Link, useNavigate } from "react-router-dom";
import brand from "../../assets/brand.svg";
import info from "../../assets/info.svg";
import { RiShare2Line } from "react-icons/ri";
import order from "../../assets/order.png";
import payment from "../../assets/payment.png";
import discount from "../../assets/discount.webp";
import { IoAdd } from "react-icons/io5";
import { FiHeart } from "react-icons/fi";
import { IoRemove } from "react-icons/io5";
import { IoCloudUploadOutline } from "react-icons/io5";
import ratingimage from "../../assets/ratingimage.png";
import summar1 from "../../assets/summar1.jpg";
import summar2 from "../../assets/summar2.jpg";
import BuyNow from "../../Components/BuyNow/BuyNow";
import { useParams } from "react-router-dom";
import { AppContext } from "../../App";
import {
  addFavProduct,
  addReview,
  deleteFavProduct,
  getFavProduct,
  getReview,
} from "../../Services/Operations/ProductServices";
import toast from "react-hot-toast";
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  addProduct,
  removeFromWatchlist,
  setWatchlist,
} from "../../Slice/watchlistSlice"; // Adjust the path as needed
import IconDelivery from "../../assets/icon-delivery.svg";
import IconReturn from "../../assets/Icon-return.svg";
import IconSecure from "../../assets/Icon-secure.svg";
import "./Cart.css";
import { FaHeart } from "react-icons/fa6";
import { addItemAsync } from "../../Slice/CartSlice";
import { updateQuantityAsync } from "../../Slice/CartSlice";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { ring2 } from "ldrs";
import { Carousel } from "@material-tailwind/react";
import ProductList from "../../Components/ProductList/ProductList";
import { fetchCartItemsAsync } from "../../Slice/CartSlice";
import { FaTrash } from "react-icons/fa";
import ProductDetailsCard from "../../Components/ProductList/ProductDetailsCard";

const Cart = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const Appcontext = useContext(AppContext);
  const userContext = useContext(AppContext);

  // Debugging: Log filterdata to check its value
  const filterdata = Appcontext.getdata.filter(
    (item) => item.product_id === id
  );
  // console.log("Filter Data:", filterdata);

  // Convert size string to an array
  const availableSizes = filterdata[0]?.size
    ? filterdata[0].size.split(",")
    : [];

  // Debugging: Log availableSizes to check its value
  // console.log("Available Sizes:", availableSizes);

  const [value, setValue] = useState(1);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [reviewData, setReviewData] = useState([]);
  const [selectedSize, setSelectedSize] = useState("");
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [activeButton, setActiveButton] = useState("shipping");
  const sizes = ["S", "M", "L", "XL"];
  const [formdata, setFormdata] = useState({
    name: "",
    title: "",
    review: "",
    reviewimage: [],
  });
  const watchlist = useSelector((state) => state.watchlist);
  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const [favProductId, setFavProductId] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const allProducts = Appcontext.getdata;
  const relatedProducts = allProducts
    .filter((product) => product.category === filterdata[0].category)
    .slice(0, 5);
  const navigate = useNavigate();
  ring2.register();

  const [deliveryDates, setDeliveryDates] = useState({ start: "", end: "" });

  useEffect(() => {
    const email = userContext?.user?.[0]?.email;
    const calculateDeliveryDates = () => {
      const today = new Date();
      const startDate = new Date(today.setDate(today.getDate() + 3));
      const endDate = new Date(today.setDate(today.getDate() + 4)); // This will be 7 days from the original date

      const formatDate = (date) => {
        const options = { weekday: "long", month: "long", day: "numeric" };
        return date.toLocaleDateString("en-US", options);
      };

      setDeliveryDates({
        start: formatDate(startDate),
        end: formatDate(endDate),
      });
    };

    calculateDeliveryDates();
  }, []);

  const handleImageUpload = (event) => {
    const files = event.target.files;
    const imagesArray = Array.from(files);

    setFormdata((prevProduct) => ({
      ...prevProduct,
      reviewimage: prevProduct.reviewimage.concat(imagesArray),
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await toast.promise(
        addReview({ productData: formdata }, id, rating),
        {
          loading: "Processing....",
          success: (response) => {
            return `${response.data.message}`;
          },
          error: (error) => {
            return `${error.message}`;
          },
        },
        {
          position: "bottom-right", // Set toast position here
        },
        {
          style: {
            backgroundColor: "#064C3A",
            color: "#FFFFFF",
            fontFamily: "signika",
            fontSize: "14px",
            fontWeight: "400",
            lineHeight: "1.5",
          },
        }
      );
    } catch (error) {
      console.error("Loggedin failed:", error);
    }
  };

  const handleButtonClick = (size) => {
    setSelectedSize(size);
  };

  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
  };
  useEffect(() => {}, []);

  // const buttonStyles = (buttonType) => {
  //   return activeButton === buttonType
  //     ? "w-[35%] p-3 bg-white text-black"
  //     : "w-[35%] p-3 bg-gray-600 text-white";
  // };

  // const renderContent = () => {
  //   switch (activeButton) {
  //     case "shipping":
  //       return (
  //         <>
  //           <p>All Orders are usually shipped within 48 hours.</p>
  //           <p>
  //             COD orders will be shipped only if order confirmation is given via
  //             WhatsApp/Phone.
  //           </p>
  //           <p>
  //             <a href="#">For more details click here</a>
  //           </p>
  //         </>
  //       );
  //     case "returnPolicy":
  //       return (
  //         <>
  //           <p>
  //             We offer 7 days hassle-free returns & exchange from the date of
  //             delivery. We DO NOT offer reverse pick-up services. You'll have to
  //             courier the product(s) to the following address: No.7, Ground
  //             Floor, Uniform Factory, 6th Cross, H Siddaiah Road, Sudhamanagar,
  //             Bengaluru - 560027
  //           </p>
  //           <p>
  //             <a href="#">For more about Return & Exchange Policy click here</a>
  //           </p>
  //         </>
  //       );
  //     case "placeReturn":
  //       return (
  //         <>
  //           <p>
  //             To place any return/exchange, <a href="#">Click here</a>
  //           </p>
  //         </>
  //       );
  //     default:
  //       return null;
  //   }
  // };

  // const addToCartHandler = (id) => {
  //   if (Appcontext.CartProducts.map((item) => item.product_id !== id)) {
  //     const product = Appcontext.getdata.find((item) => item.product_id === id);
  //     product.quantity = 1;
  //     Appcontext.setCartProducts([...Appcontext.CartProducts, product]);
  //     Appcontext.setIsDrawerOpen(true);
  //   } else {
  //     Appcontext.setIsDrawerOpen(true);
  //   }
  // };

  // const handleIncrement = (productId) => {
  //   dispatch(updateQuantityAsync({ email, id: productId, delta: 1 }));
  // };

  // const handleDecrement = (productId) => {
  //   dispatch(updateQuantityAsync({ email, id: productId, delta: -1 }));
  // };

  const handleAddToCart = async (item, quantity) => {
    if (!selectedSize) {
      toast.error("Please select a size before adding to cart", {
        style: {
          backgroundColor: "#064C3A",
          color: "#FFFFFF",
          fontFamily: "signika",
        },
        position: "bottom-right",
      });
      return false;
    }

    try {
      if (userContext?.user?.[0]?.email) {
        const itemToAdd = {
          email: userContext.user[0].email ? userContext.user[0].email : "",
          product_id: item.product_id,
          quantity: quantity.toString(),
          size: selectedSize,
        };
        await dispatch(addItemAsync(itemToAdd)).unwrap();
        // Fetch updated cart items after adding
        await dispatch(fetchCartItemsAsync(userContext.user[0].email));
        toast.success("Item added to cart", {
          style: {
            backgroundColor: "#064C3A",
            color: "#FFFFFF",
            fontFamily: "signika",
          },
          position: "bottom-right",
        });
        return true;
      } else {
        throw new Error("User not logged in!");
      }
    } catch (error) {
      console.error("Failed to add item to cart:", error.message);
      if (error?.message.includes("Insufficient")) {
        toast.error("Insufficient Product Stock! Try again later", {
          style: {
            backgroundColor: "#064C3A",
            color: "#FFFFFF",
            fontFamily: "signika",
          },
          position: "bottom-right",
        });
      } else if (error?.message.includes("User not logged in!")) {
        toast.error("Please log in to add items to cart", {
          style: {
            backgroundColor: "#064C3A",
            color: "#FFFFFF",
            fontFamily: "signika",
          },
          position: "bottom-right",
        });
      } else if (error.message.includes("Product already exists in the cart")) {
        toast.error("Product already exists in the cart", {
          style: {
            backgroundColor: "#064C3A",
            color: "#FFFFFF",
            fontFamily: "signika",
          },
          position: "bottom-right",
        });
      } else {
        toast.error("Failed to add item to cart! Try again later", {
          style: {
            backgroundColor: "#064C3A",
            color: "#FFFFFF",
            fontFamily: "signika",
          },
          position: "bottom-right",
        });
      }
      return false;
    }
  };

  const handleBuyNow = async (item, quantity) => {
    const success = await handleAddToCart(item, quantity);
    if (success) {
      navigate("/cart");
    }
  };

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getReview(id);
        setReviewData(data.data.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    const checkWatchlistStatus = async () => {
      // Only proceed if user email is available
      if (userContext?.user?.[0]?.email && filterdata?.[0]?.product_id) {
        try {
          const favProducts = await getFavProduct(userContext.user[0].email);

          if (Array.isArray(favProducts.data.data)) {
            const favProduct = favProducts.data.data.find(
              (favItem) => favItem.product_id === filterdata[0].product_id
            );

            if (favProduct) {
              setIsInWatchlist(true);
              setFavProductId(favProduct.id);
            } else {
              setIsInWatchlist(false);
            }
          }
        } catch (error) {
          console.error("Error fetching favorite products:", error);
        }
      }
    };

    fetchData();
    checkWatchlistStatus();
  }, [userContext]); // Dependencies include user context and filterdata

  const handleClick = async () => {
    if (!userContext?.user?.[0]?.email) {
      toast.error("Please log in to manage your watchlist", {
        style: {
          backgroundColor: "#064C3A",
          color: "#FFFFFF",
          fontFamily: "signika",
        },
        position: "bottom-right",
      });
      return;
    }

    if (isInWatchlist) {
      try {
        await toast.promise(
          deleteFavProduct(filterdata[0].product_id, userContext.user[0].email),
          {
            loading: "Removing product from watchlist...",
            success: "Product removed from watchlist!",
            error: "Failed to remove product from watchlist.",
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
        dispatch(removeFromWatchlist(filterdata[0].product_id));
        setIsInWatchlist(false);
      } catch (error) {
        console.error("Error:", error);
      }
    } else {
      try {
        const response = await addFavProduct(
          userContext.user[0].email,
          filterdata[0].product_id
        );

        // The response data is nested inside response.data
        // console.log(response, "response received");
        if (response?.success) {
          toast.success(response?.message || "Product added to watchlist!", {
            style: {
              backgroundColor: "#064C3A",
              color: "#FFFFFF",
              fontFamily: "signika",
            },
            position: "bottom-right",
          });

          dispatch(addProduct(filterdata[0]));
          setIsInWatchlist(true);
        } else {
          throw new Error(
            response?.data?.message || "Failed to add product to watchlist"
          );
        }
      } catch (error) {
        console.error("Error:", error);
        toast.error(error.message || "Failed to add product to watchlist", {
          style: {
            backgroundColor: "#064C3A",
            color: "#FFFFFF",
            fontFamily: "signika",
          },
          position: "bottom-right",
        });
      }
    }
  };

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => {
      const nextIndex = prevIndex + 2;
      return nextIndex >= filterdata[0].images.length ? 0 : nextIndex;
    });
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => {
      const nextIndex = prevIndex - 2;
      return nextIndex < 0
        ? Math.max(filterdata[0].images.length - 2, 0)
        : nextIndex;
    });
  };

  return (
    <div className="w-full">
      {loading ? (
        <div className="flex flex-col justify-center items-center h-screen relative overflow-hidden">
          <l-ring-2
            size="40"
            bg-opacity="0.2"
            speed="0.5"
            color="rgb(6,68,59)"
            className="w-1/6 sm:w-1/12 md:w-1/10 lg:w-1/10 xl:w-1/20 2xl:w-1/24"
          ></l-ring-2>
        </div>
      ) : (
        filterdata.map((item) => (
          <>
            <div className="w-full font-signika mt-5 px-4 lg:px-10 mb-5 flex flex-row h-10 items-center gap-x-3 overflow-x-auto whitespace-nowrap overflow-y-hidden">
              <Link to="/">Home</Link>
              <MdOutlineChevronRight
                className="h-full flex items-center mt-1"
                size={17}
              />
              <Link to={`/category/${item.category}`}>
                {item.category.charAt(0) + item.category.slice(1).toLowerCase()}
              </Link>
              {item.subcategory && (
                <>
                  <MdOutlineChevronRight
                    className="h-full flex items-center mt-1"
                    size={17}
                  />
                  <Link to={`/category/${item.category}/${item.subcategory}`}>
                    {item.subcategory.charAt(0) +
                      item.subcategory.slice(1).toLowerCase()}
                  </Link>
                </>
              )}
            </div>
            <div className="w-full flex flex-col lg:flex-row">
              <div className="w-full lg:w-[60%] h-full px-4 lg:px-10 relative">
                <Carousel
                  showArrows={true}
                  showStatus={false}
                  showThumbs={false}
                  infiniteLoop={true}
                  prevArrow={({ handlePrev }) => (
                    <button
                      onClick={handlePrev}
                      className="absolute text-white left-2 top-1/2 transform -translate-y-1/2 bg-bg-green bg-opacity-50 hover:bg-opacity-100 transition-all duration-200 rounded-full p-1 z-10"
                    >
                      <MdChevronLeft size={24} />
                    </button>
                  )}
                  nextArrow={({ handleNext }) => (
                    <button
                      onClick={handleNext}
                      className="absolute text-white right-2 top-1/2 transform -translate-y-1/2 bg-bg-green bg-opacity-50 hover:bg-opacity-100 transition-all duration-200 rounded-full p-1 z-10"
                    >
                      <MdChevronRight size={24} />
                    </button>
                  )}
                  className="md:hidden" // Hide on larger screens
                >
                  {item.images.map((image, index) => (
                    <div key={index}>
                      <img
                        src={image}
                        alt=""
                        className="w-full h-auto object-cover"
                      />
                    </div>
                  ))}
                </Carousel>
                <div className="hidden md:grid grid-cols-2 gap-3">
                  {item.images
                    .slice(currentImageIndex, currentImageIndex + 2)
                    .map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt=""
                        className="w-full h-auto object-cover"
                      />
                    ))}
                </div>
                {item.images.length > 2 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="hidden md:block absolute left-12 top-1/2 transform -translate-y-1/2 opacity-50 bg-bg-green hover:opacity-100 text-white rounded-full p-2 shadow-md"
                    >
                      <MdChevronLeft size={24} />
                    </button>
                    <button
                      onClick={nextImage}
                      className="hidden md:block absolute right-12 top-1/2 transform -translate-y-1/2 opacity-50 bg-bg-green hover:opacity-100 text-white rounded-full p-2 shadow-md"
                    >
                      <MdChevronRight size={24} />
                    </button>
                  </>
                )}
              </div>
              <div className="w-full lg:w-[40%] px-5 lg:pr-10">
                <div data-aos="fade-up" data-aos-duration="1000">
                  <h1 className="text-2xl font-signika font-semibold">
                    {item.product_name}
                  </h1>
                  <div className="flex flex-row font-signika gap-x-3 mt-3">
                    <span className="text-md text-green-700 font-bold">
                      ₹{item.sale_price}
                    </span>
                    <span className="text-md text-black font-bold line-through">
                      ₹{item.regular_price}
                    </span>
                    <span className="rounded-full align-middle bg-black px-2 pt-[2px] text-center text-sm font-medium text-white">
                      {item.discount}% OFF
                    </span>
                  </div>
                  <div className="hidden">
                    <p className="text-sm font-monserrat font-light mt-3">
                      Tax included.
                    </p>
                    <div className="flex flex-row gap-x-1">
                      <p className="mt-4 font-signika font-md">
                        Or 3 interest free payments of ₹433
                      </p>
                      <img src={brand} alt="" className="w-12 mt-4" />
                      <img src={info} alt="" className="mt-4" />
                    </div>
                    <div data-aos="zoom-in" data-aos-duration="2000">
                      <img src={payment} alt="" className="w-72 h-12" />
                    </div>
                  </div>
                  {/* <div className="mt-5 flex flex-row gap-x-3">
                  <img src={discount} alt="" className="w-6 h-6 mt-2" />
                  <p className=" text-sm font-signika">
                    Get this for Regular priceSale price
                    <span className="text-red-500">Rs. 1,169.10</span> Use Code
                    :
                    <span className="font-semibold">
                      GET10 On minimum order value of Rs.999/-
                    </span>
                  </p>
                </div>
                <div className="mt-5 flex flex-row gap-x-3">
                  <img src={discount} alt="" className="w-6 h-6 mt-2" />
                  <p className="font-signika text-sm">
                    Get this for Regular priceSale price
                    <span className="text-red-500">Rs. 1,039.20</span> Use Code
                    :
                    <span className="font-semibold">
                      GET10 On minimum order value of Rs.1999/-
                    </span>
                  </p>
                </div>
                <div className="mt-5 flex flex-row gap-x-3">
                  <img src={discount} alt="" className="w-6 h-6 mt-2" />
                  <p className="font-signika text-sm">
                    Get this for Regular priceSale price
                    <span className="text-red-500">Rs. 974.25</span> Use Code :
                    <span className="font-semibold">
                      GET10 On minimum order value of Rs.2499/-
                    </span>
                  </p>
                </div> */}
                  {/* <h1 className="mt-5 text-sm mb-1">Quantity</h1>
                <div className="py-2 px-3 inline-block bg-white border border-gray-200 rounded-lg dark:bg-neutral-900 dark:border-neutral-700">
                  <div className="flex items-center gap-x-1.5">
                    <button
                      type="button"
                      className="size-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-md bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800"
                      onClick={handleDecrement}
                      disabled={value <= 1}
                    >
                      <IoRemove />
                    </button>
                    <input
                      className="p-0 w-6 bg-transparent border-0 text-gray-800 text-center focus:ring-0 dark:text-white"
                      type="text"
                      value={value}
                      readOnly
                    />
                    <button
                      type="button"
                      className="size-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-md bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800"
                      onClick={handleIncrement}
                    >
                      <IoAdd />
                    </button>
                  </div>
                </div> */}
                  <h1 className="mt-5 text-sm mb-1">Size</h1>
                  <div className="grid grid-cols-4 md:grid-cols-7 pb-4">
                    {sizes.map((size) => (
                      <button
                        key={size}
                        className={`border border-black w-12 p-1 rounded-sm ${
                          selectedSize === size ? "bg-bg-green text-white" : ""
                        } ${
                          !availableSizes.includes(size)
                            ? "opacity-50 cursor-not-allowed"
                            : ""
                        }`}
                        onClick={() =>
                          availableSizes.includes(size) &&
                          handleButtonClick(size)
                        }
                        disabled={!availableSizes.includes(size)}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                  <div className="flex flex-col font-monserrat gap-y-2">
                    <button
                      onClick={() => handleAddToCart(item, value)}
                      className="cursor-pointer group relative flex text-black gap-1.5 p-2 items-center justify-center w-full h-12 border border-green-600 bg-opacity-80 rounded-lg hover:bg-opacity-70 transition font-semibold shadow-md"
                    >
                      Add to cart
                    </button>
                    <button
                      onClick={() => handleBuyNow(item, value)}
                      className="cursor-pointer group relative flex text-white bg-bg-green gap-1.5 p-2 items-center justify-center w-full h-12 border border-green-600 rounded-lg hover:bg-opacity-100 transition font-semibold shadow-md"
                    >
                      Buy Now
                    </button>
                    <button
                      onClick={handleClick}
                      className={`cursor-pointer group relative flex flex-row gap-x-3 text-black gap-1.5 p-2 items-center justify-center w-full h-12 border ${
                        isInWatchlist ? "border-red-600" : "border-bg-green"
                      } bg-opacity-80 rounded-lg hover:bg-opacity-70 transition font-semibold shadow-md`}
                      disabled={!userContext?.user?.[0]?.email}
                    >
                      {isInWatchlist ? (
                        <>
                          <FaHeart size={20} />
                          Remove from Watchlist
                        </>
                      ) : (
                        <>
                          <FiHeart size={20} />
                          Add to Watchlist
                        </>
                      )}
                    </button>
                  </div>
                  <ProductDetailsCard product={item} />
                  {/* <p className='text-lg font-monserrat mt-5 font-semibold'>Product Specification:</p>
                                    <div className='ml-10 font-signika mt-7'>
                                        {item.product_specification && item.product_specification.split(/,\r?\n|\r|\n/).filter(spec => spec.trim() !== "").map((spec, index) => (
                                            <p key={index}>&#x2022;<span className='ml-2 '>{spec}</span></p>
                                        ))}
                                    </div> */}
                  {/* <p className='text-md font-signika mt-5 '><span className='font-semibold mr-2'>Wash Care:</span>Cold machine wash. For more details see the wash care label attached </p>
                                    <p className='mt-5 pb-5 font-signika border-b-[1px] border-black'>The product's actual color may vary slightly due to photographic lighting sources or your device.</p>
                                    <p className='mt-5 font-signika font-semibold'>Manufactured, Marketed & Packed By Finch</p>
                                    <p className='mt-5 font-signika'>{item.manufacturing_details}</p>
                                    <p className='text-md font-signika mt-5 '><span className='font-semibold mr-2'>Country Of Origin:</span>{item.country_of_origin}</p> */}
                </div>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-4 lg:gap-7 p-4 lg:p-7">
              <div className="w-full lg:w-[60%]">
                <div className="flex flex-col sm:flex-row border-2 border-black border-dashed h-full font-signika p-4 sm:p-5 w-full gap-4 sm:gap-2">
                  <div className="flex flex-row sm:flex-col items-center sm:items-start">
                    <img
                      src={IconDelivery}
                      alt="IconDelivery"
                      className="w-12 h-12 sm:w-16 sm:h-16 mr-4 sm:mr-0 sm:mb-2"
                    />
                    <p className="font-bold">Delivery</p>
                  </div>
                  <div className="flex flex-col">
                    <li className="font-bold text-sm sm:text-base">
                      All Orders are usually shipped within 48 hours.
                    </li>
                    <li className="text-sm sm:text-base">
                      COD orders will be shipped only if order confirmation is
                      given via WhatsApp/Phone.
                    </li>
                  </div>
                </div>

                <div className="hidden flex-col sm:flex-row border-2 border-black border-dashed border-t-0 font-signika p-4 sm:p-5 w-full gap-4 sm:gap-5">
                  <div className="flex flex-row sm:flex-col items-center sm:items-start">
                    <img
                      src={IconReturn}
                      alt="IconReturn"
                      className="w-12 h-12 sm:w-16 sm:h-16 mr-4 sm:mr-0 sm:mb-2"
                    />
                    <p className="font-bold">Returns</p>
                  </div>
                  <div className="flex flex-col">
                    <li className="text-sm sm:text-base">
                      We offer 7 days hassle-free returns & exchange from the
                      date of delivery.
                    </li>
                    <li className="text-sm sm:text-base">
                      We DO NOT offer reverse pick-up services.
                    </li>
                    <li className="text-sm sm:text-base">
                      You'll have to courier the product(s) to the following
                      address: No.7, Ground Floor, Uniform Factory, 6th Cross, H
                      Siddaiah Road, Sudhamanagar, Bengaluru - 560027
                    </li>
                    <li className="text-sm sm:text-base">
                      <a href="#" className="text-blue-600 hover:underline">
                        For more about Return & Exchange Policy click here
                      </a>
                    </li>
                  </div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row justify-center items-start h-auto font-signika border-2 border-black border-dashed p-4 sm:p-5 mt-4 lg:mt-0">
                <div className="flex flex-row sm:flex-col items-start sm:items-start">
                  <img
                    src={IconSecure}
                    alt="IconSecure"
                    className="w-12 h-12 sm:w-16 sm:h-16 sm:mb-0 sm:mr-4"
                  />
                  <p className="font-bold align-top text-center md:text-left">
                    Assured Delivery
                  </p>
                </div>
                <div>
                  <li className="text-sm sm:text-base">
                    Order Now 🎁 & Get it Between 🔥
                    <span className="font-semibold block text-center sm:text-left sm:inline mt-2 sm:mt-0 w-full text-xs md:text-md sm:text-base">
                      {deliveryDates.start} - {deliveryDates.end}
                    </span>
                  </li>
                  <li className="mt-3 text-sm sm:text-base">
                    If ordered before today 11:59 PM
                  </li>
                </div>
              </div>
            </div>

            <div className="mt-7 border-black w-full hidden flex flex-col md:flex-row pl-4 pr-4 lg:pl-10 lg:pr-10 bg-yellow-100 border-b-2 border-t-2">
              <div className="w-full md:w-[50%] p-4 lg:p-10 ">
                <p className="text-black text-3xl md:text-4xl lg:text-5xl font-signika font-semibold">
                  <span className="text-yellow-600 mr-3">5000+</span>PEOPLE
                  <br /> LOVES US
                </p>
                <div className="flex flex-col mt-5">
                  <div className="flex flex-row items-center pb-5 pt-5 border-b-[1px] border-black">
                    <h1 className="text-xl md:text-2xl font-signika flex justify-start w-full">
                      Quality
                    </h1>
                    <div className="flex flex-row gap-x-1 ">
                      <FaStar size={20} className="md:size-25" />
                      <FaStar size={20} className="md:size-25" />
                      <FaStar size={20} className="md:size-25" />
                      <FaStar size={20} className="md:size-25" />
                      <FaStarHalfAlt size={20} className="md:size-25" />
                    </div>
                    <h1 className="text-xl md:text-2xl font-semibold ml-2">
                      4.8
                    </h1>
                  </div>
                  <div className="flex flex-row items-center pb-5 pt-5 border-b-[1px] border-black">
                    <h1 className="text-xl md:text-2xl font-signika flex justify-start w-full">
                      Durability
                    </h1>
                    <div className="flex flex-row gap-x-1">
                      <FaStar size={20} className="md:size-25" />
                      <FaStar size={20} className="md:size-25" />
                      <FaStar size={20} className="md:size-25" />
                      <FaStarHalfAlt size={20} className="md:size-25" />
                      <FaRegStar size={20} className="md:size-25" />
                    </div>
                    <h1 className="text-xl md:text-2xl font-semibold ml-2">
                      3.7
                    </h1>
                  </div>
                  <div className="flex flex-row items-center pb-5 pt-5 border-b-[1px] border-black">
                    <h1 className="text-xl md:text-2xl font-signika flex justify-start w-full">
                      Design
                    </h1>
                    <div className="flex flex-row gap-x-1">
                      <FaStar size={20} className="md:size-25" />
                      <FaStar size={20} className="md:size-25" />
                      <FaStar size={20} className="md:size-25" />
                      <FaStar size={20} className="md:size-25" />
                      <FaStarHalfAlt size={20} className="md:size-25" />
                    </div>
                    <h1 className="text-xl md:text-2xl font-semibold ml-2">
                      4.5
                    </h1>
                  </div>
                  <div className="flex flex-row items-center pb-5 pt-5 border-b-[1px] border-black">
                    <h1 className="text-xl md:text-2xl font-signika flex justify-start w-full">
                      Value for money
                    </h1>
                    <div className="flex flex-row gap-x-1">
                      <FaStar size={20} className="md:size-25" />
                      <FaStar size={20} className="md:size-25" />
                      <FaStar size={20} className="md:size-25" />
                      <FaStar size={20} className="md:size-25" />
                      <FaStarHalfAlt size={20} className="md:size-25" />
                    </div>
                    <h1 className="text-xl md:text-2xl font-semibold ml-2">
                      4.8
                    </h1>
                  </div>
                </div>
                <h1 className="text-lg md:text-xl font-signika mt-5">
                  Free Shipping | 100% Smile Guarantee
                </h1>
              </div>
              {/* <div className="w-full md:w-[50%] flex justify-center">
              <img src={ratingimage} alt="" className="w-full h-auto" />
            </div> */}
            </div>
            <div className="w-full pt-5 pb-5 px-4 lg:px-10 items-center flex flex-col">
              <div
                data-aos="fade-up"
                data-aos-anchor-placement="top-bottom"
                data-aos-duration="1500"
                className="w-full flex flex-col items-center"
              >
                <h1 className="text-2xl font-signika mb-4">Customer Reviews</h1>
                <div className="flex flex-row p-5">
                  <div className="flex flex-col pr-6 pt-2 pb-2 border-r-[1px] border-yellow-400">
                    <div className="flex flex-row gap-x-1">
                      <FaRegStar size={15} />
                      <FaRegStar size={15} />
                      <FaRegStar size={15} />
                      <FaRegStar size={15} />
                      <FaRegStar size={15} />
                    </div>
                    <h1 className="font-signika">
                      Be the first to write a review
                    </h1>
                  </div>
                  <div className="pl-7 mt-2">
                    <button
                      className="cursor-pointer group relative flex gap-1.5 p-2 rounded-lg items-center justify-center w-40 md:w-52 h-10 bg-bg-green bg-opacity-100 text-[#f1f1f1] hover:bg-opacity-70 transition font-semibold shadow-md"
                      onClick={toggleFormVisibility}
                    >
                      <p className={isFormVisible ? "hidden" : "block"}>
                        Write a review
                      </p>
                      <p className={isFormVisible ? "block" : "hidden"}>
                        Cancel review
                      </p>
                    </button>
                  </div>
                </div>
              </div>
              {isFormVisible && (
                <form
                  onSubmit={submitHandler}
                  className="fixed inset-0 bg-white z-50 overflow-y-auto"
                >
                  <div className="max-w-7xl mx-auto p-3 sm:p-4 lg:p-6">
                    {/* Header */}
                    <div className="flex justify-between items-center border-b pb-3 mb-4">
                      <h1 className="text-xl sm:text-2xl font-signika text-bg-green">
                        Write a review
                      </h1>
                      <button
                        type="button"
                        onClick={toggleFormVisibility}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>

                    <div className="grid grid-cols-1 text-bg-green lg:grid-cols-2 gap-4 sm:gap-6">
                      {/* Left Column */}
                      <div className="space-y-4">
                        {/* Rating */}
                        <div>
                          <h2 className="text-base font-signika mb-2">
                            Rating
                          </h2>
                          <div className="flex gap-1">
                            {[...Array(5)].map((_, index) => {
                              const ratingValue = index + 1;
                              return (
                                <label key={index} className="cursor-pointer">
                                  <input
                                    type="radio"
                                    name="rating"
                                    value={ratingValue}
                                    onClick={() => setRating(ratingValue)}
                                    className="hidden"
                                  />
                                  <div
                                    className={`transition-colors duration-200 ${
                                      ratingValue <= (hover || rating)
                                        ? "text-bg-green"
                                        : "text-gray-300"
                                    }`}
                                    onMouseEnter={() => setHover(ratingValue)}
                                    onMouseLeave={() => setHover(0)}
                                  >
                                    {ratingValue <= (hover || rating) ? (
                                      <FaStar size={28} />
                                    ) : (
                                      <FaRegStar size={28} />
                                    )}
                                  </div>
                                </label>
                              );
                            })}
                          </div>
                        </div>

                        {/* Title Input */}
                        <div>
                          <h2 className="text-base font-signika mb-1">
                            Review Title
                          </h2>
                          <input
                            className="w-full px-3 py-2 rounded-lg border-2 border-gray-200 focus:border-bg-green outline-none transition duration-200"
                            name="title"
                            placeholder="Give your review a title"
                            value={formdata.title}
                            onChange={(e) =>
                              setFormdata({
                                ...formdata,
                                title: e.target.value,
                              })
                            }
                            maxLength={100}
                          />
                        </div>

                        {/* Review Text */}
                        <div>
                          <h2 className="text-base font-signika mb-1">
                            Your Review
                          </h2>
                          <textarea
                            className="w-full px-3 py-2 rounded-lg border-2 border-gray-200 focus:border-bg-green outline-none transition duration-200 min-h-[120px]"
                            name="review"
                            placeholder="Write your review here"
                            value={formdata.review}
                            onChange={(e) =>
                              setFormdata({
                                ...formdata,
                                review: e.target.value,
                              })
                            }
                          />
                        </div>

                        {/* Name Input */}
                        <div>
                          <h2 className="text-base font-signika mb-1">
                            Your Name
                          </h2>
                          <input
                            className="w-full px-3 py-2 rounded-lg border-2 border-gray-200 focus:border-bg-green outline-none transition duration-200"
                            name="name"
                            placeholder="Enter your name (public)"
                            value={formdata.name}
                            onChange={(e) =>
                              setFormdata({ ...formdata, name: e.target.value })
                            }
                          />
                        </div>
                      </div>

                      {/* Right Column */}
                      <div>
                        <h2 className="text-base font-signika mb-2">
                          Add Photos (Required)
                        </h2>
                        <div className="border-2 border-dashed border-gray-300 flex justify-center items-center rounded-lg p-4 text-center h-[90%] hover:border-bg-green transition-colors duration-200">
                          <label
                            htmlFor="file"
                            className="cursor-pointer block"
                          >
                            <IoCloudUploadOutline
                              className="mx-auto text-bg-green"
                              size={40}
                            />
                            <p className="mt-2 text-sm text-gray-600">
                              Drag and drop your photos here or click to browse
                            </p>
                            <input
                              className="hidden"
                              name="text"
                              multiple
                              id="file"
                              onChange={handleImageUpload}
                              type="file"
                              accept="image/*"
                            />
                          </label>
                        </div>

                        {/* Image Preview Grid */}
                        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 mt-4">
                          {formdata.reviewimage.map((file, index) => (
                            <div key={index} className="relative group">
                              <img
                                src={URL.createObjectURL(file)}
                                alt={`preview ${index}`}
                                className="w-full h-20 object-cover rounded-lg"
                              />
                              <button
                                type="button"
                                onClick={() => {
                                  const newImages = formdata.reviewimage.filter(
                                    (_, i) => i !== index
                                  );
                                  setFormdata({
                                    ...formdata,
                                    reviewimage: newImages,
                                  });
                                }}
                                className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                              >
                                <FaTrash size={12} />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="mt-4 border-t pt-4 font-signika">
                      <div className="text-xs text-gray-600 space-y-1 mb-4">
                        <p>
                          • How we use your data: We'll only contact you about
                          the review you left, and only if necessary.
                        </p>
                        <p>
                          • By submitting your review, you agree to our terms
                          and conditions and privacy policy.
                        </p>
                      </div>

                      <div className="flex justify-end gap-3 font-signika">
                        <button
                          type="button"
                          onClick={toggleFormVisibility}
                          className="px-4 py-1.5 border-2 border-bg-green text-bg-green rounded-lg hover:bg-red-700 hover:text-white hover:border-red-700 transition duration-200 text-sm"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-4 py-1.5 bg-bg-green text-white rounded-lg hover:bg-opacity-90 transition duration-200 text-sm"
                        >
                          Submit Review
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              )}
              <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                {reviewData.map((item, index) => (
                  <div
                    key={index}
                    className="w-full bg-white rounded-xl shadow-md hover:shadow-lg border-2 border-bg-green transition-shadow duration-300 overflow-hidden"
                  >
                    {/* Review Header with Rating and Name */}
                    <div className="p-4 bg-gradient-to-r from-bg-green/5 bg-bg-green text-white to-transparent border-b">
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <FaStar
                              key={i}
                              size={16}
                              className={
                                i < item.rating
                                  ? "text-yellow-400"
                                  : "text-gray-300"
                              }
                            />
                          ))}
                        </div>
                        <span className="text-sm font-medium text-white">
                          {item.name}
                        </span>
                      </div>
                    </div>

                    {/* Review Content */}
                    <div className="p-4 h-auto lg:h-[70%]">
                      <h3 className="font-signika text-lg font-semibold text-bg-green mb-2 line-clamp-1">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                        {item.review}
                      </p>

                      {/* Images Grid */}
                      {item.images && (
                        <div className="grid grid-cols-3 gap-2 mt-3">
                          {item.images.split(",").map((image, idx) => (
                            <div
                              key={idx}
                              className="relative group aspect-square"
                            >
                              <img
                                src={image}
                                alt=""
                                className="w-full h-full object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
                              />
                              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 rounded-lg" />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Review Footer */}
                    <div className="px-4 py-3 bg-gray-50 text-xs text-bg-green border-t-2 border-dashed border-bg-green">
                      <time dateTime={item.created_at}>
                        {new Date(item.created_at).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </time>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-7">
              <h1 className="text-2xl font-semibold ml-5 font-signika">
                Related Products
              </h1>
              <div className="w-full p-5">
                <div
                  data-aos="fade-up"
                  data-aos-anchor-placement="top-bottom"
                  data-aos-duration="3000"
                >
                  <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 xl:grid-cols-6 gap-6 lg:gap-6">
                    {relatedProducts.map((product) => (
                      <ProductList
                        key={product.product_id}
                        product={product}
                        className="min-h-[250px] sm:min-h-[300px] md:min-h-[350px]"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </>
        ))
      )}
    </div>
  );
};

export default Cart;
