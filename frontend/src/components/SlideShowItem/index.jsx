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
    const imageProduct = proItem?.color[0]?.gallery;
    if (imageProduct && imageProduct.length >= 2) {
      const twoImages = imageProduct.slice(0, 2);
      const imageElements = twoImages.map((itemImage) => (
        <img
          key={itemImage._id}
          src={itemImage.image.url}
          alt={`image-${itemImage._id}`}
        />
      ));
      return <>{imageElements}</>;
    }
    return null;
  };
  return (
    <SwiperContainer
      spaceBetween={20}
      navigation={true}
      scrollbar={true}
      slidesPerView={2}
      breakpoints={{
        "@1.50": {
          slidesPerView: 4,
          spaceBetween: 50,
        },
      }}
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
                <div className="img-block"> {renderImages(proItem)}</div>
                <h3 className="name-product">{proItem?.name}</h3>
              </a>
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
