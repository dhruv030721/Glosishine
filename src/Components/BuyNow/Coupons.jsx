import React, { useState } from 'react';

const Coupons = () => {



    return (
        <div className="p-4 bg-white mt-4 w-full rounded-md shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Coupons & Offers</h2>
            <div className="flex items-center w-full mb-4 border border-gray-300 rounded-md">
                <input
                    type="text"
                    placeholder="Enter Coupon Code"
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="flex-grow p-3 font-semibold text-gray-700 outline-none text-sm  rounded-l-md "
                />
                <button
                    className="p-3 text-gray-400 underline text-sm font-semibold rounded-r-md">
                    Apply
                </button>
            </div>
            <div className="mb-4">
                <h3 className="text-sm text-gray-400 font-semibold mb-2">Exclusive Coupons</h3>
                <div className="p-4 border border-gray-300 rounded-md shadow-sm">
                    <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center">
                            <span className="mr-2 p-1 text-sm rounded">
                                GET25
                            </span>
                            <span className="text-[12px] font-semibold">Additional 25% OFF.</span>
                        </div>
                        <button
                            className="font-semibold text-sm underline text-emerald-800"
                        >
                            Apply
                        </button>
                    </div>

                    <ul className="mt-2 text-[12px] text-gray-600 list-disc list-inside">
                        <li>Additional 25% OFF.</li>
                        <li>Applies to all customers.</li>
                        <li>Valid on specific products only.</li>
                        <li>Valid on minimum purchase of Rs 2499.</li>
                        <li>Valid on all payment methods.</li>
                    </ul>
                </div>
            </div>
            <div className="mb-4">
                <div className="p-4 border border-gray-300 rounded-md shadow-sm">
                    <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center">
                            <span className="mr-2 p-1 text-sm rounded">
                                GET20
                            </span>
                            <span className="text-[12px] font-semibold">Additional 20% OFF.</span>
                        </div>
                        <button
                            className="font-semibold text-sm underline text-emerald-800"
                        >
                            Apply
                        </button>
                    </div>

                    <ul className="mt-2 text-[12px] text-gray-600 list-disc list-inside">
                        <li>Additional 20% OFF.</li>
                        <li>Applies to all customers.</li>
                        <li>Valid on specific products only.</li>
                        <li>Valid on minimum purchase of Rs 1999.</li>
                        <li>Valid on all payment methods.</li>
                    </ul>
                </div>
            </div>
            <div className="mb-4">
                <div className="p-4 border border-gray-300 rounded-md shadow-sm">
                    <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center">
                            <span className="mr-2 p-1 text-sm rounded">
                                GET10
                            </span>
                            <span className="text-[12px] font-semibold">Additional 20% OFF.</span>
                        </div>
                        <button
                            className="font-semibold text-sm underline text-emerald-800"
                        >
                            Apply
                        </button>
                    </div>

                    <ul className="mt-2 text-[12px] text-gray-600 list-disc list-inside">
                        <li>Additional 10% OFF.</li>
                        <li>Applies to all customers.</li>
                        <li>Valid on specific products only.</li>
                        <li>Valid on minimum purchase of Rs 999.</li>
                        <li>Valid on all payment methods.</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Coupons;