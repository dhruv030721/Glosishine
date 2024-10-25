/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import Modal from "@mui/joy/Modal"; // Make sure you're importing the correct Modal component
import { ModalDialog, ModalClose, Typography, Button } from "@mui/joy";
import AddressCard from "../../Components/Address/AddressCard";
import AddressModal from "../../Components/Address/AddressModal";

const CartCheckout = ({
  cartItems,
  billingAddresses,
  selectedBillingId,
  setSelectedBillingId,
  shippingAddresses,
  selectedShippingId,
  setSelectedShippingId,
  handleEditAddress,
  setEditingAddress,
  setAddressType,
  setAddressModalOpen,
  handleApplyCoupon,
  couponCode,
  setCouponCode,
  cartTotal,
  totalDiscount,
  finalTotal,
  appliedDiscount,
  couponDiscountAmount,
  handleProceedToPayment,
  isPaymentModalOpen,
  setIsPaymentModalOpen,
  handlePaymentMethodSelect,
  addressModalOpen,
  editingAddress,
  handleAddressUpdate,
  addressType,
}) => {
  return (
    <>
      <div className="bg-white shadow-lg rounded-md p-4 sm:p-6">
        <h3 className="font-semibold text-lg mt-6 mb-4">Addresses</h3>
        <AddressCard
          title="Billing Address"
          addresses={billingAddresses}
          selectedId={selectedBillingId}
          addressType="billing"
          onSelectAddress={(id) => setSelectedBillingId(id)}
          onEditAddress={(id, address, type) =>
            handleEditAddress(id, address, "billing")
          }
          onAddAddress={() => {
            setEditingAddress(null);
            setAddressType("billing");
            setAddressModalOpen(true);
          }}
        />
        <div className="mt-4">
          <AddressCard
            title="Shipping Address"
            addresses={shippingAddresses}
            selectedId={selectedShippingId}
            addressType="shipping"
            onSelectAddress={(id) => setSelectedShippingId(id)}
            onEditAddress={(id, address, type) =>
              handleEditAddress(id, address, "shipping")
            }
            onAddAddress={() => {
              setEditingAddress(null);
              setAddressType("shipping");
              setAddressModalOpen(true);
            }}
          />
        </div>

        <h3 className="font-semibold text-lg mt-6 mb-4">Coupon Code</h3>
        <input
          type="text"
          placeholder="Coupon Code"
          className="w-full p-2 border rounded mb-4"
          disabled={cartItems.length === 0}
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
        />
        <button
          className="w-full p-2 bg-black text-white rounded disabled:cursor-not-allowed"
          disabled={cartItems.length === 0}
          onClick={handleApplyCoupon}
        >
          Apply
        </button>

        <div className="mt-6">
          <div className="flex justify-between mb-2">
            <p>Cart Subtotal</p>
            <p>₹{cartTotal.toFixed(2)}</p>
          </div>
          {totalDiscount > 0 && (
            <div className="flex justify-between mb-2">
              <p>Product Discount</p>
              <p>−₹{totalDiscount.toFixed(2)}</p>
            </div>
          )}
          {appliedDiscount && (
            <div className="flex justify-between mb-2">
              <p>Coupon Discount ({appliedDiscount.discount}%)</p>
              <p>−₹{couponDiscountAmount.toFixed(2)}</p>
            </div>
          )}
          <div className="flex justify-between text-lg font-semibold">
            <p>Cart Total</p>
            <p>₹{finalTotal.toFixed(2)}</p>
          </div>
          <button
            className="w-full mt-4 p-2 bg-bg-green text-white rounded disabled:cursor-not-allowed"
            disabled={
              cartItems.length === 0 ||
              !selectedBillingId ||
              !selectedShippingId
            }
            onClick={handleProceedToPayment}
          >
            Proceed to Payment
          </button>
        </div>
      </div>
      <Modal
        open={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
      >
        <ModalDialog>
          <ModalClose />
          <Typography level="h4" component="h2">
            Select Payment Method
          </Typography>
          <Typography>Choose how you'd like to pay:</Typography>
          <div className="flex flex-col space-y-4 mt-4">
            <Button
              onClick={() => handlePaymentMethodSelect("online")}
              variant="outlined"
              color="primary"
            >
              Pay Online
            </Button>
            <Button
              onClick={() => handlePaymentMethodSelect("cod")}
              variant="outlined"
              color="neutral"
            >
              Cash on Delivery
            </Button>
          </div>
        </ModalDialog>
      </Modal>

      <AddressModal
        open={addressModalOpen}
        onClose={() => setAddressModalOpen(false)}
        addressType={addressType}
        address={editingAddress}
        onAddressUpdate={handleAddressUpdate}
      />
    </>
  );
};

export default CartCheckout;
