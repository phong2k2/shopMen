const parseTimeToSeconds = (time) => {
  const unit = time.slice(-1);
  const value = parseInt(time.slice(0, -1));

  switch (unit) {
    case "d":
      return value * 24 * 60 * 60;
    case "h":
      return value * 60 * 60;
    case "m":
      return value * 60;
    case "s":
      return value;
    default:
      return 0;
  }
};

module.exports = {
  parseTimeToSeconds,
};
