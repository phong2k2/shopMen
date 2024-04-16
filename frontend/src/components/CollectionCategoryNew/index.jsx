/* eslint-disable react/prop-types */
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import styles from "./CollectionCategoryNew.module.scss";
import SwiperSlides from "@/components/SwiperSlide/SwiperSlide";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Scrollbar } from "swiper/modules";
import { IconArrowRight } from "@/components/Icons/icon";
import { PUBLICROUTER } from "@/config/routes";
import { pathProcessing } from "@/helpers/image";

const cx = classNames.bind(styles);
function CollectionCategoryNew({ allListSubCategory }) {
  return (
    <section className={cx("category-hot")}>
      <SwiperSlides
        title="Danh mục mới"
        sx={{
          paddingTop: 20,
        }}
      >
        <Swiper
          spaceBetween={25}
          navigation={true}
          scrollbar={true}
          slidesPerView={2}
          breakpoints={{
            "@1.50": {
              slidesPerView: 4,
              spaceBetween: 25,
            },
          }}
          modules={[Scrollbar, Navigation]}
          className="productHotSwiper swiper-horizontal"
          loop={true}
          direction={"horizontal"}
        >
          {allListSubCategory?.map((proItem) => {
            return (
              <SwiperSlide key={proItem?._id}>
                <div className={cx("item-img")}>
                  <div className={cx("item-cate")}>
                    <Link
                      to={PUBLICROUTER.product.subCategory(
                        proItem?._id,
                        proItem?.name
                      )}
                    >
                      <img src={pathProcessing(proItem?.image)} alt="image1" />
                    </Link>
                  </div>
                  <div className={cx("item-info")}>
                    <div className={cx("info-title")}>
                      <h3 className={cx("info-name")}>{proItem?.name}</h3>
                    </div>
                    <div className={cx("info-icon")}>
                      <Link
                        to={PUBLICROUTER.product.subCategory(
                          proItem?._id,
                          proItem?.name
                        )}
                      >
                        <IconArrowRight width="2.5rem" className={cx("icon")} />
                      </Link>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </SwiperSlides>
    </section>
  );
}

export default CollectionCategoryNew;
