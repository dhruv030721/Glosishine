import { useState } from "react";
import { FaEdit, FaPlus, FaTimes } from "react-icons/fa";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";

const AddressCard = ({
  title,
  addresses = [],
  selectedId,
  addressType,
  onSelectAddress,
  onEditAddress,
  onAddAddress,
  className,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const selectedAddress =
    addresses.find((addr) => addr?.id === selectedId) || addresses[0] || null;

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const handleSelectAddress = (addressId) => {
    onSelectAddress(addressId);
    setIsModalOpen(false);
  };

  const AddressItem = ({
    address,
    isSelected,
    onSelect,
    onEdit,
    addressType,
  }) => (
    <div
      className={`bg-white rounded-lg p-4 mb-4 border ${
        isSelected ? "border-bg-green" : "border-gray-200"
      }`}
    >
      <div className="flex justify-between items-center mb-2">
        <input
          type="radio"
          id={`address-${address?.id}`}
          name={title}
          value={address?.id}
          checked={isSelected}
          onChange={() => onSelect(address?.id)}
          className="mr-2"
        />
        <button
          onClick={(e) => {
            e.stopPropagation();
            onEdit(address?.id, address, addressType);
          }}
          className="text-bg-green hover:text-green-700"
        >
          <FaEdit size={18} />
        </button>
      </div>
      <label htmlFor={`address-${address?.id}`} className="cursor-pointer">
        <p>{address?.contact}</p>
        <p>{address?.street_address}</p>
        <p>
          {address?.city}, {address?.state} {address?.postcode}
        </p>
      </label>
    </div>
  );

  return (
    <>
      <div
        className={`bg-bg-green bg-opacity-10 rounded-lg p-4 cursor-pointer ${className}`}
        onClick={toggleModal}
      >
        <h3 className="text-bg-green font-semibold text-lg mb-2">{title}</h3>
        {selectedAddress ? (
          <div>
            <p>{selectedAddress.contact}</p>
            <p>{selectedAddress.street_address}</p>
            <p>
              {selectedAddress.city}, {selectedAddress.state}{" "}
              {selectedAddress.postcode}
            </p>
          </div>
        ) : (
          <p>No address selected</p>
        )}
      </div>
      <Modal
        open={isModalOpen}
        onClose={toggleModal}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ModalDialog
          sx={{
            maxWidth: 600,
            width: "90%",
            borderRadius: "md",
            padding: 0,
            maxHeight: "90vh",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div className="bg-bg-green text-white p-4 rounded-t-lg">
            <h2 className="text-xl font-semibold">{title}</h2>
          </div>

          <button
            onClick={toggleModal}
            className="absolute top-2 right-2 text-end text-white opacity-100 hover:opacity-70 rounded-full p-1 transition-colors duration-200"
          >
            <FaTimes size={24} />
          </button>

          <div
            className="px-4 py-2 overflow-y-auto flex-grow"
            style={{ maxHeight: "calc(80vh - 200px)" }}
          >
            {addresses.length > 0 ? (
              addresses.map((address) => (
                <AddressItem
                  key={address?.id}
                  address={address}
                  addressType={addressType}
                  isSelected={selectedId === address?.id}
                  onSelect={handleSelectAddress}
                  onEdit={onEditAddress}
                />
              ))
            ) : (
              <p className="text-center py-4">No addresses available</p>
            )}
          </div>
          {addresses.length < 2 && (
            <div className="p-4 bg-white border-t">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onAddAddress(
                    title.toLowerCase().includes("billing")
                      ? "billing"
                      : "shipping"
                  );
                }}
                className="w-full bg-bg-green text-white py-2 px-4 rounded-lg hover:bg-green-700 flex items-center justify-center"
              >
                <FaPlus className="mr-2" /> Add New {title}
              </button>
            </div>
          )}
        </ModalDialog>
      </Modal>
    </>
  );
};

export default AddressCard;
