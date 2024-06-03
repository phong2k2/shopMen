import HttpRequest from "@/utils/httpRequest";

// Create product color
export const createColorProduct = async (data) => {
  const res = await HttpRequest.post(`/v1/colors`, data);
  return res?.data;
};

// Get Product color
export const getAllColor = async (id) => {
  try {
    const res = await HttpRequest.get(`/v1/colors?product=${id}`);
    return res?.data?.results;
  } catch (err) {
    console.log(err);
  }
};

export const getColorDetail = async (id) => {
  try {
    const res = await HttpRequest.get(`/v1/colors/${id}`);
    return res?.data;
  } catch (err) {
    console.log(err);
  }
};

// Update Color
export const updateColorProduct = async ({ id, newData }) => {
  const res = await HttpRequest.update(`/v1/colors/${id}`, newData);
  return res?.data;
};

//Delete color
export const deleteColor = async (id) => {
  const res = await HttpRequest.delete(`/v1/colors/${id}`);
  return res;
};

// Image

export const createImageProduct = async (data) => {
  try {
    const res = await HttpRequest.post(`/v1/galleries`, data);
    return res?.data;
  } catch (err) {
    console.log(err);
  }
};

export const getAllImageProduct = async (id) => {
  try {
    const res = await HttpRequest.get(`/v1/galleries?productColor=${id}`);
    return res?.data?.results;
  } catch (err) {
    console.log(err);
  }
};

export const getImageDetails = async (id) => {
  try {
    const res = await HttpRequest.get(`/v1/galleries/${id}`);
    return res?.data;
  } catch (err) {
    console.log(err);
  }
};

export const updateImageProduct = async ({ id, newData }) => {
  try {
    const res = await HttpRequest.update(`/v1/galleries/${id}`, newData);
    return res?.data;
  } catch (err) {
    console.log(err);
  }
};

export const deleteImageProduct = async (id, publicId) => {
  try {
    const res = await HttpRequest.delete(`/v1/galleries/${id}`, {
      params: {
        publicId,
      },
    });
    return res?.data;
  } catch (err) {
    console.log(err);
  }
};
