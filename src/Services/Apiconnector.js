import axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();

// Create axios instance
export const axiosInstance = axios.create({
  withCredentials: false,
});

// Function to get auth headers based on API type
const getAuthHeaders = (apiType) => {
  const headers = {
    "Content-Type": "application/json",
  };

  if (apiType === "admin") {
    const adminToken = cookies.get("Admin-Access-Token");
    if (adminToken) {
      headers["Authorization"] = `Bearer ${adminToken}`;
    }
  } else if (apiType === "user") {
    const userToken = cookies.get("Access-Token");
    if (userToken) {
      headers["Authorization"] = `Bearer ${userToken}`;
    }
  }

  return headers;
};

// Main API connector function
export const apiConnector = async (
  method,
  apiType,
  url,
  bodyData = null,
  headers = null,
  params = null
) => {
  try {
    // Get authentication headers based on API type
    const authHeaders = getAuthHeaders(apiType);

    // Merge custom headers with auth headers
    const finalHeaders = {
      ...(headers || {}),
      ...authHeaders,
    };

    console.log("Final Headers:", finalHeaders);

    // Make the API call
    const response = await axiosInstance({
      method,
      url,
      data: bodyData,
      headers: finalHeaders,
      params: params || null,
    });

    return response;
  } catch (error) {
    // Handle specific error cases
    if (error.response?.status === 401) {
      console.error("Authentication failed. Please login again.");
      // You might want to trigger a logout or redirect to login here
    }
    throw error;
  }
};
