import { useContext } from "react";
import { RiShoppingBag4Fill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { AppContext } from "../../App";

const ProductCard = ({ product }) => {
  const Appcontext = useContext(AppContext);
  const addToCart = (id) => {
    if (Appcontext.CartProducts.map((item) => item.product_id !== id)) {
      const product = Appcontext.getdata.find((item) => item.product_id === id);
      product.quantity = 1;
      Appcontext.setCartProducts([...Appcontext.CartProducts, product]);
      Appcontext.setIsDrawerOpen(true);
    }
    {
      Appcontext.setIsDrawerOpen(true);
    }
  };
  return (
    <div
      key={product.product_id}
      className="w-full rounded overflow-hidden shadow-lg border relative"
    >
      <Link to={`/cart/${product.product_id}`}>
        <img
          className="w-full"
          src={product.images[0] || cartimage3}
          alt="Men Striped Casual Shirt"
        />
      </Link>
      <div className="px-4 py-4">
        <div className="flex">
          <h1 className="font-bold w-full flex justify-start font-signika text-md mb-2">
            {product.product_name}
          </h1>
        </div>
        <p className="text-gray-700 font-montserrat text-sm mb-2">
          {product.brand_name}
        </p>
        <div className="mt-2">
          <span className="text-md font-semibold font-signika text-black">
            {product.sale_price}
          </span>
          <span className="text-sm text-gray-500 font-signika line-through ml-2">
            {product.regular_price}
          </span>
          <span className="text-sm text-red-500 font-signika ml-2">
            ({product.discount}% OFF)
          </span>
        </div>
      </div>
      <button
        className="absolute bottom-2 right-2 bg-green-600 text-white rounded-full p-2 hover:bg-green-700 transition-colors duration-300"
        onClick={() => addToCart(product.product_id)}
      >
        <RiShoppingBag4Fill size={24} />
      </button>
    </div>
  );
};

export default ProductCard;
