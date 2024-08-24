import React, { useContext, useState } from 'react'
import { LuHome, LuLogOut } from "react-icons/lu";
import { IoBagHandle } from "react-icons/io5";
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import { FaTruck } from "react-icons/fa6";
import Product from './Product';
import Orders from './Orders';
import SetItems from './SetItems';
import AddProduct from './AddProduct';
import { AppContext } from '../../App';
import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router-dom';


const cookies = new Cookies();

const Dashboard = () => {
    const appcontext = useContext(AppContext);
    const [selectedContent, setSelectedContent] = useState('addproduct');
    const [open, setOpen] = React.useState(false);
    const navigate = useNavigate();


    const handleItemClick = (content) => {
        setSelectedContent(content);
    };

    const handleLogout = () => {
        cookies.remove('Admin-Access-Token');
        navigate('/admin');
    };





    return (
        <div className="flex h-screen w-full bg-white">
            <div className="flex flex-col w-[23%] bg-green-800 border-r dark:bg-gray-800 dark:border-gray-600">
                <div className="flex flex-col h-screen">
                    <div className="flex items-center justify-center h-14 border-b dark:border-gray-600">
                        <span className="text-xl font-dm-sans font-bold text-white dark:text-white">Glosishine Admin</span>
                    </div>
                    <div className="flex flex-col font-poppins flex-1 overflow-y-auto mt-2 gap-y-3">
                        <button
                            className={`flex items-center px-6 ml-2 mr-2 rounded-md py-2 text-lg text-white`}
                            onClick={() => handleItemClick('addproduct')} >
                            <LuHome className="w-6 h-6 mr-2" />
                            Add Product
                        </button>
                        <button
                            className={`flex items-center px-6 py-2 ml-2 mr-2 rounded-md text-lg text-white `}
                            onClick={() => handleItemClick('products')} >
                            <IoBagHandle className="w-6 h-6 mr-2" />
                            View Products
                        </button>
                        <button
                            className={`flex items-center px-6 py-2 ml-2 mr-2 rounded-md text-lg text-white `}
                            onClick={() => handleItemClick('orders')} >
                            <FaTruck className="w-6 h-6 mr-2" />
                            Orders
                        </button>
                        <button
                            className={`flex items-center px-6 py-2 ml-2 mr-2 rounded-md text-lg text-white`}
                            onClick={() => handleItemClick('setitems')} >
                            <IoBagHandle className="w-6 h-6 mr-2" />
                            Home page UI
                        </button>
                    </div>
                    <React.Fragment>
                        <button className="flex items-center font-poppins text-white mb-5 px-6 ml-2 mr-2 rounded-md py-2 text-lg" onClick={() => setOpen(true)}>
                            <LuLogOut className="w-6 h-6 mr-2" />
                            Logout
                        </button>

                        <Modal keepMounted open={open} >
                            <ModalDialog sx={{ width: '30%', height: '20%', '@media (max-width:440px)': { height: '17%', width: '65%' }, '@media (max-width:380px)': { height: '22%', width: '70%' } }}>
                                <div>
                                    <div className='text-xl font-Jost text-black'>
                                        Are you sure you want to log out?
                                    </div>
                                    <div className='flex flex-row justify-end gap-4 mt-3'>

                                        <button className='text-black bg-slate-200 text-lg font-Outfit items-center flex  justify-center p-2 rounded-lg w-24 font-semibold'
                                            onClick={() => setOpen(false)}>
                                            Cancel
                                        </button>
                                        <button onClick={handleLogout} className=' text-white bg-red-600 text-lg font-Outfit items-center flex  justify-center p-2 rounded-lg w-24 font-semibold'>
                                            Confirm
                                        </button>
                                    </div>
                                </div>
                            </ModalDialog>
                        </Modal>
                    </React.Fragment>
                </div>
            </div>

            <div className="flex flex-col w-[76%]  flex-1 overflow-y-scroll">
                <div className="p-6 w-full">
                    {selectedContent === 'addproduct' && <AddProduct />}
                    {selectedContent === 'products' && <Product />}
                    {selectedContent === 'orders' && <Orders />}
                    {selectedContent === 'setitems' && <SetItems />}
                </div>
            </div>
        </div>
    )
}

export default Dashboard
