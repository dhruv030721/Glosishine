import { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { LoginUser } from "../../Services/Operations/Auth";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

const cookies = new Cookies();
const Login = () => {
  const navigate = useNavigate();

  const [userdata, setUserdata] = useState({
    email: "",
    password: "",
  });

  const SubmitHandler = async (e) => {
    e.preventDefault();
    // console.log("data is1 ->", userdata);
    try {
      await toast.promise(
        LoginUser(userdata),
        {
          loading: "Processing....",
          success: (response) => {
            navigate("/");
            cookies.set("Access-Token", response.data.token);

            return `${response.data.message}`;
          },
          error: (error) => {
            return `${error.message}`;
          },
        },
        {
          position: "bottom-right", // Set toast position here
        },
        {
          style: {
            fontFamily: "'Poppins', sans-serif",
            fontSize: "14px",
            fontWeight: "400",
            lineHeight: "1.5",
          },
        }
      );
    } catch (error) {
      console.error("Loggedin failed:", error);
    }
  };

  return (
    <div className="p-4 sm:p-8 md:p-10 w-full">
      <div className="flex flex-col w-full items-center justify-center">
        <div className="w-full sm:w-2/3 md:w-1/2 lg:w-1/3">
          <div className="mb-4 sm:mb-8 space-y-3 w-full">
            <p className="text-2xl font-monserrat sm:text-3xl md:text-4xl font-semibold flex justify-center">
              Login
            </p>
          </div>
          <form className="w-full" onSubmit={SubmitHandler}>
            <div className="mb-10 space-y-3">
              <div className="space-y-1">
                <div className="space-y-2">
                  <label
                    className="text-sm font-poppins font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    value={userdata.email}
                    onChange={(e) =>
                      setUserdata({ ...userdata, email: e.target.value })
                    }
                    className="border-input font-poppins bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    id="email"
                    placeholder="mail@example.com"
                    required
                    name="email"
                  />
                </div>
                <div className="space-y-2">
                  <label
                    className="text-sm font-poppins font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    value={userdata.password}
                    onChange={(e) =>
                      setUserdata({ ...userdata, password: e.target.value })
                    }
                    className="border-input font-poppins bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    id="password"
                    placeholder="Enter password"
                    required
                    name="password"
                  />
                </div>
                <Link
                  to="/forgotpassword"
                  className="w-full font-monserrat flex justify-end text-black underline m-1"
                >
                  Forgot your password?
                </Link>
              </div>
              <button
                className="ring-offset-background font-monserrat text-xl focus-visible:ring-ring flex h-10 w-full items-center justify-center whitespace-nowrap rounded-md bg-green-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-black/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                type="submit"
              >
                Login
              </button>
            </div>
          </form>
          <div className="text-center font-poppins">
            No account?
            <Link className="underline text-black" to="/register">
              Create one
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
