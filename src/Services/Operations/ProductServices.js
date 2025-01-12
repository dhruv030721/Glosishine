/* eslint-disable no-unused-vars */
import { apiConnector } from "../Apiconnector";
import {
  favproductendpoints,
  productendpoints,
  reviewendpoints,
  cartendpoints,
  inventoryendpoints,
  discountendpoints,
  RAZORPAY_API,
  dashboardendpoints,
} from "../Apis";
import Cookies from "js-cookie"; // Make sure to install and import js-cookie

// Product Services
export async function addProduct({ productData }) {
  let formData = new FormData();
  const sizestring = productData.size.join();

  formData.append("product_name", productData.name);
  formData.append("size", sizestring);
  formData.append("regular_price", parseInt(productData.regularprize));
  formData.append("sale_price", parseInt(productData.saleprize));
  formData.append("weight_gram", parseInt(productData.weight));
  formData.append("country_origin", productData.countryorigin);
  formData.append("fabric", productData.fabric);
  formData.append("fit_shape", productData.fitshape);
  formData.append("neck", productData.nack);
  formData.append("occupation", productData.occupation);
  formData.append("patent", productData.patent);
  formData.append("print_of_patent_type", productData.patenttype);
  formData.append("sleeve_length", productData.sleevelength);
  formData.append("chest_size", productData.chestsize);
  formData.append("length_size", productData.lengthsize);
  formData.append("design_name", productData.designname);
  formData.append("sku", productData.sku);
  formData.append("brand_name", productData.brandname);
  formData.append("product_description", productData.productdesc);
  formData.append("number_of_pockets", parseInt(productData.noofpackets));
  formData.append("sleeve_style", productData.sleevestyle);
  formData.append("stretchability", productData.stretchability);
  formData.append("category", productData.category);
  formData.append("subcategory", productData.subcategory);

  productData.productphoto.forEach((element) => {
    formData.append(`product_photos[]`, element);
  });

  const response = await apiConnector(
    "POST",
    productendpoints.ADDPRODUCTS_API,
    "admin",
    formData
  );
  return response;
}

export async function getProduct() {
  const response = await apiConnector("GET", productendpoints.GETPRODUCT_API);
  return response;
}

export async function updateProduct(data) {
  let formData = new FormData();
  const { productData, id } = data;

  // Keep product_id in updateProduct
  formData.append("product_id", id);
  formData.append("product_name", productData.name);
  formData.append("size", productData.size.join(","));
  formData.append("regular_price", productData.regularprize);
  formData.append("sale_price", productData.saleprize);
  formData.append("weight_gram", productData.weight);
  formData.append("country_origin", productData.countryorigin);
  formData.append("fabric", productData.fabric);
  formData.append("fit_shape", productData.fitshape);
  formData.append("neck", productData.nack);
  formData.append("occupation", productData.occupation);
  formData.append("patent", productData.patent);
  formData.append("print_of_patent_type", productData.patenttype);
  formData.append("sleeve_length", productData.sleevelength);
  formData.append("chest_size", productData.chestsize);
  formData.append("length_size", productData.lengthsize);
  formData.append("design_name", productData.designname);
  formData.append("sku", productData.sku);
  formData.append("brand_name", productData.brandname);
  formData.append("product_description", productData.productdesc);
  formData.append("number_of_pockets", productData.noofpocket);
  formData.append("sleeve_style", productData.sleevestyle);
  formData.append("stretchability", productData.stretchability);
  formData.append("category", productData.category);
  formData.append("subcategory", productData.subcategory);

  // Handle product photos
  if (productData.productphoto && productData.productphoto.length > 0) {
    productData.productphoto.forEach((element, index) => {
      if (typeof element === "string") {
        formData.append(`existing_images[${index}]`, element);
      } else {
        formData.append(`product_photos[${index}]`, element);
      }
    });
  }

  const response = await apiConnector(
    "POST",
    "admin",
    productendpoints.UPDATEPRODUCT_API,
    formData
  );
  return response;
}

export async function deleteProduct(productid) {
  // console.log(productid);
  const response = await apiConnector(
    "GET",
    "admin",
    productendpoints.DELETEPRODUCT_API + productid
  );
  return response;
}

export async function addReview(data, id, rating) {
  // console.log(data);
  const formdata = new FormData();
  const { productData } = data;
  formdata.append("product_id", id);
  formdata.append("name", productData.name);
  formdata.append("title", productData.title);
  formdata.append("review", productData.review);
  formdata.append("rating", rating);

  productData.reviewimage.forEach((element) => {
    formdata.append(`review_images[]`, element);
  });
  const response = await apiConnector(
    "POST",
    "user",
    reviewendpoints.ADDREVIEW_API,
    formdata
  );
  return response;
}

export async function getReview(id) {
  const response = await apiConnector(
    "GET",
    reviewendpoints.GETREVIEW_API + id
  );
  return response;
}

export async function getNewDropProduct() {
  try {
    const response = await apiConnector(
      "GET",
      productendpoints.GETNEWDROPPRODUCT_API
    );
    return response;
  } catch (error) {
    console.error("Error fetching new drop products:", error);
    // Return empty data instead of throwing error
    return { data: { data: [] } };
  }
}

export async function updateNewDropStatus(id, status) {
  const response = await apiConnector(
    "POST",
    "admin",
    productendpoints.NEWDROPSTATUS_API,
    { product_id: id, status }
  );
  return response;
}

// fav product
export const getFavProduct = async (email) => {
  try {
    const response = await apiConnector(
      "POST",
      "user",
      favproductendpoints.GETFAVPRODUCT_API,
      { email }
    );
    return response;
  } catch (error) {
    if (error.response?.status === 404) {
      // Return empty data instead of throwing error for 404
      return { data: { data: [] } };
    }
    throw error;
  }
};

