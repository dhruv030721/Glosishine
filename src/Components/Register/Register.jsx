import { useState, useEffect } from 'react';
import { SendOTP, verifyOTP, RegisterUser } from "../../Services/Operations/Auth";
import toast from "react-hot-toast";
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [countdown, setCountdown] = useState(30);
    const [isCountdownActive, setIsCountdownActive] = useState(false);
    const navigate = useNavigate();
    const [verification, setVerification] = useState(false);
    const [user, setUser] = useState({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        mobile_number: '',
        otp: '',
    });

    useEffect(() => {
        let timer;
        if (isCountdownActive) {
            timer = setInterval(() => {
                setCountdown((prevCountdown) => {
                    if (prevCountdown <= 1) {
                        clearInterval(timer);
                        setIsCountdownActive(false);
                        return 0;
                    }
                    return prevCountdown - 1;
                });
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [isCountdownActive]);

    const SubmitHandler = async (e) => {
        e.preventDefault();
        try {
            await toast.promise(
                SendOTP(user),
                {
                    loading: "Processing....",
                    success: (response) => {
                        setVerification(true);
                        setCountdown(30);
                        setIsCountdownActive(true);
                        return `${response.data.message}`;
                    },
                    error: (response) => {
                        console.log(response.data.message);
                        return `${response.message}`;
                    }
                }
            );
        } catch (error) {
            console.error("Registration failed:", error);
        }
    };

    const verifyEmailOTP = async () => {
        try {
            await toast.promise(
                verifyOTP(user.otp, user.email),
                {
                    loading: "Processing....",
                    success: (response) => {
                        console.log(response);
                        return `${response.data.message}`;
                    },
                    error: (error) => {
                        throw new Error(`${error.message}`);
                    }
                }
            );

            await toast.promise(
                RegisterUser(user),
                {
                    loading: "Registration Process....",
                    success: (response) => {
                        console.log(response)
                        navigate('/login');
                        return `${response.data.message}`;
                    },
                    error: (error) => {
                        throw new Error(`${error.message}`);
                    }
                }
            );

        } catch (error) {
            console.error("OTP verification or registration failed:", error);
            toast.error("OTP verification or registration failed.");
        }
    };


    return (
        <div className="pl-10 pr-10 pt-10 w-full">
            <div className="flex flex-col w-full items-center justify-center">
                <div className="w-1/3">
                    <div className="mb-8 space-y-3 w-full">
                        <p className="text-4xl font-monserrat font-semibold flex justify-center">Create account</p>
                    </div>
                    <form className="w-full" onSubmit={SubmitHandler}>
                        <div className="mb-10 space-y-3 font-poppins">
                            <div className="space-y-1">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="firstname">Firstname</label>
                                    <input type='text' value={user.firstname} onChange={(e) => { setUser({ ...user, firstname: e.target.value }) }} className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" required id="firstname" placeholder="Enter firstname" name="firstname" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="lastname">Lastname</label>
                                    <input type='text' value={user.lastname} onChange={(e) => { setUser({ ...user, lastname: e.target.value }) }} className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" required id="lastname" placeholder="Enter lastname" name="lastname" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="email">Email</label>
                                    <input type='email' value={user.email} onChange={(e) => { setUser({ ...user, email: e.target.value }) }} className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" required id="email" placeholder="mail@example.com" name="email" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="password">Password</label>
                                    <input type='password' value={user.password} onChange={(e) => { setUser({ ...user, password: e.target.value }) }} className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" required id="password" placeholder="Enter password" name="password" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="mobile_number">Mobile No</label>
                                    <input type='text' value={user.mobile_number} onChange={(e) => setUser({ ...user, mobile_number: e.target.value })} className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" required id="mobile_number" placeholder="Enter mobile no" name="mobile_number" />
                                </div>
                            </div>
                            <button className="ring-offset-background font-monserrat text-lg focus-visible:ring-ring flex h-10 w-full items-center justify-center whitespace-nowrap rounded-md bg-green-900 px-4 py-2 font-medium text-white transition-colors hover:bg-black/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50" type='submit'>Create</button>
                        </div>
                    </form>
                    {verification &&
                        <div className='w-full flex justify-center items-center mb-7'>
                            <div className='w-full'>
                                <h1 className='pt-5 mb-10 flex justify-center text-4xl font-mono'>Verify Email</h1>
                                <div className='w-full flex flex-col gap-5 justify-center items-center'>
                                    <p className='text-lg font-serif'>We have sent an OTP to <span className='font-semibold'>{user.email}</span> for email verification.</p>
                                    <div className="w-full space-y-2">
                                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="otp">OTP</label>
                                        <input type='text' value={user.otp} onChange={(e) => setUser({ ...user, otp: e.target.value })} className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" id="otp" placeholder="Enter otp" name="otp" />
                                    </div>
                                    <div className="flex items-center font-poppins">
                                        <button
                                            disabled={isCountdownActive}
                                            className={`${isCountdownActive
                                                ? "cursor-not-allowed bg-muted text-muted-foreground"
                                                : "bg-primary text-primary-foreground hover:bg-primary/80"
                                                } rounded-md px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2`}
                                            onClick={!isCountdownActive ? SubmitHandler : null}>
                                            {isCountdownActive ? `Resend OTP in ${countdown}s` : "Resend OTP"}
                                        </button>
                                    </div>
                                    <button className='w-1/2 h-10 bg-green-900 font-monserrat text-white rounded-md' onClick={verifyEmailOTP}>Verify Email</button>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
};

export default Register;
