import PropTypes from "prop-types";
import {
  Swiper as SwiperContainer,
  SwiperSlide as OriginalSwiperSlide,
} from "swiper/react";
import { Scrollbar } from "swiper/modules";
import { Navigation } from "swiper/modules";
import "./SlideShowItem.scss";
import "swiper/css";
import "swiper/css/scrollbar";
import "swiper/css/navigation";
import "swiper/swiper-bundle.css";

function SlideShowItem({ allProduct, name, handleClickNavigate }) {
  const renderImages = (proItem) => {
    if (proItem?.color?.length) {
      const images = [];
      let i = 0;
      while (images.length < 2 && i < proItem.color.length) {
        const image = proItem.color[i].gallery[0]?.image;

        if (image) {
          images.push(<img key={i} src={image.url} alt={`image-${i + 1}`} />);
        }
        i++;
      }
      return images;
    }

    return null;
  };

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
      {allProduct?.map((proItem) => {
        return (
          <OriginalSwiperSlide key={proItem?._id}>
            <div className="item">
              <a onClick={() => handleClickNavigate(proItem, name)}>
                {renderImages(proItem)}
              </a>
              <h3 className="name-product">{proItem?.name}</h3>
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
