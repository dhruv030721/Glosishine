import { useState, useEffect, useContext, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import ProductList from "../../Components/ProductList/ProductList";
import { ring2 } from "ldrs";
import yellowLine from "../../assets/Yellow-Line.svg";
import { AppContext } from "../../App";

const CategoryPage = () => {
  const { categoryName } = useParams();
  const [products, setProducts] = useState({});
  const [loading, setLoading] = useState(true);
  const [watchlistItems, setWatchlistItems] = useState([]);
  const { getdata: AllProducts } = useContext(AppContext);
  const [currentIndexes, setCurrentIndexes] = useState({});

  ring2.register();

  const itemsPerPage = {
    mobile: 1,
    tablet: 3,
    desktop: 4,
  };

  const getItemsPerPage = () => {
    if (window.innerWidth < 640) return itemsPerPage.mobile;
    if (window.innerWidth < 1024) return itemsPerPage.tablet;
    return itemsPerPage.desktop;
  };

  const [currentItemsPerPage, setCurrentItemsPerPage] = useState(
    getItemsPerPage()
  );

  useEffect(() => {
    const handleResize = () => {
      setCurrentItemsPerPage(getItemsPerPage());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    fetchCategoryProducts();
  }, [categoryName, AllProducts]);

  useEffect(() => {
    // Reset currentIndexes when products change
    const newIndexes = {};
    Object.keys(products).forEach((subCategory) => {
      newIndexes[subCategory] = 0;
    });
    setCurrentIndexes(newIndexes);
  }, [products]);

  const fetchCategoryProducts = () => {
    setLoading(true);
    const filteredProducts = AllProducts.filter(
      (product) =>
        `${product.category}`.toUpperCase() === categoryName.toUpperCase()
    );

    const groupedProducts = filteredProducts.reduce((acc, product) => {
      const subCategory = product.subcategory;
      if (!acc[subCategory]) {
        acc[subCategory] = [];
      }
      acc[subCategory].push(product);
      return acc;
    }, {});

    setProducts(groupedProducts);
    setLoading(false);
  };

  const nextSlide = useCallback(
    (subCategory, subCategoryProducts) => {
      setCurrentIndexes((prevIndexes) => ({
        ...prevIndexes,
        [subCategory]:
          (prevIndexes[subCategory] + currentItemsPerPage) %
          subCategoryProducts.length,
      }));
    },
    [currentItemsPerPage]
  );

  const prevSlide = useCallback(
    (subCategory, subCategoryProducts) => {
      setCurrentIndexes((prevIndexes) => ({
        ...prevIndexes,
        [subCategory]:
          (prevIndexes[subCategory] -
            currentItemsPerPage +
            subCategoryProducts.length) %
          subCategoryProducts.length,
      }));
    },
    [currentItemsPerPage]
  );

  const shouldShowArrows = useCallback(
    (subCategoryProducts) => {
      return subCategoryProducts.length > currentItemsPerPage;
    },
    [currentItemsPerPage]
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <l-ring-2 size="40" speed="1.75" color="rgb(6, 68, 59)"></l-ring-2>
      </div>
    );
  }

  return (
    <div className="container p-6 bg-gray-100 font-montserrat !min-w-full font-signika">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-bg-green mb-2 font-signika">
          {categoryName.toUpperCase()}
        </h1>
        <img
          src={yellowLine}
          alt="scribble"
          className="w-24 sm:w-20 md:w-24 lg:w-24 xl:w-24"
        />
      </div>
      {Object.keys(products).length === 0 ? (
        <p className="text-center text-gray-500">
          No products available for this category at the moment.
        </p>
      ) : (
        Object.entries(products).map(([subCategory, subCategoryProducts]) => (
          <div key={subCategory} className="mb-12 ml-5">
            <h2 className="text-2xl font-semibold text-bg-green mb-2 py-0">
              {subCategory}
            </h2>
            <img
              src={yellowLine}
              alt="scribble"
              className="w-24 sm:w-20 md:w-24 lg:w-24 xl:w-24"
            />
            <div className="w-full px-4 sm:px-6 md:px-8 pt-4 pb-0 overflow-hidden relative">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{
                  transform: `translateX(-${
                    (currentIndexes[subCategory] || 0) *
                    (100 / currentItemsPerPage)
                  }%)`,
                }}
              >
                {subCategoryProducts.map((product, index) => (
                  <div
                    key={product.product_id}
                    className="flex-none w-full sm:w-1/2 md:w-1/3 lg:w-1/3 xl:w-1/4 px-2"
                  >
                    <ProductList
                      product={product}
                      index={index}
                      watchlistItems={watchlistItems}
                      setWatchlistItems={setWatchlistItems}
                      className="min-h-[400px] sm:min-h-[350px] md:min-h-[500px]"
                    />
                  </div>
                ))}
              </div>
              {shouldShowArrows(subCategoryProducts) && (
                <>
                  <button
                    onClick={() => prevSlide(subCategory, subCategoryProducts)}
                    className="absolute text-white left-2 top-1/2 transform -translate-y-1/2 bg-bg-green bg-opacity-50 hover:bg-opacity-100 transition-all duration-200 rounded-full p-1 z-10"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-4 h-4 md:w-6 md:h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 19.5L8.25 12l7.5-7.5"
                      />
                    </svg>
                  </button>
                  <button
                    onClick={() => nextSlide(subCategory, subCategoryProducts)}
                    className="absolute text-white right-2 top-1/2 transform -translate-y-1/2 bg-bg-green bg-opacity-50 hover:bg-opacity-100 transition-all duration-200 rounded-full p-1 z-10"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-4 h-4 md:w-6 md:h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8.25 4.5l7.5 7.5-7.5 7.5"
                      />
                    </svg>
                  </button>
                </>
              )}
            </div>
            <div className="flex justify-center mt-8">
              <Link
                to={`/category/${categoryName.toLowerCase()}/${subCategory.toLowerCase()}`}
                className="flex align-middle justify-center items-center gap-x-5"
              >
                <span className="font-signika text-bg-green text-xl">
                  View All
                </span>
                <button className="bg-bg-green p-1 text-white rounded-full w-12 h-12 flex items-center justify-center transition-all duration-300 ease-in-out shadow-md group">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </button>
              </Link>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default CategoryPage;
