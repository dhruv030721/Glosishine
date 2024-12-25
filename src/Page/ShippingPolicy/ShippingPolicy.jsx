import React from "react";

const ShippingPolicy = () => {
  return (
    <div className="w-full flex justify-center">
      <div className="w-[60%]">
        <h1 className="mt-5 text-5xl font-semibold mb-10">Shipping Policy</h1>
        <p className="text-lg font-signika mb-5 font-semibold">
          DOMESTIC SHIPPING POLICY
        </p>
        <p className="text-lg font-signika mb-5  font-semibold">
          SHIPMENT PROCESSING TIME
        </p>
        <div className="ml-10 mt-7">
          <p>
            &#x2022;
            <span className="ml-2">
              All Orders Are Processed Within 2-3 Business Days. Orders Are Not
              Shipped On Sundays and Indian Holidays.
            </span>{" "}
          </p>
          <p>
            &#x2022;
            <span className="ml-2">
              If We Are Experiencing a High Volume Of Orders, Shipments May Be
              Delayed By a Few Days. Please Allow Additional Days In Transit For
              Delivery. If There Be a Significant Delay In the Shipment Of Your
              Order, We Will Contact You Via Email Or Telephone.
            </span>
          </p>
        </div>
        <p className="text-lg font-signika mt-5 font-semibold">
          SHIPPING RATES & DELIVERY ESTIMATES
        </p>
        <div className="ml-10 mt-7">
          <p>
            &#x2022;
            <span className="ml-2">
              Shipping All Over The Republic Of India Will Be Free Of Cost.
              Delivery Delays Can Occasionally Occur.
            </span>{" "}
          </p>
        </div>
        <p className="text-lg font-signika mt-5 font-semibold">
          SHIPMENT TO P.O. BOXES OR APO/FPO ADDRESSES
        </p>
        <div className="ml-10 mt-7">
          <p>
            &#x2022;
            <span className="ml-2">
              Finch Does Not Ship To APO/FPO/DPO Addresses.
            </span>{" "}
          </p>
        </div>
        <p className="text-lg font-signika  mt-5 font-semibold">
          SHIPMENT CONFIRMATION AND ORDER TRACKING
        </p>
        <div className="ml-10 mt-7">
          <p>
            &#x2022;
            <span className="ml-2">
              You Will Receive a Shipment Confirmation Email Once Your Order Has
              Shipped Containing Your Tracking Number(S). The Tracking Number
              Will Be Active Within 24 Hours.
            </span>{" "}
          </p>
        </div>
        <p className="text-lg font-signika  mt-5 font-semibold">DAMAGES</p>
        <div className="ml-10 mt-7">
          <p>
            &#x2022;
            <span className="ml-2">
              Finch is Not Liable For Any Products Damaged Or Lost During
              Shipping. If You Received Your Order Damaged, Please Contact The
              Shipment Carrier To File a Claim.
            </span>{" "}
          </p>
          <p>
            &#x2022;
            <span className="ml-2">
              Please Save All Packaging Materials And Damaged Goods Before
              Filing a Claim.
            </span>{" "}
          </p>
        </div>
        <p className="text-lg font-signika mb-5 mt-5 font-semibold">
          INTERNATIONAL SHIPPING POLICY
        </p>
        <div className="ml-10 mt-7 mb-5">
          <p>
            &#x2022;
            <span className="ml-2">
              We Currently Do Not Ship Outside India.
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ShippingPolicy;
