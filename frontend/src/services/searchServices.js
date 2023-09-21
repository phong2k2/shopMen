import * as response from '@/utils/httpRequest'

export const search = async (q, type = 'less', page = 1) => {
  try {
    const res = await response.get('/admin/product/search', {
      params: {
        q,
        type,
        page
      },
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};
