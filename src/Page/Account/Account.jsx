import React, { useContext, useState } from 'react';
import Addresses from './Addresses';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import { AppContext } from '../../App';
import Cookies from 'universal-cookie'
import { useNavigate } from 'react-router-dom';


const cookies = new Cookies();
const Account = () => {
    const [open, setOpen] = React.useState(false);
    const context = useContext(AppContext);
    const navigate = useNavigate();

    const logoutHandler = () => {
        // context.token = null;
        cookies.remove('Access-Token');
        setOpen(false);
        navigate('/');
    }

    return (
        <div className="flex items-center justify-center min-h-screen p-5 bg-gray-100">
            {
                context.user && context.user.map((user, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-lg p-8 w-full max-w-4xl">
                        <div className="flex flex-col items-center gap-8">
                            <div className="flex items-center gap-4">
                                <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center">
                                    <img src="https://via.placeholder.com/150" alt="User" className="rounded-full w-full h-full object-cover" />
                                </div>
                                <div className="text-center">
                                    <h2 className="text-2xl font-poppins font-bold">{user.name}</h2>
                                    <p className="text-gray-500 font-monserrat">{user.email}</p>
                                </div>
                            </div>
                            <div className="grid gap-8 w-full">
                                <div className="bg-gray-100 rounded-lg shadow-lg p-6">
                                    <h3 className="text-lg font-semibold font-monserrat">Personal Details</h3>
                                    <div className="grid grid-cols-2 font-poppins gap-2 text-sm mt-4">
                                        <div className="text-gray-500">Phone:</div>
                                        <div>{user.phone}</div>
                                        <div className="text-gray-500">Address:</div>
                                        <div className="flex items-center gap-2">
                                            <span>{user.address}</span>
                                            <Addresses />
                                        </div>
                                        <div className="text-gray-500">Birthday:</div>
                                        <div>January 1, 1990</div>
                                    </div>
                                </div>
                                <div className='w-full flex justify-center items-center'>
                                    <React.Fragment>
                                        <button className='p-2 w-36 border-blue-300 border-[1px] font-poppins rounded-md ' onClick={() => setOpen(true)}>
                                            Logout
                                        </button>
                                        <Modal keepMounted open={open} >
                                            <ModalDialog sx={{ width: '30%', height: '20%', '@media (max-width:440px)': { height: '17%', width: '65%' }, '@media (max-width:380px)': { height: '22%', width: '70%' } }}>
                                                <div>
                                                    <div className='text-xl font-dm-sans text-black'>
                                                        Are you sure you want to log out?
                                                    </div>
                                                    <div className='flex flex-row justify-end gap-4 mt-3'>

                                                        <button className='text-black bg-slate-200 text-lg font-poppins items-center flex  justify-center p-2 rounded-lg w-24 font-semibold'
                                                            onClick={() => setOpen(false)}>
                                                            Cancel
                                                        </button>
                                                        <button className=' text-white bg-red-600 text-lg font-poppins items-center flex  justify-center p-2 rounded-lg w-24 font-semibold'
                                                            onClick={logoutHandler} >
                                                            Confirm
                                                        </button>
                                                    </div>
                                                </div>
                                            </ModalDialog>
                                        </Modal>
                                    </React.Fragment>
                                </div>

                                <div className="bg-gray-100 rounded-lg shadow-lg p-6">
                                    <h2 className="text-2xl font-bold mb-4 font-outfit">Order History</h2>
                                    <table className="min-w-full divide-y  divide-gray-200">
                                        <thead className='font-monserrat'>
                                            <tr>
                                                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Image</th>
                                                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Order #</th>
                                                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                                                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Items</th>
                                                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Total</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y text-sm font-dm-sans font-semibold divide-gray-200">
                                            <tr>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <img src="/placeholder.svg" alt="Order Item" className="w-16 h-16 rounded-md object-cover" />
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <a href="#" className="text-blue-600 hover:underline">#12345</a>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">June 1, 2023</td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div>Acme Shirt x 2</div>
                                                    <div>Acme Pants x 1</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">$99.99</td>
                                            </tr>
                                            <tr>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <img src="/placeholder.svg" alt="Order Item" className="w-16 h-16 rounded-md object-cover" />
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <a href="#" className="text-blue-600 hover:underline">#12347</a>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">April 30, 2023</td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div>Acme Jacket x 1</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">$79.99</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    );
};

export default Account;
