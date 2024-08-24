import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminLogin } from '../../Services/Operations/Auth';
import toast from 'react-hot-toast';

const Admin = () => {
    const navigate = useNavigate();
    const [adminuser, setAdminuser] = useState({
        email: '',
        password: '',
    });



    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!adminuser.email || !adminuser.password) {
            toast.error("Please fill all the fields");
            return;
        }
        console.log("data is1 ->", adminuser);
        try {
            await toast.promise(
                AdminLogin(adminuser),
                {
                    loading: "Processing....",
                    success: (response) => {
                        navigate('/admin/dashboard');
                        return `${response.data.message}`;
                    },
                    error: (error) => {
                        return `${error.response.data.message}`;
                    }
                }
            );
        } catch (error) {
            console.error("Loggedin failed:", error);
        }
    };



    return (
        <>
            <div className='flex justify-center h-screen w-full bg-slate-200 items-center'>
                <form onSubmit={handleSubmit} className="bg-white block p-4 w-2/6 rounded-lg shadow-lg">
                    <p className="text-lg leading-7 font-semibold text-center font-monserrat text-black">Login-Admin Panel</p>
                    <div className="relative my-2">
                        <input
                            type="email"
                            name='email'
                            value={adminuser.email}
                            onChange={(e) => { setAdminuser({ ...adminuser, email: e.target.value }) }}
                            placeholder="Enter email"
                            className="bg-white p-3 pr-12 font-poppins text-sm leading-5 w-full rounded-lg border border-gray-300 shadow-sm outline-none focus:ring focus:ring-indigo-200"
                        />
                        <span className="absolute inset-y-0 right-0 flex items-center pr-3">
                            {/* Icon can be added here if needed */}
                        </span>
                    </div>
                    <div className="relative my-2">
                        <input
                            type="password"
                            name='password'
                            value={adminuser.password}
                            onChange={(e) => { setAdminuser({ ...adminuser, password: e.target.value }) }}
                            placeholder="Enter password"
                            className="bg-white p-3 font-poppins pr-12 text-sm leading-5 w-full rounded-lg border border-gray-300 shadow-sm outline-none focus:ring focus:ring-indigo-200"
                        />
                    </div>
                    <button to='/forgotpassword' className='w-full p-2 font-monserrat flex justify-end text-black underline'>
                        Forgot your password?
                    </button>
                    <button type='submit' className="cursor-pointer font-poppins group relative flex gap-1.5 p-2 items-center justify-center w-full h-12 bg-black bg-opacity-80 text-[#f1f1f1] rounded-lg hover:bg-opacity-70 transition font-semibold shadow-md">
                        Login Now
                    </button>
                </form>
            </div>
        </>
    );
};

export default Admin;
