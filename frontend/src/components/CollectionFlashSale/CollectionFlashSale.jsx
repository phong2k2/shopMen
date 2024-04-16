/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import classNames from "classnames/bind";
import { Navigation, Scrollbar } from "swiper/modules";
import styles from "./CollectionFlashSale.module.scss";
import { Link } from "react-router-dom";
import { PUBLICROUTER } from "@/config/routes";
import { formatPrice } from "../formatData/formatData";

const cx = classNames.bind(styles);
function CollectionFlashSale({ allProductFlashSeal }) {
  const [timerDays, setTimerDays] = useState(0);
  const [timerHours, setTimerHours] = useState(0);
  const [timerMinutes, setTimerMinutes] = useState(0);
  const [timerSeconds, setTimerSeconds] = useState(0);
  let interval = useRef(null);

  useEffect(() => {
    const startTimer = () => {
      const currentDate = new Date();
      let countdownDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate() + 3,
        currentDate.getHours(),
        currentDate.getMinutes(),
        currentDate.getSeconds()
      ).getTime();

      interval.current = setInterval(() => {
        const now = new Date().getTime();
        const distance = countdownDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        if (distance < 0) {
          // stop timer
          clearInterval(interval.current);
        } else {
          setTimerDays(days);
          setTimerHours(hours);
          setTimerMinutes(minutes);
          setTimerSeconds(seconds);
        }
      }, 1000);
    };

    startTimer();
    return () => clearInterval(interval.current);
  }, []);

  return (
    <section className={cx("section-home-collection")}>
      <div className={cx("container")}>
        <div className={cx("section-title")}>
          <h2 className={cx("title")}>FLASH SEAL</h2>
          <div className={cx("soon-group")}>
            <div className={cx("soon-group-inner")}>
              <span className={cx("soon-repeater")}>
                <span className={cx("soon-slot")}>{timerDays}</span>
                <span className={cx("soon-text")}>Ngày</span>
              </span>
            </div>

            <div className={cx("soon-group-inner")}>
              <span className={cx("soon-repeater")}>
                <span className={cx("soon-slot")}>{timerHours}</span>
                <span className={cx("soon-text")}>Giờ</span>
              </span>
            </div>

            <div className={cx("soon-group-inner")}>
              <span className={cx("soon-repeater")}>
                <span className={cx("soon-slot")}>{timerMinutes}</span>
                <span className={cx("soon-text")}>Phút</span>
              </span>
            </div>

            <div className={cx("soon-group-inner")}>
              <span className={cx("soon-repeater")}>
                <span className={cx("soon-slot")}>{timerSeconds}</span>
                <span className={cx("soon-text")}>Giây</span>
              </span>
            </div>
          </div>
        </div>
        <div className={cx("list-product")}>
          <Swiper
            spaceBetween={18}
            navigation={true}
            slidesPerView={2}
            breakpoints={{
              "@1.50": {
                slidesPerView: 6,
              },
            }}
            modules={[Scrollbar, Navigation]}
            loop={true}
            direction={"horizontal"}
          >
            {allProductFlashSeal?.map((item) => {
              return (
                <SwiperSlide style={{ height: "auto" }} key={item?._id}>
                  <div className={cx("product-loop")}>
                    <div className={cx("product-inner")}>
                      <div className={cx("product-image")}>
                        <Link
                          className={cx("lazy-img")}
                          to={PUBLICROUTER.productDetail.slug(
                            item?.slug,
                            item?._id
                          )}
                        >
                          <img src={item?.thumbnail} alt="image1" />
                        </Link>
                      </div>
                      <div className={cx("product-detail")}>
                        <Link
                          to={PUBLICROUTER.productDetail.slug(
                            item?.slug,
                            item?._id
                          )}
                          className={cx("product-name")}
                        >
                          <h3 className={cx("name-desc")}>{item?.name}</h3>
                        </Link>
                        <div className={cx("product-price")}>
                          <span className={cx("price")}>
                            {formatPrice(item?.salePrice)}
                          </span>
                          <span className={cx("price-del")}>
                            {formatPrice(item?.price)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>

        <div className={cx("see-more-product")}>
          <a className={cx("btn-see-more")} href="#">
            Xem tất cả
            <strong>deal giá hời</strong>
          </a>
        </div>
      </div>
    </section>
  );
}

export default CollectionFlashSale;
