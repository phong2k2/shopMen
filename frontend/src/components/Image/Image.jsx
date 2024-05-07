import classNames from "classnames";
import { useState } from "react";
import { images } from "@/assets/Images";
import PropTypes from "prop-types";
import styles from "./Image.module.scss";

function Images({
  src,
  alt,
  className,
  fallBack: customFallBack = images.noImage,
  ...props
}) {
  const [fallBack, setFallBack] = useState("");

  const handleError = () => {
    setFallBack(customFallBack);
  };

  return (
    <img
      className={classNames(styles.wrapper, className)}
      alt={alt}
      src={fallBack || src}
      {...props}
      onError={handleError}
    />
  );
}

Images.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  className: PropTypes.string,
  fallBack: PropTypes.string,
};

export default Images;
