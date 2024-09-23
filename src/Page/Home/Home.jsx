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
import { hourglass } from "ldrs";

const Home = () => {
  const Appcontext = useContext(AppContext);
  const [imageSlider1, setImageSlider1] = useState([]);
  const [imageSlider2, setImageSlider2] = useState([]);
  const [seasonalVideos, setSeasonalVideos] = useState([]);
  const [feed, setFeed] = useState([]);
  const [advertisement, setAdvertisement] = useState([]);
  const [loading, setLoading] = useState(true);

  hourglass.register();

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
  }, [imageSlider1, imageSlider2]);

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
        <div className="w-auto flex flex-col justify-center items-center h-screen relative overflow-hidden over">
          <l-hourglass
            size="60"
            bg-opacity="0.2"
            speed="2"
            color="rgb(6,68,59)"
          ></l-hourglass>
          <img
            src={ScribbleLineImg}
            alt="ScribbleLineImg"
            className="absolute top-[15px] left-[-1%] z-[-1] scale-[1]"
          />
          <p className="font-caveat mt-10 text-[34px] text-orange-50 text-center">
            Loading...
          </p>
          {/* <Lottie animationData={Loadinganimation} loop={true} className='w-[50%] h-[50%]' /> */}
        </div>
      </>
    );
  }

  return (
    <div className="w-full h-full overflow-x-hidden">
      <div className="flex items-center justify-center max-h-[90vh] mb-10">
        <Carousel
          className="h-auto"
          prevArrow={({ handlePrev }) => (
            <button
              onClick={handlePrev}
              className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-bg-green text-white rounded-full w-10 h-10 flex items-center justify-center"
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
              className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-bg-green text-white rounded-full w-10 h-10 flex items-center justify-center"
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
          {imageSlider1.map((image, index) => (
            <img
              key={index}
              src={image.url}
              alt={`image ${index + 1}`}
              className="max-h-full max-w-full object-contain "
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
                className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-bg-green text-white rounded-full w-10 h-10 flex items-center justify-center"
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
            {advertisement.map((ad, index) => (
              <img
                key={index}
                src={ad.url}
                alt={`advertisement ${index + 1}`}
                className="max-h-full max-w-full object-contain object-center"
              />
            ))}
          </Carousel>
        </div>
      )}
      <div className="pt-4 relative">
        <div data-aos="fade-up" data-aos-duration="1000">
          <img
            src={ScribbleLineImg}
            alt="ScribbleLineImg"
            className="h-[800px] absolute top-[-375px] left-[1%] z-[-1] scale-[1.25]"
          />
          <h1 className="z-[999] w-full text-orange-50 font-[caveat] text-5xl sm:text-xl md:text-2xl lg:text-5xl flex pl-5 pr-5 justify-center mb-6">
            New Drops
          </h1>
        </div>
        <div className="w-full p-5 ">
          <div className="grid sm:grid-cols-1  md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3 justify-center">
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
              <button className="bg-white bg-opacity-80 text-bg-green border-2 border-bg-green rounded-full text-lg font-semibold px-8 py-4 cursor-pointer transition-transform duration-300 ease-in-out shadow-md hover:shadow-bg-green hover:-translate-y-1 hover:-translate-x-0.5 active:shadow-bg-green active:translate-y-0.5 active:translate-x-0.5">
                View all
              </button>
              {/* </Link> */}
            </div>
          </div>
        </div>
      </div>
      <div
        data-aos="fade-left"
        data-aos-easing="ease-in-back"
        data-aos-delay="100"
        data-aos-offset="0"
        className="w-full flex flex-col justify-center items-center relative mt-10"
      >
        <img src={tvFrameSvg} alt={tvFrameSvg} />
        <video
          src={seasonalVideos.video2[0].url}
          autoPlay
          muted
          className="w-full h-full absolute top-[-7.5%] left-[-6.25%] rounded scale-[0.7]"
        />
      </div>
      <div className="w-full pl-16 pr-16 pt-5 pb-5 flex justify-center items-center">
        <div className="flex justify-center items-center gap-x-10 gap-y-2">
          {[mansshirt, womensshirts].map((image, index) => (
            <img
              key={index}
              src={image}
              alt=""
              className="w-[450px] h-[550px]"
            />
          ))}
        </div>
      </div>
      <div
        data-aos="fade-right"
        data-aos-easing="ease-in-back"
        data-aos-delay="100"
        data-aos-offset="0"
        className="w-full flex flex-col justify-center items-center relative mt-10"
      >
        <img src={tvFrameSvg} alt={tvFrameSvg} />
        <video
          src={seasonalVideos.video1[0].url}
          autoPlay
          muted
          className="w-full h-full absolute top-[-7.5%] left-[-6.25%] rounded scale-[0.7]"
        />
      </div>
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
            >
              <img
                src={image.url}
                alt={`onit ${index + 1}`}
                className="max-h-full max-w-full object-contain object-center "
              />
            </div>
          ))}
        </Carousel>
      </div>
      <div className="pt-4 relative">
        <div data-aos="fade-up" data-aos-duration="1000">
          <img
            src={ScribbleLineImg}
            alt="ScribbleLineImg"
            className="w-[800px] absolute top-[-195px] left-[22%] z-[-1] scale-[2.75]"
          />
          <h1 className="w-full font-[caveat] text-5xl text-orange-50 flex pl-5 pr-5 justify-center mb-6">
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
