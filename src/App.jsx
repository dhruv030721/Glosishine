import Home from "./Page/Home/Home";
import { Routes, Route } from "react-router-dom";
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
import AOS from "aos";
import "aos/dist/aos.css";
import { createContext, useEffect, useState } from "react";
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
import NotFound from "./Components/NotFound/NotFound";
import { WatchList } from "./Page/WatchList/WatchList";
import ScrollToTop from "./Components/ScrollToTop/ScrollToTop";

export const AppContext = createContext();

const cookies = new Cookies();

function App() {
  const [getdata, setGetdata] = useState([]);
  const [token, setToken] = useState();
  const [user, setUser] = useState();
  const [adminToken, setAdminToken] = useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [CartProducts, setCartProducts] = useState([]);
  // const navigate = useNavigate();
  // const requiredpath=[""];

  useEffect(() => {
    (async () => {
      try {
        const data = await getProduct();
        console.log(data.data.data);
        setGetdata(data.data.data);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    })();
  }, []);
  // console.log("getdata->", getdata);

  useEffect(() => {
    AOS.init();
    AOS.refresh();
    const token = cookies.get("Access-Token");
    const admintoken = cookies.get("Admin-Access-Token");
    setAdminToken(admintoken);
    setToken(token);
    if (token) {
      const user = jwtDecode(token);
      setUser(user);
      // console.log("user->", user)
    } else {
      setUser(null);
    }

    if (!admintoken) {
      setAdminToken(null);
      // navigate('/admin');
    }
  }, []);

  return (
    <>
      <AppContext.Provider
        value={{
          getdata,
          setGetdata,
          CartProducts,
          token,
          user,
          adminToken,
          isDrawerOpen,
          setIsDrawerOpen,
          setCartProducts,
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
            <Route path=":id" element={<Cart />} />
            <Route path="forgotpassword" element={<ForgotPassword />} />
            <Route path="newarrivals" element={<NewArrivals />} />
            <Route path="mosttrending" element={<MostTrending />} />
            <Route path="bundledeal" element={<BundleDeal />} />
            <Route path="watchlist" element={<WatchList />} />
            <Route path="menswear" element={<NotFound />} />
            <Route path="womenswear" element={<NotFound />} />
            <Route path="*" element={<NotFound />} />
          </Route>

          <Route path="/admin" element={<Adminlayout />}>
            <Route index element={<Admin />} />
            <Route path="dashboard" element={<Dashboard />} />
          </Route>
        </Routes>
      </AppContext.Provider>
    </>
  );
}

export default App;
