const BASE_URL = "/v1/";

export const authendpoints = {
  LOGIN_API: BASE_URL + "auth/login.php",
  REGISTER_API: BASE_URL + "user/signup-user.php",
  FORGOTPASSWORD_API: BASE_URL + "auth/forgot-password.php?email=",
  CHANGEPASSWORD_API: BASE_URL + "auth/change-password.php",
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
  GETNEWDROPPRODUCT_API: BASE_URL + "product/get-new-drops-products.php",
  UPDATEPRODUCT_API: BASE_URL + "product/update-product.php",
  DELETEPRODUCT_API: BASE_URL + "product/delete-product.php/?product_id=",
  NEWDROPSTATUS_API: BASE_URL + "product/change-product-new-drops-status.php",
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
  CLEARCART_API: BASE_URL + "cart/clear-cart.php",
};

export const inventoryendpoints = {
  GETINVENTORY_API: BASE_URL + "inventory/get-inventory.php",
  ADDINVENTORY_API: BASE_URL + "inventory/add-inventory.php",
};

export const discountendpoints = {
  ADDDISCOUNT_API: BASE_URL + "discount/create-discount.php",
  GETDISCOUNT_API: BASE_URL + "discount/get-discount.php",
  GETALLDISCOUNTS_API: BASE_URL + "discount/get-discounts.php",
  UPDATEDISCOUNT_API: BASE_URL + "discount/update-discount.php",
  DELETEDISCOUNT_API: BASE_URL + "discount/remove-discount.php",
  STATUSUPDATE_API: BASE_URL + "/discount/change-discount-status.php",
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

export const RAZORPAY_API = {
  CREATE_ORDER: BASE_URL + "payment/index.php",
  VERIFY_PAYMENT: BASE_URL + "payment/verify-payment.php",
};

export const orderendpoints = {
  ADDORDER_API: BASE_URL + "order/add-order.php",
  GETORDERS_API: BASE_URL + "order/get-order.php",
  GETUSERORDERS_API: BASE_URL + "order/get-user-orders.php",
  UPDATEBILLING_API: BASE_URL + "order/save_billing_details.php",
  UPDATESHIPPING_API: BASE_URL + "order/save_shipping_details.php",
  GETBILLING_API: BASE_URL + "order/get_billing_details.php",
  GETSHIPPING_API: BASE_URL + "order/get_shipping_details.php",
  UPDATEORDERSTATUS_API: BASE_URL + "order/update-order-status.php",
};

export const usermoduleendpoints = {
  GETALLUSERS_API: BASE_URL + "user_module/get-users.php",
};

export const dashboardendpoints = {
  GETDASHBOARD_API: BASE_URL + "dashboard/dashboard.php",
};
