import { apiConnector } from "../Apiconnector";
import { jwtDecode } from "jwt-decode";
import { adminendpoints, authendpoints, userendpoints } from "../Apis";
import { setItem } from "../LocalStorageService";

const {
  CONTINUEWITHGOOGLE,
  REGISTER_API,
  LOGIN_API,
  SEND_OTP,
  VERIFY_OTP,
  FORGOTPASSWORD_API,
  CHANGEPASSWORD_API,
} = authendpoints;
const { ADMIN_LOGIN } = adminendpoints;
const { GETUSER_API } = userendpoints;

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

export async function getUser(email) {
  const headers = {
    "Content-Type": "application/json",
  };

  try {
    const response = await apiConnector(
      "GET",
      `${GETUSER_API}?email=${email}`,
      null,
      headers
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
}

export async function AdminLogin(data) {
  const response = await apiConnector("POST", ADMIN_LOGIN, data);
  if (response.data.token) {
    setItem("adminToken", response.data.token);
    Global.token = response.data.token;
    Global.user = jwtDecode(Global.token);
  }
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

export async function ForgotPassword(email) {
  const response = await apiConnector("GET", FORGOTPASSWORD_API + email);
  return response;
}

export async function ChangePassword(email, password) {
  const response = await apiConnector("POST", CHANGEPASSWORD_API, {
    email,
    password,
  });
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
