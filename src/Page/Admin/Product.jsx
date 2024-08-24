import React, { useCallback, useContext, useEffect, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import { addProduct, deleteProduct } from "../../Services/Operations/ProductServices.js"
import toast from "react-hot-toast";
import { InputFunc } from '../../Functions/InputFun.jsx';
import { TextArea } from '../../Functions/InputFun.jsx';
import { AppContext } from "../../App.jsx";
import { useId } from 'react';
import EditProduct from './EditProduct.jsx';
import { content } from 'flowbite-react/tailwind';

const Product = () => {

    const Appcontext = useContext(AppContext);



    const deleteProductHandler = useCallback(async (id) => {
        await toast.promise(
            deleteProduct(id),
            {
                loading: "Processing....",
                success: (response) => {
                    Appcontext.setGetdata((product) => product.filter((product) => product.product_id !== id))
                    return `${response.data.message}`
                },
                error: (error) => {
                    // console.log(error.response.data.message)
                    return `${error.respones.data.message}`
                }
            }
        )
    }, [Appcontext.setGetdata]);



    return (
        <div className=" mx-auto px-4  ">
            <div className="flex items-center justify-between mb-6 ">
                <h1 className="text-2xl font-poppins font-bold">Products</h1>
            </div>
            <div className="font-poppins">
                <table className="divide-y divide-gray-200 bg-white shadow-md">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Image
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Product Id
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Name
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Brand
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Mrp
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Size
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Price
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    {
                        Appcontext.getdata.length >= 0 ? Appcontext.getdata.map((product) => (
                            <tbody key={useId} className="divide-y divide-gray-200">
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <img className="text-sm text-gray-900" src={product.images[0]} alt="" />
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">{product.product_id}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="text-sm font-medium text-gray-900">
                                                {product.product_name}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">{product.brand_name}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full ">
                                            {product.regular_price}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {product.size}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {product.sale_price}
                                    </td>
                                    <td className="px-6 py-4 gap-x-1 flex mt-4  whitespace-nowrap text-sm font-medium">
                                        <EditProduct id={product.product_id} />
                                        <button className="ml-2 text-red-600 hover:text-red-900" onClick={() => deleteProductHandler(product.product_id)}>Delete</button>
                                    </td>
                                </tr>
                            </tbody>
                        )) : (
                            <tr>
                                <td colSpan="11" className="py-2 px-4 border text-center">No data found</td>
                            </tr>
                        )}
                </table>
            </div>
        </div>
    );
};

export default Product;
