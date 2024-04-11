const { env } = require("../configs/environment");

const getImageThumbnail = (images) => {
  const baseUrl = env.APP_URL;
  if (!images) {
    return null;
  }

  if (Array.isArray(images) && images[0]) {
    return `${baseUrl}/${images[0].image}`;
  }

  return `${baseUrl}/${images}`;
};

module.exports = {
  getImageThumbnail,
};
