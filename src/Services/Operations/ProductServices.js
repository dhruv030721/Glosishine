import { apiConnector } from "../Apiconnector";
import {
  favproductendpoints,
  productendpoints,
  reviewendpoints,
} from "../Apis";

export async function addProduct({ productData }) {
  let formData = new FormData();
  // console.log(productData.size)
  const sizestring = productData.size.join();

  // console.log("sizestring", sizestring);

  console.log("price", productData.ragularprize);
  formData.append("product_name", productData.name);
  formData.append("price", parseInt(productData.prize));
  formData.append("size", sizestring);
  formData.append("regular_price", parseInt(productData.regularprize));
  formData.append("sale_price", parseInt(productData.saleprize));
  formData.append("gst", parseInt(productData.gst));
  formData.append("weight_gram", parseInt(productData.weight));
  formData.append("stock", parseInt(productData.stock));
  formData.append("country_origin", productData.countryorigin);
  formData.append("color", productData.color);
  formData.append("fabric", productData.fabric);
  formData.append("fit_shape", productData.fitshape);
  formData.append("neck", productData.nack);
  formData.append("net_quantity", productData.quantity);
  formData.append("occupation", productData.occupation);
  formData.append("patent", productData.patent);
  formData.append("print_of_patent_type", productData.patenttype);
  formData.append("sleeve_length", productData.sleevelength);
  formData.append("chest_size", productData.chestsize);
  formData.append("length_size", productData.lengthsize);
  formData.append("design_name", productData.designname);
  formData.append("sku1", productData.sku1);
  formData.append("sku2", productData.sku2);
  formData.append("brand_name", productData.brandname);
  formData.append("group_id", productData.groupid);
  formData.append("product_description", productData.productdesc);
  // formData.append("headline", productData.headline);
  formData.append("length", productData.length);
  formData.append("number_of_pockets", parseInt(productData.noofpackets));
  formData.append("sleeve_style", productData.sleevestyle);
  formData.append("stretchability", productData.stretchability);
  // formData.append("order_id", productData.orderid);

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

export async function updateProduct(data, id) {
  let formData = new FormData();
  const { productData } = data;
  const sizestring = productData.size.join();

  formData.append("product_id", id);
  formData.append("product_name", productData.name);
  formData.append("price", parseInt(productData.prize));
  formData.append("size", sizestring);
  formData.append("regular_price", parseInt(productData.regularprize));
  formData.append("sale_price", parseInt(productData.saleprize));
  formData.append("gst", parseInt(productData.gst));
  formData.append("weight_gram", parseInt(productData.weight));
  formData.append("stock", parseInt(productData.stock));
  formData.append("country_origin", productData.countryorigin);
  formData.append("color", productData.color);
  formData.append("fabric", productData.fabric);
  formData.append("fit_shape", productData.fitshape);
  formData.append("neck", productData.nack);
  formData.append("net_quantity", productData.quantity);
  formData.append("occupation", productData.occupation);
  formData.append("patent", productData.patent);
  formData.append("print_of_patent_type", productData.patenttype);
  formData.append("sleeve_length", productData.sleevelength);
  formData.append("chest_size", productData.chestsize);
  formData.append("length_size", productData.lengthsize);
  formData.append("design_name", productData.designname);
  formData.append("sku1", productData.sku1);
  formData.append("sku2", productData.sku2);
  formData.append("brand_name", productData.brandname);
  formData.append("group_id", productData.groupid);
  formData.append("product_description", productData.productdesc);
  formData.append("length", productData.length);
  formData.append("number_of_pockets", parseInt(productData.noofpackets));
  formData.append("sleeve_style", productData.sleevestyle);
  formData.append("stretchability", productData.stretchability);

  productData.productphoto.forEach((element) => {
    if (typeof element === "string") {
      formData.append(`existing_images[]`, element);
    } else {
      formData.append(`product_photos[]`, element);
    }
  });

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
export async function getFavProduct() {
  const response = await apiConnector(
    "GET",
    favproductendpoints.GETFAVPRODUCT_API
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
    "DELETE",
    `${favproductendpoints.DELETEFAVPRODUCT_API}?product_id=${product_id}`
  );
  return response;
}
