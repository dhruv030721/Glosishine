import Login from "../Login/Login";
import Register from "../Register/Register";
// import { ContinueWithGoogle } from '../../Services/Operations/Auth'

const Template = ({ Formtype }) => {
  // const continuewithgoogleHandler = async () => {
  //     await toast.promise(
  //         ContinueWithGoogle(),
  //         {
  //             loading: "Processing....",
  //             success: (response) => {
  //                 return `${response.message}`
  //             },
  //             error: (error) => {
  //                 return `${error.message}`
  //             }
  //         }
  //     )
  // }
  return (
    <>
      <div>{Formtype === "login" ? <Login /> : <Register />}</div>
      <div className="sm:pb-8 md:pb-10 w-full">
        <div className="flex flex-col w-full items-center justify-center">
          <div className="w-full sm:w-2/3 md:w-1/2 lg:w-1/3">
            {/* <div className="flex w-full items-center gap-2 py-6 font-poppins text-sm text-slate-600">
                            <div className="h-px w-full bg-black"></div>
                            OR
                            <div className="h-px w-full bg-black"></div>
                        </div> */}
            <div className="mt-1 flex flex-col gap-2 font-poppins">
              {/* <button className="inline-flex h-10 w-full items-center justify-center gap-2 rounded border border-slate-300 bg-white p-2 text-sm font-medium text-black outline-none focus:ring-2 focus:ring-[#333] focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-60">
                                <img src="https://www.svgrepo.com/show/512317/github-142.svg" alt="GitHub" className="h-[18px] w-[18px] " />
                                Continue with GitHub
                            </button> */}
              {/* <button className="inline-flex h-10 w-full items-center justify-center gap-2 rounded border border-slate-300 bg-white p-2 text-sm font-medium text-black outline-none focus:ring-2 focus:ring-[#333] focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-60"
                                onClick={continuewithgoogleHandler}>
                                <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="h-[18px] w-[18px] " />Continue with
                                Google
                            </button> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Template;
