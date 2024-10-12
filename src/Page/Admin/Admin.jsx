/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AdminLogin } from "../../Services/Operations/Auth";
import { getItem } from "../../Services/LocalStorageService";
import toast from "react-hot-toast";

const Admin = () => {
  const navigate = useNavigate();
  const [adminuser, setAdminuser] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    const token = getItem("adminToken");
    if (token) {
      navigate("/admin/dashboard", { replace: true });
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!adminuser.email || !adminuser.password) {
      toast.error("Please fill all the fields");
      return;
    }
    try {
      const response = await toast.promise(
        AdminLogin(adminuser),
        {
          loading: "Processing....",
          success: (response) => {
            if (response.data.token) {
              navigate("/admin/dashboard", { replace: true });
              return "Login successful";
            } else {
              throw new Error("Login failed: No token received");
            }
          },
          error: (error) => {
            return error.response?.data?.message || "Login failed";
          },
        },
        {
          position: "bottom-right",
          style: {
            fontFamily: "'Poppins', sans-serif",
            fontSize: "14px",
            fontWeight: "400",
            lineHeight: "1.5",
            color: "#333333",
          },
        }
      );
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="p-4 sm:p-8 md:p-10 w-full">
      <div className="flex flex-col w-full items-center justify-center">
        <div className="w-full sm:w-2/3 md:w-1/2 lg:w-1/3">
          <div className="mb-4 sm:mb-8 space-y-3 w-full">
            <p className="text-2xl font-monserrat sm:text-3xl md:text-4xl font-semibold flex justify-center">
              Admin Login
            </p>
          </div>
          <form className="w-full" onSubmit={handleSubmit}>
            <div className="mb-10 space-y-3">
              <div className="space-y-2">
                <label
                  className="text-sm font-poppins font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  type="email"
                  value={adminuser.email}
                  onChange={(e) =>
                    setAdminuser({ ...adminuser, email: e.target.value })
                  }
                  placeholder="Enter email"
                  className="bg-white p-3 pr-12 font-poppins text-sm leading-5 w-full rounded-lg border border-gray-300 shadow-sm outline-none focus:ring focus:ring-indigo-200"
                />
                <span className="absolute inset-y-0 right-0 flex items-center pr-3">
                  {/* Icon can be added here if needed */}
                </span>
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
                  value={adminuser.password}
                  onChange={(e) =>
                    setAdminuser({ ...adminuser, password: e.target.value })
                  }
                  placeholder="Enter password"
                  className="bg-white p-3 font-poppins pr-12 text-sm leading-5 w-full rounded-lg border border-gray-300 shadow-sm outline-none focus:ring focus:ring-indigo-200"
                />
              </div>
              <button
                type="submit"
                className="cursor-pointer font-poppins group relative flex gap-1.5 p-2 items-center justify-center w-full h-12 bg-bg-green hover:bg-black text-[#f1f1f1] rounded-lg transition font-semibold shadow-md"
              >
                Login Now
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Admin;
