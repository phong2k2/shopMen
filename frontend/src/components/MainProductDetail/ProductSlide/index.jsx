import { useRef, useState } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { pathProcessing } from "@/helpers/image"
import { FreeMode, Navigation, Thumbs } from "swiper/modules"
import "./ProductSlide.scss"

function ProductSlide({ images }) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null)
  const imgRefs = useRef([])
  const [height, setHeight] = useState(null)

  const handleSlideChange = (swiper) => {}

  const handleResize = (swiper) => {
    const swiperElement = swiper.el
    setHeight(swiperElement.offsetHeight)
  }

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
        onSlideChange={handleSlideChange}
        onResize={handleResize}
      >
        {images?.map((item, index) => {
          return (
            <SwiperSlide style={{ cursor: "pointer" }} key={item?._id}>
              <img
                src={pathProcessing(item?.image)}
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
        {images?.map((item) => {
          return (
            <SwiperSlide key={item?._id} className="wrap-img">
              <img
                src={pathProcessing(item?.image)}
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
