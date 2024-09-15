const BASE_URL = "/v1/";

export const authendpoints = {
  LOGIN_API: BASE_URL + "auth/login.php",
  REGISTER_API: BASE_URL + "user/signup-user.php",
  SEND_OTP: BASE_URL + "auth/send-otp.php?email=",
  VERIFY_OTP: BASE_URL + "auth/verify-otp.php",
  CONTINUEWITHGOOGLE: BASE_URL + "auth/google-login/google-oauth.php",
  REMOVEPRODUCT_API: BASE_URL + "product/remove-product.php",
  SENDOTP_API: BASE_URL + "auth/send-otp.php",
};

export const userendpoints = {
  GETUSER_API: BASE_URL + "user/get-user.php",
};

export const productendpoints = {
  ADDPRODUCTS_API: BASE_URL + "product/add-product.php",
  GETPRODUCT_API: BASE_URL + "product/get-products.php",
  UPDATEPRODUCT_API: BASE_URL + "product/update-product.php",
  DELETEPRODUCT_API: BASE_URL + "product/delete-product.php/?product_id=",
};

export const favproductendpoints = {
  ADDFAVPRODUCTS_API: BASE_URL + "favorite-products/add-favoriteproduct.php",
  GETFAVPRODUCT_API: BASE_URL + "favorite-products/get-favoriteproduct.php",
  DELETEFAVPRODUCT_API:
    BASE_URL + "favorite-products/remove-favoriteproduct.php",
};

export const adminendpoints = {
  ADMIN_LOGIN: BASE_URL + "auth/admin-login.php",
  ADD_CONTENT_ITEM: BASE_URL + "content-items/add-content-item.php",
  GET_CONTENT_ITEM: BASE_URL + "content-items/get-content-item.php",
  DELETE_CONTENT_ITEM: BASE_URL + "content-items/delete-content-item.php?id=",
};

export const reviewendpoints = {
  ADDREVIEW_API: BASE_URL + "customer-review/add-review.php",
  GETREVIEW_API: BASE_URL + "customer-review/get-review.php?product_id=",
};
