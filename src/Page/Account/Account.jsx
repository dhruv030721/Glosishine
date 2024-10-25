/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState, useCallback } from "react";
import AddressModal from "../../Components/Address/AddressModal";
import { AppContext } from "../../App";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import {
  getUser,
  GetBilling,
  GetShipping,
} from "../../Services/Operations/Auth";
import { FaChevronRight, FaCog, FaPlus } from "react-icons/fa";
import AddressCard from "../../Components/Address/AddressCard";
import CommonTable from "../../Components/CommonTable/CommonTable";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import { Toaster } from "react-hot-toast";

const cookies = new Cookies();

const Account = () => {
  const {
    user,
    setUser,
    billingAddress,
    setBillingAddress,
    shippingAddress,
    setShippingAddress,
  } = useContext(AppContext);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [addressModalOpen, setAddressModalOpen] = useState(false);
  const [addressType, setAddressType] = useState("billing");
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [billingAddresses, setBillingAddresses] = useState([]);
  const [shippingAddresses, setShippingAddresses] = useState([]);
  const [selectedBillingId, setSelectedBillingId] = useState(null);
  const [selectedShippingId, setSelectedShippingId] = useState(null);
  const [editingAddress, setEditingAddress] = useState(null);
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

      // Fetch billing and shipping details
      const billingResponse = await GetBilling(email);
      const billingData = billingResponse.data.data || [];
      setBillingAddresses(billingData);
      setSelectedBillingId(billingData[0]?.id || null);

      const shippingResponse = await GetShipping(email);
      const shippingData = shippingResponse.data.data || [];
      setShippingAddresses(shippingData);
      setSelectedShippingId(shippingData[0]?.id || null);

      // Open billing address modal if either address is missing
      if (billingData.length === 0 || shippingData.length === 0) {
        setAddressModalOpen(true);
        setAddressType(billingData.length === 0 ? "billing" : "shipping");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setLoading(false);
    }
  }, [user, navigate]);

  useEffect(() => {
    getUserInfo();
  }, [getUserInfo]);

  const logoutHandler = () => {
    cookies.remove("Access-Token");
    setUser(null);
    setUserData(null);
    navigate("/");
  };

  const openAddressModal = (type, address = null) => {
    setAddressType(type);
    setEditingAddress(address);
    setAddressModalOpen(true);
  };

  const handleAddressUpdate = (type, newAddress) => {
    if (type === "billing") {
      setBillingAddresses((prev) => {
        const index = prev.findIndex((addr) => addr.id === newAddress?.id);
        if (index !== -1) {
          return prev.map((addr, i) => (i === index ? newAddress : addr));
        } else {
          return [...prev, newAddress];
        }
      });
    } else {
      setShippingAddresses((prev) => {
        const index = prev.findIndex((addr) => addr.id === newAddress?.id);
        if (index !== -1) {
          return prev.map((addr, i) => (i === index ? newAddress : addr));
        } else {
          return [...prev, newAddress];
        }
      });
    }
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
      <div>
        <h2 className="text-2xl font-poppins font-bold">{userData.name}</h2>
        <p className="text-gray-500 font-monserrat">{userData.email}</p>
      </div>
    </div>
  );

  const LogoutButton = ({ onLogout }) => (
    <button
      className="px-6 py-2 bg-red-600 text-white font-poppins rounded-md hover:bg-red-700 transition-colors"
      onClick={onLogout}
    >
      Logout
    </button>
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

  const OrderHistory = ({ orders }) => (
    <div className="bg-bg-green bg-opacity-10 rounded-lg p-6">
      <h2 className="text-xl font-bold mb-4 font-outfit text-bg-green">
        Order History
      </h2>
      <div className="overflow-x-auto">
        <CommonTable
          data={orders}
          renderHeader={() => (
            <thead>
              <tr className="bg-bg-green text-white">
                <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider">
                  Order ID
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider">
                  Date
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider">
                  Total
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
          )}
          renderRow={(order) => (
            <tr key={order.id} className="bg-white">
              <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-bg-green">
                #{order.id}
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                {order.date}
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-sm text-bg-green">
                ₹{order.total}
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                {order.status}
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-sm">
                <button className="text-bg-green hover:text-green-700 transition-colors">
                  <FaChevronRight size={16} />
                </button>
              </td>
            </tr>
          )}
        />
      </div>
    </div>
  );

  const SettingsModal = ({ open, onClose, onLogout }) => (
    <Modal keepMounted open={open} onClose={onClose}>
      <ModalDialog
        sx={{
          width: "30%",
          height: "auto",
          "@media (max-width:440px)": {
            width: "65%",
          },
          "@media (max-width:380px)": {
            width: "70%",
          },
        }}
      >
        <div className="p-4">
          <h2 className="text-xl font-bold mb-4 font-outfit text-bg-green">
            Settings
          </h2>
          <button
            onClick={onLogout}
            className="w-full text-white bg-red-600 hover:bg-red-700 text-lg font-poppins items-center flex justify-center p-2 rounded-lg font-semibold mb-2"
          >
            Logout
          </button>
          <button
            onClick={onClose}
            className="w-full text-bg-green bg-gray-200 hover:bg-gray-300 text-lg font-poppins items-center flex justify-center p-2 rounded-lg font-semibold"
          >
            Close
          </button>
        </div>
      </ModalDialog>
    </Modal>
  );

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

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto py-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="flex justify-between items-center">
            <UserProfile userData={userData} />
            <button
              onClick={() => setSettingsOpen(true)}
              className="text-bg-green hover:text-green-700 transition-colors"
            >
              <FaCog size={24} />
            </button>
          </div>
          <div className="mt-8 grid gap-6">
            <AddressCard
              title="Billing Address"
              addresses={billingAddresses}
              selectedId={selectedBillingId}
              onSelectAddress={setSelectedBillingId}
              onEditAddress={(id, address) =>
                openAddressModal("billing", address)
              }
              onAddAddress={() => openAddressModal("billing")}
            />
            <AddressCard
              title="Shipping Address"
              addresses={shippingAddresses}
              selectedId={selectedShippingId}
              onSelectAddress={setSelectedShippingId}
              onEditAddress={(id, address) =>
                openAddressModal("shipping", address)
              }
              onAddAddress={() => openAddressModal("shipping")}
            />
            <OrderHistory orders={userData?.orders || []} />
          </div>
        </div>
      </div>
      <AddressModal
        open={addressModalOpen}
        onClose={() => {
          setAddressModalOpen(false);
          setEditingAddress(null);
        }}
        addressType={addressType}
        address={editingAddress}
        onAddressUpdate={handleAddressUpdate}
      />
      <SettingsModal
        open={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        onLogout={logoutHandler}
      />
      <Toaster position="bottom-right" />
    </div>
  );
};

export default Account;
