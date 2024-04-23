import HttpRequest from "@/utils/httpRequest";

const axiosJWT = new HttpRequest();

// Get All Address
export const getAllAddress = async (params) => {
  try {
    const res = await axiosJWT.get(`/v1/addresses`, params);
    return res?.data?.results;
  } catch (err) {
    console.log(err);
  }
};

// Get An Address
export const getAddressDetail = async (addressId) => {
  try {
    const res = await axiosJWT.get(`/v1/addresses/${addressId}`);
    return res?.data;
  } catch (err) {
    console.log(err);
  }
};

// Add Address
export const createAddress = async (myAddress) => {
  console.log(myAddress);
  try {
    const res = await axiosJWT.post(`/v1/addresses`, myAddress);
    return res?.data;
  } catch (error) {
    console.log(error);
  }
};

// Update Address
export const updateAddress = async (addressId, newAddress) => {
  try {
    const res = await axiosJWT.update(`/v1/addresses/${addressId}`, newAddress);
    return res?.data;
  } catch (err) {
    console.log(err);
  }
};

// Update Status Address
export const updateStatusAddress = async (addressId, status) => {
  try {
    const res = await axiosJWT.post(`/v1/addresses/${addressId}/status`, {
      status,
    });
    return res?.data;
  } catch (err) {
    console.log(err);
  }
};

//Delete A Address
export const deleteAddress = async (addressId) => {
  try {
    const res = await axiosJWT.delete(`/v1/addresses/${addressId}`);
    return res;
  } catch (err) {
    console.log(err);
  }
};

// Get Address For Order
export const getAddressForOrder = async (params) => {
  try {
    const res = await axiosJWT.get(`/v1/addresses`, params);
    return res?.data?.results[0];
  } catch (err) {
    console.log(err);
  }
};
