import HttpRequest from "@/utils/httpRequest";

const axiosJWT = new HttpRequest();

export const search = async (q, type = 'less', page = 1) => {
  const res = await axiosJWT.get('/products/search', {
    params: {
      q,
      type,
      page
    },
  });
  return res
};
