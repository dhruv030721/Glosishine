/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  deleteContentItem,
  setContentItem,
  getContentItem,
} from "../../Services/Operations/ContentItem";
import { v4 as uuidv4 } from "uuid";
import { FaTrash, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Lottie from "lottie-react";
import Loadinganimation from "../../assets/Loadinganimation.json";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { tailChase } from "ldrs";

const SetItems = () => {
  const initialImageArray = [
    { angle: "S1", file: null, preview: null, error: "" },
  ];
  const advertiseItems = [
    { angle: "advertise", file: null, preview: null, error: "" },
  ];
  const feedItems = [{ angle: "Feed1", file: null, preview: null, error: "" }];
  const initialImageArray2 = [
    { angle: "Slider1", file: null, preview: null, error: "" },
  ];

  const [slider1, setSlider1] = useState(initialImageArray);
  const [imagesSlider1, setImagesSlider1] = useState(null);
  const [advertiseImages, setAdvertiseImages] = useState(advertiseItems);
  const [advertisement, setAdvertisement] = useState(null);
  const [slider2, setSlider2] = useState(initialImageArray2);
  const [imagesSlider2, setImagesSlider2] = useState(null);
  const [feedImages, setFeedImages] = useState(feedItems);
  const [feedImg, setFeedImg] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reloadCounter, setReloadCounter] = useState(0);
  const [errors, setErrors] = useState({});

  const checkImageResolution = (file, checkWidth, checkHeight) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      const img = new Image();

      reader.onload = (event) => {
        img.src = event.target.result;
      };

      img.onload = () => {
        const { width, height } = img;
        if (width === checkWidth && height === checkHeight) {
          resolve(); // Dimensions are correct
        } else {
          reject(
            `Error: Image dimensions must be ${checkWidth}x${checkHeight}.`
          );
        }
      };

      img.onerror = () => {
        reject("Error: Failed to load image.");
      };

      reader.readAsDataURL(file);
    });
  };

  const productImageHandler = async (angle, e, checkWidth, checkHeight) => {
    const file = e.target.files[0];

    if (file) {
      try {
        await checkImageResolution(file, checkWidth, checkHeight);
        const preview = URL.createObjectURL(file);

        const updateState = (state, setState) => {
          const updatedImages = state.map((img) =>
            img.angle === angle
              ? { ...img, id: uuidv4(), preview, file, error: "" }
              : img
          );
          setState(updatedImages);
        };

        if (angle === "advertise") {
          updateState(advertiseImages, setAdvertiseImages);
        } else if (angle.startsWith("Feed")) {
          updateState(feedImages, setFeedImages);
        } else if (angle.startsWith("Slider")) {
          updateState(slider2, setSlider2);
        } else {
          updateState(slider1, setSlider1);
        }
      } catch (error) {
        const updateErrorState = (state, setState) => {
          const updatedImages = state.map((img) =>
            img.angle === angle ? { ...img, error } : img
          );
          setState(updatedImages);
        };

        if (angle === "advertise") {
          updateErrorState(advertiseImages, setAdvertiseImages);
        } else if (angle.startsWith("Feed")) {
          updateErrorState(feedImages, setFeedImages);
        } else if (angle.startsWith("Slider")) {
          updateErrorState(slider2, setSlider2);
        } else {
          updateErrorState(slider1, setSlider1);
        }
      }
    }
  };

  const renderCarousel = (images, type) => {
    if (!images || images.length === 0) return <p>No images found</p>;

    return (
      <Carousel
        showThumbs={false}
        showStatus={false}
        infiniteLoop={true}
        renderArrowPrev={(onClickHandler, hasPrev, label) =>
          hasPrev && (
            <button
              type="button"
              onClick={onClickHandler}
              title={label}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-bg-green bg-opacity-50 hover:bg-opacity-100 transition-all duration-200 rounded-full p-2 z-10"
            >
              <FaChevronLeft className="text-white text-2xl" />
            </button>
          )
        }
        renderArrowNext={(onClickHandler, hasNext, label) =>
          hasNext && (
            <button
              type="button"
              onClick={onClickHandler}
              title={label}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-bg-green bg-opacity-50 hover:bg-opacity-100 transition-all duration-200 rounded-full p-2 z-10"
            >
              <FaChevronRight className="text-white text-2xl" />
            </button>
          )
        }
      >
        {images.map((img, index) => (
          <div key={index} className="relative">
            <img
              src={img.url}
              alt={img.angle || "Content Image"}
              className="w-full h-64 object-cover"
            />
            <button
              onClick={() => deleteContentItemHandler(img.id)}
              className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors duration-200"
            >
              <FaTrash size={16} />
            </button>
          </div>
        ))}
      </Carousel>
    );
  };

  const renderSection = (
    title,
    images,
    type,
    uploadComponent,
    confirmAction
  ) => (
    <div className="mb-10 bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <div className="mb-6">{renderCarousel(images, type)}</div>
      <div className="mb-4">{uploadComponent}</div>
      <div className="flex justify-end">
        <button
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition duration-300"
          onClick={confirmAction}
        >
          Confirm
        </button>
      </div>
    </div>
  );

  const addContentItem = async (Array, type, section_id) => {
    await toast.promise(
      setContentItem(Array, type, section_id),
      {
        loading: "Processing....",
        success: (response) => {
          setReloadCounter((prev) => prev + 1);
          return `${response.data.message}`;
        },
        error: (error) => {
          return `${error.response.data.message}`;
        },
      },
      {
        position: "bottom-right", // Set toast position here
      }
    );
  };

  useEffect(() => {
    (async () => {
      setLoading(true); // Set loading to true when starting to fetch data
      try {
        const data = await getContentItem();
        console.log("data", data);
        const imageslider1 = data.filter(
          (item) => item.type === "ImageSlider-1"
        );
        setImagesSlider1(imageslider1);
        const imageslider2 = data.filter(
          (item) => item.type === "ImageSlider-2"
        );
        setImagesSlider2(imageslider2);
        const advertise = data.filter((item) => item.type === "Advertisement");
        setAdvertisement(advertise);
        const feed = data.filter((item) => item.type === "Feed");
        setFeedImg(feed);
      } catch (error) {
        console.log(error);
        toast.error("Failed to load content items", {
          position: "bottom-right",
        });
      } finally {
        setLoading(false); // Set loading to false when done, regardless of success or failure
      }
    })();
  }, [reloadCounter]);

  tailChase.register();

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen relative overflow-hidden">
        <l-tail-chase
          size="60"
          speed="2"
          color="rgb(6,68,59)"
          className="w-1/6 sm:w-1/12 md:w-1/10 lg:w-1/10 xl:w-1/20 2xl:w-1/24"
        ></l-tail-chase>
      </div>
    );
  }

  const deleteContentItemHandler = async (id) => {
    await toast.promise(
      deleteContentItem(id),
      {
        loading: "Processing....",
        success: (response) => {
          setReloadCounter((prev) => prev + 1); // Increment reload counter
          return `${response.data.message}`;
        },
        error: (error) => {
          return `${error.response.data.message}`;
        },
      },
      {
        position: "bottom-right", // Set toast position here
      }
    );
  };

  return (
    <div className="container mx-auto px-4 py-8 font-dm-sans">
      {renderSection(
        "Slider-1 Items (1610x810)",
        imagesSlider1,
        "ImageSlider-1",
        <div className="grid grid-cols-1 gap-4">
          {slider1.map((img, index) => (
            <div key={index} className="flex flex-col items-center">
              {img.preview && (
                <img
                  src={img.preview}
                  alt={img.angle || "Product Img"}
                  className="w-full h-52 object-cover rounded-md mb-2"
                />
              )}
              <input
                type="file"
                accept="image/*"
                onChange={(e) => productImageHandler(img.angle, e, 1610, 810)}
                className="w-full px-3 py-2 text-sm rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              {img.error && (
                <p className="text-red-500 text-sm mt-1">{img.error}</p>
              )}
            </div>
          ))}
        </div>,
        () => addContentItem(slider1, "ImageSlider-1", 1)
      )}

      {renderSection(
        "Advertisement Item (1600x800)",
        advertisement,
        "Advertisement",
        <div className="flex flex-col items-center">
          {advertiseImages.map((img, index) => (
            <div key={index} className="w-full mb-4">
              {img.preview && (
                <img
                  src={img.preview}
                  alt={img.angle || "Advertisement Img"}
                  className="w-full h-52 object-cover rounded-md mb-2"
                />
              )}
              <input
                type="file"
                accept="image/*"
                onChange={(e) => productImageHandler(img.angle, e, 1600, 800)}
                className="w-full px-3 py-2 text-sm rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              {img.error && (
                <p className="text-red-500 text-sm mt-1">{img.error}</p>
              )}
            </div>
          ))}
        </div>,
        () => addContentItem(advertiseImages, "Advertisement", 3)
      )}

      {renderSection(
        "Slider-2 Items (1600x534)",
        imagesSlider2,
        "ImageSlider-2",
        <div className="grid grid-cols-1 gap-4">
          {slider2.map((img, index) => (
            <div key={index} className="flex flex-col items-center">
              {img.preview && (
                <img
                  src={img.preview}
                  alt={img.angle || "Product Img"}
                  className="w-full h-52 object-cover rounded-md mb-2"
                />
              )}
              <input
                type="file"
                accept="image/*"
                onChange={(e) => productImageHandler(img.angle, e, 1600, 534)}
                className="w-full px-3 py-2 text-sm rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              {img.error && (
                <p className="text-red-500 text-sm mt-1">{img.error}</p>
              )}
            </div>
          ))}
        </div>,
        () => addContentItem(slider2, "ImageSlider-2", 4)
      )}

      {renderSection(
        "Feed Items (1600x900)",
        feedImg,
        "Feed",
        <div className="grid grid-cols-1 gap-4">
          {feedImages.map((img, index) => (
            <div key={index} className="flex flex-col items-center">
              {img.preview && (
                <img
                  src={img.preview}
                  alt={img.angle || "Feed Img"}
                  className="w-full h-52 object-cover rounded-md mb-2"
                />
              )}
              <input
                type="file"
                accept="image/*"
                onChange={(e) => productImageHandler(img.angle, e, 1600, 900)}
                className="w-full px-3 py-2 text-sm rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              {img.error && (
                <p className="text-red-500 text-sm mt-1">{img.error}</p>
              )}
            </div>
          ))}
        </div>,
        () => addContentItem(feedImages, "Feed", 5)
      )}
    </div>
  );
};

export default SetItems;
