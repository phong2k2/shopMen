import classNames from "classnames/bind";
import styles from "./SwiperSlide.module.scss";
import PropTypes from "prop-types";
import Swiper from "./Swiper";

const cx = classNames.bind(styles);
function SwiperSlide(props) {
  const { title, allItem, name, handleClickNavigate } = props;
  return (
    <section className={cx("categoryHot")}>
      <div className={cx("content-full")}>
        <h2 className={cx("headingSection")}>{title}</h2>
        <div className={cx("product-list")}>
          <Swiper
            allItem={allItem}
            name={name}
            handleClickNavigate={handleClickNavigate}
          />
        </div>
      </div>
    </section>
  );
}

SwiperSlide.propTypes = {
  title: PropTypes.string,
  allItem: PropTypes.array,
  handleClickNavigate: PropTypes.func,
  name: PropTypes.string,
};

export default SwiperSlide;
