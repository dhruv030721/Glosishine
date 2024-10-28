import { useState, useEffect, useContext } from "react";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import { TextField } from "@mui/material";
import { UpdateBilling, UpdateShipping } from "../../Services/Operations/Auth";
import toast from "react-hot-toast";
import { AppContext } from "../../App";
import { FaTimes } from "react-icons/fa";

const AddressModal = ({
  open,
  onClose,
  addressType,
  address,
  onAddressUpdate,
}) => {
  const { user } = useContext(AppContext);
  const [streetAddress, setStreetAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [postcode, setPostcode] = useState("");
  const [contact, setContact] = useState("");
  const [orderNotes, setOrderNotes] = useState("");
  const [id, setId] = useState(null);

  useEffect(() => {
    if (address) {
      setId(address.id || null);
      setStreetAddress(address.street_address || "");
      setCity(address.city || "");
      setState(address.state || "");
      setPostcode(address.postcode || "");
      setContact(address.contact || "");
      setOrderNotes(address.order_notes || "");
    } else {
      setId(null);
      setStreetAddress("");
      setCity("");
      setState("");
      setPostcode("");
      setContact("");
      setOrderNotes("");
    }
  }, [address]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = user?.[0]?.email;
    if (!email) {
      toast.error("User email not found", {
        style: {
          backgroundColor: "#064C3A",
          color: "#FFFFFF",
          fontFamily: "signika",
        },
        position: "bottom-right",
      });
      return;
    }

    const addressDetails = {
      contact,
      street_address: streetAddress,
      city,
      state,
      postcode,
      ...(addressType === "shipping" && { order_notes: orderNotes }),
    };

    const newAddress = {
      email,
      id,
      // Use the correct key based on addressType
      [addressType === "billing" ? "billing_details" : "shipping_details"]:
        addressDetails,
    };

    // Select the correct update function based on addressType
    const updateFunction =
      addressType === "billing" ? UpdateBilling : UpdateShipping;

    try {
      const response = await updateFunction(newAddress);
      onAddressUpdate(addressType, response.data);
      onClose();
      toast.success(
        `${
          addressType.charAt(0).toUpperCase() + addressType.slice(1)
        } address updated successfully!`,
        { position: "bottom-right" }
      );
    } catch (error) {
      console.error(`Failed to update ${addressType} address:`, error);
      toast.error(`Failed to update ${addressType} address`, {
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
    <Modal
      open={open}
      onClose={onClose}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ModalDialog
        sx={{
          maxWidth: 500,
          width: "90%",
          borderRadius: "md",
          p: 0,
          maxHeight: "90vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Header */}
        <div className="bg-bg-green text-white p-4 rounded-t-lg">
          <h2 className="text-xl font-semibold">
            {address ? "Edit" : "Add"}{" "}
            {addressType === "billing" ? "Billing" : "Shipping"} Address
          </h2>
        </div>

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-white opacity-80 hover:opacity-100"
        >
          <FaTimes size={24} />
        </button>

        {/* Scrollable form content */}
        <div className="overflow-y-auto flex-1 p-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <TextField
              label="Contact"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Street Address"
              value={streetAddress}
              onChange={(e) => setStreetAddress(e.target.value)}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="State"
              value={state}
              onChange={(e) => setState(e.target.value)}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Postcode"
              value={postcode}
              onChange={(e) => setPostcode(e.target.value)}
              fullWidth
              margin="normal"
              required
            />
            {addressType === "shipping" && (
              <TextField
                label="Order Notes"
                value={orderNotes}
                onChange={(e) => setOrderNotes(e.target.value)}
                fullWidth
                margin="normal"
                multiline
                rows={3}
              />
            )}
          </form>
        </div>

        {/* Fixed button container */}
        <div className="p-4 bg-gray-50 border-t mt-auto">
          <div className="flex flex-col sm:flex-row gap-3 justify-end">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              form="addressForm"
              onClick={handleSubmit}
              className="w-full sm:w-auto px-6 py-2 bg-bg-green text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              {address ? "Update" : "Add"} Address
            </button>
          </div>
        </div>
      </ModalDialog>
    </Modal>
  );
};

export default AddressModal;
