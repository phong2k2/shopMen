export const pathProcessing = (src) => {
  let endpoint = process.env.VITE_BASE_API_ENDPOINT;

  if (src?.[0] !== "/") {
    endpoint += "/";
  }
  return endpoint + src;
};
