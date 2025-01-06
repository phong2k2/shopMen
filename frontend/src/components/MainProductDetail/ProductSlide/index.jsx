import { useState } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { pathProcessing } from "@/helpers/image"
import { FreeMode, Navigation, Thumbs } from "swiper/modules"
import "./ProductSlide.scss"

function ProductSlide({ images }) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null)

  return (
    <div className="col-md-6 col-sm-12 product-gallery">
      <Swiper
        spaceBetween={10}
        navigation={true}
        slidesPerView={1}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="productHotSwiper"
        style={{ order: 2 }}
      >
        {images?.map((item, index) => {
          return (
            <SwiperSlide style={{ cursor: "pointer" }} key={index}>
              <img
                src={pathProcessing(item)}
                className="swiper-lazy"
                alt={item?.nameImage}
                loading="lazy"
              />
            </SwiperSlide>
          )
        })}
      </Swiper>

      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={5}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper"
        direction="vertical"
        breakpoints={{
          0: {
            direction: "horizontal"
          },
          576: {
            direction: "vertical"
          }
        }}
      >
        {images?.map((item, index) => {
          return (
            <SwiperSlide key={index} className="wrap-img">
              <img
                src={pathProcessing(item)}
                className={"swiper-slide-auto"}
                alt={item?.image}
                loading="lazy"
              />
            </SwiperSlide>
          )
        })}
      </Swiper>
    </div>
  )
}

export default ProductSlide
