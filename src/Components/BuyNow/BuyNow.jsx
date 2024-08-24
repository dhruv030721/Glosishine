import React, { useState } from 'react'
import logo from '../../assets/logos.jpg';
import Dialog from '@mui/material/Dialog';
import { FaArrowLeft } from "react-icons/fa6";
import summar1 from '../../assets/summar1.jpg'
import { RiArrowDownSLine } from "react-icons/ri";
import { RiArrowUpSLine } from "react-icons/ri";
import { PiInvoiceDuotone } from "react-icons/pi";
import { CiPercent } from "react-icons/ci";
import { FaAnglesRight } from "react-icons/fa6";
import Coupons from './Coupons';
import { FaCheckCircle } from "react-icons/fa";
import { CiLocationOn } from "react-icons/ci"


const BuyNow = () => {
    const [open, setOpen] = React.useState(false);
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [first, setFirst] = useState(true)
    const [second, setSecond] = useState(false);
    const [third, setThird] = useState(false);
    const [four, setFour] = useState(false);
    const handleShopClick = () => {
        setDropdownVisible(!dropdownVisible);
    };

    const handleCouponClick = () => {
        setFirst(!first);
        setSecond(!second);
    }
    const handleaddress = () => {
        setFirst(!first);
        setThird(!third);
    }

    const handlethird = () => {
        setThird(false);
        setFour(!four);
    }


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleback = () => {
        setSecond(false);
        setFour(false);
        setThird(false);   
        setFirst(true);
    }
    return (
        <>
            <React.Fragment>
                <button onClick={handleClickOpen} className="cursor-pointer group relative flex gap-1.5 p-2 items-center justify-center w-full h-12 bg-green-900 bg-opacity-80 text-[#f1f1f1] rounded-lg hover:bg-opacity-70 transition font-semibold shadow-md">
                    Buy Now
                </button>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="draggable-dialog-title"
                >
                    <div className='min-w-[350px] min-h-[85vh]'>
                        <div className='flex flex-row gap-x-3  p-4 items-center'>
                            <FaArrowLeft size={23} className='cursor-pointer' onClick={handleback}/>
                            <h1 className='font-semibold text-lg'>Glosishine</h1>
                            <img src={logo} alt="" className='h-7 w-12 ml-32' />

                        </div>
                        <div className="h-full max-w-[350px] bg-gray-100 flex items-center flex-col justify-center">
                            <div className="bg-white w-full cursor-pointer shadow-lg rounded-lg overflow-hidden">
                                <div className="flex items-center justify-between p-3 bg-gray-100 border-b">
                                    <button className="flex items-center space-x-4" onClick={handleShopClick} >
                                        <div className="rounded-[50%] h-8 w-8 border-black border-[1px] flex items-center cursor-pointer justify-center" >
                                            <PiInvoiceDuotone size={20} />
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-semibold">Bill Summary</h3>
                                        </div>
                                        <div className="text-gray-500" >
                                            <p className={dropdownVisible ? 'hidden' : 'block'} ><RiArrowDownSLine className='mt-1 ml-36' size={20} /></p>
                                            <p className={dropdownVisible ? 'block' : 'hidden'} > <RiArrowUpSLine className='mt-1 ml-36' size={20} /></p>
                                        </div>
                                    </button>

                                </div>
                                {dropdownVisible &&
                                    <>
                                        <div className="p-3">
                                            <div className="flex items-center justify-between mb-4">
                                                <div className="flex items-center space-x-4">
                                                    <img
                                                        src={summar1}
                                                        alt=""
                                                        className="h-20 w-16 object-fit rounded-md "
                                                    />
                                                    <div>
                                                        <h4 className="text-[14px] font-semibold">
                                                            Summer Crater Canyon Cotton Shirt
                                                        </h4>
                                                        <p className="text-gray-500 text-[10px]">Men Printed Shirt</p>
                                                        <p className="text-gray-500 text-[10px]">Quantity: 1</p>
                                                        <p className="text-gray-500 text-[10px]">Size: S</p>
                                                    </div>
                                                </div>
                                                <div className="text-sm font-bold text-gray-800">₹1,386</div>
                                            </div>
                                            <div className="border-t pt-4 text-[10px]">
                                                <div className="flex justify-between mb-2">
                                                    <span className="text-gray-500">Total MRP</span>
                                                    <span className="text-gray-800">₹1,386</span>
                                                </div>
                                                <div className="flex justify-between mb-2">
                                                    <span className="text-gray-500">Shipping charges</span>
                                                    <span className="text-gray-800">To be calculated</span>
                                                </div>
                                                <div className="flex justify-between text-sm font-semibold border-t p-4">
                                                    <span>Order total</span>
                                                    <span>₹1,386</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="px-6 py-4 bg-gray-100 border-t text-sm">
                                            <button className="w-full py-2 bg-gray-200 text-gray-800 font-semibold rounded-lg" onClick={handleShopClick}>
                                                Close
                                            </button>
                                        </div>
                                    </>
                                }
                            </div>
                            {first &&
                                <div className='mt-4 w-full p-3'>
                                    <button className='flex flex-row  items-center bg-white p-3 rounded-lg ' onClick={handleCouponClick}>
                                        <CiPercent size={27} />
                                        <h1 className='text-md font-semibold ml-2'>3 Coupon for you</h1>
                                        <h1 className='flex flex-row gap-x-0 ml-28'>
                                            <FaAnglesRight size={15} className='' />
                                        </h1>
                                    </button>

                                    <div className='mt-4'>
                                        <label htmlFor="" className='text-sm font-semibold'>PHONE NUMBER</label>
                                        <input
                                            type="text"
                                            placeholder="Enter your phone number"
                                            className="w-full text-sm p-3 border border-gray-300 rounded-md mb-2"
                                        />
                                        <button className="cursor-pointer mt-3 group relative flex gap-1.5 p-2 items-center justify-center w-full h-12 bg-green-900 bg-opacity-80 text-[#f1f1f1] rounded-lg hover:bg-opacity-70 transition font-semibold shadow-md" onClick={handleaddress}>
                                            Continue
                                        </button>
                                    </div>
                                </div>
                            }
                            {second &&
                                <Coupons />
                            }
                            {
                                third &&
                                <div className="flex items-center w-full mt-8 justify-center bg-gray-100">
                                    <div className="bg-white p-5 rounded shadow-md w-full max-w-md">
                                        <h2 className="text-2xl font-bold mb-6">Address Details</h2>
                                        <form>
                                            <div className="mb-4">
                                                <label className="block text-gray-700 font-semibold mb-1 text-[12px]" htmlFor="fullName">
                                                    Full Name*
                                                </label>
                                                <input
                                                    type="text"
                                                    id="fullName"
                                                    placeholder="Your full name"
                                                    className="w-full px-3 py-2 border border-gray-300 font-serif rounded focus:outline-none text-[12px]"
                                                />
                                            </div>
                                            <div className="mb-4">
                                                <label className="block text-gray-700 font-semibold mb-1 text-[12px]" htmlFor="areaName">
                                                    Area / Building Name*
                                                </label>
                                                <input
                                                    type="text"
                                                    id="areaName"
                                                    placeholder="Search your area or building name..."
                                                    className="w-full px-3 py-2 border border-gray-300 rounded font-serif focus:outline-none text-[12px]"
                                                />
                                            </div>
                                            <div className="mb-4">
                                                <label className="block text-gray-700 font-semibold mb-1 text-[12px]" htmlFor="houseNumber">
                                                    House/Flat/Block number
                                                </label>
                                                <input
                                                    type="text"
                                                    id="houseNumber"
                                                    placeholder="For ex: House no. 12 (Optional)"
                                                    className="w-full px-3 py-2 border border-gray-300 rounded font-serif focus:outline-none text-[12px]"
                                                />
                                            </div>
                                            <div className="mb-4">
                                                <label className="block text-gray-700 font-semibold mb-1 text-[12px]" htmlFor="pinCode">
                                                    Pin code*
                                                </label>
                                                <input
                                                    type="text"
                                                    id="pinCode"
                                                    placeholder="For ex: 560059"
                                                    className="w-full px-3 py-2 border border-gray-300 rounded font-serif focus:outline-none text-[12px]"
                                                />
                                            </div>
                                            <div className="mb-4">
                                                <label className="block text-gray-700 font-semibold mb-1 text-[12px]" htmlFor="city">
                                                    City*
                                                </label>
                                                <input
                                                    type="text"
                                                    id="city"
                                                    placeholder="For ex: Bengaluru"
                                                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none text-[12px]"
                                                />
                                            </div>
                                            <div className="mb-6">
                                                <label className="block text-gray-700 font-semibold mb-1  text-[12px]" htmlFor="email">
                                                    Email Address*
                                                </label>
                                                <input
                                                    type="email"
                                                    id="email"
                                                    placeholder="For ex.- abc@gmail.com"
                                                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none text-[12px]"
                                                />
                                            </div>
                                            <button
                                                type="button"
                                                onClick={handlethird}
                                                className="w-full bg-green-500 text-white py-2 rounded font-serif hover:bg-green-600 transition duration-200"
                                            >
                                                Continue
                                            </button>
                                        </form>

                                        <div className="mt-2 text-center text-gray-500 text-[12px] flex ">
                                            Secure checkout by <span className="font-semibold">🛡 Simpl</span>
                                        </div>
                                    </div>
                                </div>
                            }
                            {
                                four &&
                                <div className='mt-4 w-full p-3'>
                                    <button className='flex flex-row  items-center bg-white p-3 rounded-lg'>
                                        <CiPercent size={27} />
                                        <h1 className='text-md font-semibold ml-2'>Add Coupon for you</h1>
                                        <h1 className='flex flex-row gap-x-0 ml-24'>
                                            <FaAnglesRight size={15} className='' />
                                        </h1>
                                    </button>
                                    <div className='mt-5 p-2'>
                                        <h1 className='text-sm font-semibold'>Delivery Details</h1>
                                        <div className='border-2 border-gray-300 rounded-md flex mt-2 flex-col'>
                                            <div className='border-b-2 border-gray-300 p-2 flex flex-row items-center'>
                                                <CiLocationOn />
                                                <h1 className='text-[12px] font-serif'>12,wefq,bengaluru,karnataka,405010</h1>
                                                <button className='text-sm font-semibold underline ml-8'>
                                                    change
                                                </button>
                                            </div>
                                            <div className='p-3 flex flex-row items-center gap-x-32'>
                                                <div>
                                                    <h1 className='text-[13px] font-semibold'>Shipping charge: <span className='text-gray-700 '>Free</span></h1>
                                                    <h1 className='text-[11px] font-semibold text-gray-700 ml-1 '>Prepaid(Free Shipping)</h1>
                                                </div>
                                                <span>
                                                    <FaCheckCircle size={17} color='green' />
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            }



                            <div className='mt-5 bg-white flex flex-row gap-x-4 text-[12px] pb-7 p-3 w-full justify-center font-semibold'>
                                <button className='underline'>Terms & condition</button>
                                <h1 className='underline'>Privacy policy</h1>
                            </div>

                        </div>
                    </div>

                </Dialog>
            </React.Fragment>
        </>
    )
}

export default BuyNow
