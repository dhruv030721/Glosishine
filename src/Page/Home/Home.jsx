import { useContext, useState } from "react";
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

const Home = () => {
  const Appcontext = useContext(AppContext);
  const [imageSlider1, setImageSlider1] = useState(null);
  const [imageSlider2, setImageSlider2] = useState(null);
  const [seasonalVideos, setSeasonalVideos] = useState(null);
  const [feed, setFeed] = useState(null);
  const [advertisement, setAdvertisement] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init();
    AOS.refresh();

    (async () => {
      try {
        const data = await getContentItem();
        const imageslider1 = data.filter(
          (item) => item.type === "ImageSlider-1"
        );
        const imageslider2 = data.filter(
          (item) => item.type === "ImageSlider-2"
        );
        const feed = data.filter((item) => item.type === "Feed");
        const advertisement = data.filter(
          (item) => item.type === "Advertisement"
        );
        const video1 = data.filter((item) => item.type === "Video-1");
        const video2 = data.filter((item) => item.type === "Video-2");
        setImageSlider1(imageslider1);
        setImageSlider2(imageslider2);
        setFeed(feed);
        setAdvertisement(advertisement);
        setSeasonalVideos({ video1, video2 });
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  if (loading) {
    return (
      <>
        <div className="flex justify-center items-center h-screen">
          <CircularLoader />
          {/* <Lottie animationData={Loadinganimation} loop={true} className='w-[50%] h-[50%]' /> */}
        </div>
      </>
    );
  }

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

  const photos = feed.map((feed) => feed.url);

  return (
    <div className="w-full h-full">
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
      {advertisement.length > 0 && (
        <Carousel className="h-[75%] mt-5">
          {advertisement.map((ad, index) => (
            <img
              key={index}
              src={ad.url}
              alt={`advertisement ${index + 1}`}
              className="h-full w-full object-cover"
            />
          ))}
        </Carousel>
      )}
      <div className="pt-4">
        <div data-aos="fade-up" data-aos-duration="1000">
          <h1 className="w-full font-poppins text-2xl sm:text-xl md:text-2xl lg:text-3xl flex pl-5 pr-5 justify-center mb-6">
            New Drops
          </h1>
        </div>
        <div className="w-full p-5 ">
          <div className="grid sm:grid-cols-1  md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3 justify-center">
            {Appcontext.getdata.map((product) => (
              <>
                {
                  <div
                    data-aos="fade-zoom-in"
                    data-aos-easing="ease-in-back"
                    data-aos-delay="200"
                    data-aos-offset="0"
                  >
                    <div className="flex flex-col overflow-hidden">
                      <a
                        className="relative flex h-96 overflow-hidden"
                        href={`/${product.product_id}`}
                      >
                        <img
                          className="peer absolute top-0 right-0 h-full w-full object-cover"
                          src={product.product_img || product.images[0]} // Main image
                          alt={product.product_name}
                        />
                        {product.images.length > 1 && (
                          <img
                            className="peer-hover:right-0 absolute top-0 -right-96 h-full w-full object-cover transition-all delay-100 duration-1000 hover:right-0"
                            src={product.images[1]} // Secondary image on hover
                            alt={product.product_name}
                          />
                        )}
                        <svg
                          className="group-hover:animate-ping group-hover:opacity-30 peer-hover:opacity-0 pointer-events-none absolute inset-x-0 bottom-5 mx-auto text-3xl text-white transition-opacity"
                          xmlns="http://www.w3.org/2000/svg"
                          aria-hidden="true"
                          role="img"
                          width="1em"
                          height="1em"
                          preserveAspectRatio="xMidYMid meet"
                          viewBox="0 0 32 32"
                        >
                          <path
                            fill="currentColor"
                            d="M2 10a4 4 0 0 1 4-4h20a4 4 0 0 1 4 4v10a4 4 0 0 1-2.328 3.635a2.996 2.996 0 0 0-.55-.756l-8-8A3 3 0 0 0 14 17v7H6a4 4 0 0 1-4-4V10Zm14 19a1 1 0 0 0 1.8.6l2.7-3.6H25a1 1 0 0 0 .707-1.707l-8-8A1 1 0 0 0 16 17v12Z"
                          />
                        </svg>
                        <span className="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white">
                          {product.discountPercentage}% OFF
                        </span>
                      </a>
                      <div className="mt-4">
                        <a href={product.product_id}>
                          <h5 className="text-sm font-mono font-semibold flex justify-center w-full text-black">
                            {product.product_name}
                          </h5>
                        </a>
                        <div className="mt-2 mb-5 flex items-center justify-between">
                          <p className="w-full flex justify-evenly">
                            <span className="text-sm text-black font-bold line-through">
                              Rs. {product.regular_price}
                            </span>
                            <span className="text-sm text-green-700 font-bold">
                              Rs. {product.sale_price}
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                }
              </>
            ))}
          </div>
          <div className="mt-10 w-full flex justify-center">
            <div data-aos="fade-up" data-aos-duration="1000">
              <Link
                to="/newarrivals"
                className="cursor-pointer font-monserrat group relative flex gap-1.5 p-2 items-center justify-center w-32 h-12 bg-green-900 bg-opacity-80 text-[#f1f1f1] rounded-lg hover:bg-opacity-70 transition font-semibold shadow-md"
              >
                View all
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full">
        <video
          src={seasonalVideos.video2[0].url}
          autoPlay
          muted
          className="w-full"
        />
      </div>
      <div className="w-full pl-16 pr-16 pt-5 pb-5">
        <div className="grid grid-cols-3 gap-x-10 gap-y-2">
          {[mansshirt, sportswear, womensshirts, poloshirts, winterwear].map(
            (image, index) => (
              <img key={index} src={image} alt="" />
            )
          )}
        </div>
      </div>
      <div className="w-full">
        <video
          src={seasonalVideos.video1[0].url}
          autoPlay
          muted
          className="w-full"
        />
      </div>
      <Carousel className="h-[75%]">
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
              className="h-full w-full object-cover"
            />
          </div>
        ))}
      </Carousel>
      <div className="pt-4">
        <div data-aos="fade-up" data-aos-duration="1000">
          <h1 className="w-full font-poppins text-2xl flex pl-5 pr-5 justify-center mb-6">
            Follow Our Feeds
          </h1>
        </div>
        <div className="w-full grid grid-cols-6">
          {photos.map((photo, index) => (
            <img key={index} src={photo} alt={`feed ${index + 1}`} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
