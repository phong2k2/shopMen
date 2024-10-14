import PropTypes from "prop-types"
import {
  Swiper as SwiperContainer,
  SwiperSlide as OriginalSwiperSlide
} from "swiper/react"
import { Scrollbar } from "swiper/modules"
import { Navigation } from "swiper/modules"
import "swiper/css"
import "swiper/css/scrollbar"
import "swiper/css/navigation"
import "swiper/swiper-bundle.css"
import classNames from "classnames/bind"
import styles from "./SlideShowItem.module.scss"
import ProductItem from "../ProductItem"

const cx = classNames.bind(styles)
function SlideShowItem({ allProduct }) {
  return (
    <SwiperContainer
      spaceBetween={18}
      navigation={true}
      slidesPerView={3}
      breakpoints={{
        "@1.50": {
          slidesPerView: 5,
          spaceBetween: 25
        }
      }}
      modules={[Scrollbar, Navigation]}
      loop={true}
      direction={"horizontal"}
    >
      {allProduct?.map((proItem) => {
        return (
          <OriginalSwiperSlide style={{ height: "auto" }} key={proItem?._id}>
            <ProductItem itemPro={proItem} />
          </OriginalSwiperSlide>
        )
      })}
    </SwiperContainer>
  )
}

SlideShowItem.propTypes = {
  allProduct: PropTypes.array,
  name: PropTypes.string,
  handleClickNavigate: PropTypes.func
}

export default SlideShowItem
