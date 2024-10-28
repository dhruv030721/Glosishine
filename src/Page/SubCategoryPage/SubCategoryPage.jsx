import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import ProductList from "../../Components/ProductList/ProductList";
import { ring2 } from "ldrs";
import yellowLine from "../../assets/Yellow-Line.svg";
import { AppContext } from "../../App";

const SubCategoryPage = () => {
  const { categoryName, subCategoryName } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [watchlistItems, setWatchlistItems] = useState([]);
  const { getdata: AllProducts } = useContext(AppContext);

  ring2.register();

  useEffect(() => {
    fetchSubCategoryProducts();
  }, [categoryName, subCategoryName, AllProducts]);

  const fetchSubCategoryProducts = () => {
    setLoading(true);
    const filteredProducts = AllProducts.filter(
      (product) =>
        `${product.category}`.toLowerCase() === categoryName.toLowerCase() &&
        `${product.subcategory}`.toLowerCase() === subCategoryName.toLowerCase()
    );
    setProducts(filteredProducts);
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <l-ring-2 size="40" speed="1.75" color="rgb(6, 68, 59)"></l-ring-2>
      </div>
    );
  }

  return (
    <div className="container p-6 bg-gray-100 font-montserrat !min-w-full">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-bg-green mb-2 font-signika">
          {subCategoryName.toUpperCase()}
        </h1>
        <img
          src={yellowLine}
          alt="scribble"
          className="w-24 sm:w-20 md:w-24 lg:w-24 xl:w-24"
        />
      </div>
      {products.length === 0 ? (
        <p className="text-center text-gray-500">
          No products available for this subcategory at the moment.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductList
              key={product.product_id}
              product={product}
              watchlistItems={watchlistItems}
              setWatchlistItems={setWatchlistItems}
              className="min-h-[400px] sm:min-h-[400px] md:min-h-[500px]"
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SubCategoryPage;
