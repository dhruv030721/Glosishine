import { useState, useEffect } from "react";
import {
  SendOTP,
  verifyOTP,
  RegisterUser,
} from "../../Services/Operations/Auth";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import { IoMdMail } from "react-icons/io";
import { RiLockPasswordLine } from "react-icons/ri";
import { FaUser } from "react-icons/fa";
import { BsTelephone } from "react-icons/bs";

const Register = () => {
  const [countdown, setCountdown] = useState(30);
  const [isCountdownActive, setIsCountdownActive] = useState(false);
  const navigate = useNavigate();
  const [verification, setVerification] = useState(false);
  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    mobile_number: "",
    otp: "",
  });

  useEffect(() => {
    let timer;
    if (isCountdownActive) {
      timer = setInterval(() => {
        setCountdown((prevCountdown) => {
          if (prevCountdown <= 1) {
            clearInterval(timer);
            setIsCountdownActive(false);
            return 0;
          }
          return prevCountdown - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isCountdownActive]);

  const SubmitHandler = async (e) => {
    e.preventDefault();
    try {
      await toast.promise(
        SendOTP(user),
        {
          loading: "Processing....",
          success: (response) => {
            setVerification(true);
            setCountdown(30);
            setIsCountdownActive(true);
            return `${response.data.message}`;
          },
          error: (response) => {
            console.log(response.data.message);
            return `${response.message}`;
          },
        },
        {
          position: "bottom-right", // Set toast position here
        },
        {
          style: {
            fontSize: "14px",
            fontWeight: "400",
            lineHeight: "1.5",
            backgroundColor: "#064C3A",
            color: "#FFFFFF",
            fontFamily: "signika",
          },
        }
      );
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  const verifyEmailOTP = async () => {
    try {
      await toast.promise(
        verifyOTP(user.otp, user.email),
        {
          loading: "Processing....",
          success: (response) => {
            console.log(response);
            return `${response.data.message}`;
          },
          error: (error) => {
            throw new Error(`${error.message}`);
          },
        },
        {
          position: "bottom-right", // Set toast position here
        },
        {
          style: {
            fontSize: "14px",
            fontWeight: "400",
            lineHeight: "1.5",
            backgroundColor: "#064C3A",
            color: "#FFFFFF",
            fontFamily: "signika",
          },
        }
      );

      await toast.promise(
        RegisterUser(user),
        {
          loading: "Registration Process....",
          success: (response) => {
            console.log(response);
            navigate("/login");
            return `${response.data.message}`;
          },
          error: (error) => {
            throw new Error(`${error.message}`);
          },
        },
        {
          position: "bottom-right", // Set toast position here
        },
        {
          style: {
            fontSize: "14px",
            fontWeight: "400",
            lineHeight: "1.5",
            backgroundColor: "#064C3A",
            color: "#FFFFFF",
            fontFamily: "signika",
          },
        }
      );
    } catch (error) {
      console.error("OTP verification or registration failed:", error);
      toast.error("OTP verification or registration failed.", {
        style: {
          backgroundColor: "#064C3A",
          color: "#FFFFFF",
          fontFamily: "signika",
        },
        position: "bottom-right",
      });
    }
  };

  return (
    <div className="p-4 sm:p-8 md:p-10 w-full min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full sm:w-2/3 md:w-1/2 lg:w-1/3 bg-white p-8 rounded-xl shadow-md">
        <div className="mb-8 space-y-3 w-full">
          <h2 className="text-2xl font-monserrat sm:text-3xl md:text-4xl font-semibold text-center text-gray-900">
            Create Account
          </h2>
        </div>
        {!verification ? (
          <form className="w-full" onSubmit={SubmitHandler}>
            <div className="mb-6 space-y-4">
              <div className="space-y-2">
                <label
                  className="text-sm font-signika font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  htmlFor="firstname"
                >
                  First Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaUser
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </div>
                  <input
                    type="text"
                    value={user.firstname}
                    onChange={(e) =>
                      setUser({ ...user, firstname: e.target.value })
                    }
                    className="border-input font-signika bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 pl-10"
                    required
                    id="firstname"
                    placeholder="Enter first name"
                    name="firstname"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label
                  className="text-sm font-signika font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  htmlFor="lastname"
                >
                  Last Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaUser
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </div>
                  <input
                    type="text"
                    value={user.lastname}
                    onChange={(e) =>
                      setUser({ ...user, lastname: e.target.value })
                    }
                    className="border-input font-signika bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 pl-10"
                    required
                    id="lastname"
                    placeholder="Enter last name"
                    name="lastname"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label
                  className="text-sm font-signika font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
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
                    value={user.email}
                    onChange={(e) =>
                      setUser({ ...user, email: e.target.value })
                    }
                    className="border-input font-signika bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 pl-10"
                    required
                    id="email"
                    placeholder="mail@example.com"
                    name="email"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label
                  className="text-sm font-signika font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
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
                    value={user.password}
                    onChange={(e) =>
                      setUser({ ...user, password: e.target.value })
                    }
                    className="border-input font-signika bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 pl-10"
                    required
                    id="password"
                    placeholder="Enter password"
                    name="password"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label
                  className="text-sm font-signika font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  htmlFor="mobile_number"
                >
                  Mobile No
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <BsTelephone
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </div>
                  <input
                    type="text"
                    value={user.mobile_number}
                    onChange={(e) =>
                      setUser({ ...user, mobile_number: e.target.value })
                    }
                    className="border-input font-signika bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 pl-10"
                    required
                    id="mobile_number"
                    placeholder="Enter mobile no"
                    name="mobile_number"
                  />
                </div>
              </div>
            </div>
            <button
              className="ring-offset-background font-monserrat focus-visible:ring-ring flex h-10 w-full items-center justify-center whitespace-nowrap rounded-md bg-green-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-black/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
              type="submit"
            >
              Create Account
            </button>
          </form>
        ) : (
          <div className="w-full space-y-4">
            <h3 className="text-xl font-monserrat font-semibold text-center text-gray-900">
              Verify Email
            </h3>
            <p className="text-sm text-center text-gray-600 font-signika">
              We have sent an OTP to{" "}
              <span className="font-semibold">{user.email}</span> for email
              verification.
            </p>
            <div className="space-y-2">
              <label
                className="text-sm font-signika font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor="otp"
              >
                OTP
              </label>
              <input
                type="text"
                value={user.otp}
                onChange={(e) => setUser({ ...user, otp: e.target.value })}
                className="border-input font-signika bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                id="otp"
                placeholder="Enter OTP"
                name="otp"
              />
            </div>
            <div className="flex justify-between items-center">
              <button
                disabled={isCountdownActive}
                className={`${
                  isCountdownActive
                    ? "cursor-not-allowed bg-gray-300 text-gray-500"
                    : "bg-green-900 text-white hover:bg-green-800"
                } rounded-md px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2`}
                onClick={!isCountdownActive ? SubmitHandler : null}
              >
                {isCountdownActive
                  ? `Resend OTP in ${countdown}s`
                  : "Resend OTP"}
              </button>
              <button
                className="bg-green-900 text-white rounded-md px-4 py-2 text-sm font-medium hover:bg-green-800 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                onClick={verifyEmailOTP}
              >
                Verify Email
              </button>
            </div>
          </div>
        )}
        <div className="text-sm text-center mt-6 font-signika">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-green-900 hover:text-green-800 underline"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
