export const pathProcessing = (src) => {
  let endpoint = process.env.IMAGE_BASE_URL;

  if (src?.[0] !== "/") {
    endpoint += "/";
  }
  return endpoint + src;
};
