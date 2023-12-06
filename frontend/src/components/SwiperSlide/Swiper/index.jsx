import PropTypes from "prop-types";
import {
  Swiper as SwiperContainer,
  SwiperSlide as OriginalSwiperSlide,
} from "swiper/react";
import { Scrollbar } from "swiper/modules";
import { Navigation } from "swiper/modules";
import "./Swiper.scss";
import "swiper/css";
import "swiper/css/scrollbar";
import "swiper/css/navigation";
import "swiper/swiper-bundle.css";

function Swiper({ allItem, name, handleClickNavigate }) {
  return (
    <SwiperContainer
      spaceBetween={20}
      navigation={true}
      scrollbar={true}
      slidesPerView={4}
      modules={[Scrollbar, Navigation]}
      className="productHotSwiper swiper-horizontal"
      loop={true}
      direction={"horizontal"}
    >
      {allItem?.map((proItem) => {
        return (
          <OriginalSwiperSlide key={proItem?._id}>
            <div className="item">
              <a onClick={() => handleClickNavigate(proItem, name)}>
                <img src={proItem?.image?.url} alt="" />
              </a>
              <h3 className="name-product">{proItem?.name}</h3>
            </div>
          </OriginalSwiperSlide>
        );
      })}
    </SwiperContainer>
  );
}

Swiper.propTypes = {
  allItem: PropTypes.array,
  name: PropTypes.string,
  handleClickNavigate: PropTypes.func,
};

export default Swiper;
