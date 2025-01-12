import axios from "axios";
import { Cookies } from "universal-cookie";

const getAuthHeaders = (apiType) => {
  const cookies = new Cookies();
  const headers = {
    "Content-Type": "application/json",
  };

  if (apiType === "user") {
    const token = cookies.get("Access-Token"); // Get user token from cookies
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
  } else if (apiType === "admin") {
    const adminToken = cookies.get("Admin-Access-Token"); // Get admin token from cookies
    if (adminToken) {
      headers["Authorization"] = `Bearer ${adminToken}`;
    }
  }

  return headers;
};

export const axiosInstance = axios.create({
  withCredentials: true, // This is important for sending cookies
});

export const apiConnector = (
  method,
  apiType,
  url,
  bodyData,
  headers,
  params
) => {
  const headersAuth = getAuthHeaders(apiType);
  return axiosInstance({
    method: `${method}`,
    url: `${url}`,
    data: bodyData ? bodyData : null,
    headers: headers ? { ...headers, ...headersAuth } : headersAuth,
    params: params ? params : null,
  });
};
