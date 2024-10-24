import { useState } from "react";
import { FaTimes } from "react-icons/fa";

const AddressModal = ({ open, onClose }) => {
  const [formData, setFormData] = useState({
    addressline1: "",
    addressline2: "",
    street: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSave = () => {
    // TODO: Implement save logic here
    console.log("Saving address:", formData);
    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold font-poppins text-bg-green">
            Edit Address Details
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-bg-green transition-colors"
          >
            <FaTimes size={24} />
          </button>
        </div>
        <div className="p-6">
          <p className="text-sm font-poppins text-gray-600 mb-4">
            Enter your address details
          </p>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(formData).map(([key, value]) => (
              <div
                key={key}
                className={
                  key === "addressline1" || key === "addressline2"
                    ? "md:col-span-2"
                    : ""
                }
              >
                <label
                  htmlFor={key}
                  className="block text-sm font-medium font-poppins text-gray-700 mb-1"
                >
                  {key.charAt(0).toUpperCase() +
                    key
                      .slice(1)
                      .replace(/([A-Z])/g, " $1")
                      .trim()}
                </label>
                <input
                  type="text"
                  id={key}
                  name={key}
                  value={value}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-bg-green focus:border-bg-green transition-colors"
                />
              </div>
            ))}
          </form>
        </div>
        <div className="flex justify-end space-x-2 p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-4 py-2 font-poppins text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 font-poppins text-sm font-medium text-white bg-bg-green rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-bg-green transition-colors"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddressModal;
