
const ForgotPassword = () => {
    return (
        <div className="max-w-full sm:max-w-md  md:max-w-md lg:max-w-md  mx-auto bg-white p-4 m-4 sm:p-6 md:p-8 lg:p-10 rounded-lg shadow-md">
            <div className="text-center font-semibold font-poppins text-lg mb-4">Forgot Password</div>
            <form className="flex flex-col">
                <div className="flex font-monserrat flex-col mb-2">
                    <label htmlFor="email" className="mb-1">Email</label>
                    <input
                        type="text"
                        id="email"
                        name="email"
                        placeholder="Enter your email"
                        required
                        className="w-full px-4 py-3 rounded-md border border-gray-300 focus:border-blue-500"
                    />
                </div>
                <button
                    type="submit"
                    className="flex font-poppins justify-center items-center bg-gray-800 text-white border-none w-full py-3 px-4 text-base rounded-md shadow-md mt-3 hover:bg-gray-900">
                    Send Email
                </button>
            </form>
            {/* <p className="text-center text-md font-monserrat mt-4">
                Don't have an account? <Link to='/signup' className="text-blue-500 text-md">Sign up now</Link>
            </p> */}
        </div>
    );
};

export default ForgotPassword;
