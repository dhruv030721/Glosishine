import "../../Components/AddProduct/inputStyles.css";
import { useState } from "react";

const ImagesUpload = ({ formdata, handleImageUpload, handleRemoveImage }) => {
  const [error, setError] = useState("");

  const validateImages = (files) => {
    const totalImages = formdata.productphoto.length + files.length;
    if (totalImages === 0) {
      setError("At least one image is required");
      return false;
    }
    if (totalImages > 5) {
      setError("Maximum 5 images allowed");
      return false;
    }
    setError("");
    return true;
  };

  const handleUpload = (event) => {
    const files = event.target.files;
    if (validateImages(files)) {
      handleImageUpload(event);
    }
  };

  const getImageUrl = (image) => {
    if (typeof image === "string") return image;
    if (image && image.url) return image.url;
    if (image && image instanceof File) return URL.createObjectURL(image);
    return ""; // Return an empty string or a placeholder image URL
  };

  return (
    <div className="container mx-auto p-4 font-poppins">
      <h2 className="text-2xl font-bold mb-4">Upload Multiple Images</h2>
      <form className="bg-white text-bg-green shadow-lg border border-bg-green rounded-lg p-6 text-center max-w-md mx-auto mb-4">
        <span className="text-2xl font-semibold text-bg-green">
          Upload your file
        </span>
        <p className="mt-2 text-sm text-bg-green">File should be an image</p>
        <label
          htmlFor="file-input"
          className="flex flex-col justify-center items-center p-4 mt-8 border-2 border-dashed border-bg-green rounded-lg cursor-pointer hover:bg-blue-50 hover:border-bg-green transition-colors"
        >
          <span className="text-lg font-bold text-bg-green">
            Drop files here
            <p>or</p>
          </span>
          <input
            type="file"
            multiple
            accept="image/*"
            required
            id="file-input"
            onChange={handleUpload}
            className="w-full mt-2 px-3 py-2 bg-white text-bg-green border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
          />
        </label>
      </form>

      <div className="grid grid-cols-3 gap-4">
        {formdata.productphoto && formdata.productphoto.length > 0 ? (
          formdata.productphoto.map((image, index) => {
            const imageUrl = getImageUrl(image);
            return imageUrl ? (
              <div
                key={index}
                className="border border-gray-300 p-2 rounded-lg shadow"
              >
                <img
                  src={imageUrl}
                  alt={`upload-${index}`}
                  className="w-full h-auto rounded-lg"
                />
                <button
                  onClick={() => handleRemoveImage(index)}
                  className="bg-red-500 text-white px-3 py-1 rounded-lg mt-2 hover:bg-red-600 transition"
                >
                  Remove
                </button>
              </div>
            ) : null;
          })
        ) : (
          <p className="text-gray-500 font-poppins">No images uploaded yet</p>
        )}
      </div>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};

export default ImagesUpload;
