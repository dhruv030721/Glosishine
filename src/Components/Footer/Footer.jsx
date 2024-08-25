import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="w-full bg-graycolor">
      <div className="mt-10 px-4 md:px-10 pb-10 w-full">
        <div className="w-full flex flex-wrap justify-around">
          <div className="flex flex-col gap-y-3 font-poppins text-sm mb-5 md:mb-0 w-full sm:w-auto">
            <h1 className="text-lg mb-4 relative">
              Finch
              <span
                className="absolute top-7 left-0 border-b-4 border-bg-green rounded"
                style={{ width: "65%" }}
              ></span>
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
          <div className="flex flex-col gap-y-3 font-poppins text-sm mb-5 md:mb-0 w-full sm:w-auto">
            <h1 className="text-lg mb-4 relative">
              Policies
              <span
                className="absolute top-7 left-0 border-b-4 border-bg-green rounded"
                style={{ width: "40%" }}
              ></span>
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
              <span
                className="absolute top-7 left-0 border-b-4 border-bg-green rounded"
                style={{ width: "100%" }}
              ></span>
            </h1>
            <Link to="/account" className="link-hover-effect">
              My Account
            </Link>
            <h1 className="link-hover-effect">Track Order</h1>
            <h1 className="link-hover-effect">Return/Exchange</h1>
          </div>
          <div className="flex flex-col gap-y-3 font-poppins text-sm mb-5 md:mb-0 w-full sm:w-auto">
            <h1 className="text-lg mb-4 relative">
              Reach Us
              <span
                className="absolute top-7 left-0 border-b-4 border-bg-green rounded"
                style={{ width: "40%" }}
              ></span>
            </h1>
            <h1 className="link-hover-effect">
              2nd Floor, No. 37/1B, Wings, 4th <br />
              Cross Lalbagh Road, Bengaluru,
              <br />
              Bengaluru Karnataka, 560027
            </h1>
            <h1 className="link-hover-effect">Email: info@myfinch.in</h1>
            <h1 className="link-hover-effect">Contact Us: +91 9811101017</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
