import React from "react";

const Bulkinquiry = () => {
  return (
    <div className="w-full min-h-screen bg-gray-100 flex justify-center items-center p-4">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-md p-6 md:p-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
          Bulk Inquiry
        </h1>
        <div data-aos="fade-up" data-aos-duration="1000">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="space-y-2">
              <label
                className="text-sm font-medium text-gray-700"
                htmlFor="name"
              >
                Name
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 text-gray-700 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                id="name"
                placeholder="Your name"
                name="name"
              />
            </div>
            <div className="space-y-2">
              <label
                className="text-sm font-medium text-gray-700"
                htmlFor="email"
              >
                Email
              </label>
              <input
                type="email"
                className="w-full px-3 py-2 text-gray-700 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                id="email"
                placeholder="Your email *"
                name="email"
                required
              />
            </div>
          </div>
          <div className="space-y-2 mb-4">
            <label
              className="text-sm font-medium text-gray-700"
              htmlFor="phone"
            >
              Phone number
            </label>
            <input
              type="tel"
              className="w-full px-3 py-2 text-gray-700 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              id="phone"
              placeholder="Your phone number"
              name="phone"
            />
          </div>
          <div className="space-y-2 mb-6">
            <label
              htmlFor="message"
              className="text-sm font-medium text-gray-700"
            >
              Comment
            </label>
            <textarea
              id="message"
              rows="4"
              className="w-full px-3 py-2 text-gray-700 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
              placeholder="Write your thoughts here..."
            ></textarea>
          </div>
          <button
            className="w-full md:w-auto px-6 py-3 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
            type="submit"
          >
            Send Inquiry
          </button>
        </div>
      </div>
    </div>
  );
};

export default Bulkinquiry;
