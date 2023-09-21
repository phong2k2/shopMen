import PropType from 'prop-types'
import classNames from "classnames/bind";
import styles from "./Menu.module.scss"
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import MenuItem from './MenuItem';
import { Link } from 'react-router-dom';
import CustomPrevArrow from './ButtonSlider/CustomPrevArrow';
import CustomNextArrow from './ButtonSlider/CustomNextArrow';


const cx = classNames.bind(styles)
function Menu({ product, onClick, slug}) {
  const slicedProducts = product?.slice(0, 7);

  let settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      }
    ]
  };
    return (
       <>
        <div className={cx("tab-item")} >
          <div className={cx('container')}>
            <div className={cx("listProduct")}>
              <div className={cx('owl-stage-outer')} >
                <div className={cx( "owl-stage")}>
                  <Slider {...settings}>
                    {
                      slicedProducts?.map((proItem, index) => {
                        return (
                          <MenuItem key={index} proItem={proItem} onClick={onClick}/>
                        )
                      })
                    }
                  </Slider>
                </div>
              </div>
              <div className={cx("collection-viewAll")}>
              <Link to={'/'+ slug} className={cx("button")}>Xem thêm</Link>
              </div>
            </div>

          </div>
        </div>
    </> );
}

Menu.propTypes = {
  product: PropType.array,
  onClick: PropType.func,
  slug: PropType.string
}

export default Menu;