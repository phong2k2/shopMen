const getImageThumbnail = (images) => {
  if (!images) {
    return null;
  }

  if (Array.isArray(images) && images[0]) {
    return images[0].image;
  }

  return images;
};

module.exports = {
  getImageThumbnail,
};
