import HttpRequest from "@/utils/httpRequest";

const axiosJWT = new HttpRequest();

export const createOrder = async (dataOrder) => {
  const res = await axiosJWT.post(`/v1/orders`, dataOrder);
  return res?.data;
};

export const getAllOrder = async () => {
  try {
    const res = await axiosJWT.get("/v1/orders");
    return res?.data;
  } catch (err) {
    console.log(err);
  }
};

export const getDetailOrder = async (id) => {
  try {
    const res = await axiosJWT.get("/v1/orders/" + id);
    console.log(res);
    return res;
  } catch (err) {
    console.log(err);
  }
};

export const getAllOrderStatus = async (params) => {
  try {
    const res = await axiosJWT.get(`/v1/orders`, params);
    return res?.data?.results;
  } catch (err) {
    console.log(err);
  }
};

export const getOrderStatistical = async (params) => {
  const res = await axiosJWT.get(`/v1/orders/list/statistical`, params);
  return res?.data;
};

export const updateStatus = async (id, newStatus) => {
  const res = await axiosJWT.post(`/v1/orders/${id}`, {
    status: newStatus,
    _method: "PATCH",
  });
  return res?.data;
};

export const cancerOrder = async (id) => {
  const res = await axiosJWT.post(`/v1/orders/${id}/cancer`);
  return res?.data;
};

export const deleteOrder = async (id) => {
  const res = await axiosJWT.post(`/v1/orders/${id}`);
  return res;
};
