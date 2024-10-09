/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import React from "react";

const Sitemap = () => {
  return (
    <div className="w-full min-h-screen bg-gray-50 py-12 px-4">
      <h2 className="text-4xl md:text-5xl font-bold text-gray-800 text-center mb-12">
        SITEMAP
      </h2>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Collections</h3>
          <ul className="space-y-2">
            {/* Replace with your actual collection items */}
            <li className="text-gray-600 hover:text-gray-800">
              &#x2022; 12% GST
            </li>
            <li className="text-gray-600 hover:text-gray-800">
              &#x2022; 18% GST
            </li>
            {/* ... other collection items ... */}
          </ul>
        </div>
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Products</h3>
          <ul className="space-y-2">
            {/* Replace with your actual product items */}
            <li className="text-gray-600 hover:text-gray-800">
              &#x2022; Air Force Blue Bomber Jacket with Hood
            </li>
            <li className="text-gray-600 hover:text-gray-800">
              &#x2022; Aluminium Women's Polo T-shirt
            </li>
            {/* ... other product items ... */}
          </ul>
        </div>
        {/* Add more columns if needed */}
      </div>
    </div>
  );
};

export default Sitemap;
