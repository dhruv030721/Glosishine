/* eslint-disable no-unused-vars */
import Home from "./Page/Home/Home";
import {
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";
import NewArrivals from "./Page/NewArrivals/NewArrivals";
import MostTrending from "./Page/MostTrending/MostTrending";
import BundleDeal from "./Page/BundleDeal/BundleDeal";
import AboutUs from "./Page/AboutUs/AboutUs";
import Contactus from "./Page/ContactUs/Contactus";
import Bulkinquiry from "./Page/Bulkinquiry/Bulkinquiry";
import FAQ from "./Page/FAQ/FAQ";
import Blog from "./Page/Blog/Blog";
import Fationtips from "./Components/BlogComponent/Fationtipsforwomen";
import Howtostylewomen from "./Components/BlogComponent/Howtostylewomen";
import Varsityjackets from "./Components/BlogComponent/Varsityjackets";
import Whatlookgood from "./Components/BlogComponent/Whatlookgood";
import Sitemap from "./Page/Sitemap/Sitemap";
import Termsanduse from "./Page/Termsanduse/Termsanduse";
import PrivatePolicy from "./Page/PrivatePolicy/PrivatePolicy";
import ShippingPolicy from "./Page/ShippingPolicy/ShippingPolicy";
import ReturnExchange from "./Page/ReturnExchange/ReturnExchange";
import Account from "./Page/Account/Account";
import Cart from "./Page/Cart/Cart";
import { createContext, useContext, useEffect, useState, memo } from "react";
import ForgotPassword from "./Components/Login/ForgotPassword";
import Admin from "./Page/Admin/Admin";
import Mainlayout from "./Page/Layout/Mainlayout";
import Adminlayout from "./Page/Layout/Adminlayout";
import Dashboard from "./Page/Admin/Dashboard";
import SignupPage from "./Page/Login&signup/SignupPage";
import LoginPage from "./Page/Login&signup/LoginPage";
import { getProduct } from "./Services/Operations/ProductServices";
import Cookies from "universal-cookie";
import { jwtDecode } from "jwt-decode";
import { CartPage } from "./Page/CartPage/CartPage";
import NotFound from "./Page/NotFound/NotFound";
import { WatchList } from "./Page/WatchList/WatchList";
import ScrollToTop from "./Components/ScrollToTop/ScrollToTop";
import "./App.css";
import OrderSuccess from "./Page/OrdersSuccess/OrderSuccess";
import OrderFailed from "./Page/OrderFailed/OrderFailed";
import NewDrops from "./Page/Newdrops/NewDrops";
import CategoryPage from "./Page/CategoryPage/CategoryPage";
import SubCategoryPage from "./Page/SubCategoryPage/SubCategoryPage";

export const AppContext = createContext();

const cookies = new Cookies();

function App() {
  const [getdata, setGetdata] = useState([]);
  const [token, setToken] = useState();
  const [user, setUser] = useState(null);
  const [billingAddress, setBillingAddress] = useState(null);
  const [shippingAddress, setShippingAddress] = useState(null);
  const [adminToken, setAdminToken] = useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [CartProducts, setCartProducts] = useState([]);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const data = await getProduct();
        // console.log(data.data.data);
        setGetdata(data.data.data);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    })();
  }, []);
  // console.log("getdata->", getdata);

  useEffect(() => {
    const checkAuth = () => {
      const token = cookies.get("Access-Token");
      const admintoken = cookies.get("Admin-Access-Token");

      setAdminToken(admintoken || null);
      setToken(token || null);

      if (token) {
        try {
          const user = jwtDecode(token);
          setUser(user);
        } catch (error) {
          setUser(null);
        }
      } else {
        setUser(null);
      }

      setIsAdminAuthenticated(!!admintoken);
    };

    checkAuth();
  }, []);

  // Optimize ProtectedAdminRoute
  const ProtectedAdminRoute = memo(({ children }) => {
    const { isAdminAuthenticated } = useContext(AppContext);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
      if (
        !isAdminAuthenticated &&
        location.pathname.startsWith("/admin") &&
        location.pathname !== "/admin"
      ) {
        navigate("/admin", { replace: true });
      }
    }, [isAdminAuthenticated, location.pathname, navigate]);

    if (
      !isAdminAuthenticated &&
      location.pathname.startsWith("/admin") &&
      location.pathname !== "/admin"
    ) {
      return null;
    }

    return children;
  });

  ProtectedAdminRoute.displayName = "ProtectedAdminRoute";

  return (
    <>
      <AppContext.Provider
        value={{
          getdata,
          setGetdata,
          CartProducts,
          token,
          user,
          setUser,
          adminToken,
          isDrawerOpen,
          setIsDrawerOpen,
          setCartProducts,
          isAdminAuthenticated,
          billingAddress,
          setBillingAddress,
          shippingAddress,
          setShippingAddress,
        }}
      >
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Mainlayout />}>
            <Route index element={<Home />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<SignupPage />} />
            <Route path="aboutus" element={<AboutUs />} />
            <Route path="contactus" element={<Contactus />} />
            <Route path="bulkinquiry" element={<Bulkinquiry />} />
            <Route path="faqs" element={<FAQ />} />
            <Route path="blog" element={<Blog />} />
            <Route path="fationtips" element={<Fationtips />} />
            <Route path="Howtostylewomen" element={<Howtostylewomen />} />
            <Route path="varsityjackets" element={<Varsityjackets />} />
            <Route path="Whatlookgood" element={<Whatlookgood />} />
            <Route path="sitemap" element={<Sitemap />} />
            <Route path="termsanduse" element={<Termsanduse />} />
            <Route path="privatepolicy" element={<PrivatePolicy />} />
            <Route path="shippingpolicy" element={<ShippingPolicy />} />
            <Route path="returnexchange" element={<ReturnExchange />} />
            <Route path="account" element={<Account />} />
            <Route path="cart" element={<CartPage />} />
            <Route path="/product/:id" element={<Cart />} />
            <Route path="forgotpassword" element={<ForgotPassword />} />
            <Route path="newarrivals" element={<NewArrivals />} />
            <Route path="mosttrending" element={<MostTrending />} />
            <Route path="bundledeal" element={<BundleDeal />} />
            <Route path="watchlist" element={<WatchList />} />
            <Route path="ordersuccess" element={<OrderSuccess />} />
            <Route path="orderfailed" element={<OrderFailed />} />
            <Route path="newdrops" element={<NewDrops />} />
            <Route path="/category/:categoryName" element={<CategoryPage />} />
            <Route
              path="/category/:categoryName/:subCategoryName"
              element={<SubCategoryPage />}
            />
            <Route path="*" element={<NotFound />} />
          </Route>

          <Route
            path="/admin/*"
            element={
              <ProtectedAdminRoute>
                <Adminlayout />
              </ProtectedAdminRoute>
            }
          >
            <Route index element={<Admin />} />
            <Route path="dashboard" element={<Dashboard />} />
          </Route>
        </Routes>
      </AppContext.Provider>
    </>
  );
}

export default App;
