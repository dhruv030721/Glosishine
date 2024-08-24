import React, { useEffect } from 'react'
import shipping from '../../assets/shipping.svg'
import cod from '../../assets/cod.svg'
import india from '../../assets/india.svg'
import returnitem from '../../assets/returnitem.svg'
import { GoArrowRight } from "react-icons/go";
import { Link } from 'react-router-dom'

const Footer = () => {

    return (
        <div className="w-full bg-graycolor">
            <div className="mt-10 px-4 md:px-10 pb-10 w-full">
                <div className="w-full flex flex-wrap justify-around">
                    <div className="flex flex-col gap-y-3 font-poppins text-sm mb-5 md:mb-0 w-full sm:w-auto">
                        <h1 className="text-lg mb-4">Finch</h1>
                        <Link to="/aboutus">About Us</Link>
                        <Link to="/contactus">Contact Us</Link>
                        <Link to="/faqs">FAQs</Link>
                        <Link to="/bulkinquiry">Bulk Inquiry</Link>
                        <Link to="/sitemap">Sitemap</Link>
                        <Link to="/blog">Blogs</Link>
                    </div>
                    <div className="flex flex-col gap-y-3 font-poppins text-sm mb-5 md:mb-0 w-full sm:w-auto">
                        <h1 className="text-lg mb-4">Policies</h1>
                        <Link to="/termsanduse">Terms and Use</Link>
                        <Link to="/privatepolicy">Privacy Policy</Link>
                        <Link to="/shippingpolicy">Shipping Policy</Link>
                        <Link to="/returnexchange">Return & Exchange Policy</Link>
                    </div>
                    <div className="flex flex-col gap-y-3 font-poppins text-sm mb-5 md:mb-0 w-full sm:w-auto">
                        <h1 className="text-lg mb-4">How Can We Help You?</h1>
                        <Link to="/account">My Account</Link>
                        <h1>Track Order</h1>
                        <h1>Return/Exchange</h1>
                    </div>
                    <div className="flex flex-col gap-y-3 font-poppins text-sm mb-5 md:mb-0 w-full sm:w-auto">
                        <h1 className="text-lg mb-4">Reach Us</h1>
                        <h1>
                            2nd Floor, No. 37/1B, Wings, 4th <br />
                            Cross Lalbagh Road, Bengaluru,<br />
                            Bengaluru Karnataka, 560027
                        </h1>
                        <h1>Email: info@myfinch.in</h1>
                        <h1>Contact Us: +91 9811101017</h1>
                    </div>
                </div>
                
             </div>
        </div>


    )
}

export default Footer
