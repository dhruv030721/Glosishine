import default_product_img from "../../assets/fation1.webp";
import default_product_img_1 from "../../assets/howtostyle.webp";

const ProductList = ({ product, className, index }) => {
  return (
    <div
      data-aos="fade-zoom-in"
      data-aos-easing="ease-in-back"
      data-aos-delay="200"
      data-aos-offset="0"
      className={`relative cursor-pointer w-full h-[full] rounded-lg bg-white bg-opacity-30 backdrop-blur-lg border-2 border-bg-green transition-all duration-200 flex flex-col overflow-hidden ${className}`}
    >
      <div className="flex flex-col overflow-hidden">
        <a
          className="relative flex h-96 overflow-hidden"
          href={`/${product.product_id}`}
        >
          <img
            className="peer absolute top-0 right-0 h-full w-full object-cover"
            src={product.images?.[0] || default_product_img} // Main image
            alt={product.product_name}
          />
          {product.images && product.images.length > 1 ? (
            <img
              className="peer-hover:right-0 absolute top-0 -right-96 h-full w-full object-cover transition-all delay-100 duration-1000 hover:right-0"
              src={product.images?.[index] || product.images?.[1]} // Secondary image on hover
              alt={product.product_name}
            />
          ) : (
            <img
              className="peer-hover:right-0 absolute top-0 -right-96 h-full w-full object-cover transition-all delay-100 duration-1000 hover:right-0"
              src={default_product_img_1} // Default secondary image on hover
              alt={product.product_name}
            />
          )}

          <svg
            className="group-hover:animate-ping group-hover:opacity-30 peer-hover:opacity-0 pointer-events-none absolute inset-x-0 bottom-5 mx-auto text-3xl text-white transition-opacity"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            role="img"
            width="1em"
            height="1em"
            preserveAspectRatio="xMidYMid meet"
            viewBox="0 0 32 32"
          >
            <path
              fill="currentColor"
              d="M2 10a4 4 0 0 1 4-4h20a4 4 0 0 1 4 4v10a4 4 0 0 1-2.328 3.635a2.996 2.996 0 0 0-.55-.756l-8-8A3 3 0 0 0 14 17v7H6a4 4 0 0 1-4-4V10Zm14 19a1 1 0 0 0 1.8.6l2.7-3.6H25a1 1 0 0 0 .707-1.707l-8-8A1 1 0 0 0 16 17v12Z"
            />
          </svg>
          <span className="absolute top-0 left-0 m-2 rounded-full bg-bg-green px-2 text-center text-sm font-medium text-white">
            {product.discountPercentage}% OFF
          </span>
        </a>
        <div className="mt-4">
          <a href={`/${product.product_id}`}>
            <h5 className="text-sm font-mono font-semibold flex justify-center w-full text-black">
              {product.product_name}
            </h5>
          </a>
          <div className="mt-2 mb-5 flex items-center justify-between">
            <p className="w-full flex justify-evenly">
              <span className="text-sm text-black font-bold line-through">
                Rs. {product.regular_price}
              </span>
              <span className="text-sm text-green-700 font-bold">
                Rs. {product.sale_price}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
