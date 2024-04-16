import HttpRequest from "@/utils/httpRequest";

const axiosJWT = new HttpRequest();

export const createProductSize = async (data) => {
  try {
    const res = await axiosJWT.post("/v1/sizes", data);
    return res?.data;
  } catch (err) {
    console.log(err);
  }
};

export const getAllProductSizes = async (id) => {
  try {
    const res = await axiosJWT.get(`/v1/sizes?productColor=${id}`);
    return res?.data?.results;
  } catch (err) {
    console.log(err);
  }
};

export const getProductSizeDetail = async (id) => {
  try {
    const res = await axiosJWT.get(`/v1/sizes/${id}`);
    return res?.data;
  } catch (err) {
    console.log(err);
  }
};

export const updateProductSize = async ({ _id, newSize }) => {
  try {
    const res = await axiosJWT.update(`/v1/sizes/${_id}`, newSize);
    return res?.data;
  } catch (err) {
    console.log(err);
  }
};

export const deleteProductSize = async (id) => {
  try {
    const res = await axiosJWT.delete(`/v1/sizes/${id}`);
    return res?.data;
  } catch (err) {
    console.log(err);
  }
};
