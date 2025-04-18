import { apiConnector } from "../Apiconnector";
import { jwtDecode } from "jwt-decode";
import {
  adminendpoints,
  authendpoints,
  orderendpoints,
  userendpoints,
  usermoduleendpoints,
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
  GETORDERS_API,
  GETUSERORDERS_API,
  UPDATEORDERSTATUS_API,
} = orderendpoints;
const { GETALLUSERS_API } = usermoduleendpoints;

export default class Global {
  static token;
  static user;
}

export async function LoginUser(data) {
  const response = await apiConnector("POST", "public", LOGIN_API, data);
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
      "user",
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
  const response = await apiConnector("POST", "public", ADMIN_LOGIN, data);
  if (response.data.token) {
    setItem("adminToken", response.data.token);
    Global.token = response.data.token;
    Global.user = jwtDecode(Global.token);
  }
  return response;
}

export async function RegisterUser(data) {
  const response = await apiConnector("POST", "public", REGISTER_API, data);
  return response;
}

export async function ContinueWithGoogle() {
  const response = await apiConnector("GET", CONTINUEWITHGOOGLE);
  return response;
}

export async function ForgotPassword(email) {
  const response = await apiConnector(
    "GET",
    "public",
    FORGOTPASSWORD_API + email
  );
  return response;
}

export async function ChangePassword(email, password, otp) {
  const response = await apiConnector("POST", "public", CHANGEPASSWORD_API, {
    email,
    password,
    otp,
  });
  return response;
}

export async function SendOTP(user) {
  const response = await apiConnector("GET", "public", SEND_OTP + user.email);
  return response;
}

export async function verifyOTP(otp, email) {
  const response = await apiConnector("POST", "public", VERIFY_OTP, {
    otp,
    email,
  });
  return response;
}

export const UpdateBilling = async (billingData) => {
  try {
    const response = await apiConnector(
      "POST",
      "user",
      UPDATEBILLING_API,
      billingData
    );
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
      "user",
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
  const response = await apiConnector("POST", "user", GETBILLING_API, {
    email,
  });
  return response;
}

export async function GetShipping(email) {
  const response = await apiConnector("POST", "user", GETSHIPPING_API, {
    email,
  });
  return response;
}

export async function AddOrder(orderData) {
  const response = await apiConnector("POST", "user", ADDORDER_API, orderData);
  return response.data;
}

export async function GetOrders() {
  const response = await apiConnector("GET", "admin", GETORDERS_API);
  return response.data;
}

export async function GetUserOrders(email) {
  const response = await apiConnector("POST", "user", GETUSERORDERS_API, {
    email,
  });
  return response;
}

export async function UpdateOrderStatus(orderData) {
  const response = await apiConnector(
    "POST",
    "admin",
    UPDATEORDERSTATUS_API,
    orderData
  );
  return response;
}

export const SaveBilling = async (billingData) => {
  try {
    const response = await apiConnector(
      "POST",
      "admin",
      UPDATEBILLING_API,
      billingData
    );
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
      "admin",
      UPDATESHIPPING_API,
      shippingData
    );
    return response.data;
  } catch (error) {
    console.error("Error saving shipping address:", error);
    throw error;
  }
};

export const GetAllUsers = async () => {
  const response = await apiConnector("GET", "admin", GETALLUSERS_API);
  return response.data;
};
