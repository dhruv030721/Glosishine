/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
import { useContext, useRef, useState, useEffect, useCallback } from "react";
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
import { Link } from "react-router-dom";
import AOS from "aos";
// import Loadinganimation from '../../assets/Loadinganimation.json'
// import Lottie from 'lottie-react';
import CircularLoader from "../../Components/CircularLoader/CircularLoader";
import { AppContext } from "../../App";
import { getContentItem } from "../../Services/Operations/ContentItem";
import tvFrameSvg from "../../assets/TVFrame.png";
import ScribbleLineImg from "../../assets/ScribbleLineImg.png";
import ProductList from "../../Components/ProductList/ProductList";
import { ring2 } from "ldrs";
import TVVideoSection from "../../Components/TVSection/TvSection";
import {
  getFavProduct,
  getNewDropProduct,
} from "../../Services/Operations/ProductServices";
import { removeFromWatchlist } from "../../Slice/watchlistSlice";
import yellowLine from "../../assets/Yellow-Line.svg";
import styled from "@emotion/styled";

const Home = () => {
  const Appcontext = useContext(AppContext);
  const [imageSlider1, setImageSlider1] = useState([]);
  const [imageSlider2, setImageSlider2] = useState([]);
  const [seasonalVideos, setSeasonalVideos] = useState([]);
  const [feed, setFeed] = useState([]);
  const [advertisement, setAdvertisement] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [watchlistItems, setWatchlistItems] = useState([]);
  const [newDropProducts, setNewDropProducts] = useState([]);

  const itemsPerPage = {
    mobile: 1,
    tablet: 3,
    desktop: 5,
  };

  const getItemsPerPage = () => {
    if (window.innerWidth < 640) return itemsPerPage.mobile;
    if (window.innerWidth < 1024) return itemsPerPage.tablet;
    return itemsPerPage.desktop;
  };

  const [currentItemsPerPage, setCurrentItemsPerPage] = useState(
    getItemsPerPage()
  );

  useEffect(() => {
    const handleResize = () => {
      setCurrentItemsPerPage(getItemsPerPage());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleRemove = (id) => {
    removeFromWatchlist(id);
    setWatchlistItems((prev) => prev.filter((item) => item.id !== id));
  };

  ring2.register();

  // Create a ref to track the active slide
  const activeSlideRef = useRef(null);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex + currentItemsPerPage >= newDropProducts.length
        ? 0
        : prevIndex + currentItemsPerPage
    );
  }, [currentItemsPerPage, newDropProducts.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex - currentItemsPerPage < 0
        ? Math.max(newDropProducts.length - currentItemsPerPage, 0)
        : prevIndex - currentItemsPerPage
    );
  }, [currentItemsPerPage, newDropProducts.length]);

  useEffect(() => {
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

        // Fetch watchlist items
        const email = Appcontext?.user?.[0]?.email;
        if (email) {
          const favProducts = await getFavProduct(email);
          if (Array.isArray(favProducts.data.data)) {
            setWatchlistItems(favProducts.data.data);
          } else {
            console.error("Expected an array for favorite products data.");
          }
        }

        // Fetch new drop products
        const newDropData = await getNewDropProduct();
        if (Array.isArray(newDropData.data.data)) {
          setNewDropProducts(newDropData.data.data);
        } else {
          console.error("Expected an array for new drop products data.");
        }

        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(timer);
  }, [nextSlide, newDropProducts]);

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
          <l-ring-2
            size="40"
            bg-opacity="0.2"
            speed="0.5"
            color="rgb(6,68,59)"
            className="w-1/6 sm:w-1/12 md:w-1/10 lg:w-1/10 xl:w-1/20 2xl:w-1/24"
          ></l-ring-2>
        </div>
      </>
    );
  }

  return (
    <div className="w-full h-full overflow-hidden">
      <section data-aos="fade-up" className="mb-8 sm:mb-12 md:mb-16">
        <div className="flex items-center justify-center max-h-[90vh]">
          <Carousel
            className="h-auto"
            prevArrow={({ handlePrev }) => (
              <button
                onClick={handlePrev}
                className="absolute text-white left-2 top-1/2 transform -translate-y-1/2 bg-bg-green bg-opacity-50 hover:bg-opacity-100 transition-all duration-200 rounded-full p-1 z-10"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-4 h-4 md:w-6 md:h-6"
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
                className="absolute text-white right-2 top-1/2 transform -translate-y-1/2 bg-bg-green bg-opacity-50 hover:bg-opacity-100 transition-all duration-200 rounded-full p-1 z-10"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-4 h-4 md:w-6 md:h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 4.5l7.5 7.5-7.5 7.5"
                  />
                </svg>
              </button>
            )}
            navigation={({ setActiveIndex, activeIndex, length }) => (
              <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
                {new Array(length).fill("").map((_, i) => (
                  <span
                    key={i}
                    className={`block h-3 w-3 cursor-pointer rounded-full transition-colors content-[''] ${
                      activeIndex === i ? "bg-white" : "bg-white/50"
                    }`}
                    onClick={() => setActiveIndex(i)}
                  />
                ))}
              </div>
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
      </section>

      <section
        data-aos="fade-up"
        className="mt-8 sm:mt-12 md:mt-16 mb-8 sm:mb-12 md:mb-16"
      >
        <div className="relative w-full">
          <div className="w-full px-4 sm:px-6 md:px-8 py-4 sm:py-6 md:py-8">
            <h1 className="text-bg-green font-bold font-signika text-left text-3xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl mb-2">
              New Drops
            </h1>
            <img
              src={yellowLine}
              alt="scribble"
              className="ml-1 sm:ml-2 md:ml-3 w-24 sm:w-20 md:w-24 lg:w-28 xl:w-32"
            />
          </div>
          <div className="w-full px-4 sm:px-6 md:px-8 pt-4 pb-0 overflow-hidden relative">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${
                  currentIndex * (100 / currentItemsPerPage)
                }%)`,
              }}
            >
              {newDropProducts.map((product, index) => (
                <div
                  key={product.product_id}
                  className="flex-none w-full sm:w-1/2 md:w-1/3 lg:w-1/3 xl:w-1/5 px-2"
                >
                  <ProductList
                    product={product}
                    index={index}
                    onRemove={handleRemove}
                    watchlistItems={watchlistItems}
                    setWatchlistItems={setWatchlistItems}
                    className="min-h-[400px] sm:min-h-[350px] md:min-h-[500px]"
                  />
                </div>
              ))}
            </div>
            <button
              onClick={prevSlide}
              className="absolute text-white left-2 top-1/2 transform -translate-y-1/2 bg-bg-green bg-opacity-50 hover:bg-opacity-100 transition-all duration-200 rounded-full p-1 z-10"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-4 h-4 md:w-6 md:h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5L8.25 12l7.5-7.5"
                />
              </svg>
            </button>
            <button
              onClick={nextSlide}
              className="absolute text-white right-2 top-1/2 transform -translate-y-1/2 bg-bg-green bg-opacity-50 hover:bg-opacity-100 transition-all duration-200 rounded-full p-1 z-10"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-4 h-4 md:w-6 md:h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                />
              </svg>
            </button>
            <div className="mt-10 w-full flex justify-center md:justify-end align-middle">
              <div data-aos="fade-up" className="">
                <a
                  className="flex align-middle justify-center items-center gap-x-5"
                  href="/newdrops"
                >
                  <span className="font-signika text-bg-green text-xl">
                    View All
                  </span>
                  <button className="bg-bg-green p-1 text-white rounded-full w-12 h-12 flex items-center justify-center transition-all duration-300 ease-in-out shadow-md group">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        data-aos="fade-up"
        className="mt-10 sm:mt-10 md:mt-10 mb-8 sm:mb-12 md:mb-16"
      >
        <TVVideoSection
          videoUrl={seasonalVideos.video1[0].url}
          videoClassName="2xl:scale-x-[1.02] 2xl:scale-y-[1.05] 2xl:left-[-5.35%] 2xl:top-[-10.5%]"
        />
      </section>

      <section data-aos="fade-up" className="my-8 sm:my-12 md:my-16">
        <div className="w-full px-4 sm:px-8 md:px-16 py-5 flex flex-col sm:flex-row justify-center items-center gap-8 sm:gap-x-10">
          {[mansshirt, womensshirts].map((image, index) => (
            <a
              href={index === 0 ? "/menswear" : "/womenswear"}
              key={index}
              className="w-full sm:w-auto"
            >
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
      </section>

      <section
        data-aos="fade-up"
        className="mt-12 sm:mt-16 md:mt-20 mb-8 sm:mb-12 md:mb-16"
      >
        <TVVideoSection
          videoUrl={seasonalVideos.video2[0].url}
          videoClassName="2xl:scale-x-[1.02] 2xl:scale-y-[1.05] 2xl:left-[-5.35%] 2xl:top-[-10.5%]"
        />
      </section>

      <section
        data-aos="fade-up"
        className="mt-12 sm:mt-16 md:mt-20 mb-8 sm:mb-12 md:mb-16"
      >
        <Carousel
          prevArrow={({ handlePrev }) => (
            <button
              onClick={handlePrev}
              className="absolute text-white left-2 top-1/2 transform -translate-y-1/2 bg-bg-green bg-opacity-50 hover:bg-opacity-100 transition-all duration-200 rounded-full p-1 z-10"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-4 h-4 md:w-6 md:h-6"
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
              className="absolute text-white right-2 top-1/2 transform -translate-y-1/2 bg-bg-green bg-opacity-50 hover:bg-opacity-100 transition-all duration-200 rounded-full p-1 z-10"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-4 h-4 md:w-6 md:h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                />
              </svg>
            </button>
          )}
          className="h-[75%]"
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
      </section>

      <section data-aos="fade-up" className="mt-8 sm:mt-12 md:mt-16 xl:mt-0">
        <div className="w-full px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4">
          <h1 className="text-bg-green font-bold font-signika text-left text-3xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl mb-2">
            Follow Our Feeds
          </h1>
          <img
            src={yellowLine}
            alt="scribble"
            className="ml-1 sm:ml-2 md:ml-3 w-24 sm:w-20 md:w-24 lg:w-28 xl:w-32"
          />
        </div>
        <div className="w-full mt-4 sm:mt-6 md:mt-8">
          {photos.map((photo, index) => (
            <img
              key={feed[index].id}
              src={photo}
              className="w-full mb-4 sm:mb-6 md:mb-8"
              alt={`feed ${feed[index].id + 1}`}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
