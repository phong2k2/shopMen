import { useRef } from "react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import Swiper from "@/components/SwiperSlide/Swiper";
import PropTypes from "prop-types";
import classNames from "classnames/bind";
import styles from "./ProductRelated.module.scss";

const cx = classNames.bind(styles);
function ProductRelated({ allItem }) {
  const slideRef = useRef();
  SwiperCore.use([Navigation]);
  const goNext = () => {
    if (slideRef.current) {
      slideRef.current.slideNext();
    }
  };

  const goPrev = () => {
    if (slideRef.current) {
      slideRef.current.slidePrev();
    }
  };

  return (
    <div className={cx("infomation-product")}>
      <h3 className={cx("heading-detail")}>Thường được mua cùng với</h3>
      <Swiper goNext={goNext} goPrev={goPrev} allItem={allItem} />
    </div>
  );
}
ProductRelated.propTypes = {
  allItem: PropTypes.array,
};
export default ProductRelated;
