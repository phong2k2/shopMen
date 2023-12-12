import classNames from "classnames/bind";
import styles from "./SwiperSlide.module.scss";
import PropTypes from "prop-types";

const cx = classNames.bind(styles);
function SwiperSlide({ children, title }) {
  return (
    <div className={cx("container")}>
      <h2 className={cx("heading-section")}>{title}</h2>
      <div className={cx("product-list")}>{children}</div>
    </div>
  );
}

SwiperSlide.propTypes = {
  title: PropTypes.string,
  allItem: PropTypes.array,
  children: PropTypes.node,
};

export default SwiperSlide;
