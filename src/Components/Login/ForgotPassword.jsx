import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { IoMdMail, IoMdLock } from "react-icons/io";
import { ring2 } from "ldrs";
import toast from "react-hot-toast";
import { ChangePassword, SendOTP } from "../../Services/Operations/Auth";

ring2.register();

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await SendOTP({ email }); // Pass email as object
      if (response.data.success) {
        setStep(2);
        toast.success("OTP sent to your email", {
          style: {
            backgroundColor: "#064C3A",
            color: "#FFFFFF",
            fontFamily: "signika",
          },
          position: "bottom-right",
        });
      } else {
        toast.error(response.data.message || "An error occurred", {
          style: {
            backgroundColor: "#064C3A",
            color: "#FFFFFF",
            fontFamily: "signika",
          },
          position: "bottom-right",
        });
      }
    } catch (error) {
      console.error("Send OTP error:", error);
      toast.error(`Error: ${error.response.data.message}`, {
        style: {
          backgroundColor: "#064C3A",
          color: "#FFFFFF",
          fontFamily: "signika",
        },
        position: "bottom-right",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match", {
        style: {
          backgroundColor: "#064C3A",
          color: "#FFFFFF",
          fontFamily: "signika",
        },
        position: "bottom-right",
      });
      return;
    }
    setIsLoading(true);
    try {
      const response = await ChangePassword(email, newPassword, otp);
      if (response.data.success) {
        toast.success("Password changed successfully", {
          style: {
            backgroundColor: "#064C3A",
            color: "#FFFFFF",
            fontFamily: "signika",
          },
          position: "bottom-right",
        });
        navigate("/login");
      } else {
        toast.error(
          response.data.message || "Invalid OTP or password change failed",
          {
            style: {
              backgroundColor: "#064C3A",
              color: "#FFFFFF",
              fontFamily: "signika",
            },
            position: "bottom-right",
          }
        );
      }
    } catch (error) {
      console.error("Change password error:", error);
      toast.error("An error occurred. Please try again.", {
        style: {
          backgroundColor: "#064C3A",
          color: "#FFFFFF",
          fontFamily: "signika",
        },
        position: "bottom-right",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <form className="w-full" onSubmit={handleSendOtp}>
            <div className="mb-6 space-y-3">
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="text-sm font-signika font-medium leading-none"
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
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="border-input font-signika bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 pl-10"
                    placeholder="mail@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="ring-offset-background font-monserrat md:text-lg focus-visible:ring-ring flex h-10 w-full items-center justify-center whitespace-nowrap rounded-md bg-green-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-black/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
            >
              Send OTP
            </button>
          </form>
        );
      case 2:
        return (
          <form className="w-full" onSubmit={handleResetPassword}>
            <div className="mb-6 space-y-3">
              <div className="space-y-2">
                <label
                  htmlFor="otp"
                  className="text-sm font-signika font-medium leading-none"
                >
                  Enter OTP
                </label>
                <input
                  id="otp"
                  name="otp"
                  type="text"
                  required
                  className="border-input font-signika bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="newPassword"
                  className="text-sm font-signika font-medium leading-none"
                >
                  New Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <IoMdLock
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </div>
                  <input
                    id="newPassword"
                    name="newPassword"
                    type="password"
                    required
                    className="border-input font-signika bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 pl-10"
                    placeholder="New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="confirmPassword"
                  className="text-sm font-signika font-medium leading-none"
                >
                  Confirm Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <IoMdLock
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </div>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    required
                    className="border-input font-signika bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 pl-10"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="ring-offset-background font-monserrat md:text-lg focus-visible:ring-ring flex h-10 w-full items-center justify-center whitespace-nowrap rounded-md bg-green-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-black/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
            >
              Reset Password
            </button>
          </form>
        );
      default:
        return null;
    }
  };

  return (
    <div className="p-4 sm:p-8 md:p-10 w-full min-h-screen flex items-center justify-center bg-gray-100">
      {isLoading && (
        <div className="fixed inset-0 flex flex-col justify-center items-center bg-white bg-opacity-80 z-50">
          <l-ring-2 size="40" speed="1.75" color="rgb(6,68,59)"></l-ring-2>
        </div>
      )}
      <div className="w-full sm:w-2/3 md:w-1/2 lg:w-1/3 bg-white p-8 rounded-xl shadow-md">
        <div className="mb-8 space-y-3 w-full">
          <h2 className="text-2xl font-monserrat sm:text-3xl md:text-4xl font-semibold text-center text-gray-900">
            {step === 1 ? "Forgot Password" : "Reset Password"}
          </h2>
          <p className="text-center text-sm text-gray-600 font-signika">
            {step === 1
              ? "Enter your email address and we'll send you an OTP to reset your password."
              : "Enter the OTP and your new password."}
          </p>
        </div>
        {renderStep()}
        <div className="text-sm text-center mt-6 font-signika">
          Remember your password?{" "}
          <Link
            to="/login"
            className="font-medium text-green-900 hover:text-green-800 underline"
          >
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
