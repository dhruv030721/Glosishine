import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { LoginUser } from "../../Services/Operations/Auth";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { AppContext } from "../../App";
import { ring2 } from "ldrs";
import { IoMdMail } from "react-icons/io";
import { RiLockPasswordLine } from "react-icons/ri";

const cookies = new Cookies();
ring2.register();
const Login = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(false);

  const [userdata, setUserdata] = useState({
    email: "",
    password: "",
  });

  const SubmitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await toast.promise(
        LoginUser(userdata),
        {
          loading: "Processing....",
          success: (response) => {
            navigate("/");
            cookies.set("Access-Token", response.data.token);
            setUser([{ email: userdata.email }]);
            window.dispatchEvent(new Event("userLoggedIn"));
            return `${response.data.message}`;
          },
          error: (error) => {
            return `${error.message}`;
          },
        },
        {
          position: "bottom-right",
          style: {
            fontFamily: "'Poppins', sans-serif",
            fontSize: "14px",
            fontWeight: "400",
            lineHeight: "1.5",
          },
        },
        { position: "bottom-right" }
      );
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4 sm:p-8 md:p-10 w-full flex items-center justify-center bg-gray-100">
      {isLoading && (
        <div className="absolute inset-0 flex flex-col justify-center items-center bg-white bg-opacity-80 z-50">
          <l-ring-2
            size="60"
            bg-opacity="0.2"
            speed="2"
            color="rgb(6,68,59)"
            className="w-1/6 sm:w-1/12 md:w-1/10 lg:w-1/10 xl:w-1/20 2xl:w-1/24"
          ></l-ring-2>
        </div>
      )}
      <div className="w-full sm:w-2/3 md:w-1/2 lg:w-1/3 bg-white p-8 rounded-xl shadow-md">
        <div className="mb-8 space-y-3 w-full">
          <h2 className="text-2xl font-monserrat sm:text-3xl md:text-4xl font-semibold text-center text-gray-900">
            Login
          </h2>
        </div>
        <form className="w-full" onSubmit={SubmitHandler}>
          <div className="mb-6 space-y-4">
            <div className="space-y-2">
              <label
                className="text-sm font-poppins font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor="email"
              >
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <IoMdMail
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </div>
                <input
                  type="email"
                  value={userdata.email}
                  onChange={(e) =>
                    setUserdata({ ...userdata, email: e.target.value })
                  }
                  className="border-input font-poppins bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 pl-10"
                  id="email"
                  placeholder="mail@example.com"
                  required
                  name="email"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label
                className="text-sm font-poppins font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor="password"
              >
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <RiLockPasswordLine
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </div>
                <input
                  type="password"
                  value={userdata.password}
                  onChange={(e) =>
                    setUserdata({ ...userdata, password: e.target.value })
                  }
                  className="border-input font-poppins bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 pl-10"
                  id="password"
                  placeholder="Enter password"
                  required
                  name="password"
                />
              </div>
            </div>
            <Link
              to="/forgotpassword"
              className="w-full font-monserrat flex justify-end text-green-900 hover:text-green-800 underline text-sm"
            >
              Forgot your password?
            </Link>
          </div>
          <button
            className="ring-offset-background font-monserrat focus-visible:ring-ring flex h-10 w-full items-center justify-center whitespace-nowrap rounded-md bg-green-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-black/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
            type="submit"
          >
            Login
          </button>
        </form>
        <div className="text-sm text-center mt-6 font-poppins">
          No account?{" "}
          <Link
            className="font-medium text-green-900 hover:text-green-800 underline"
            to="/register"
          >
            Create one
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
