import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import ProductList from "../../Components/ProductList/ProductList";
import { ring2 } from "ldrs";
import yellowLine from "../../assets/Yellow-Line.svg";
import { AppContext } from "../../App";
import { getFavProduct } from "../../Services/Operations/ProductServices";

const SubCategoryPage = () => {
  const { categoryName, subCategoryName } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [watchlistItems, setWatchlistItems] = useState([]);
  const { getdata: AllProducts } = useContext(AppContext);
  const userContext = useContext(AppContext);

  ring2.register();

  useEffect(() => {
    fetchSubCategoryProducts();
  }, [categoryName, subCategoryName, AllProducts]);

  useEffect(() => {
    const fetchWatchlistItems = async () => {
      const email = userContext?.user?.[0]?.email;
      if (email) {
        try {
          const favProducts = await getFavProduct(email);
          if (favProducts?.data?.data) {
            setWatchlistItems(favProducts.data.data);
          }
        } catch (error) {
          console.log("No favorite products found:", error);
          setWatchlistItems([]);
        }
      }
    };

    fetchWatchlistItems();
  }, [userContext?.user]);

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
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-bg-green mb-2 font-signika">
          {subCategoryName.toUpperCase()}
        </h1>
        <img src={yellowLine} alt="scribble" className="w-20 sm:w-24" />
      </div>
      {products.length === 0 ? (
        <p className="text-center text-gray-500">
          No products available for this subcategory at the moment.
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 md:grid-cols-4 md:gap-4 lg:grid-cols-5 xl:grid-cols-6">
          {products.map((product) => (
            <div
              key={product.product_id}
              className="w-[160px] sm:w-[180px] md:w-[200px]"
            >
              <ProductList
                product={product}
                watchlistItems={watchlistItems}
                setWatchlistItems={setWatchlistItems}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SubCategoryPage;
