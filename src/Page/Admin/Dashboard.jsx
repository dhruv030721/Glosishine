/* eslint-disable no-unused-vars */
import React, { useContext, useState, useEffect } from "react";
import { LuHome, LuLogOut } from "react-icons/lu";
import { IoBagHandle } from "react-icons/io5";
import { MdAnalytics, MdDiscount, MdInventory } from "react-icons/md";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import { FaTruck } from "react-icons/fa6";
import Product from "./Product";
import Orders from "./Orders";
import SetItems from "./SetItems";
import AddProduct from "./AddProduct";
import { AppContext } from "../../App";
import { useNavigate } from "react-router-dom";
import { getItem, removeItem } from "../../Services/LocalStorageService";
import DashboardContent from "./DashboardContent";
import Inventory from "./Inventory";
import logo from "../../assets/logos.jpg";
import Discounts from "./Discounts";
import { IoMdClose } from "react-icons/io";

const Dashboard = () => {
  const appcontext = useContext(AppContext);
  const [selectedContent, setSelectedContent] = useState("dashboard");
  const [open, setOpen] = React.useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = getItem("adminToken");
    if (!token) {
      navigate("/admin", { replace: true });
    }
  }, [navigate]);

  const handleItemClick = (content) => {
    setSelectedContent(content);
    setIsSidebarOpen(false);
  };

  const handleLogout = () => {
    removeItem("adminToken");
    navigate("/admin", { replace: true });
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex flex-col md:flex-row h-screen w-full bg-white">
      <div
        className={`${
          isSidebarOpen ? "block" : "hidden"
        } md:block md:w-[23%] bg-green-800 border-r dark:bg-bg-green dark:border-bg-green fixed md:static inset-0 z-50`}
      >
        <div className="flex flex-col h-screen">
          <div className="flex items-center justify-between h-14 border-b dark:border-white px-4">
            <div className="flex items-center gap-3">
              <img src={logo} alt="logo" className="aspect-video w-16" />
              <span className="text-xl font-dm-sans font-bold text-white dark:text-white">
                Glosishine Admin
              </span>
            </div>
            <button onClick={toggleSidebar} className="md:hidden text-white">
              <IoMdClose size={24} />
            </button>
          </div>
          <div className="flex flex-col font-dm-sans flex-1 overflow-y-auto mt-2 gap-y-3">
            <button
              className={`flex items-center px-6 py-2 ml-2 mr-2 rounded-md text-lg text-white`}
              onClick={() => handleItemClick("dashboard")}
            >
              <MdAnalytics className="w-6 h-6 mr-2" />
              Dashboard
            </button>
            <button
              className={`flex items-center px-6 py-2 ml-2 mr-2 rounded-md text-lg text-white`}
              onClick={() => handleItemClick("inventory")}
            >
              <MdInventory className="w-6 h-6 mr-2" />
              Inventory
            </button>
            <button
              className={`flex items-center px-6 py-2 ml-2 mr-2 rounded-md text-lg text-white`}
              onClick={() => handleItemClick("discounts")}
            >
              <MdDiscount className="w-6 h-6 mr-2" />
              Discounts
            </button>
            <button
              className={`flex items-center px-6 ml-2 mr-2 rounded-md py-2 text-lg text-white`}
              onClick={() => handleItemClick("addproduct")}
            >
              <LuHome className="w-6 h-6 mr-2" />
              Add Product
            </button>
            <button
              className={`flex items-center px-6 py-2 ml-2 mr-2 rounded-md text-lg text-white `}
              onClick={() => handleItemClick("products")}
            >
              <IoBagHandle className="w-6 h-6 mr-2" />
              View Products
            </button>
            <button
              className={`flex items-center px-6 py-2 ml-2 mr-2 rounded-md text-lg text-white `}
              onClick={() => handleItemClick("orders")}
            >
              <FaTruck className="w-6 h-6 mr-2" />
              Orders
            </button>
            <button
              className={`flex items-center px-6 py-2 ml-2 mr-2 rounded-md text-lg text-white`}
              onClick={() => handleItemClick("setitems")}
            >
              <IoBagHandle className="w-6 h-6 mr-2" />
              Home page UI
            </button>
          </div>
          <React.Fragment>
            <button
              className="flex items-center font-poppins text-white mb-5 px-6 ml-2 mr-2 rounded-md py-2 text-lg"
              onClick={() => setOpen(true)}
            >
              <LuLogOut className="w-6 h-6 mr-2" />
              Logout
            </button>

            <Modal keepMounted open={open}>
              <ModalDialog
                sx={{
                  width: "30%",
                  height: "20%",
                  "@media (max-width:440px)": { height: "17%", width: "65%" },
                  "@media (max-width:380px)": { height: "22%", width: "70%" },
                }}
              >
                <div>
                  <div className="text-xl font-dm-sans text-black">
                    Are you sure you want to log out?
                  </div>
                  <div className="flex flex-row justify-end gap-4 mt-3">
                    <button
                      className="text-black bg-slate-200 text-lg font-dm-sans items-center flex  justify-center p-2 rounded-lg w-24 font-semibold"
                      onClick={() => setOpen(false)}
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleLogout}
                      className=" text-white bg-red-600 text-lg font-dm-sans items-center flex  justify-center p-2 rounded-lg w-24 font-semibold"
                    >
                      Confirm
                    </button>
                  </div>
                </div>
              </ModalDialog>
            </Modal>
          </React.Fragment>
        </div>
      </div>

      {/* Mobile header */}
      <div className="md:hidden flex items-center justify-start gap-[25%] p-4 bg-bg-green text-white">
        <button onClick={toggleSidebar} className="text-2xl">
          ☰
        </button>
        <span className="text-xl font-bold">Glosishine Admin</span>
      </div>

      {/* Main content */}
      <div className="flex flex-col w-full md:w-[76%] flex-1 overflow-y-auto">
        {/* Content area */}
        <div className="p-6 w-full">
          {selectedContent === "dashboard" && <DashboardContent />}
          {selectedContent === "inventory" && <Inventory />}
          {selectedContent === "discounts" && <Discounts />}
          {selectedContent === "addproduct" && <AddProduct />}
          {selectedContent === "products" && <Product />}
          {selectedContent === "orders" && <Orders />}
          {selectedContent === "setitems" && <SetItems />}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
