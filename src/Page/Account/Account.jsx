/* eslint-disable react/no-unescaped-entities */
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
  GetUserOrders,
} from "../../Services/Operations/Auth";
import { FaChevronRight, FaCog, FaPlus, FaSignOutAlt } from "react-icons/fa";
import AddressCard from "../../Components/Address/AddressCard";
import CommonTable from "../../Components/CommonTable/CommonTable";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { clearCart } from "../../Slice/CartSlice";

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
  const [expandedOrder, setExpandedOrder] = useState(null);
  const dispatch = useDispatch();

  const [orders, setOrders] = useState([]);
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

      // Fetch user orders
      const ordersResponse = await GetUserOrders(email);
      setOrders(ordersResponse.data.data || []);

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
    dispatch(clearCart());
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

    window.location.reload();
  };

  const UserProfile = ({ userData }) => {
    // Function to get initials from name
    const getInitials = (name) => {
      const names = name.split(" ");
      if (names.length >= 2) {
        return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
      }
      return name[0].toUpperCase();
    };

    // Array of gradient combinations that complement your UI
    const gradient = "from-green-900 to-teal-900";

    return (
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center overflow-hidden">
          <div
            className={`w-full h-full bg-gradient-to-br ${gradient} flex items-center justify-center text-white font-bold text-xl sm:text-2xl md:text-3xl`}
          >
            {getInitials(userData.name)}
          </div>
        </div>
        <div>
          <h2 className="text-xl sm:text-2xl font-poppins font-bold">
            {userData.name}
          </h2>
          <p className="text-sm sm:text-base text-gray-500 font-monserrat">
            {userData.email}
          </p>
        </div>
      </div>
    );
  };

  const LogoutButton = ({ onLogout }) => (
    <button
      className="sm:px-6 p-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors absolute top-4 right-4 sm:static"
      onClick={onLogout}
    >
      <span className="hidden sm:inline text-sm sm:text-base">Logout</span>
      <FaSignOutAlt className="sm:hidden" size={20} />
    </button>
  );

  const LogoutModal = ({ open, onClose, onLogout }) => (
    <Modal keepMounted open={open} onClose={onClose}>
      <ModalDialog
        sx={{
          maxWidth: "90%",
          width: {
            xs: "300px",
            sm: "400px",
            md: "450px",
          },
          padding: {
            xs: "16px",
            sm: "24px",
          },
          borderRadius: "8px",
        }}
      >
        <div className="text-center">
          <h2 className="text-xl font-bold mb-4 font-signika text-black">
            Are you sure you want to log out?
          </h2>
          <div className="flex flex-col sm:flex-row justify-center gap-3 mt-6">
            <button
              className="w-full sm:w-auto px-4 py-2 text-black bg-gray-200 hover:bg-gray-300 text-base font-poppins rounded-lg font-semibold transition-colors"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="w-full sm:w-auto px-4 py-2 text-white bg-red-600 hover:bg-red-700 text-base font-poppins rounded-lg font-semibold transition-colors"
              onClick={onLogout}
            >
              Confirm
            </button>
          </div>
        </div>
      </ModalDialog>
    </Modal>
  );

  const toggleOrderDetails = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  const renderRow = (order, index) => (
    <React.Fragment key={order.order_id} className="w-full">
      <tr>
        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
          {index + 1}
        </td>
        <td className="px-4 py-4 whitespace-nowrap">
          <div className="text-sm font-medium text-bg-green">
            {order.order_id}
          </div>
          <div className="text-sm text-gray-500">
            {formatToIST(order.created_at)}
          </div>
        </td>
        <td className="px-4 py-4 whitespace-nowrap">
          <div className="flex items-center">
            <div className="flex-shrink-0 h-10 w-10">
              <img
                className="h-10 w-10 rounded-full object-cover"
                src={order.order_items[0]?.product_details.image_url}
                alt=""
              />
            </div>
            <div className="ml-4">
              <div className="text-sm font-medium text-bg-green">
                {order.order_items[0]?.product_details.name}
                {order.order_items.length > 1 &&
                  ` (+${order.order_items.length - 1} more)`}
              </div>
            </div>
          </div>
        </td>
        <td className="px-4 py-4 whitespace-nowrap text-sm text-bg-green">
          ₹{" "}
          {order.order_items
            .reduce(
              (total, item) =>
                total + parseFloat(item.product_details.price) * item.quantity,
              0
            )
            .toFixed(2)}
          {` (${order.payment_type})`}
        </td>
        <td className="px-4 py-4 whitespace-nowrap">
          <span
            className={`px-2 inline-flex bg-bg-green hover:bg-green-700 hover:cursor-default text-white text-xs leading-5 font-semibold rounded-full`}
          >
            {order.order_status}
          </span>
        </td>
        <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
          <button
            className="bg-bg-green hover:bg-green-700 text-white px-3 py-1 rounded transition-colors duration-200"
            onClick={() => toggleOrderDetails(order.order_id)}
          >
            {expandedOrder === order.order_id ? "Hide details" : "See details"}
          </button>
        </td>
      </tr>
      {expandedOrder === order.order_id && (
        <tr>
          <td colSpan="6" className="px-4 py-4">
            <div className="bg-gray-50 p-4 rounded-md">
              <h4 className="font-bold mb-2">Order Details</h4>
              <table className="min-w-full bg-white border border-gray-200">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="px-4 py-2 text-left">Product</th>
                    <th className="px-4 py-2 text-left">Size</th>
                    <th className="px-4 py-2 text-left">Price</th>
                    <th className="px-4 py-2 text-left">Quantity</th>
                    <th className="px-4 py-2 text-left">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {order.order_items.map((item, itemIndex) => (
                    <tr key={itemIndex} className="border-t border-gray-200">
                      <td className="px-4 py-2">
                        <div className="flex items-center">
                          <img
                            src={item.product_details.image_url}
                            alt={item.product_details.name}
                            className="w-10 h-10 object-cover mr-2"
                          />
                          {item.product_details.name}
                        </div>
                      </td>
                      <td className="px-4 py-2">{item.size}</td>
                      <td className="px-4 py-2 text-bg-green">
                        ₹{parseFloat(item.product_details.price).toFixed(2)}
                      </td>
                      <td className="px-4 py-2">{item.quantity}</td>
                      <td className="px-4 py-2">
                        ₹
                        {(
                          parseFloat(item.product_details.price) * item.quantity
                        ).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="border-t border-gray-200 font-bold">
                    <td colSpan="4" className="px-4 py-2 text-right">
                      Total:
                    </td>
                    <td className="px-4 py-2">
                      ₹
                      {order.order_items
                        .reduce(
                          (total, item) =>
                            total +
                            parseFloat(item.product_details.price) *
                              item.quantity,
                          0
                        )
                        .toFixed(2)}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </td>
        </tr>
      )}
    </React.Fragment>
  );

  const renderHeader = () => (
    <thead>
      <tr className="bg-bg-green text-white">
        <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider">
          #
        </th>
        <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider">
          Order ID
        </th>
        <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider">
          Product
        </th>
        <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider">
          Amount
        </th>
        <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider">
          Status
        </th>
        <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider">
          Action
        </th>
      </tr>
    </thead>
  );

  const OrderHistory = ({ orders }) => (
    <div className="bg-bg-green bg-opacity-10 rounded-lg p-4 sm:p-6 w-full">
      <h2 className="text-lg sm:text-xl font-bold mb-4 font-outfit text-bg-green">
        Order History
      </h2>
      <div className="overflow-x-auto">
        {orders && orders.length > 0 ? (
          <CommonTable
            data={orders}
            renderHeader={renderHeader}
            renderRow={renderRow}
          />
        ) : (
          <div className="flex flex-col items-center justify-center py-8 px-4 bg-white rounded-lg">
            <h3 className="text-xl font-semibold text-bg-green mb-2">
              No Orders Yet
            </h3>
            <p className="text-gray-500 text-center mb-6">
              You haven't placed any orders yet. Start shopping to see your
              orders here!
            </p>
            <button
              onClick={() => navigate("/newdrops")}
              className="px-6 py-2 bg-bg-green text-white rounded-lg hover:bg-green-700 transition-colors duration-300 font-medium"
            >
              Start Shopping
            </button>
          </div>
        )}
      </div>
    </div>
  );

  // const SettingsModal = ({ open, onClose, onLogout }) => (
  //   <Modal keepMounted open={open} onClose={onClose}>
  //     <ModalDialog
  //       sx={{
  //         width: "30%",
  //         height: "auto",
  //         "@media (max-width:440px)": {
  //           width: "65%",
  //         },
  //         "@media (max-width:380px)": {
  //           width: "70%",
  //         },
  //       }}
  //     >
  //       <div className="p-4">
  //         <h2 className="text-xl font-bold mb-4 font-outfit text-bg-green">
  //           Settings
  //         </h2>
  //         <button
  //           onClick={onLogout}
  //           className="w-full text-white bg-red-600 hover:bg-red-700 text-lg font-poppins items-center flex justify-center p-2 rounded-lg font-semibold mb-2"
  //         >
  //           Logout
  //         </button>
  //         <button
  //           onClick={onClose}
  //           className="w-full text-bg-green bg-gray-200 hover:bg-gray-300 text-lg font-poppins items-center flex justify-center p-2 rounded-lg font-semibold"
  //         >
  //           Close
  //         </button>
  //       </div>
  //     </ModalDialog>
  //   </Modal>
  // );

  const formatToIST = (utcDateString) => {
    try {
      // Create a date object from the UTC string
      const date = new Date(utcDateString);

      // Add 5 hours and 30 minutes for IST conversion
      const istDate = new Date(date.getTime() + 5.5 * 60 * 60 * 1000);

      return istDate.toLocaleString("en-IN", {
        timeZone: "Asia/Kolkata",
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
    } catch (error) {
      console.error("Error formatting date:", error);
      return utcDateString; // Return original string if formatting fails
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen relative overflow-hidden">
        <l-ring-2
          size="40"
          bg-opacity="0.2"
          speed="0.5"
          color="rgb(6,68,59)"
          className="w-1/6 sm:w-1/12 md:w-1/10 lg:w-1/10 xl:w-1/20 2xl:w-1/24"
        ></l-ring-2>
      </div>
    );
  }

  if (!userData) {
    return <div>No user data available. Please try refreshing the page.</div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen font-signika">
      <div className="container mx-auto py-4 sm:py-6 md:py-8 px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 md:p-8 relative">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0">
            <UserProfile userData={userData} />
            <LogoutButton onLogout={() => setSettingsOpen(true)} />
          </div>
          <div className="mt-6 sm:mt-8 grid gap-4 sm:gap-6 md:grid-cols-2">
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
            <div className="md:col-span-2 overflow-scroll xl:overflow-auto">
              <OrderHistory orders={orders} />
            </div>
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
      <LogoutModal
        open={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        onLogout={logoutHandler}
      />
      <Toaster position="bottom-right" />
    </div>
  );
};

export default Account;
