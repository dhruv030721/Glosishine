/* eslint-disable react/no-unescaped-entities */
const AboutUs = () => {
  return (
    <div className="w-full min-h-screen bg-gray-50 flex justify-center py-12 px-4">
      <div className="w-full max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-8">
          About Us
        </h1>
        <div data-aos="fade-up" data-aos-duration="1000" className="space-y-8">
          <p className="text-lg text-gray-600">
            At Finch, we are not just a brand – we are a melody of fashion,
            comfort, and individuality. Created by a young couple in their late
            20s, our journey began with a shared dream to craft something truly
            unique for our customers.
          </p>
          <h1 className="text-xl font-bold font-mono">Diversity </h1>
          <p className="p-1 font-mono">
            &#x2022; We embrace the diversity of our audience and aim to be a
            brand for everyone.
          </p>
          <p className="p-1 font-mono">
            {" "}
            &#x2022; Our products are designed to create a personal connection,
            allowing you to own your style effortlessly.{" "}
          </p>

          <h1 className="text-xl font-bold font-mono mt-5">
            Innovating Trends, Meeting Needs{" "}
          </h1>
          <p className="p-1 font-mono">
            &#x2022; We constantly evolve with the trends and desires of your
            customers.
          </p>
          <p className="p-1 font-mono">
            {" "}
            &#x2022; Finch closes the gap between fashion and comfort, so you
            never have to compromise on either.
          </p>

          <h1 className="text-xl font-bold font-mono mt-5">
            Colors Of Expression{" "}
          </h1>
          <p className="p-1 font-mono">
            &#x2022; Like a vibrant songbird, Finch brings an array of colors
            into your life.{" "}
          </p>
          <p className="p-1 font-mono">
            {" "}
            &#x2022; Our wide spectrum of shades empowers you to choose the
            colors that suit your mood and personality.
          </p>

          <h1 className="text-xl font-bold font-mono mt-5">
            Sizes That Celebrate You{" "}
          </h1>
          <p className="p-1 font-mono">
            &#x2022; From S to 8XL, we believe that beauty comes in all sizes.{" "}
          </p>
          <p className="p-1 font-mono">
            {" "}
            &#x2022; Our initial focus on sportswear, polo t-shirts, and hoodies
            is just the beginning; we're dedicated to expanding size inclusivity
            across all our offerings.
          </p>

          <h1 className="text-xl font-bold font-mono mt-5">
            Igniting Confidence{" "}
          </h1>
          <p className="p-1 font-mono">
            &#x2022; Our logo's fiery blend of burnt orange signifies the
            passion we have for uniqueness.{" "}
          </p>
          <p className="p-1 font-mono">
            {" "}
            &#x2022; The bird within our logo symbolizes freedom, expression,
            and a connection to nature.
          </p>

          <h1 className="text-xl font-bold font-mono mt-5">Uniquely You... </h1>
          <p className="p-1 font-mono">
            &#x2022; Our tagline captures the essence of Finch: standing out,
            being different, and embracing your individuality.
          </p>
          <p className="p-1 font-mono">
            {" "}
            &#x2022; When you wear Finch, you're not just wearing clothes;
            you're wearing your confidence, your style, and your story.
          </p>

          <h1 className="p-3 font-mono mt-5">
            Rooted in the belief that clothing is an expression of one's
            identity, Finch is more than just apparel; it's a lifestyle that
            resonates with everyone.{" "}
          </h1>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-800">Our Location</h2>
            <address className="text-gray-600 not-italic">
              2nd Floor, No. 37/1B
              <br />
              Wings, 4th Cross Lalbagh Road
              <br />
              Bengaluru Karnataka, 560027
            </address>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-800">Our Guarantee</h2>
            <p className="text-gray-600">
              We're so confident you'll love our products - we offer 100% FREE
              SHIPPING; and a 100% satisfaction guarantee. Don't like something
              you bought? Tell us, and we'll be happy to solve your issue.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-800">Got Questions?</h2>
            <p className="text-gray-600">
              Contact us now using our contact page or email us at{" "}
              <a
                href="mailto:info@myfinch.in"
                className="text-blue-600 hover:underline"
              >
                info@myfinch.in
              </a>{" "}
              or directly call us at{" "}
              <span className="font-bold">+91 6361780649</span>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