export const addFavProduct = async (email, product_id) => {
  try {
    const requestBody = {
      email,
      product_id,
    };

    const response = await apiConnector(
      "POST",
      "user",
      favproductendpoints.ADDFAVPRODUCTS_API,
      JSON.stringify(requestBody),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    // Check for error responses that might come in different formats
    console.log(response, "fetching");
    if (response?.data?.success) {
      console.log(response.data, "success");
      return response.data;
    } else if (
      response?.data?.error ||
      response?.data?.includes("Fatal error") ||
      response?.data?.includes("Out of range value")
    ) {
      throw new Error("Failed to add product to watchlist");
    }
  } catch (error) {
    console.error("AddFavProduct Error:", error);
    // Properly format and throw the error
    throw new Error(
      error.response?.data?.message ||
        error.message ||
        "Failed to add product to watchlist"
    );
  }
};

export async function deleteFavProduct(product_id, email) {
  const response = await apiConnector(
    "DELETE",
    "user",
    favproductendpoints.DELETEFAVPRODUCT_API,
    { email, product_id }
  );
  return response;
}

//Cart Products
export const getCartProduct = async (email) => {
  try {
    const accessToken = Cookies.get("Access-Token");
    const adminAccessToken = Cookies.get("Admin-Access-Token");

    const response = await apiConnector(
      "POST",
      "user",
      cartendpoints.GETCARTPRODUCTS_API,
      { email },
      {
        headers: {
          "Content-Type": "application/json",
          Cookie: `Access-Token=${accessToken}; Admin-Access-Token=${adminAccessToken}`,
        },
      }
    );

    if (response.headers["content-type"].includes("application/json")) {
      return response.data;
    } else {
      console.error("Received non-JSON response. Content:", response.data);
      throw new Error("Received non-JSON response");
    }
  } catch (error) {
    console.error("Error getting product from cart:", error);
    throw error;
  }
};

export const addToCart = async (productData) => {
  try {
    const headers = {
      "Content-Type": "application/json",
    };
    const response = await apiConnector(
      "POST",
      "user",
      cartendpoints.ADDCARTPRODUCTS_API,
      productData,
      headers
    );
    return response.data; // Return the data directly
  } catch (error) {
    console.error("Error adding product to cart:", error);
    throw error;
  }
};

export const removeFromCart = async (email, productId, size) => {
  try {
    const response = await apiConnector(
      "DELETE",
      "user",
      cartendpoints.DELETECARTPRODUCT_API,
      { email, product_id: productId, size: size },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Error removing product from cart:", error);
    throw error;
  }
};

export const clearAllCart = async (email) => {
  try {
    const response = await apiConnector(
      "DELETE",
      "user",
      cartendpoints.CLEARCART_API,
      {
        email: email,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error clearing cart:", error);
    throw error;
  }
};

export const increaseQuantity = async (email, productId) => {
  try {
    const response = await apiConnector(
      "PATCH",
      "user",
      cartendpoints.INCREASEQUANTITY_API,
      { email, product_id: productId },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error increasing product quantity:", error);
    throw error;
  }
};

export const decreaseQuantity = async (email, productId) => {
  try {
    const response = await apiConnector(
      "PATCH",
      "user",
      cartendpoints.DECREASEQUANTITY_API,
      { email, product_id: productId },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error decreasing product quantity:", error);
    throw error;
  }
};

//Inventory
export const getInventory = async () => {
  const response = await apiConnector(
    "GET",
    "public",
    inventoryendpoints.GETINVENTORY_API,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

export const addInventory = async (inventoryData) => {
  const response = await apiConnector(
    "POST",
    "admin",
    inventoryendpoints.ADDINVENTORY_API,
    inventoryData,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

//discount
export const getDiscount = async (couponCode) => {
  const response = await apiConnector(
    "GET",
    discountendpoints.GETDISCOUNT_API + `?coupon_code=${couponCode}`
  );
  return response.data;
};

export const getAllDiscounts = async () => {
  const response = await apiConnector(
    "GET",
    discountendpoints.GETALLDISCOUNTS_API
  );
  return response.data;
};

export const updateDiscount = async (formData) => {
  const response = await apiConnector(
    "PATCH",
    "admin",
    discountendpoints.UPDATEDISCOUNT_API,
    formData,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

export const updateDiscountStatus = async (formData) => {
  const response = await apiConnector(
    "POST",
    "admin",
    discountendpoints.STATUSUPDATE_API,
    formData,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

export const addDiscount = async (discountData) => {
  const response = await apiConnector(
    "POST",
    "admin",
    discountendpoints.ADDDISCOUNT_API,
    discountData,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

export const deleteDiscount = async (couponCode_id) => {
  const response = await apiConnector(
    "DELETE",
    "admin",
    discountendpoints.DELETEDISCOUNT_API,
    { id: couponCode_id },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

//payments
export const createRazorpayOrder = async (amount) => {
  try {
    const response = await apiConnector(
      "POST",
      "user",
      RAZORPAY_API.CREATE_ORDER,
      {
        amount,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    throw error;
  }
};

export const verifyRazorpayPayment = async (paymentData) => {
  try {
    const response = await apiConnector(
      "POST",
      "user",
      RAZORPAY_API.VERIFY_PAYMENT,
      paymentData
    );
    return response.data;
  } catch (error) {
    console.error("Error verifying Razorpay payment:", error);
    throw error;
  }
};

//dashboard
export const getDashboardData = async () => {
  const response = await apiConnector(
    "GET",
    "admin",
    dashboardendpoints.GETDASHBOARD_API
  );
  return response.data;
};
