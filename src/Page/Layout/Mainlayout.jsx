import Navbar from "../../Components/Navbar/Navbar";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "../../Components/Footer/Footer";
import NotFound from "../NotFound/NotFound"; // Assuming you have a 404 page component

const MainLayout = () => {
  const validPaths = [
    "/",
    "/login",
    "/register",
    "/aboutus",
    "/contactus",
    "/bulkinquiry",
    "/faqs",
    "/blog",
    "/fationtips",
    "/Howtostylewomen",
    "/varsityjackets",
    "/Whatlookgood",
    "/sitemap",
    "/termsanduse",
    "/privatepolicy",
    "/shippingpolicy",
    "/returnexchange",
    "/account",
    "/cart",
    "/forgotpassword",
    "/newarrivals",
    "/mosttrending",
    "/bundledeal",
    "/admin",
    "/admin/dashboard",
    "/:id", // This should be used carefully since it's a dynamic path
  ];

  const isValidPath = (path) => validPaths.includes(path);

  return (
    <>
      <Navbar />
      {/* Check if Outlet has content, otherwise display the 404 page */}
      {isValidPath ? <Outlet /> : <NotFound />}
      <Footer />
    </>
  );
};

export default MainLayout;
