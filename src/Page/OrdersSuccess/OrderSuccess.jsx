import { Link } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import { useEffect, useState } from "react";

const OrderSuccess = () => {
  const [deliveryDates, setDeliveryDates] = useState({ start: "", end: "" });

  useEffect(() => {
    const calculateDeliveryDates = () => {
      const today = new Date();
      const startDate = new Date(today.setDate(today.getDate() + 3));
      const endDate = new Date(today.setDate(today.getDate() + 4)); // This will be 7 days from the original date

      const formatDate = (date) => {
        const options = { weekday: "long", month: "long", day: "numeric" };
        return date.toLocaleDateString("en-US", options);
      };

      setDeliveryDates({
        start: formatDate(startDate),
        end: formatDate(endDate),
      });
    };

    calculateDeliveryDates();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex font-signika flex-col justify-center items-center px-4 py-12">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8 text-center">
        <FaCheckCircle className="text-green-500 text-6xl mx-auto mb-6" />
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Order Successful!
        </h1>
        <p className="text-gray-600 mb-6">
          Thank you for your purchase. Your order has been successfully placed
          and is being processed.
        </p>
        <div className="bg-yellow-100 border-2 border-yellow-300 rounded-lg p-4 mb-6">
          <p className="text-sm font-semibold text-gray-800">
            Your order will be delivered between{" "}
            <span className="text-green-600">
              {deliveryDates.start} - {deliveryDates.end}
            </span>
          </p>
        </div>
        <div className="space-y-4">
          <Link
            to="/account"
            className="block w-full bg-green-900 text-white font-bold py-3 px-4 rounded hover:bg-green-800 transition duration-300"
          >
            View Order Details
          </Link>
          <Link
            to="/"
            className="block w-full bg-gray-200 text-gray-800 font-bold py-3 px-4 rounded hover:bg-gray-300 transition duration-300"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
