import { Link } from "react-router-dom";
import "./Footer.css";
import logo from "../../assets/logos.jpg"; // Make sure this path is correct
import yellowLine from "../../assets/Yellow-Line.svg"; // Make sure this path is correct

const Footer = () => {
  return (
    <div className="w-full bg-graycolor">
      <div className="mt-10 px-4 md:px-10 pb-10 w-full">
        <div className="w-full flex flex-wrap justify-around items-start">
          {/* Logo Section */}
          <div className="w-full sm:w-auto mb-8 sm:mb-0 flex justify-center sm:justify-start">
            <img
              src={logo}
              alt="Finch Logo"
              className="h-16 md:h-24 object-contain"
            />
          </div>

          {/* Existing Footer Sections */}
          <div className="flex flex-col gap-y-3 font-poppins text-sm mb-5 md:mb-0 w-full sm:w-auto hidden">
            <h1 className="text-lg mb-4 relative">
              Finch
              <img
                src={yellowLine}
                alt="scribble"
                className="absolute -bottom-2 left-0 w-24 sm:w-20 md:w-24 lg:w-28 xl:w-32"
              />
            </h1>
            <Link to="/aboutus" className="link-hover-effect">
              About Us
            </Link>
            <Link to="/contactus" className="link-hover-effect">
              Contact Us
            </Link>
            <Link to="/faqs" className="link-hover-effect">
              FAQs
            </Link>
            <Link to="/bulkinquiry" className="link-hover-effect">
              Bulk Inquiry
            </Link>
            <Link to="/sitemap" className="link-hover-effect">
              Sitemap
            </Link>
            <Link to="/blog" className="link-hover-effect">
              Blogs
            </Link>
          </div>
          <div className="hidden flex flex-col gap-y-3 font-poppins text-sm mb-5 md:mb-0 w-full sm:w-auto">
            <h1 className="text-lg mb-4 relative">
              Policies
              <img
                src={yellowLine}
                alt="scribble"
                className="absolute -bottom-2 left-0 w-24 sm:w-20 md:w-24 lg:w-28 xl:w-32"
              />
            </h1>
            <Link to="/termsanduse" className="link-hover-effect">
              Terms and Use
            </Link>
            <Link to="/privatepolicy" className="link-hover-effect">
              Privacy Policy
            </Link>
            <Link to="/shippingpolicy" className="link-hover-effect">
              Shipping Policy
            </Link>
            <Link to="/returnexchange" className="link-hover-effect">
              Return & Exchange Policy
            </Link>
          </div>
          <div className="flex flex-col gap-y-3 font-poppins text-sm mb-5 md:mb-0 w-full sm:w-auto">
            <h1 className="text-lg mb-4 relative">
              How Can We Help You?
              <img
                src={yellowLine}
                alt="scribble"
                className="absolute -bottom-2 left-0 w-[20%] sm:w-[20%] md:w-[40%] lg:w-[40%] xl:w-[40%]"
              />
            </h1>
            <Link to="/account" className="link-hover-effect">
              My Account
            </Link>
            <h1 className="link-hover-effect hidden">Track Order</h1>
            <h1 className="link-hover-effect hidden">Return/Exchange</h1>
          </div>
          <div className="flex flex-col gap-y-3 font-poppins text-sm mb-5 md:mb-0 w-full sm:w-auto">
            <h1 className="text-lg mb-4 relative">
              Reach Us
              <img
                src={yellowLine}
                alt="scribble"
                className="absolute -bottom-2 left-0 w-[20%] sm:w-[20%] md:w-[30%] lg:w-[30%] xl:w-[30%]"
              />
            </h1>
            <h1 className="link-hover-effect">
              402, Times Trade Center, Opposite Polaris <br />
              Mall, Near Bhaiya Nagar, BRTS Cenal Road <br />
              BRTS CANAL ROAD Surat, Gujarat, 395010
            </h1>
            <h1 className="link-hover-effect hidden">Email: info@myfinch.in</h1>
            <h1 className="link-hover-effect hidden">
              Contact Us: +91 9811101017
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
