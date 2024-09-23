import "../../Components/AddProduct/inputStyles.css";

const ImagesUpload = ({
  formdata,
  handleImageUpload,
  handleRemoveImage,
  popup,
}) => {
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-poppins font-bold mb-4">
        Upload Multiple Images
      </h2>
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
            onChange={handleImageUpload}
            className="w-full mt-2 px-3 py-2 bg-white text-bg-green border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
          />
        </label>
      </form>

      <div className="grid grid-cols-3 gap-4">
        {formdata.productphoto.length > 0 ? (
          formdata.productphoto.map((file, index) => (
            <div
              key={index}
              className="border border-gray-300 p-2 rounded-lg shadow"
            >
              <img
                src={popup ? file : URL.createObjectURL(file)}
                alt={`upload-${index}`}
                className="w-full h-auto rounded-lg"
              />
              <button
                onClick={() => handleRemoveImage(index)}
                className="bg-red-500 text-white font-poppins px-3 py-1 rounded-lg mt-2 hover:bg-red-600 transition"
              >
                Remove
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No images uploaded yet</p>
        )}
      </div>
    </div>
  );
};

export default ImagesUpload;
