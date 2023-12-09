import classNames from "classnames/bind";
import styles from "./SwiperSlide.module.scss";
import PropTypes from "prop-types";

const cx = classNames.bind(styles);
function SwiperSlide({ children, title }) {
  return (
    <section className={cx("categoryHot")}>
      <div className={cx("content-full")}>
        <h2 className={cx("headingSection")}>{title}</h2>
        <div className={cx("product-list")}>{children}</div>
      </div>
    </section>
  );
}

SwiperSlide.propTypes = {
  title: PropTypes.string,
  allItem: PropTypes.array,
  children: PropTypes.node,
};

export default SwiperSlide;
