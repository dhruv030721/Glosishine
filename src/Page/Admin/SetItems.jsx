import React, { useEffect, useState } from 'react';
import image1 from '../../assets/image1.jpg';
import toast from 'react-hot-toast';
import { deleteContentItem, setContentItem } from '../../Services/Operations/ContentItem';
import { v4 as uuidv4 } from "uuid";
import { getContentItem } from '../../Services/Operations/ContentItem';
import { FaTrash } from "react-icons/fa6";
import Lottie from 'lottie-react';
import Loadinganimation from '../../assets/Loadinganimation.json'

const SetItems = () => {
    const initialImageArray = [
        { angle: "S1", file: null, preview: null },
    ];
    const advertiseItems = [
        { angle: "advertise", file: null, preview: null },
    ]
    const feedItems = [
        { angle: "Feed1", file: null, preview: null },
    ];
    const initialImageArray2 = [
        { angle: "Slider1", file: null, preview: null },
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

    const productImageHandler = (angle, e) => {
        const file = e.target.files[0];
        const preview = URL.createObjectURL(file);

        if (angle === "advertise") {
            const updatedImages = advertiseImages.map(img =>
                img.angle === angle ? { ...img, id: uuidv4(), preview, file } : img
            );
            setAdvertiseImages(updatedImages);
        } else if (angle.startsWith("Feed")) {
            const updatedImages = feedImages.map(img =>
                img.angle === angle ? { ...img, id: uuidv4(), preview, file } : img
            );
            setFeedImages(updatedImages);
        } else if (angle.startsWith("Slider")) {
            const updatedImages = slider2.map(img =>
                img.angle === angle ? { ...img, id: uuidv4(), preview, file } : img
            );
            setSlider2(updatedImages);
        } else {
            const updatedImages = slider1.map(img =>
                img.angle === angle ? { ...img, id: uuidv4(), preview, file } : img
            );
            setSlider1(updatedImages);
        }
    };




    const addContentItem = async (Array, type, section_id) => {
        await toast.promise(
            setContentItem(Array, type, section_id),
            {
                loading: "Processing....",
                success: (response) => {
                    setReloadCounter(prev => prev + 1);
                    return `${response.data.message}`
                },
                error: (error) => {
                    return `${error.response.data.message}`
                }
            }
        );
    };



    useEffect(() => {
        (async () => {
            try {
                const data = await getContentItem();
                console.log("data", data);
                const imageslider1 = data.filter((item) => item.type === "ImageSlider-1");
                // console.log("imageslider1", imageslider1);
                setImagesSlider1(imageslider1);
                const imageslider2 = data.filter((item) => item.type === "ImageSlider-2");
                setImagesSlider2(imageslider2);
                const advertise = data.filter((item) => item.type === "Advertisement");
                setAdvertisement(advertise);
                const feed = data.filter((item) => item.type === "Feed");
                setFeedImg(feed);
                setLoading(false);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        })()
    }, [reloadCounter]);





    if (loading) {
        return (
            <>
                <div className='flex justify-center items-center h-screen'>
                    <Lottie animationData={Loadinganimation} loop={true} className='w-[50%] h-[50%]' />
                </div>
            </>
        );
    }


    const deleteContentItemHandler = async (id) => {
        await toast.promise(
            deleteContentItem(id),
            {
                loading: "Processing....",
                success: (response) => {
                    setReloadCounter(prev => prev + 1); // Increment reload counter
                    return `${response.data.message}`
                },
                error: (error) => {
                    return `${error.response.data.message}`
                }
            }
        );
    }



    return (
        <div className='w-full'>
            <h1 className='w-full h-10 flex items-center justify-center bg-slate-300 text-xl font-poppins rounded-md'>Slider Items 1</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 w-[90%] gap-4">
                {slider1.map((img, index) => (
                    <div key={index} className="flex flex-col items-center">
                        <img
                            src={img.preview || image1}
                            alt={img.angle || "Product Img"}
                            className="w-full h-52 mt-2 object-cover rounded-md"
                        />
                        <label className="text-sm font-medium leading-none mt-2 mb-2">{img.angle}</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => productImageHandler(img.angle, e)}
                            className="appearance-none relative block w-full px-3 py-2 text-sm leading-tight rounded-md bg-white border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1  w-[90%] gap-4">
                {imagesSlider1 == null ? "No any images found" : (
                    imagesSlider1.map((img, index) => (
                        <div key={index} className="flex gap-x-5 items-center">
                            <img
                                src={img.url || image1}
                                alt={img.angle || "Product Img"}
                                className="w-full h-52 mt-2 object-cover rounded-md"
                            />
                            <label className="text-sm font-medium leading-none mt-2 mb-2">{img.angle}</label>
                            <button onClick={() => deleteContentItemHandler(img.id)} className='border-2 border-red-500 border-dashed rounded-lg p-2'>
                                <FaTrash size={20} color='red' />
                            </button>
                        </div>
                    ))
                )}
            </div>

            <div className='mt-2 flex gap-x-5 justify-end'>
                <button
                    className='bg-green-700 text-white font-poppins font-bold py-2 px-4 rounded'
                    onClick={() => addContentItem(slider1, "ImageSlider-1", 1)}>
                    Confirm
                </button>
            </div>




            <h1 className='w-full mt-5 h-10 flex items-center justify-center bg-slate-300 text-xl font-poppins rounded-md'>Advertisement Item</h1>
            <div className='mt-2 w-[67%] flex'>
                {advertiseImages.map((img, index) => (
                    <div key={index} className="flex flex-col items-center">
                        <img
                            src={img.preview || image1}
                            alt={img.angle || "Product Img"}
                            className="w-full h-52 mt-2 object-cover rounded-md"
                        />
                        <label className="text-sm font-medium leading-none mt-2 mb-2">{img.angle}</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => productImageHandler(img.angle, e)}
                            className="appearance-none relative block w-full px-3 py-2 text-sm leading-tight rounded-md bg-white border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                    </div>
                ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1  w-[90%] gap-4">
                {advertisement == null ? "No any images found" : (
                    advertisement.map((img, index) => (
                        <div key={index} className="flex gap-x-5 items-center">
                            <img
                                src={img.url || image1}
                                alt={img.angle || "Product Img"}
                                className="w-full h-52 mt-2 object-cover rounded-md"
                            />
                            <label className="text-sm font-medium leading-none mt-2 mb-2">{img.angle}</label>
                            <button onClick={() => deleteContentItemHandler(img.id)} className='border-2 border-red-500 border-dashed rounded-lg p-2'>
                                <FaTrash size={20} color='red' />
                            </button>
                        </div>
                    ))
                )}
            </div>
            <div className='mt-2 flex gap-x-5 justify-end'>
                <button
                    className='bg-green-700 text-white font-poppins font-bold py-2 px-4 rounded'
                    onClick={() => addContentItem(advertiseImages, "Advertisement", 3)}>
                    Confirm
                </button>
            </div>  



            <h1 className='w-full mt-5 h-10 flex items-center justify-center bg-slate-300 text-xl font-poppins rounded-md'>Slider Items 2</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 w-[67%] lg:grid-cols-1 gap-4">
                {slider2.map((img, index) => (
                    <div key={index} className="flex flex-col items-center">
                        <img
                            src={img.preview || image1}
                            alt={img.angle || "Product Img"}
                            className="w-full h-52 mt-2 object-cover rounded-md"
                        />
                        <label className="text-sm font-medium leading-none mt-2 mb-2">{img.angle}</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => productImageHandler(img.angle, e)}
                            className="appearance-none relative block w-full px-3 py-2 text-sm leading-tight rounded-md bg-white border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                    </div>
                ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1  w-[90%] gap-4">
                {imagesSlider2 == null ? "No any images found" : (
                    imagesSlider2.map((img, index) => (
                        <div key={index} className="flex gap-x-5 items-center">
                            <img
                                src={img.url || image1}
                                alt={img.angle || "Product Img"}
                                className="w-full h-52 mt-2 object-cover rounded-md"
                            />
                            <label className="text-sm font-medium leading-none mt-2 mb-2">{img.angle}</label>
                            <button onClick={() => deleteContentItemHandler(img.id)} className='border-2 border-red-500 border-dashed rounded-lg p-2'>
                                <FaTrash size={20} color='red' />
                            </button>
                        </div>
                    ))
                )}
            </div>
            <div className='mt-2 flex gap-x-5 justify-end'>
                <button
                    className='bg-green-700 text-white font-poppins font-bold py-2 px-4 rounded'
                    onClick={() => addContentItem(slider2, "ImageSlider-2", 4)}>
                    Confirm
                </button>
            </div>



            <h1 className='w-full mt-5 h-10 flex items-center justify-center bg-slate-300 text-xl font-poppins rounded-md'>Feed Items</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 w-[67%] lg:grid-cols-1 gap-4">
                {feedImages.map((img, index) => (
                    <div key={index} className="flex flex-col items-center">
                        <img
                            src={img.preview || image1}
                            alt={img.angle || "Feed Img"}
                            className="w-full h-52 mt-2 object-cover rounded-md"
                        />
                        <label className="text-sm font-medium leading-none mt-2 mb-2">{img.angle}</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => productImageHandler(img.angle, e)}
                            className="appearance-none relative block w-full px-3 py-2 text-sm leading-tight rounded-md bg-white border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                    </div>
                ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1  w-[90%] gap-4">
                {feedImg == null ? "No any images found" : (
                    feedImg.map((img, index) => (
                        <div key={index} className="flex gap-x-5 items-center">
                            <img
                                src={img.url || image1}
                                alt={img.angle || "Product Img"}
                                className="w-full h-52 mt-2 object-cover rounded-md"
                            />
                            <label className="text-sm font-medium leading-none mt-2 mb-2">{img.angle}</label>
                            <button onClick={() => deleteContentItemHandler(img.id)} className='border-2 border-red-500 border-dashed rounded-lg p-2'>
                                <FaTrash size={20} color='red' />
                            </button>
                        </div>
                    ))
                )}
            </div>
            <div className='mt-2 flex gap-x-5 justify-end'>
                <button
                    className='bg-green-700 text-white font-poppins font-bold py-2 px-4 rounded'
                    onClick={() => addContentItem(feedImages, "Feed", 5)}>
                    Confirm
                </button>
            </div>
        </div>
    );
};

export default SetItems;
