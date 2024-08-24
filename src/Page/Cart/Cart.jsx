import React, { useContext, useEffect } from 'react'
import { MdOutlineChevronRight } from "react-icons/md";
import { Form, Link } from 'react-router-dom';
import brand from '../../assets/brand.svg'
import info from '../../assets/info.svg'
import { RiShare2Line } from "react-icons/ri";
import order from '../../assets/order.png'
import payment from '../../assets/payment.png'
import discount from '../../assets/discount.webp'
import { IoAdd } from "react-icons/io5";
import { FiHeart } from "react-icons/fi";
import { IoRemove } from "react-icons/io5";
import { IoCloudUploadOutline } from "react-icons/io5";
import { useState } from "react";
import ratingimage from '../../assets/ratingimage.png'
import summar1 from '../../assets/summar1.jpg'
import summar2 from '../../assets/summar2.jpg'
import AOS from "aos";
import "aos/dist/aos.css";
import BuyNow from '../../Components/BuyNow/BuyNow';
import { useParams } from 'react-router-dom';
import { AppContext } from '../../App';
import { addReview, getReview } from '../../Services/Operations/ProductServices';
import toast from 'react-hot-toast';
import { FaRegStar, FaStar } from 'react-icons/fa';


const Cart = () => {
    const { id } = useParams();
    // console.log("id", id);
    const Appcontext = useContext(AppContext);
    const filterdata = Appcontext.getdata.filter((item) => item.product_id === id);
    // console.log("filterdata", filterdata);

    const [value, setValue] = useState(1);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [reviewData, setReviewData] = useState([]);
    const [selectedSize, setSelectedSize] = useState("");
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [activeButton, setActiveButton] = useState('shipping');
    const sizes = ["S", "M", "L", "XL"];
    const [formdata, setFormdata] = useState({
        name: '',
        title: '',
        review: '',
        reviewimage: [],
    })
    console.log("formdata", formdata);

    const handleImageUpload = (event) => {
        const files = event.target.files;
        const imagesArray = Array.from(files);

        setFormdata((prevProduct) => ({
            ...prevProduct,
            reviewimage: prevProduct.reviewimage.concat(imagesArray)
        }));
    };


    const submitHandler = async (e) => {
        e.preventDefault();
        console.log("data is1 ->", formdata);
        try {
            await toast.promise(
                addReview({ productData: formdata }, id, rating),
                {
                    loading: "Processing....",
                    success: (response) => {
                        console.log("response", response);
                        return `${response.data.message}`;
                    },
                    error: (error) => {
                        return `${error.message}`;
                    }
                }
            )
        } catch (error) {
            console.error("Loggedin failed:", error);
        }
    }


    const handleButtonClick = (size) => {
        setSelectedSize(size);
    };


    const toggleFormVisibility = () => {
        setIsFormVisible(!isFormVisible);
    };
    useEffect(() => {
        AOS.init();
        AOS.refresh();
    }, []);
    const buttonStyles = (buttonType) => {
        return activeButton === buttonType
            ? 'w-[35%] p-3 bg-white text-black'
            : 'w-[35%] p-3 bg-gray-600 text-white';
    };

    const renderContent = () => {
        switch (activeButton) {
            case 'shipping':
                return (
                    <>
                        <p>All Orders are usually shipped within 48 hours.</p>
                        <p>COD orders will be shipped only if order confirmation is given via WhatsApp/Phone.</p>
                        <p><a href='#'>For more details click here</a></p>
                    </>
                );
            case 'returnPolicy':
                return (
                    <>
                        <p>We offer 7 days hassle-free returns & exchange from the date of delivery.
                            We DO NOT offer reverse pick-up services. You’ll have to courier the product(s) to the following address:
                            No.7, Ground Floor, Uniform Factory, 6th Cross, H Siddaiah Road, Sudhamanagar, Bengaluru - 560027</p>
                        <p><a href='#'>For more about Return & Exchange Policy click here</a></p>
                    </>
                );
            case 'placeReturn':
                return (
                    <>
                        <p>To place any return/exchange, <a href='#'>Click here</a></p>
                    </>
                );
            default:
                return null;
        }
    };


    const addToCartHandler = (id) => {
        if (Appcontext.CartProducts.map((item) => item.product_id !== id)) {
            const product = Appcontext.getdata.find((item) => item.product_id === id)
            product.quantity = 1;
            Appcontext.setCartProducts([...Appcontext.CartProducts, product])
            Appcontext.setIsDrawerOpen(true);
        } else {
            Appcontext.setIsDrawerOpen(true);
        }
    }

    const handleIncrement = () => {
        setValue(value + 1);
    };

    const handleDecrement = () => {
        if (value > 0) {
            setValue(value - 1);
        }
    };

    useEffect(() => {
        (async () => {
            try {
                const data = await getReview(id);
                setReviewData(data.data.data);
            } catch (error) {
                console.log(error);
            }
        })();
    }, [id]);

    useEffect(() => {
        console.log("reviewData", reviewData);
    }, [reviewData]);


    return (
        <div className='w-full'>
            {
                filterdata.map((item) => (
                    <>
                        <div className='w-full font-poppins mt-5 pl-10 mb-5 flex flex-row h-10 items-center gap-x-3'>
                            <Link to='/'>
                                Home
                            </Link>
                            <MdOutlineChevronRight className='h-full flex items-center mt-1' size={17} />
                            <Link to='/'>
                                Shirts
                            </Link>
                            <MdOutlineChevronRight className='h-full flex items-center mt-1' size={17} />
                            <h1>
                                Shirts
                            </h1>
                        </div>
                        <div className='w-full flex flex-col lg:flex-row'>
                            <div className='w-full lg:w-[60%] h-full grid grid-cols-2 gap-y-3 gap-x-3 px-10'>
                                {
                                    item.images.map((item) => (
                                        <>
                                            <img src={item} alt="" className="w-full h-auto" />
                                        </>
                                    ))
                                }
                            </div>
                            <div className='w-full lg:w-[40%] px-5 lg:pr-10'>
                                <div data-aos="fade-up" data-aos-duration="1000">
                                    <h1 className='text-2xl font-dm-sans font-semibold'>{item.product_name}</h1>
                                    <div className='flex flex-row font-poppins gap-x-3 mt-3'>
                                        <span className="text-sm text-black font-bold line-through">{item.regular_price}</span>
                                        <span className="text-sm text-green-700 font-bold">{item.sale_price}</span>
                                        <span className="rounded-full bg-black px-2 text-center text-sm font-medium text-white">{10}% OFF</span>
                                    </div>
                                    <p className='text-sm font-monserrat font-light mt-3'>Tax included.</p>
                                    <div className='flex flex-row gap-x-1'>
                                        <p className='mt-4 font-poppins font-md'>Or 3 interest free payments of ₹433</p>
                                        <img src={brand} alt="" className='w-12 mt-4' />
                                        <img src={info} alt="" className='mt-4' />
                                    </div>
                                    <div data-aos="zoom-in" data-aos-duration="2000">
                                        <img src={payment} alt="" className='w-72 h-12' />
                                    </div>
                                    <div className='mt-5 flex flex-row gap-x-3'>
                                        <img src={discount} alt="" className='w-6 h-6 mt-2' />
                                        <p className=' text-sm font-poppins'>Get this for Regular priceSale price <span className='text-red-500'>Rs. 1,169.10</span> Use Code : <span className='font-semibold'> GET10 On minimum order value of Rs.999/-</span></p>
                                    </div>
                                    <div className='mt-5 flex flex-row gap-x-3'>
                                        <img src={discount} alt="" className='w-6 h-6 mt-2' />
                                        <p className='font-poppins text-sm'>Get this for Regular priceSale price <span className='text-red-500'>Rs. 1,039.20</span> Use Code : <span className='font-semibold'> GET10 On minimum order value of Rs.1999/-</span></p>
                                    </div>
                                    <div className='mt-5 flex flex-row gap-x-3'>
                                        <img src={discount} alt="" className='w-6 h-6 mt-2' />
                                        <p className='font-poppins text-sm'>Get this for Regular priceSale price <span className='text-red-500'>Rs. 974.25</span> Use Code : <span className='font-semibold'> GET10 On minimum order value of Rs.2499/-</span></p>
                                    </div>
                                    <h1 className='mt-5 text-sm mb-1'>Quantity</h1>
                                    <div className="py-2 px-3 inline-block bg-white border border-gray-200 rounded-lg dark:bg-neutral-900 dark:border-neutral-700">
                                        <div className="flex items-center gap-x-1.5">
                                            <button
                                                type="button"
                                                className="size-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-md bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800"
                                                onClick={handleDecrement}
                                                disabled={value <= 1} >
                                                <IoRemove />
                                            </button>
                                            <input
                                                className="p-0 w-6 bg-transparent border-0 text-gray-800 text-center focus:ring-0 dark:text-white"
                                                type="text"
                                                value={value}
                                                readOnly />
                                            <button
                                                type="button"
                                                className="size-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-md bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800"
                                                onClick={handleIncrement}  >
                                                <IoAdd />
                                            </button>
                                        </div>
                                    </div>
                                    <h1 className='mt-5 text-sm mb-1'>Size</h1>
                                    <div className='grid grid-cols-4 md:grid-cols-7 pb-4'>
                                        {sizes.map((size) => (
                                            <button
                                                key={size}
                                                className={`border border-black w-12 p-1 rounded-sm ${selectedSize === size ? "bg-green-700 text-white" : ""}`}
                                                onClick={() => handleButtonClick(size)}
                                            >
                                                {size}
                                            </button>
                                        ))}
                                    </div>
                                    <div className='flex flex-col font-monserrat gap-y-2'>
                                        <button onClick={() => addToCartHandler(item.product_id)} className="cursor-pointer group relative flex text-black gap-1.5 p-2 items-center justify-center w-full h-12 border border-green-600 bg-opacity-80 rounded-lg hover:bg-opacity-70 transition font-semibold shadow-md">
                                            Add to cart
                                        </button>
                                        <BuyNow />
                                        <Link to='/addtowatchlist' className="cursor-pointer group relative flex flex-row gap-x-3 text-black gap-1.5 p-2 items-center justify-center w-full h-12 border border-green-600 bg-opacity-80 rounded-lg hover:bg-opacity-70 transition font-semibold shadow-md">
                                            <FiHeart size={20} />
                                            Add to watchlist
                                        </Link>
                                    </div>
                                    <div className='mt-7 border font-monserrat outline-dashed p-5'>
                                        <div className='flex'> <img src={order} alt="" className='w-5 h-5 mt-1 mr-2' />
                                            <p> Order Now 🎁 & Get it Between 🔥
                                                <span className='font-semibold'>Thursday June 13th - Monday June 17th</span></p>
                                        </div>
                                        <h1 className='mt-3'>If ordered before today 11:59 PM</h1>
                                    </div>
                                    <p className='text-md font-poppins mt-4'>{item.product_description}</p>
                                    {/* <p className='text-lg font-monserrat mt-5 font-semibold'>Product Specification:</p>
                                    <div className='ml-10 font-poppins mt-7'>
                                        {item.product_specification && item.product_specification.split(/,\r?\n|\r|\n/).filter(spec => spec.trim() !== "").map((spec, index) => (
                                            <p key={index}>&#x2022;<span className='ml-2 '>{spec}</span></p>
                                        ))}
                                    </div> */}
                                    {/* <p className='text-md font-monserrat mt-5 '><span className='font-semibold mr-2'>Wash Care:</span>Cold machine wash. For more details see the wash care label attached </p>
                                    <p className='mt-5 pb-5 font-poppins border-b-[1px] border-black'>The product's actual color may vary slightly due to photographic lighting sources or your device.</p>
                                    <p className='mt-5 font-monserrat font-semibold'>Manufactured, Marketed & Packed By Finch</p>
                                    <p className='mt-5 font-monserrat'>{item.manufacturing_details}</p>
                                    <p className='text-md font-poppins mt-5 '><span className='font-semibold mr-2'>Country Of Origin:</span>{item.country_of_origin}</p> */}
                                    <button className='text-sm flex h-8 items-center font-monserrat gap-x-1 hover:underline mb-5'>
                                        <RiShare2Line size={18} />
                                        Share
                                    </button>
                                </div>
                            </div>
                        </div>


                        <div className='mt-10 w-[90%] mx-auto border rounded-md'>
                            <div className='flex w-full border-b-[1px]'>
                                <button className={buttonStyles('shipping')} onClick={() => setActiveButton('shipping')}>
                                    Shipping Information
                                </button>
                                <button className={buttonStyles('returnPolicy')} onClick={() => setActiveButton('returnPolicy')}>
                                    Return and Exchange Policy
                                </button>
                                <button className={buttonStyles('placeReturn')} onClick={() => setActiveButton('placeReturn')}>
                                    Place Return/exchange
                                </button>
                            </div>
                            <div id='content' className='content p-4 flex flex-col gap-y-4 font-serif'>
                                {renderContent()}
                            </div>
                        </div>
                        <div className='border-black w-full flex flex-col md:flex-row pl-4 pr-4 lg:pl-10 lg:pr-10 bg-yellow-100 border-b-2 border-t-2'>
                            <div className='w-full md:w-[50%] p-4 lg:p-10'>
                                <p className='text-black text-3xl md:text-4xl lg:text-5xl font-mono font-semibold'>
                                    <span className='text-yellow-600 mr-3'>5000+</span>PEOPLE
                                    <br /> LOVES US
                                </p>
                                <div className='flex flex-col mt-5'>
                                    <div className='flex flex-row items-center pb-5 pt-5 border-b-[1px] border-black'>
                                        <h1 className='text-xl md:text-2xl font-serif flex justify-start w-full'>Quality</h1>
                                        <div className='flex flex-row gap-x-1 '>
                                            <FaRegStar size={20} className="md:size-25" />
                                            <FaRegStar size={20} className="md:size-25" />
                                            <FaRegStar size={20} className="md:size-25" />
                                            <FaRegStar size={20} className="md:size-25" />
                                            <FaRegStar size={20} className="md:size-25" />
                                        </div>
                                        <h1 className='text-xl md:text-2xl font-semibold ml-2'>4.8</h1>
                                    </div>
                                    <div className='flex flex-row items-center pb-5 pt-5 border-b-[1px] border-black'>
                                        <h1 className='text-xl md:text-2xl font-serif flex justify-start w-full'>Durability</h1>
                                        <div className='flex flex-row gap-x-1'>
                                            <FaRegStar size={20} className="md:size-25" />
                                            <FaRegStar size={20} className="md:size-25" />
                                            <FaRegStar size={20} className="md:size-25" />
                                            <FaRegStar size={20} className="md:size-25" />
                                            <FaRegStar size={20} className="md:size-25" />
                                        </div>
                                        <h1 className='text-xl md:text-2xl font-semibold ml-2'>4.7</h1>
                                    </div>
                                    <div className='flex flex-row items-center pb-5 pt-5 border-b-[1px] border-black'>
                                        <h1 className='text-xl md:text-2xl font-serif flex justify-start w-full'>Design</h1>
                                        <div className='flex flex-row gap-x-1'>
                                            <FaRegStar size={20} className="md:size-25" />
                                            <FaRegStar size={20} className="md:size-25" />
                                            <FaRegStar size={20} className="md:size-25" />
                                            <FaRegStar size={20} className="md:size-25" />
                                            <FaRegStar size={20} className="md:size-25" />
                                        </div>
                                        <h1 className='text-xl md:text-2xl font-semibold ml-2'>4.5</h1>
                                    </div>
                                    <div className='flex flex-row items-center pb-5 pt-5 border-b-[1px] border-black'>
                                        <h1 className='text-xl md:text-2xl font-serif flex justify-start w-full'>Value for money</h1>
                                        <div className='flex flex-row gap-x-1'>
                                            <FaRegStar size={20} className="md:size-25" />
                                            <FaRegStar size={20} className="md:size-25" />
                                            <FaRegStar size={20} className="md:size-25" />
                                            <FaRegStar size={20} className="md:size-25" />
                                            <FaRegStar size={20} className="md:size-25" />
                                        </div>
                                        <h1 className='text-xl md:text-2xl font-semibold ml-2'>4.8</h1>
                                    </div>
                                </div>
                                <h1 className='text-lg md:text-xl font-serif mt-5'>Free Shipping | 100% Smile Guarantee</h1>
                            </div>
                            <div className='w-full md:w-[50%] flex justify-center'>
                                <img src={ratingimage} alt="" className="w-full h-auto" />
                            </div>
                        </div>
                        <div className='w-full pt-5 pb-5 px-4 lg:px-10 items-center flex flex-col'>
                            <div data-aos="fade-up" data-aos-anchor-placement="top-bottom" data-aos-duration="1500" className='w-full flex flex-col items-center'>
                                <h1 className='text-2xl font-serif'>Customer Reviews</h1>
                                <div className='flex flex-row p-5'>
                                    <div className='flex flex-col pr-6 pt-2 pb-2 border-r-[1px] border-yellow-400'>
                                        <div className='flex flex-row gap-x-1'>
                                            <FaRegStar size={15} />
                                            <FaRegStar size={15} />
                                            <FaRegStar size={15} />
                                            <FaRegStar size={15} />
                                            <FaRegStar size={15} />
                                        </div>
                                        <h1 className='font-serif'>Be the first to write a review</h1>
                                    </div>
                                    <div className='pl-7 mt-2'>
                                        <button className="cursor-pointer group relative flex gap-1.5 p-2 items-center justify-center w-40 md:w-52 h-10 bg-green-900 bg-opacity-80 text-[#f1f1f1] hover:bg-opacity-70 transition font-semibold shadow-md" onClick={toggleFormVisibility}>
                                            <p className={isFormVisible ? 'hidden' : 'block'} >Write a review</p>
                                            <p className={isFormVisible ? 'block' : 'hidden'} >Cancel review</p>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            {isFormVisible && (
                                <form action="" onSubmit={submitHandler}>
                                    <div className='p-5 border-t-[1px] border-yellow-400 w-full flex flex-col items-center'>
                                        <h1 className='text-2xl font-serif mt-5'>Write a review</h1>
                                        <h1 className='mt-3 mb-5 font-serif'>Rating</h1>
                                        <div className='flex flex-row gap-x-1'>
                                            {[...Array(5)].map((star, index) => {
                                                const ratingValue = index + 1;
                                                return (
                                                    <label key={index}>
                                                        <input
                                                            type="radio"
                                                            name="rating"
                                                            value={ratingValue}
                                                            onClick={() => setRating(ratingValue)}
                                                            className="hidden"
                                                        />
                                                        <div
                                                            className={`cursor-pointer ${ratingValue <= (hover || rating) ? 'text-yellow-500' : 'text-gray-400'}`}
                                                            onMouseEnter={() => setHover(ratingValue)}
                                                            onMouseLeave={() => setHover(0)}
                                                        >
                                                            {ratingValue <= (hover || rating) ? <FaStar size={25} /> : <FaRegStar size={25} />}
                                                        </div>
                                                    </label>
                                                );
                                            })}
                                        </div>
                                        <h1 className='font-serif text-md mt-5'>Review Title (100)</h1>
                                        <input
                                            className="bg-white px-3 py-2 w-[90%] md:w-[50%] outline-none text-black rounded-lg border-2 transition-colors duration-100 border-solid focus:border-black border-black"
                                            name="title"
                                            placeholder="Give your review title"
                                            value={formdata.title}
                                            onChange={(e) => setFormdata({ ...formdata, title: e.target.value })}
                                            type="text"
                                        />
                                        <h1 className='font-serif text-md mt-5'>Review</h1>
                                        <textarea className="bg-white resize-none px-3 py-2 w-[90%] md:w-[50%] outline-none text-black rounded-lg border-2 transition-colors duration-100 border-solid focus:border-black border-black"
                                            name="review"
                                            value={formdata.review}
                                            onChange={(e) => setFormdata({ ...formdata, review: e.target.value })}
                                            placeholder="Give your review title"
                                            type="text">
                                        </textarea>
                                        <h1 className='font-serif text-md mt-5 mb-2'>Picture/Video (optional)</h1>
                                        <div className="flex flex-col items-center justify-center">
                                            <label
                                                htmlFor="file"
                                                className="flex flex-col items-center justify-center w-64 h-48 border-2 border-dashed border-gray-300 text-center text-gray-600 cursor-pointer">
                                                <IoCloudUploadOutline size={70} />
                                                <p>drag and drop your file here or click to select a file!</p>
                                            </label>
                                            <input
                                                className="hidden"
                                                name="text"
                                                multiple
                                                id="file"
                                                onChange={handleImageUpload}
                                                type="file" />
                                            <div className="grid grid-cols-3 mt-2 gap-4">
                                                {formdata.reviewimage.map((file, index) => (
                                                    <div key={index} className="border p-2">
                                                        <img src={URL.createObjectURL(file)} alt={`upload-${index}`} className="h-36 w-26" />
                                                        {/* <button onClick={() => handleRemoveImage(index)} className="bg-red-500 font-poppins text-white px-2 py-1 rounded mt-2">Remove</button> */}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <h1 className='font-serif text-md mt-5 mb-2'>Name</h1>
                                        <input
                                            className="bg-white px-3 py-2 w-[90%] md:w-[50%] outline-none text-black rounded-lg border-2 transition-colors duration-100 border-solid focus:border-black border-black"
                                            name="name"
                                            value={formdata.name}
                                            onChange={(e) => setFormdata({ ...formdata, name: e.target.value })}
                                            placeholder="Enter your name (public)"
                                            type="text"
                                        />

                                        <p className='mt-5 font-serif w-[90%] md:w-[40%]'>How we use your data: We’ll only contact you about the review you left, and only if necessary. By submitting your review, you agree to Judge.me’s terms and conditions and privacy policy.</p>
                                        <div className='mt-6 flex flex-row gap-x-3'>
                                            <button className="cursor-pointer border-2 border-green-400 group relative flex gap-1.5 p-2 items-center justify-center w-40 md:w-52 h-10 text-black hover:bg-opacity-70 transition font-semibold shadow-md">
                                                Cancel review
                                            </button>
                                            <button type='submit' className="cursor-pointer group relative flex gap-1.5 p-2 items-center justify-center w-40 md:w-52 h-10 bg-green-900 bg-opacity-80 text-[#f1f1f1] hover:bg-opacity-70 transition font-semibold shadow-md">
                                                Submit Review
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            )}
                            <div className='w-full grid grid-cols-3'>
                                {
                                    reviewData.map((item, index) => (
                                        <div key={index} className='w-[90%] flex flex-col md:flex-row justify-between gap-4 items-center p-4 mb-4 bg-white shadow-md rounded-lg mx-auto'>
                                            {
                                                item.images.split(',').map((image, index) => (
                                                    <img key={index} src={image} alt="" className='h-28 w-24 object-cover rounded-md' />
                                                ))
                                            }
                                            <div className='flex flex-col flex-grow'>
                                                <h1 className='text-lg font-dm-sans mb-2'>Title: {item.title}</h1>
                                                <p className='font-dm-sans mb-2 text-sm'>Review: {item.review}</p>
                                                <div className='flex items-center text-base text-green-600 gap-x-1 mb-2'>
                                                    Rating: {item.rating}<FaRegStar size={14} />
                                                </div>
                                                <h1 className='text-sm font-poppins'>Name: {item.name}</h1>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                        <div className='p-7'>
                            <h1 className='text-2xl font-semibold ml-5 font-serif'>Similar Product</h1>
                            <div className='w-full p-5'>
                                <div data-aos="fade-up" data-aos-anchor-placement="top-bottom" data-aos-duration="3000">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 justify-center gap-x-3 gap-y-6">
                                        <Link to='/cart' className="flex flex-col overflow-hidden">
                                            <div className="relative flex h-60 sm:h-72 md:h-80 lg:h-96 overflow-hidden">
                                                <img className="peer absolute top-0 right-0 h-full w-full object-cover" src={summar1} alt="product image" />
                                                <img className="peer peer-hover:right-0 absolute top-0 -right-96 h-full w-full object-cover transition-all delay-100 duration-1000 hover:right-0" src={summar2} alt="product image" />
                                                <svg className="group-hover:animate-ping group-hover:opacity-30 peer-hover:opacity-0 pointer-events-none absolute inset-x-0 bottom-5 mx-auto text-3xl text-white transition-opacity" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 32 32">
                                                    <path fill="currentColor" d="M2 10a4 4 0 0 1 4-4h20a4 4 0 0 1 4 4v10a4 4 0 0 1-2.328 3.635a2.996 2.996 0 0 0-.55-.756l-8-8A3 3 0 0 0 14 17v7H6a4 4 0 0 1-4-4V10Zm14 19a1 1 0 0 0 1.8.6l2.7-3.6H25a1 1 0 0 0 .707-1.707l-8-8A1 1 0 0 0 16 17v12Z" />
                                                </svg>
                                                <span className="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white">39% OFF</span>
                                            </div>
                                            <div className="mt-4">
                                                <h5 className="text-sm font-mono font-semibold flex justify-center w-full text-black">Summer Platinum Cotton Shirt</h5>
                                                <div className="mt-2 mb-5 flex items-center justify-between">
                                                    <p className='w-full flex justify-evenly'>
                                                        <span className="text-sm text-black font-bold line-through">Rs. 1,470.00</span>
                                                        <span className="text-sm text-green-700 font-bold text-bleck">Rs. 1,299.00</span>
                                                    </p>
                                                </div>
                                            </div>
                                        </Link>

                                        {/* Repeat the Link block for more products */}
                                        <Link to='/cart' className="flex flex-col overflow-hidden">
                                            <div className="relative flex h-60 sm:h-72 md:h-80 lg:h-96 overflow-hidden">
                                                <img className="peer absolute top-0 right-0 h-full w-full object-cover" src={summar1} alt="product image" />
                                                <img className="peer peer-hover:right-0 absolute top-0 -right-96 h-full w-full object-cover transition-all delay-100 duration-1000 hover:right-0" src={summar2} alt="product image" />
                                                <svg className="group-hover:animate-ping group-hover:opacity-30 peer-hover:opacity-0 pointer-events-none absolute inset-x-0 bottom-5 mx-auto text-3xl text-white transition-opacity" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 32 32">
                                                    <path fill="currentColor" d="M2 10a4 4 0 0 1 4-4h20a4 4 0 0 1 4 4v10a4 4 0 0 1-2.328 3.635a2.996 2.996 0 0 0-.55-.756l-8-8A3 3 0 0 0 14 17v7H6a4 4 0 0 1-4-4V10Zm14 19a1 1 0 0 0 1.8.6l2.7-3.6H25a1 1 0 0 0 .707-1.707l-8-8A1 1 0 0 0 16 17v12Z" />
                                                </svg>
                                                <span className="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white">39% OFF</span>
                                            </div>
                                            <div className="mt-4">
                                                <h5 className="text-sm font-mono font-semibold flex justify-center w-full text-black">Summer Platinum Cotton Shirt</h5>
                                                <div className="mt-2 mb-5 flex items-center justify-between">
                                                    <p className='w-full flex justify-evenly'>
                                                        <span className="text-sm text-black font-bold line-through">Rs. 1,470.00</span>
                                                        <span className="text-sm text-green-700 font-bold text-bleck">Rs. 1,299.00</span>
                                                    </p>
                                                </div>
                                            </div>
                                        </Link>
                                        <Link to='/cart' className="flex flex-col overflow-hidden">
                                            <div className="relative flex h-60 sm:h-72 md:h-80 lg:h-96 overflow-hidden">
                                                <img className="peer absolute top-0 right-0 h-full w-full object-cover" src={summar1} alt="product image" />
                                                <img className="peer peer-hover:right-0 absolute top-0 -right-96 h-full w-full object-cover transition-all delay-100 duration-1000 hover:right-0" src={summar2} alt="product image" />
                                                <svg className="group-hover:animate-ping group-hover:opacity-30 peer-hover:opacity-0 pointer-events-none absolute inset-x-0 bottom-5 mx-auto text-3xl text-white transition-opacity" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 32 32">
                                                    <path fill="currentColor" d="M2 10a4 4 0 0 1 4-4h20a4 4 0 0 1 4 4v10a4 4 0 0 1-2.328 3.635a2.996 2.996 0 0 0-.55-.756l-8-8A3 3 0 0 0 14 17v7H6a4 4 0 0 1-4-4V10Zm14 19a1 1 0 0 0 1.8.6l2.7-3.6H25a1 1 0 0 0 .707-1.707l-8-8A1 1 0 0 0 16 17v12Z" />
                                                </svg>
                                                <span className="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white">39% OFF</span>
                                            </div>
                                            <div className="mt-4">
                                                <h5 className="text-sm font-mono font-semibold flex justify-center w-full text-black">Summer Platinum Cotton Shirt</h5>
                                                <div className="mt-2 mb-5 flex items-center justify-between">
                                                    <p className='w-full flex justify-evenly'>
                                                        <span className="text-sm text-black font-bold line-through">Rs. 1,470.00</span>
                                                        <span className="text-sm text-green-700 font-bold text-bleck">Rs. 1,299.00</span>
                                                    </p>
                                                </div>
                                            </div>
                                        </Link>
                                        <Link to='/cart' className="flex flex-col overflow-hidden">
                                            <div className="relative flex h-60 sm:h-72 md:h-80 lg:h-96 overflow-hidden">
                                                <img className="peer absolute top-0 right-0 h-full w-full object-cover" src={summar1} alt="product image" />
                                                <img className="peer peer-hover:right-0 absolute top-0 -right-96 h-full w-full object-cover transition-all delay-100 duration-1000 hover:right-0" src={summar2} alt="product image" />
                                                <svg className="group-hover:animate-ping group-hover:opacity-30 peer-hover:opacity-0 pointer-events-none absolute inset-x-0 bottom-5 mx-auto text-3xl text-white transition-opacity" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 32 32">
                                                    <path fill="currentColor" d="M2 10a4 4 0 0 1 4-4h20a4 4 0 0 1 4 4v10a4 4 0 0 1-2.328 3.635a2.996 2.996 0 0 0-.55-.756l-8-8A3 3 0 0 0 14 17v7H6a4 4 0 0 1-4-4V10Zm14 19a1 1 0 0 0 1.8.6l2.7-3.6H25a1 1 0 0 0 .707-1.707l-8-8A1 1 0 0 0 16 17v12Z" />
                                                </svg>
                                                <span className="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white">39% OFF</span>
                                            </div>
                                            <div className="mt-4">
                                                <h5 className="text-sm font-mono font-semibold flex justify-center w-full text-black">Summer Platinum Cotton Shirt</h5>
                                                <div className="mt-2 mb-5 flex items-center justify-between">
                                                    <p className='w-full flex justify-evenly'>
                                                        <span className="text-sm text-black font-bold line-through">Rs. 1,470.00</span>
                                                        <span className="text-sm text-green-700 font-bold text-bleck">Rs. 1,299.00</span>
                                                    </p>
                                                </div>
                                            </div>
                                        </Link>
                                        <Link to='/cart' className="flex flex-col overflow-hidden">
                                            <div className="relative flex h-60 sm:h-72 md:h-80 lg:h-96 overflow-hidden">
                                                <img className="peer absolute top-0 right-0 h-full w-full object-cover" src={summar1} alt="product image" />
                                                <img className="peer peer-hover:right-0 absolute top-0 -right-96 h-full w-full object-cover transition-all delay-100 duration-1000 hover:right-0" src={summar2} alt="product image" />
                                                <svg className="group-hover:animate-ping group-hover:opacity-30 peer-hover:opacity-0 pointer-events-none absolute inset-x-0 bottom-5 mx-auto text-3xl text-white transition-opacity" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 32 32">
                                                    <path fill="currentColor" d="M2 10a4 4 0 0 1 4-4h20a4 4 0 0 1 4 4v10a4 4 0 0 1-2.328 3.635a2.996 2.996 0 0 0-.55-.756l-8-8A3 3 0 0 0 14 17v7H6a4 4 0 0 1-4-4V10Zm14 19a1 1 0 0 0 1.8.6l2.7-3.6H25a1 1 0 0 0 .707-1.707l-8-8A1 1 0 0 0 16 17v12Z" />
                                                </svg>
                                                <span className="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white">39% OFF</span>
                                            </div>
                                            <div className="mt-4">
                                                <h5 className="text-sm font-mono font-semibold flex justify-center w-full text-black">Summer Platinum Cotton Shirt</h5>
                                                <div className="mt-2 mb-5 flex items-center justify-between">
                                                    <p className='w-full flex justify-evenly'>
                                                        <span className="text-sm text-black font-bold line-through">Rs. 1,470.00</span>
                                                        <span className="text-sm text-green-700 font-bold text-bleck">Rs. 1,299.00</span>
                                                    </p>
                                                </div>
                                            </div>
                                        </Link>
                                        <Link to='/cart' className="flex flex-col overflow-hidden">
                                            <div className="relative flex h-60 sm:h-72 md:h-80 lg:h-96 overflow-hidden">
                                                <img className="peer absolute top-0 right-0 h-full w-full object-cover" src={summar1} alt="product image" />
                                                <img className="peer peer-hover:right-0 absolute top-0 -right-96 h-full w-full object-cover transition-all delay-100 duration-1000 hover:right-0" src={summar2} alt="product image" />
                                                <svg className="group-hover:animate-ping group-hover:opacity-30 peer-hover:opacity-0 pointer-events-none absolute inset-x-0 bottom-5 mx-auto text-3xl text-white transition-opacity" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 32 32">
                                                    <path fill="currentColor" d="M2 10a4 4 0 0 1 4-4h20a4 4 0 0 1 4 4v10a4 4 0 0 1-2.328 3.635a2.996 2.996 0 0 0-.55-.756l-8-8A3 3 0 0 0 14 17v7H6a4 4 0 0 1-4-4V10Zm14 19a1 1 0 0 0 1.8.6l2.7-3.6H25a1 1 0 0 0 .707-1.707l-8-8A1 1 0 0 0 16 17v12Z" />
                                                </svg>
                                                <span className="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white">39% OFF</span>
                                            </div>
                                            <div className="mt-4">
                                                <h5 className="text-sm font-mono font-semibold flex justify-center w-full text-black">Summer Platinum Cotton Shirt</h5>
                                                <div className="mt-2 mb-5 flex items-center justify-between">
                                                    <p className='w-full flex justify-evenly'>
                                                        <span className="text-sm text-black font-bold line-through">Rs. 1,470.00</span>
                                                        <span className="text-sm text-green-700 font-bold text-bleck">Rs. 1,299.00</span>
                                                    </p>
                                                </div>
                                            </div>
                                        </Link>


                                    </div>
                                </div>
                            </div>
                        </div>
                    </>

                ))
            }
        </div>
    )
}

export default Cart
