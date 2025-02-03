import { apiConnector } from "../Apiconnector";
import { adminendpoints } from "../Apis";

export async function setContentItem(array, type, section_id) {
  let formData = new FormData();

  formData.append("section_id", section_id);
  formData.append("type", type);

  array.forEach((item) => {
    // console.log(item);
    if (item.file !== null) {
      formData.append(`content_file[${item.id}]`, item.file);
    }
  });

  const response = await apiConnector(
    "POST",
    "admin",
    adminendpoints.ADD_CONTENT_ITEM,
    formData
  );
  return response;
}

export async function getContentItem() {
  const response = await apiConnector(
    "GET",
    "public",
    adminendpoints.GET_CONTENT_ITEM
  );

  return response.data.data;
}

export async function deleteContentItem(id) {
  const response = await apiConnector(
    "GET",
    "admin",
    adminendpoints.DELETE_CONTENT_ITEM + id
  );
  return response;
}
