import HttpRequest from "@/utils/httpRequest";

// Get All Category
export const getAllCategory = async () => {
  try {
    const res = await HttpRequest.get("/v1/categories");
    return res?.data;
  } catch (err) {
    console.log(err);
  }
};

// Get An Category

export const getDetailCategoryId = async (id) => {
  try {
    const res = await HttpRequest.get(`/v1/categories/${id}`);
    return res?.data;
  } catch (err) {
    console.log(err);
  }
};

export const getDetailCategory = async (idEdit) => {
  try {
    const res = await HttpRequest.get(`/v1/categories/${idEdit}`);
    return res?.data;
  } catch (err) {
    console.log(err);
  }
};

// get Category Slide Home
export const getCategorySlideHome = async () => {
  try {
    const res = await HttpRequest.get("/v1/categories/slide");
    return res?.data;
  } catch (err) {
    console.log(err);
  }
};

// Add Category
export const createCategory = async (values) => {
  try {
    const res = await HttpRequest.post("/v1/categories", values);
    return res?.data;
  } catch (error) {
    console.log(error);
  }
};

// Get Category Detail  to edit
export const getCategoryDetail = async (id) => {
  try {
    const res = await HttpRequest.get(`/v1/categories/${id}`);
    // console.log(res)
    return res?.data;
  } catch (err) {
    console.log(err);
  }
};

// Update Category
export const updateCategory = async ({ id, newData }) => {
  try {
    const res = await HttpRequest.update(`/v1/categories/${id}`, newData);
    return res?.data;
  } catch (err) {
    console.log(err);
  }
};

//Delete a category
export const deleteCategory = async (id) => {
  const res = await HttpRequest.delete(`/v1/categories/${id}`);
  return res;
};
