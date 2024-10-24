/* eslint-disable react/no-unescaped-entities */
import { Link } from "react-router-dom";
import { FaTimesCircle } from "react-icons/fa";

const OrderFailed = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center px-4 py-12">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8 text-center">
        <FaTimesCircle className="text-red-500 text-6xl mx-auto mb-6" />
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Order Failed</h1>
        <p className="text-gray-600 mb-6">
          We're sorry, but there was an issue processing your order. Please try
          again or contact our support team for assistance.
        </p>
        <div className="bg-yellow-100 border-2 border-yellow-300 rounded-lg p-4 mb-6">
          <p className="text-sm font-semibold text-gray-800">
            Need help? Contact us at{" "}
            <a
              href="mailto:info@myfinch.in"
              className="text-green-600 hover:underline"
            >
              info@myfinch.in
            </a>{" "}
            or call <span className="text-green-600">+91 6361780649</span>
          </p>
        </div>
        <div className="space-y-4">
          <Link
            to="/cart"
            className="block w-full bg-green-900 text-white font-bold py-3 px-4 rounded hover:bg-green-800 transition duration-300"
          >
            Try Again
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

export default OrderFailed;
