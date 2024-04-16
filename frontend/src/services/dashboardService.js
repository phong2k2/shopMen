import HttpRequest from "@/utils/httpRequest";

const axiosJWT = new HttpRequest();

export const getAllInformation = async () => {
  try {
    const res = await axiosJWT.get("/v1/dashboard");
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getRevenueChart = async () => {
  try {
    const res = await axiosJWT.get("/v1/dashboard/chart");
    console.log(res);
    return res?.data;
  } catch (error) {
    console.log(error);
  }
};
