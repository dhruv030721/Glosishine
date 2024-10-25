import { apiConnector } from "../Apiconnector";
import { jwtDecode } from "jwt-decode";
import {
  adminendpoints,
  authendpoints,
  orderendpoints,
  userendpoints,
} from "../Apis";
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
const {
  UPDATEBILLING_API,
  UPDATESHIPPING_API,
  GETBILLING_API,
  GETSHIPPING_API,
  ADDORDER_API,
} = orderendpoints;

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

export const UpdateBilling = async (billingData) => {
  try {
    const response = await apiConnector("POST", UPDATEBILLING_API, billingData);
    return response.data;
  } catch (error) {
    console.error("Error updating billing address:", error);
    throw error;
  }
};

export const UpdateShipping = async (shippingData) => {
  try {
    const response = await apiConnector(
      "POST",
      UPDATESHIPPING_API,
      shippingData
    );
    return response.data;
  } catch (error) {
    console.error("Error updating shipping address:", error);
    throw error;
  }
};

export async function GetBilling(email) {
  const response = await apiConnector("POST", GETBILLING_API, { email });
  return response;
}

export async function GetShipping(email) {
  const response = await apiConnector("POST", GETSHIPPING_API, { email });
  return response;
}

export async function AddOrder(data) {
  const response = await apiConnector("POST", ADDORDER_API, data);
  return response;
}

export const SaveBilling = async (billingData) => {
  try {
    const response = await apiConnector("POST", UPDATEBILLING_API, billingData);
    return response.data;
  } catch (error) {
    console.error("Error saving billing address:", error);
    throw error;
  }
};

export const SaveShipping = async (shippingData) => {
  try {
    const response = await apiConnector(
      "POST",
      UPDATESHIPPING_API,
      shippingData
    );
    return response.data;
  } catch (error) {
    console.error("Error saving shipping address:", error);
    throw error;
  }
};
