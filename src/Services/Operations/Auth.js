import { apiConnector } from "../Apiconnector";
import { jwtDecode } from "jwt-decode";
import { adminendpoints, authendpoints } from "../Apis";

const { CONTINUEWITHGOOGLE, REGISTER_API, LOGIN_API, SEND_OTP, VERIFY_OTP } = authendpoints;
const { ADMIN_LOGIN } = adminendpoints;

export default class Global {
    static token;
    static user;
}


export async function LoginUser(data) {
    const response = await apiConnector("POST", LOGIN_API, data);
    // Global.token = response.data.token;
    // Global.user = jwtDecode(Global.token);
    // console.log("Global.user", Global.user);
    return response;
}

export async function AdminLogin(data) {
    const response = await apiConnector("POST", ADMIN_LOGIN, data);
    return response;
}

export async function RegisterUser(data) {
    const response = await apiConnector("POST", REGISTER_API, data);
    return response;
}

export async function ContinueWithGoogle() {
    const response = await apiConnector("GET", CONTINUEWITHGOOGLE);
    return response;
}

export async function SendOTP(user) {
    const response = await apiConnector("GET", SEND_OTP + user.email);
    return response;
}

export async function verifyOTP(otp, email) {
    const response = await apiConnector("POST", VERIFY_OTP, { otp, email });
    return response;
}


