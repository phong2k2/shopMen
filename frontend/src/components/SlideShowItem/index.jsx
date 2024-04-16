import PropTypes from "prop-types";
import {
  Swiper as SwiperContainer,
  SwiperSlide as OriginalSwiperSlide,
} from "swiper/react";
import { Link } from "react-router-dom";
import { Scrollbar } from "swiper/modules";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/scrollbar";
import "swiper/css/navigation";
import "swiper/swiper-bundle.css";
import { PUBLICROUTER } from "@/config/routes";
import classNames from "classnames/bind";
import styles from "./SlideShowItem.module.scss";
import { formatPrice } from "../formatData/formatData";

const cx = classNames.bind(styles);
function SlideShowItem({ allProduct }) {
  return (
    <SwiperContainer
      spaceBetween={18}
      navigation={true}
      slidesPerView={5}
      modules={[Scrollbar, Navigation]}
      loop={true}
      direction={"horizontal"}
    >
      {allProduct?.map((proItem) => {
        return (
          <OriginalSwiperSlide style={{ height: "auto" }} key={proItem?._id}>
            <div className={cx("product-loop")}>
              <div className={cx("product-inner")}>
                <div className={cx("product-image")}>
                  <Link
                    className={cx("lazy-img")}
                    to={PUBLICROUTER.productDetail.slug(
                      proItem?.slug,
                      proItem?._id
                    )}
                  >
                    <img src={proItem?.thumbnail} alt="image1" />
                  </Link>
                </div>
                <div className={cx("product-detail")}>
                  <Link
                    to={PUBLICROUTER.productDetail.slug(
                      proItem?.slug,
                      proItem?._id
                    )}
                    className={cx("product-name")}
                  >
                    <h3 className={cx("name-desc")}>{proItem?.name}</h3>
                  </Link>
                  <div className={cx("product-price")}>
                    <span className={cx("price")}>
                      {formatPrice(proItem?.salePrice)}
                    </span>
                    <span className={cx("price-del")}>
                      {formatPrice(proItem?.price)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </OriginalSwiperSlide>
        );
      })}
    </SwiperContainer>
  );
}

SlideShowItem.propTypes = {
  allProduct: PropTypes.array,
  name: PropTypes.string,
  handleClickNavigate: PropTypes.func,
};

export default SlideShowItem;
