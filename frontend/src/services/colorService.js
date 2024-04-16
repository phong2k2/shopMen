import HttpRequest from "@/utils/httpRequest";

const axiosJWT = new HttpRequest();

// Create product color
export const createColorProduct = async (data) => {
  const res = await axiosJWT.post(`/v1/colors`, data);
  return res?.data;
};

// Get Product color
export const getAllColor = async (id) => {
  try {
    const res = await axiosJWT.get(`/v1/colors?product=${id}`);
    return res?.data?.results;
  } catch (err) {
    console.log(err);
  }
};

export const getColorDetail = async (id) => {
  try {
    const res = await axiosJWT.get(`/v1/colors/${id}`);
    return res?.data;
  } catch (err) {
    console.log(err);
  }
};

// Update Color
export const updateColorProduct = async ({ id, newData }) => {
  const res = await axiosJWT.update(`/v1/colors/${id}`, newData);
  return res?.data;
};

//Delete color
export const deleteColor = async (id) => {
  const res = await axiosJWT.delete(`/v1/colors/${id}`);
  return res;
};

// Image

export const createImageProduct = async (data) => {
  try {
    const res = await axiosJWT.post(`/galleries`, data);
    return res?.data;
  } catch (err) {
    console.log(err);
  }
};

export const getAllImageProduct = async (id) => {
  try {
    const res = await axiosJWT.get(`/galleries?productColor=${id}`);
    return res?.data?.results;
  } catch (err) {
    console.log(err);
  }
};

export const getImageDetails = async (id) => {
  try {
    const res = await axiosJWT.get(`/galleries/${id}`);
    return res?.data;
  } catch (err) {
    console.log(err);
  }
};

export const updateImageProduct = async ({ id, newData }) => {
  try {
    const res = await axiosJWT.update(`/galleries/${id}`, newData);
    return res?.data;
  } catch (err) {
    console.log(err);
  }
};

export const deleteImageProduct = async (id, publicId) => {
  try {
    const res = await axiosJWT.delete(`/galleries/${id}`, {
      params: {
        publicId,
      },
    });
    return res?.data;
  } catch (err) {
    console.log(err);
  }
};
