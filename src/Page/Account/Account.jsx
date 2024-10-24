/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState, useCallback } from "react";
import AddressModal from "./AddressModal";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import { AppContext } from "../../App";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import { getUser } from "../../Services/Operations/Auth";
import { FaEdit } from "react-icons/fa";
import CommonTable from "../../Components/CommonTable/CommonTable";

const cookies = new Cookies();

const Account = () => {
  const [open, setOpen] = useState(false);
  const [addressModalOpen, setAddressModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const { user, setUser } = useContext(AppContext);
  const navigate = useNavigate();

  const getUserInfo = useCallback(async () => {
    setLoading(true);
    try {
      const token = cookies.get("Access-Token");
      if (!token) {
        navigate("/Login");
        return;
      }

      const email = user ? user[0].email : "";
      if (!email) {
        console.error("No email found in context");
        setLoading(false);
        return;
      }
      const response = await getUser(email);
      setUserData(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setLoading(false);
    }
  }, [user, navigate]);

  useEffect(() => {
    getUserInfo();

    // Listen for the custom 'userLoggedIn' event
    window.addEventListener("userLoggedIn", getUserInfo);

    return () => {
      window.removeEventListener("userLoggedIn", getUserInfo);
    };
  }, [getUserInfo]);

  const logoutHandler = () => {
    cookies.remove("Access-Token");
    setOpen(false);
    setUser(null);
    setUserData(null);
    navigate("/");
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen relative overflow-hidden">
        <l-tail-chase
          size="60"
          bg-opacity="0.2"
          speed="2"
          color="rgb(6,68,59)"
          className="w-1/6 sm:w-1/12 md:w-1/10 lg:w-1/10 xl:w-1/20 2xl:w-1/24"
        ></l-tail-chase>
      </div>
    );
  }

  if (!userData) {
    return <div>No user data available. Please try refreshing the page.</div>;
  }

  const renderHeader = () => (
    <thead>
      <tr className="bg-bg-green text-white">
        <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider">
          Order ID
        </th>
        <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider">
          Date
        </th>
        <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider">
          Items
        </th>
        <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider">
          Total
        </th>
        <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider">
          Status
        </th>
      </tr>
    </thead>
  );

  const renderRow = (order, index) => (
    <tr key={order.id} className="bg-white">
      <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-bg-green">
        #{order.id}
      </td>
      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
        {order.date}
      </td>
      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
        {order.items.map((item, index) => (
          <div key={index}>{item}</div>
        ))}
      </td>
      <td className="px-4 py-4 whitespace-nowrap text-sm text-bg-green">
        ₹{order.total}
      </td>
      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
        {order.status}
      </td>
    </tr>
  );

  return (
    <div className="flex items-center justify-center min-h-screen p-5 bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-4xl">
        <div className="flex flex-col items-center gap-8">
          <UserProfile userData={userData} />
          <div className="grid gap-8 w-full">
            <PersonalDetails
              userData={userData}
              onAddressClick={() => setAddressModalOpen(true)}
            />
            <LogoutButton onLogout={() => setOpen(true)} />
            <OrderHistory
              orders={userData.orders || []}
              renderHeader={renderHeader}
              renderRow={renderRow}
            />
          </div>
        </div>
      </div>
      <LogoutModal
        open={open}
        onClose={() => setOpen(false)}
        onLogout={logoutHandler}
      />
      <AddressModal
        open={addressModalOpen}
        onClose={() => setAddressModalOpen(false)}
      />
    </div>
  );
};

const UserProfile = ({ userData }) => (
  <div className="flex items-center gap-4">
    <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center">
      <img
        src={userData.profile_img || "https://via.placeholder.com/150"}
        alt="User"
        className="rounded-full w-full h-full object-cover"
      />
    </div>
    <div className="text-center">
      <h2 className="text-2xl font-poppins font-bold">{userData.name}</h2>
      <p className="text-gray-500 font-monserrat">{userData.email}</p>
    </div>
  </div>
);

const PersonalDetails = ({ userData, onAddressClick }) => (
  <div className="bg-gray-100 rounded-lg shadow-lg p-6">
    <h3 className="text-lg font-semibold font-monserrat">Personal Details</h3>
    <div className="grid grid-cols-2 font-poppins gap-2 text-sm mt-4">
      <div className="text-gray-500">Phone:</div>
      <div>{userData.mobile_number}</div>
      <div className="text-gray-500">Address:</div>
      <div className="flex items-center gap-2">
        <span>{userData.address || "Not provided"}</span>
        <button
          onClick={onAddressClick}
          className="text-bg-green hover:underline"
        >
          <FaEdit />
        </button>
      </div>
    </div>
  </div>
);

const LogoutButton = ({ onLogout }) => (
  <div className="w-full flex justify-center items-center">
    <button
      className="p-2 w-36 border-red-600 border-2 font-poppins rounded-md text-red-600 hover:bg-red-600 hover:text-white transition-colors"
      onClick={onLogout}
    >
      Logout
    </button>
  </div>
);

const LogoutModal = ({ open, onClose, onLogout }) => (
  <Modal keepMounted open={open} onClose={onClose}>
    <ModalDialog
      sx={{
        width: "30%",
        height: "20%",
        "@media (max-width:440px)": {
          height: "17%",
          width: "65%",
        },
        "@media (max-width:380px)": {
          height: "22%",
          width: "70%",
        },
      }}
    >
      <div>
        <div className="text-xl font-dm-sans text-black">
          Are you sure you want to log out?
        </div>
        <div className="flex flex-row justify-end gap-4 mt-3">
          <button
            className="text-black bg-slate-200 hover:bg-bg-green hover:text-white text-lg font-poppins items-center flex justify-center p-2 rounded-lg w-24 font-semibold"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="text-white bg-red-600 hover:bg-red-700 text-lg font-poppins items-center flex justify-center p-2 rounded-lg w-24 font-semibold"
            onClick={onLogout}
          >
            Confirm
          </button>
        </div>
      </div>
    </ModalDialog>
  </Modal>
);

const OrderHistory = ({ orders, renderHeader, renderRow }) => (
  <div className="bg-gray-100 rounded-lg shadow-lg p-6">
    <h2 className="text-2xl font-bold mb-4 font-outfit text-bg-green">
      Order History
    </h2>
    <div className="overflow-x-auto">
      <CommonTable
        data={orders}
        renderHeader={renderHeader}
        renderRow={renderRow}
      />
    </div>
  </div>
);

export default Account;
