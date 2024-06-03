import HttpRequest from "@/utils/httpRequest";

export const getAllSubCategory = async () => {
  try {
    const res = await HttpRequest.get("/v1/subcategories");
    return res?.data?.results;
  } catch (err) {
    console.log(err);
  }
};

export const getDetailSubCategory = async (id) => {
  try {
    const res = await HttpRequest.get("/v1/subcategories/" + id);
    return res?.data;
  } catch (err) {
    console.log(err);
  }
};

export const getSubCategoryByCategory = async (category) => {
  try {
    const res = await HttpRequest.get(`/v1/subcategories?category=${category}`);
    return res?.data?.results;
  } catch (err) {
    console.log(err);
  }
};

export const createSubCategory = async (formData) => {
  const res = await HttpRequest.post("/v1/subcategories", formData);
  return res?.data;
};

export const updateSubCategory = async (id, newData) => {
  const res = await HttpRequest.update(`/v1/subcategories/${id}`, newData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res?.data;
};

export const deleteSubCategory = async (id, publicId) => {
  const res = await HttpRequest.delete(`/v1/subcategories/${id}`, {
    params: {
      publicId,
    },
  });
  return res;
};
