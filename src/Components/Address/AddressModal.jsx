import { useState, useEffect, useContext } from "react";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import { TextField } from "@mui/material";
import { UpdateBilling, UpdateShipping } from "../../Services/Operations/Auth";
import toast from "react-hot-toast";
import { AppContext } from "../../App";

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
          borderRadius: "md",
          boxShadow: "lg",
          p: 0,
        }}
      >
        <div className="bg-bg-green text-white p-4 rounded-t-lg">
          <h2 className="text-xl font-semibold">
            {address ? "Edit" : "Add"}{" "}
            {addressType === "billing" ? "Billing" : "Shipping"} Address
          </h2>
        </div>
        <form onSubmit={handleSubmit} className="p-4">
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
          <div className="flex justify-end mt-4">
            <button
              type="button"
              onClick={onClose}
              className="mr-2 px-4 py-2 text-bg-green bg-gray-200 rounded-md hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-bg-green text-white rounded-md hover:bg-green-700"
            >
              {address ? "Update" : "Save"}
            </button>
          </div>
        </form>
      </ModalDialog>
    </Modal>
  );
};

export default AddressModal;
