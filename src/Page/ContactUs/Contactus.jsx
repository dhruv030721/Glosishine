const Contactus = () => {
  return (
    <div className="w-full min-h-screen bg-gray-50 flex justify-center py-12 px-4">
      <div className="w-full max-w-2xl">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-8">
          Contact Us
        </h1>
        <div data-aos="fade-up" data-aos-duration="1000" className="space-y-8">
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-800">Reach Us</h2>
            <address className="text-gray-600 not-italic">
              2nd Floor, No. 37/1B, Wings, 4th Cross Lalbagh Road,
              <br />
              Bengaluru, Bengaluru Karnataka, 560027
            </address>
            <p className="text-gray-600">
              Email:{" "}
              <a
                href="mailto:info@myfinch.in"
                className="font-semibold text-blue-600 hover:underline"
              >
                info@myfinch.in
              </a>
            </p>
            <p className="text-gray-600">
              Contact Us: <span className="font-semibold">+91 63617880649</span>
            </p>
          </section>
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label
                  className="text-sm font-medium text-gray-700"
                  htmlFor="name"
                >
                  Name
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  id="email"
                  placeholder="Your email *"
                  name="email"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <label
                className="text-sm font-medium text-gray-700"
                htmlFor="phone"
              >
                Phone number
              </label>
              <input
                type="tel"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                id="phone"
                placeholder="Your phone number"
                name="phone"
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="message"
                className="text-sm font-medium text-gray-700"
              >
                Comment
              </label>
              <textarea
                id="message"
                rows="4"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                placeholder="Write your thoughts here..."
              ></textarea>
            </div>
            <button
              className="w-full md:w-auto px-6 py-3 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
              type="submit"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contactus;
