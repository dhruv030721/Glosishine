/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
import { useContext, useRef, useState } from "react";
import { Carousel } from "@material-tailwind/react";
import image4 from "../../assets/image4.jpg";
import video from "../../assets/video.mp4";
import video1 from "../../assets/video1.mp4";
import poloshirts from "../../assets/polotshirts.jpg";
import mansshirt from "../../assets/mansshirt.webp";
import sportswear from "../../assets/sportswear.webp";
import winterwear from "../../assets/winterwear.webp";
import womensshirts from "../../assets/womensshirts.webp";
import onit from "../../assets/onit.jpg";
import onit1 from "../../assets/onit1.jpg";
import photo1 from "../../assets/photo1.jpg";
import photo2 from "../../assets/photo2.jpg";
import photo4 from "../../assets/photo4.jpg";
import photo5 from "../../assets/photo5.jpg";
import photo7 from "../../assets/photo7.jpg";
import photo8 from "../../assets/photo8.jpg";
import photo9 from "../../assets/photo9.jpg";
import photo10 from "../../assets/photo10.jpg";
import photo11 from "../../assets/photo11.jpg";
import photo12 from "../../assets/photo12.jpg";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
// import Loadinganimation from '../../assets/Loadinganimation.json'
import "aos/dist/aos.css";
// import Lottie from 'lottie-react';
import CircularLoader from "../../Components/CircularLoader/CircularLoader";
import { AppContext } from "../../App";
import { getContentItem } from "../../Services/Operations/ContentItem";
import tvFrameSvg from "../../assets/TVFrame.png";
import ScribbleLineImg from "../../assets/ScribbleLineImg.png";
import ProductList from "../../Components/ProductList/ProductList";
import { hourglass, tailChase } from "ldrs";
import TVVideoSection from "../../Components/TVSection/TvSection";

