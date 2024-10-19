import { apiConnector } from "../Apiconnector";
import {
  favproductendpoints,
  productendpoints,
  reviewendpoints,
  cartendpoints,
  inventoryendpoints,
  discountendpoints,
} from "../Apis";
import Cookies from "js-cookie"; // Make sure to install and import js-cookie

export async function addProduct({ productData }) {
  let formData = new FormData();
  // console.log(productData.size)
  const sizestring = productData.size.join();

  // console.log("sizestring", sizestring);

  console.log("price", productData.ragularprize);
  formData.append("product_name", productData.name);
  formData.append("size", sizestring);
  formData.append("regular_price", parseInt(productData.regularprize));
  formData.append("sale_price", parseInt(productData.saleprize));
  formData.append("gst", parseInt(productData.gst));
  formData.append("weight_gram", parseInt(productData.weight));
  formData.append("country_origin", productData.countryorigin);
  formData.append("color", productData.color);
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
  formData.append("length", productData.length);
  formData.append("number_of_pockets", parseInt(productData.noofpackets));
  formData.append("sleeve_style", productData.sleevestyle);
  formData.append("stretchability", productData.stretchability);
  formData.append("product_id", productData.productid);

  productData.productphoto.forEach((element) => {
    formData.append(`product_photos[]`, element);
  });

  const response = await apiConnector(
    "POST",
    productendpoints.ADDPRODUCTS_API,
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

  formData.append("product_id", id);
  formData.append("product_name", productData.name);
  formData.append("size", productData.size.join(","));
  formData.append("color", productData.color.join(","));
  formData.append("regular_price", productData.regularprize);
  formData.append("sale_price", productData.saleprize);
  formData.append("gst", productData.gst);
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
  formData.append("length", productData.length);
  formData.append("number_of_pockets", productData.noofpocket);
  formData.append("sleeve_style", productData.sleevestyle);
  formData.append("stretchability", productData.stretchability);
  formData.append("discount", productData.discount);

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
    productendpoints.UPDATEPRODUCT_API,
    formData
  );
  return response;
}

export async function deleteProduct(productid) {
  // console.log(productid);
  const response = await apiConnector(
    "GET",
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

// fav product
export async function getFavProduct(email) {
  const headers = {
    "Content-Type": "application/json",
  };
  const body = { email };
  const response = await apiConnector(
    "POST",
    favproductendpoints.GETFAVPRODUCT_API,
    body,
    headers
  );
  return response;
}

export async function addFavProduct({ id, email, product_id }) {
  const requestBody = {
    id,
    email,
    product_id,
  };

  const response = await apiConnector(
    "POST",
    favproductendpoints.ADDFAVPRODUCTS_API,
    JSON.stringify(requestBody),
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return { status: response.status, data: response.data };
}

export async function deleteFavProduct(product_id) {
  const response = await apiConnector(
    "GET",
    `${favproductendpoints.DELETEFAVPRODUCT_API}?id=${product_id}`
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
      cartendpoints.GETCARTPRODUCTS_API,
      { email },
      {
        headers: {
          "Content-Type": "application/json",
          Cookie: `Access-Token=${accessToken}; Admin-Access-Token=${adminAccessToken}`,
        },
      }
    );

    console.log("Full response:", response);

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

export const removeFromCart = async (email, productId) => {
  try {
    const response = await apiConnector(
      "DELETE",
      cartendpoints.DELETECARTPRODUCT_API,
      { email, product_id: productId },
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

export const increaseQuantity = async (email, productId) => {
  try {
    const response = await apiConnector(
      "PATCH",
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

export const updateDiscountStatus = async (couponCode_id, status) => {
  const response = await apiConnector(
    "POST",
    discountendpoints.STATUSUPDATE_API,
    { id: couponCode_id, active: status },
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
