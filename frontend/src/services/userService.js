import HttpRequest from "@/utils/httpRequest";

const axiosJWT = new HttpRequest();

export const getAllUsers = async () => {
  try {
    const res = await axiosJWT.get("/v1/users");
    return res?.data;
  } catch (err) {
    console.error(err);
  }
};

export const getMe = async () => {
  try {
    const res = await axiosJWT.get("/v1/users/me");
    return res;
  } catch (error) {
    throw error;
  }
};

export const getDetailUser = async (id) => {
  try {
    const res = await axiosJWT.get(`/v1/users/${id}`);
    return res?.data;
  } catch (err) {
    console.log(err);
  }
};

export const updateUser = async (formData, id) => {
  const res = await axiosJWT.update(`/v1/users/${id}`, formData);
  return res?.data;
};

export const deleteUser = async (id) => {
  const res = await axiosJWT.delete("/v1/users/" + id);
  return res;
};
