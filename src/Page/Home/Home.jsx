import { useContext, useState } from 'react'
import { Carousel } from "@material-tailwind/react";
import image4 from '../../assets/image4.jpg'
import video from '../../assets/video.mp4'
import video1 from '../../assets/video1.mp4'
import poloshirts from '../../assets/polotshirts.jpg'
import mansshirt from '../../assets/mansshirt.webp'
import sportswear from '../../assets/sportswear.webp'
import winterwear from '../../assets/winterwear.webp'
import womensshirts from '../../assets/womensshirts.webp'
import onit from '../../assets/onit.jpg'
import cartimage3 from '../../assets/cartimage2.jpg'
import onit1 from '../../assets/onit1.jpg'
import photo1 from '../../assets/photo1.jpg'
import photo2 from '../../assets/photo2.jpg'
import photo4 from '../../assets/photo4.jpg'
import photo5 from '../../assets/photo5.jpg'
import photo7 from '../../assets/photo7.jpg'
import photo8 from '../../assets/photo8.jpg'
import photo9 from '../../assets/photo9.jpg'
import photo10 from '../../assets/photo10.jpg'
import photo11 from '../../assets/photo11.jpg'
import photo12 from '../../assets/photo12.jpg'
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import AOS from "aos";
// import Loadinganimation from '../../assets/Loadinganimation.json'
import "aos/dist/aos.css";
// import Lottie from 'lottie-react';
import CircularLoader from "../../Components/CircularLoader/CircularLoader"
import { AppContext } from '../../App';
import { getContentItem } from '../../Services/Operations/ContentItem';
import { RiShoppingBag4Fill } from "react-icons/ri";


const Home = () => {
    const Appcontext = useContext(AppContext);
    const [imageSlider1, setImageSlider1] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        AOS.init();
        AOS.refresh();


        (async () => {
            try {
                const data = await getContentItem();
                const imageslider1 = data.filter((item) => item.type === "ImageSlider-1")
                setImageSlider1(imageslider1);
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        })()


    }, []);

    if (loading) {
        return (
            <>
                <div className='flex justify-center items-center h-screen'>
                    <CircularLoader />
                    {/* <Lottie animationData={Loadinganimation} loop={true} className='w-[50%] h-[50%]' /> */}
                </div>
            </>
        );
    }

    const addToCart = (id) => {
        if (Appcontext.CartProducts.map((item) => item.product_id !== id)) {
            const product = Appcontext.getdata.find((item) => item.product_id === id)
            product.quantity = 1;
            Appcontext.setCartProducts([...Appcontext.CartProducts, product])
            Appcontext.setIsDrawerOpen(true);
        } {
            Appcontext.setIsDrawerOpen(true);
        }
    }


    const photos = [
        photo1, photo2, photo2, photo4, photo5, photo5,
        photo7, photo8, photo9, photo10, photo11, photo12
    ];
    return (
        <div className='w-full h-full'>
            <Carousel className="h-[75%]">
                {imageSlider1.map((image, index) => (
                    <img
                        key={index}
                        src={image.url}
                        alt={`image ${index + 1}`}
                        className="h-full w-full object-cover"
                    />
                ))}
            </Carousel>
            <Link to='/bundledeal'>
                <img src={image4} alt="image 4" className="h-full w-full mt-5 object-cover" />
            </Link>
            <div className="pt-4">
                <div data-aos="fade-up" data-aos-duration="1000">
                    <h1 className="w-full font-poppins text-2xl sm:text-xl md:text-2xl lg:text-3xl flex pl-5 pr-5 justify-center mb-6">New Drops</h1>
                </div>
                <div className="w-full p-5 ">
                    <div className="grid sm:grid-cols-1  md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3 justify-center">
                        {Appcontext.getdata.map((product) => (
                            <>
                               
                            </>
                        ))}
                    </div>
                    <div className="mt-10 w-full flex justify-center">
                        <div data-aos="fade-up" data-aos-duration="1000">
                            <Link to="/newarrivals" className="cursor-pointer font-monserrat group relative flex gap-1.5 p-2 items-center justify-center w-32 h-12 bg-green-900 bg-opacity-80 text-[#f1f1f1] rounded-lg hover:bg-opacity-70 transition font-semibold shadow-md">
                                View all
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className='w-full'>
                <video src={video} autoPlay muted className='w-full' />
            </div>
            <div className='w-full pl-16 pr-16 pt-5 pb-5'>

                <div className='grid grid-cols-3 gap-x-10 gap-y-2'>
                    {[mansshirt, sportswear, womensshirts, poloshirts, winterwear].map((image, index) => (
                        <img key={index} src={image} alt="" />
                    ))}
                </div>
            </div>
            <div className='w-full'>
                <video src={video1} autoPlay muted className='w-full' />
            </div>
            <Carousel className="h-[75%]">
                {[onit, onit1].map((image, index) => (
                    <div key={index} data-aos="fade-zoom-in" data-aos-easing="ease-in-back" data-aos-delay="100" data-aos-offset="0">
                        <img src={image} alt={`onit ${index + 1}`} className="h-full w-full object-cover" />
                    </div>
                ))}
            </Carousel>
            <div className='pt-4'>
                <div data-aos="fade-up" data-aos-duration="1000">
                    <h1 className='w-full font-poppins text-2xl flex pl-5 pr-5 justify-center mb-6'>Follow Our Feeds</h1>
                </div>
                <div className='w-full grid grid-cols-6'>
                    {photos.map((photo, index) => (
                        <img key={index} src={photo} alt="" />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Home
