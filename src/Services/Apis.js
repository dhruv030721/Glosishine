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

export const cartendpoints = {
  ADDCARTPRODUCTS_API: BASE_URL + "cart/add-cart-product.php",
  GETCARTPRODUCTS_API: BASE_URL + "cart/get-cart-products.php",
  DELETECARTPRODUCT_API: BASE_URL + "cart/remove-cart-product.php",
  INCREASEQUANTITY_API: BASE_URL + "cart/increment-cart-product-quantity.php",
  DECREASEQUANTITY_API: BASE_URL + "cart/decrement-cart-product-quantity.php",
};

export const inventoryendpoints = {
  GETINVENTORY_API: BASE_URL + "inventory/get-inventory.php",
  ADDINVENTORY_API: BASE_URL + "inventory/add-inventory.php",
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
