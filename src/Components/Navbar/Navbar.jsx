/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unknown-property */
/* eslint-disable react/no-unescaped-entities */
import { useContext, useEffect, useState } from "react";
import logo from "../../assets/logos.jpg";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { IoPersonOutline } from "react-icons/io5";
import { IoMdClose, IoMdHeartEmpty } from "react-icons/io";
import { IoCartSharp, IoCloseOutline } from "react-icons/io5";
import { RiMenu3Line, RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";
import { Link, useLocation } from "react-router-dom";
import cart1 from "../../assets/cart1.webp";
import cart2 from "../../assets/cart2.jpg";
import cart3 from "../../assets/cart3.jpg";
import { AppContext } from "../../App";
import "./Navbar.css";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import { getAllDiscounts } from "../../Services/Operations/ProductServices";
import { useDispatch, useSelector } from "react-redux";
import { fetchCartItemsAsync } from "../../Slice/CartSlice";

const Navbar = () => {
  const context = useContext(AppContext);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [activeTab, setActiveTab] = useState("Men");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [mobileOffersOpen, setMobileOffersOpen] = useState(false);
  const [mobileMenOpen, setMobileMenOpen] = useState(false);
  const [mobileWomenOpen, setMobileWomenOpen] = useState(false);
  const [cartItemsCount, setCartItemsCount] = useState(0);
  const location = useLocation();
  const items = [
    { name: "Mens Wear", link: "/category/mens" },
    { name: "Womens Wear", link: "/category/womens" },
    { name: "Kids Wear", link: "/category/kids" },
  ];
  const dropdownItems = {
    Men: [
      { name: "Shirts", link: "category/mens/shirts" },
      { name: "T-Shirts", link: "category/mens/t-shirts" },
      { name: "Pants", link: "category/mens/pants" },
      { name: "Mens Cord Set", link: "category/mens/cordset" },
    ],
    Women: [
      { name: "Shirts", link: "category/womens/shirts" },
      { name: "T-Shirts", link: "category/womens/t-shirts" },
      { name: "Kurtas", link: "category/womens/kurtas" },
      { name: "Womens Cord Set", link: "category/womens/cordset" },
    ],
    // Offers: [
    //   { name: "Discounts", link: "/offers/discounts" },
    //   { name: "Flash Sales", link: "/offers/flashsales" },
    //   { name: "Bundles", link: "/offers/bundles" },
    // ],
    Offers: [
      // { name: "Discounts", link: "/offers/discounts" },
      // { name: "Flash Sales", link: "/offers/flashsales" },
      // { name: "Bundles", link: "/offers/bundles" },
      {
        name: "Men",
        items: [
          { name: "Shirts", link: "category/mens/shirts" },
          { name: "T-Shirts", link: "category/mens/t-shirts" },
          { name: "Pants", link: "category/mens/pants" },
          { name: "Mens Cord Set", link: "category/mens/cordset" },
        ],
      },
      {
        name: "Women",
        items: [
          { name: "Shirts", link: "category/womens/shirts" },
          { name: "T-Shirts", link: "category/womens/t-shirts" },
          { name: "Kurtas", link: "category/womens/kurtas" },
          { name: "Womens Cord Set", link: "category/womens/cordset" },
        ],
      },
    ],
  };
  const [activeDiscounts, setActiveDiscounts] = useState([]);
  const dispatch = useDispatch();

  // Get cart items from Redux store
  const { items: cartItems, status } = useSelector((state) => state.cart);

  // Fetch cart items when user changes or location changes
  useEffect(() => {
    const fetchCartData = async () => {
      if (context?.user?.[0]?.email) {
        try {
          await dispatch(fetchCartItemsAsync(context.user[0].email));
        } catch (error) {
          console.error("Error fetching cart items:", error);
        }
      }
    };

    fetchCartData();
  }, [dispatch, context.user, location]);

  // Update cart count when cart items change
  useEffect(() => {
    const count = cartItems.reduce(
      (total, item) => total + (item?.quantity || 0),
      0
    );
    setCartItemsCount(count);
  }, [cartItems]);

  // Clear cart count on logout
  useEffect(() => {
    if (!context?.token || !context?.user) {
      setCartItemsCount(0);
    }
  }, [context.token, context.user]);

  // Add this calculation for cart items count
  useEffect(() => {
    const cartItemsCount = context.CartProducts.reduce(
      (total, item) => total + item.quantity,
      0
    );
    setCartItemsCount(cartItemsCount);
  }, [context.CartProducts]);

  // const addItemToCart = (item) => {
  //     setCartItems((prevItems) => {
  //         const existingItem = prevItems.find((prevItem) => prevItem.id === item.id);
  //         if (existingItem) {
  //             return prevItems.map((prevItem) =>
  //                 prevItem.id === item.id ? { ...prevItem, quantity: prevItem.quantity + 1 } : prevItem
  //             );
  //         }
  //         return [...prevItems, { ...item, quantity: 1 }];
  //     });
  //     setIsDrawerOpen(true);
  // };

  useEffect(() => {
    dropdownVisible ? setDropdownVisible(!dropdownVisible) : "";
    isSearchOpen ? setIsSearchOpen(!isSearchOpen) : "";
  }, [location]);

  useEffect(() => {
    const fetchDiscounts = async () => {
      try {
        const response = await getAllDiscounts(); // Empty string to get all discounts
        if (response.success && response.data.length > 0) {
          const currentDate = new Date();
          currentDate.setHours(0, 0, 0, 0);

          // Filter active and valid discounts
          const validDiscounts = response.data.filter((discount) => {
            const startDate = new Date(discount.start_date);
            startDate.setHours(0, 0, 0, 0);
            const endDate = new Date(discount.end_date);
            endDate.setHours(23, 59, 59, 999);

            return (
              currentDate >= startDate &&
              currentDate <= endDate &&
              discount.active
            );
          });

          setActiveDiscounts(validDiscounts);
        }
      } catch (error) {
        console.error("Error fetching discounts:", error);
      }
    };

    fetchDiscounts();
  }, []);

  const removeItemFromCart = (id) => {
    context.setCartProducts((prevItems) =>
      prevItems.filter((item) => item.product_id !== id)
    );
  };

  const updateItemQuantity = (id, quantity) => {
    context.setCartProducts((prevItems) =>
      prevItems.map((item) =>
        item.product_id === id ? { ...item, quantity } : item
      )
    );
  };

  const incrementQuantity = (id) => {
    updateItemQuantity(
      id,
      context.CartProducts.find((item) => item.product_id === id).quantity + 1
    );
  };

  const decrementQuantity = (id) => {
    const item = context.CartProducts.find((item) => item.product_id === id);
    if (item.quantity > 1) {
      updateItemQuantity(id, item.quantity - 1);
    }
  };

  const estimatedTotal = context.CartProducts.reduce(
    (total, item) => total + item.sale_price * item.quantity,
    0
  );

  const toggleDrawer = () => {
    context.setIsDrawerOpen(!context.isDrawerOpen);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleShopClick = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const switchTab = (tab) => {
    setActiveTab(tab);
  };

  const toggleMobileOffers = () => {
    setMobileOffersOpen(!mobileOffersOpen);
  };

  const toggleMobileMen = () => {
    setMobileMenOpen(!mobileMenOpen);
  };

  const toggleMobileWomen = () => {
    setMobileWomenOpen(!mobileWomenOpen);
  };
  const renderCartCount = () => {
    if (status === "loading") {
      return null; // Or return a loading spinner
    }

    return cartItemsCount > 0 ? (
      <span
        className={`absolute ${
          isSidebarOpen
            ? "bg-white text-bg-green top-[26%] left-[30%]"
            : "bg-bg-green text-white -top-2 -right-2"
        }  text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center`}
      >
        {cartItemsCount}
      </span>
    ) : null;
  };

  return (
    <>
      <div className="w-full h-full">
        {activeDiscounts.length > 0 ? (
          <marquee className="w-full bg-emerald-900 h-11 text-white text-sm flex items-center justify-center font-poppins">
            {activeDiscounts.map((discount, index) => (
              <span key={index} className="mx-16">
                Get Flat {discount.discount}% Off on all Products Use Code "
                {discount.coupon_code}"
                {discount.min_purchase > 0 &&
                  ` on Minimum Purchase of Rs. ${discount.min_purchase}/-`}
              </span>
            ))}
          </marquee>
        ) : (
          <div className="w-full bg-emerald-900 h-11 text-white text-sm flex items-center justify-center font-poppins">
            Welcome to Glosishine
          </div>
        )}

        <div className="w-full h-[81px] flex bg-white  items-center justify-between md:justify-around border-b-2 px-4 md:px-0">
          <Link to="/">
            <img src={logo} alt="" className="h-12 w-34" />
          </Link>
          <div className="hidden md:flex gap-x-5 font-poppins font-semibold">
            {items.map((item, index) => (
              <div className="flex flex-row gap-x-4" key={index}>
                <Link to={item.link}>{item.name}</Link>
                {index < items.length - 1 && (
                  <div className="w-[0.5px] h-6 bg-black"></div>
                )}
              </div>
            ))}
            {/* Offers dropdown hidden but not removed */}
            <div className="hidden">
              <button
                className="flex flex-row h-7 items-center pb-1"
                onClick={handleShopClick}
              >
                Offers
                <p className={dropdownVisible ? "hidden" : "block"}>
                  <RiArrowDownSLine className="mt-1" size={18} />
                </p>
                <p className={dropdownVisible ? "block" : "hidden"}>
                  <RiArrowUpSLine className="mt-1" size={18} />
                </p>
              </button>
            </div>
          </div>
          <div className="hidden md:flex gap-x-4">
            <button onClick={() => setIsSearchOpen(!isSearchOpen)}>
              <HiMagnifyingGlass size={25} />
            </button>
            <Link to={context?.token && context?.user ? "/account" : "/login"}>
              <IoPersonOutline size={25} />
            </Link>
            <Link to="/watchlist">
              <IoMdHeartEmpty size={25} />
            </Link>
            <Link to="/cart" className="relative">
              <IoCartSharp size={25} />
              {renderCartCount()}
            </Link>
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={toggleSidebar}>
              <RiMenu3Line size={25} color="#064C3A" />
            </button>
          </div>

          <div
            id="drawer-right-example"
            className={`fixed top-0 right-0 z-40 h-screen p-4 overflow-y-auto transition-transform bg-white w-96 dark:bg-gray-800 ${
              context.isDrawerOpen ? "translate-x-0" : "translate-x-full"
            }`}
            tabIndex="-1"
            aria-labelledby="drawer-right-label"
          >
            <h5
              id="drawer-right-label"
              className="inline-flex items-center justify-center w-full text-2xl mb-4 font-semibold text-black"
            >
              {context.CartProducts.length > 0
                ? "Your Cart"
                : "Your Cart is empty"}
            </h5>
            <button
              type="button"
              onClick={toggleDrawer}
              aria-controls="drawer-right-example"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 end-2.5 inline-flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white"
            >
              <IoCloseOutline size={30} className="text-black" />
            </button>
            {context.CartProducts.length > 0 ? (
              <div>
                {context.CartProducts.map((item) => (
                  <div key={item.product_id} className="flex items-center mb-4">
                    <img
                      src={item.images[0]}
                      alt={item.product_name}
                      className="w-16 h-22 object-cover rounded mr-4"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium">{item.product_name}</h3>
                      <p className="text-sm">Size: {item.size}</p>
                      <p className="text-sm line-through">
                        Rs. {item.regular_price}
                      </p>
                      <p className="text-sm font-semibold">
                        Rs. {item.sale_price}
                      </p>
                      <div className="flex items-center mt-2">
                        <button
                          onClick={() => {
                            decrementQuantity(item.product_id);
                          }}
                          className="px-2 py-1 bg-gray-200 rounded"
                        >
                          -
                        </button>
                        <span className="mx-2">{item.quantity}</span>
                        <button
                          onClick={() => {
                            incrementQuantity(item.product_id);
                          }}
                          className="px-2 py-1 bg-gray-200 rounded"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        removeItemFromCart(item.product_id);
                      }}
                      className="text-red-500 font-semibold"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <div className="border-t pt-4">
                  <p className="text-lg font-semibold">
                    Estimated total: Rs.{estimatedTotal}
                  </p>
                  <p className="text-sm">
                    Tax included.
                    <a href="#" className="text-blue-500">
                      Shipping
                    </a>
                    and discounts calculated at checkout.
                  </p>
                  <button className="w-full mt-4 py-2 bg-green-600 text-white font-semibold rounded">
                    Checkout
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="w-full grid gap-x-1 gap-y-1 grid-cols-2 p-5">
                  <Link to="/newarrivals" className="flex flex-col p-2">
                    <img
                      src={cart1}
                      className="rounded-md"
                      alt="New Arrivals"
                    />
                    <h1 className="mt-2 font-semibold w-full ml-5">
                      Mens Wear
                    </h1>
                  </Link>
                  <Link to="/mosttrending" className="flex flex-col p-2">
                    <img
                      src={cart2}
                      className="rounded-md"
                      alt="Most Trending"
                    />
                    <h1 className="mt-2 font-semibold w-full ml-5">
                      Womens Wear
                    </h1>
                  </Link>
                  <div className="flex flex-col p-2">
                    <img src={cart3} className="rounded-md" alt="Apparels" />
                    <h1 className="mt-2 font-semibold w-full ml-5">Apparels</h1>
                  </div>
                </div>
                <div className="mt-2 w-full flex justify-center">
                  <Link
                    to="/newarrivals"
                    onClick={toggleDrawer}
                    className="cursor-pointer group relative flex gap-1.5 p-2 items-center justify-center w-32 h-12 bg-green-900 bg-opacity-80 text-[#f1f1f1] rounded-lg hover:bg-opacity-70 transition font-semibold shadow-md"
                  >
                    View all
                  </Link>
                </div>
                <div className="mt-2 w-full flex justify-center">
                  <Link
                    to="/newarrivals"
                    className="cursor-pointer group relative flex gap-1.5 p-2 items-center justify-center w-44 h-12 bg-green-900 bg-opacity-80 text-[#f1f1f1] rounded-lg hover:bg-opacity-70 transition font-semibold shadow-md"
                  >
                    Continue shopping
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
        <div
          className={`fixed top-0 left-0 w-full bg-white shadow-lg transition-all duration-300 ${
            isSearchOpen ? "translate-y-0 block" : "-translate-y-full hidden"
          }`}
        >
          <div className="flex items-center px-4 py-3 md:px-6">
            <div className="relative flex-1">
              <HiMagnifyingGlass
                size={25}
                className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500 "
              />
              <input
                type="search"
                placeholder="Search..."
                className="w-full rounded-md font-poppins border border-gray-200 bg-gray-100 py-2 pl-12 pr-4 text-sm focus:border-gray-300 focus:outline-none focus:ring-0 "
              />
            </div>
            <button
              variant="ghost"
              size="icon"
              className="ml-2 rounded-md"
              onClick={() => setIsSearchOpen(false)}
            >
              <IoCloseOutline size={23} />
              <span className="sr-only">Close search</span>
            </button>
          </div>
        </div>

        {/* Mobile sidebar */}
        <div
          className={`fixed top-0 left-0 z-[100] h-screen w-full bg-bg-green shadow-lg transition-transform transform ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:hidden`}
        >
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between h-14 border-b border-white px-4">
              <div className="flex items-center gap-3">
                <img src={logo} alt="logo" className="aspect-video w-16" />
                <span className="text-xl font-dm-sans font-bold text-white">
                  Glosishine
                </span>
              </div>
              <button onClick={toggleSidebar} className="text-white">
                <IoMdClose size={24} />
              </button>
            </div>
            <div className="flex flex-col font-dm-sans flex-1 overflow-y-auto mt-2 gap-y-3 p-4">
              {items.map((item, index) => (
                <Link
                  to={item.link}
                  key={index}
                  className="flex items-center px-6 py-2 rounded-md text-lg text-white hover:bg-white hover:bg-opacity-20"
                  onClick={() => setIsSidebarOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              {/* Offers section hidden but not removed */}
              <div className="hidden">
                <button
                  className="flex items-center justify-between px-6 py-2 rounded-md text-lg text-white hover:bg-white hover:bg-opacity-20"
                  onClick={() => setMobileOffersOpen(!mobileOffersOpen)}
                >
                  Offers
                  {mobileOffersOpen ? (
                    <RiArrowUpSLine className="ml-2" size={18} />
                  ) : (
                    <RiArrowDownSLine className="ml-2" size={18} />
                  )}
                </button>
                {/* ... existing mobile offers dropdown content */}
              </div>
              <Link
                to={context?.token && context?.user ? "/account" : "/login"}
                className="flex items-center px-6 py-2 rounded-md text-lg text-white hover:bg-white hover:bg-opacity-20"
                onClick={() => setIsSidebarOpen(false)}
              >
                <IoPersonOutline size={25} className="mr-2" />
                {context?.token && context?.user ? "Account" : "Login"}
              </Link>
              <Link
                to="/watchlist"
                className="flex items-center px-6 py-2 rounded-md text-lg text-white hover:bg-white hover:bg-opacity-20"
                onClick={() => setIsSidebarOpen(false)}
              >
                <IoMdHeartEmpty size={25} className="mr-2" />
                Wishlist
              </Link>
              <Link
                to="/cart"
                className="relative flex items-center px-6 py-2 rounded-md text-lg text-white hover:bg-white hover:bg-opacity-20"
                onClick={() => setIsSidebarOpen(false)}
              >
                <IoCartSharp size={25} className="mr-2" />
                Cart
                {renderCartCount()}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {dropdownVisible && (
        <div className="absolute z-50 w-full border-gray-200 shadow-sm bg-gray-50 md:bg-white border-y">
          <div className="btn-container flex justify-center items-center gap-x-4 p-5">
            <MaleIcon sx={{ color: "#007BFF" }} />
            <label className="switch btn-color-mode-switch">
              <input
                value={activeTab}
                id="color_mode"
                name="color_mode"
                type="checkbox"
                onChange={(e) => switchTab(e.target.checked ? "Women" : "Men")}
              />
              <label
                className="btn-color-mode-switch-inner"
                data-off="Men"
                data-on="Women"
                htmlFor="color_mode"
              ></label>
            </label>
            <FemaleIcon sx={{ color: "#ff69b4" }} />
          </div>
          <div className="w-full flex flex-wrap justify-center items-center p-5 gap-4">
            {dropdownItems[activeTab].map((item, index) => (
              <Link
                key={index}
                to={item.link}
                className="text-black font-poppins px-4 py-2 rounded-full transition-all duration-300 hover:bg-bg-green hover:text-white"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