const Home = () => {
  const Appcontext = useContext(AppContext);
  const [imageSlider1, setImageSlider1] = useState([]);
  const [imageSlider2, setImageSlider2] = useState([]);
  const [seasonalVideos, setSeasonalVideos] = useState([]);
  const [feed, setFeed] = useState([]);
  const [advertisement, setAdvertisement] = useState([]);
  const [loading, setLoading] = useState(true);

  tailChase.register();

  // Create a ref to track the active slide
  const activeSlideRef = useRef(null);

  useEffect(() => {
    AOS.init();
    AOS.refresh();

    (async () => {
      try {
        const data = await getContentItem();
        console.log(data, "data");

        const slider1 = data.filter((item) => item.type === "ImageSlider-1");
        console.log(slider1, "slider1");
        const slider2 = data.filter((item) => item.type === "ImageSlider-2");
        console.log(slider2, "slider2");
        const getfeed = data.filter((item) => item.type === "Feed");
        console.log(getfeed, "getfeed");
        const advertisement = data.filter(
          (item) => item.type === "Advertisement"
        );
        console.log(advertisement, "advertisement");
        const video1 = data.filter((item) => item.type === "Video-1");
        const video2 = data.filter((item) => item.type === "Video-2");
        setImageSlider1(slider1);
        console.log(imageSlider1, "slider-1");

        setImageSlider2(slider2);
        console.log(imageSlider2, "slider-2");

        setFeed(getfeed);
        setAdvertisement(advertisement);
        setSeasonalVideos({ video1, video2 });
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const addToCart = (id) => {
    if (Appcontext.CartProducts.map((item) => item.product_id !== id)) {
      const product = Appcontext.getdata.find((item) => item.product_id === id);
      product.quantity = 1;
      Appcontext.setCartProducts([...Appcontext.CartProducts, product]);
      Appcontext.setIsDrawerOpen(true);
    }
    {
      Appcontext.setIsDrawerOpen(true);
    }
  };

  // const photos = [
  //   photo1,
  //   photo2,
  //   photo2,
  //   photo4,
  //   photo5,
  //   photo5,
  //   photo7,
  //   photo8,
  //   photo9,
  //   photo10,
  //   photo11,
  //   photo12,
  // ];

  const photos = feed.map((feed, index) => {
    return feed.url;
  });
  // console.log(feed);

  if (loading) {
    return (
      <>
        <div className="flex flex-col justify-center items-center h-screen relative overflow-hidden">
          <l-tail-chase
            size="60"
            bg-opacity="0.2"
            speed="2"
            color="rgb(6,68,59)"
            className="w-1/6 sm:w-1/12 md:w-1/10 lg:w-1/10 xl:w-1/20 2xl:w-1/24" // Adjust size for larger screens
          ></l-tail-chase>

          {/* <Lottie animationData={Loadinganimation} loop={true} className='w-[50%] h-[50%]' /> */}
        </div>
      </>
    );
  }

  return (
    <div className="w-full h-full overflow-x-hidden">
      <div className="flex items-center justify-center max-h-[90vh]">
        <Carousel
          className="h-auto"
          prevArrow={({ handlePrev }) => (
            <button
              onClick={handlePrev}
              className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-bg-green text-white rounded-full w-10 h-10 flex items-center justify-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5L8.25 12l7.5-7.5"
                />
              </svg>
            </button>
          )}
          nextArrow={({ handleNext }) => (
            <button
              onClick={handleNext}
              className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-bg-green text-white rounded-full w-10 h-10 flex items-center justify-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                />
              </svg>
            </button>
          )}
        >
          {imageSlider1.map((image, index) => (
            <img
              key={index}
              src={image.url}
              alt={`image ${index + 1}`}
              className="max-h-full max-w-full object-contain w-full"
            />
          ))}
        </Carousel>
      </div>
      {(advertisement.length > 0 || console.log(advertisement)) && (
        <div className="relative mt-5 max-h-[90vh] w-full mb-20 hidden">
          <Carousel
            className="h-[75%] mt-5"
            prevArrow={({ handlePrev }) => (
              <button
                onClick={handlePrev}
                className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-bg-green text-white rounded-full w-10 h-10 flex items-center justify-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 19.5L8.25 12l7.5-7.5"
                  />
                </svg>
              </button>
            )}
            nextArrow={({ handleNext }) => (
              <button
                onClick={handleNext}
                className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-bg-green text-white rounded-full w-10 h-10 flex items-center justify-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 4.5l7.5 7.5-7.5 7.5"
                  />
                </svg>
              </button>
            )}
          >
            {advertisement.map((ad, index) => (
              <img
                key={index}
                src={ad.url}
                alt={`advertisement ${index + 1}`}
                className="max-h-full max-w-full object-contain object-center w-full"
              />
            ))}
          </Carousel>
        </div>
      )}
      <div
        data-aos="fade-up"
        data-aos-duration="800"
        className="relative xl:pt-0 2xl:py-5 4xl:py-24 w-full"
      >
        <div className="my-5 w-full h-full bg-bg-green sm:my-5 lg:my-0 xl:mb-2 xl:mt-2 2xl:my-4 4xl:my-6">
          <h1 className="z-[999] w-full text-orange-50 font-PM text-center text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-5xl flex pl-5 pr-5 justify-center py-4 xl:py-4 2xl:py-7 4xl:py-10">
            New Drops
          </h1>
        </div>
        <div className="w-full p-5 pt-0">
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-3 justify-center">
            {Appcontext.getdata.map((product, index) => (
              <ProductList
                key={product.product_id}
                product={product}
                index={index}
              />
            ))}
          </div>
          <div className="mt-10 w-full flex justify-center">
            <div data-aos="fade-up" data-aos-duration="1000">
              {/* <Link
                to="/newarrivals"
                className="cursor-pointer font-monserrat group relative flex gap-1.5 p-2 items-center justify-center w-32 h-12  rounded-lg hover:bg-opacity-70 transition font-semibold shadow-md"
              > */}
              <button className="bg-white bg-opacity-80 text-bg-green border-2 border-bg-green rounded-lg text-lg font-semibold px-4 py-2 cursor-pointer transition-transform duration-300 ease-in-out shadow-md hover:shadow-bg-green hover:-translate-y-1 hover:-translate-x-0.5 active:shadow-bg-green active:translate-y-0.5 active:translate-x-0.5">
                View all
              </button>
              {/* </Link> */}
            </div>
          </div>
        </div>
      </div>
      <TVVideoSection
        videoUrl={seasonalVideos.video1[0].url}
        videoClassName="2xl:scale-x-[1.02] 2xl:scale-y-[1.05] 2xl:left-[-5.35%] 2xl:top-[-10.5%]"
      />
      <div className="w-full px-4 sm:px-8 md:px-16 pt-5 pb-5 flex flex-col sm:flex-row justify-center items-center 2xl:my-10">
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-x-10">
          {[mansshirt, womensshirts].map((image, index) => (
            <a href={index === 0 ? "/menswear" : "/womenswear"} key={index}>
              <img
                data-aos="fade-up"
                data-aos-duration="1000"
                src={image}
                alt=""
                className="w-full max-w-[450px] h-auto"
              />
            </a>
          ))}
        </div>
      </div>
      <TVVideoSection
        videoUrl={seasonalVideos.video2[0].url}
        videoClassName="2xl:scale-x-[1.02] 2xl:scale-y-[1.05] 2xl:left-[-5.35%] 2xl:top-[-10.5%]"
      />
      <div className="relative">
        <Carousel
          className="h-[75%]"
          prevArrow={({ handlePrev }) => (
            <button
              onClick={handlePrev}
              className="z-[999] absolute top-1/2 left-4 transform -translate-y-1/2 bg-bg-green text-white rounded-full w-10 h-10 flex items-center justify-center"
            >
              {/* Left Arrow Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5L8.25 12l7.5-7.5"
                />
              </svg>
            </button>
          )}
          nextArrow={({ handleNext }) => (
            <button
              onClick={handleNext}
              className="z-[999] absolute top-1/2 right-4 transform -translate-y-1/2 bg-bg-green text-white rounded-full w-10 h-10 flex items-center justify-center"
            >
              {/* Right Arrow Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                />
              </svg>
            </button>
          )}
        >
          {imageSlider2.map((image, index) => (
            <div
              key={index}
              data-aos="fade-zoom-in"
              data-aos-easing="ease-in-back"
              data-aos-delay="100"
              data-aos-offset="0"
              className="w-full"
            >
              <img
                src={image.url}
                alt={`onit ${index + 1}`}
                className="max-h-full max-w-full object-cover w-full"
              />
            </div>
          ))}
        </Carousel>
      </div>
      <div className="relative">
        <div
          data-aos="fade-up"
          data-aos-duration="1000"
          className="mb-5 w-full h-full bg-bg-green sm:my-5 lg:my-2 xl:my-2 2xl:my-4 4xl:my-6"
        >
          <h1 className="w-full text-orange-50 font-PM text-center text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-5xl flex pl-5 pr-5 justify-center py-4 xl:py-4 2xl:py-7 4xl:py-10">
            Follow Our Feeds
          </h1>
        </div>
        <div className="w-full">
          {photos.map((photo, index) => (
            <img
              key={feed.id}
              src={photo}
              className="w-full"
              alt={`feed ${feed.id + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
