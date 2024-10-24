import { Link } from "react-router-dom";
import { useState } from "react";
import { IoMdMail } from "react-icons/io";
import { tailChase } from "ldrs";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Handle password reset logic here
    // After handling, set isLoading back to false
    setTimeout(() => setIsLoading(false), 2000); // Simulating API call
  };

  return (
    <div className="p-4 sm:p-8 md:p-10 w-full flex items-center justify-center bg-gray-100">
      {isLoading && (
        <div className="absolute inset-0 flex flex-col justify-center items-center bg-white bg-opacity-80 z-50">
          <l-tail-chase
            size="60"
            bg-opacity="0.2"
            speed="2"
            color="rgb(6,68,59)"
            className="w-1/6 sm:w-1/12 md:w-1/10 lg:w-1/10 xl:w-1/20 2xl:w-1/24"
          ></l-tail-chase>
        </div>
      )}
      <div className="w-full sm:w-2/3 md:w-1/2 lg:w-1/3 bg-white p-8 rounded-xl shadow-md">
        <div className="mb-8 space-y-3 w-full">
          <h2 className="text-2xl font-monserrat sm:text-3xl md:text-4xl font-semibold text-center text-gray-900">
            Forgot Password
          </h2>
          <p className="text-center text-sm text-gray-600 font-poppins">
            Enter your email address and we'll send you a link to reset your
            password.
          </p>
        </div>
        <form className="w-full" onSubmit={handleSubmit}>
          <div className="mb-6 space-y-3">
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-sm font-poppins font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
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
                  className="border-input font-poppins bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 pl-10"
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
            Send Reset Link
          </button>
        </form>
        <div className="text-sm text-center mt-6 font-poppins">
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
