import classNames from "classnames/bind";
import styles from "./Home.module.scss";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import SwiperSlides from "@/components/SwiperSlide/SwiperSlide";

import { getAllSubCategory } from "@/services/subCategoryService";
import { getAllProductsForHome } from "@/services/productService";
import { useEffect } from "react";
import { getMe } from "@/services/userService";
import { useDispatch } from "react-redux";
import { loginSuccess } from "@/redux/authSlice";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Scrollbar, Pagination } from "swiper/modules";
import SlideShowItem from "@/components/SlideShowItem";

const cx = classNames.bind(styles);
function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getMe();

        dispatch(loginSuccess(response));
      } catch (error) {
        console.error(error);
      }
    };
    fetchUser();
  }, [dispatch]);

  const { data: allListSubCategory } = useQuery({
    queryKey: "allSubCate",
    queryFn: () => getAllSubCategory(),
  });

  const { data: getAllFeaturedProduct } = useQuery({
    queryKey: "featuredProduct",
    queryFn: () => getAllProductsForHome(),
  });

  const handleClickNavigate = (item, name) => {
    console.log(name, item);
    navigate(`${name}/${item?.slug}`, { state: { stateNav: item } });
  };

  return (
    <>
      <section className={cx("category-hot")}>
        <SwiperSlides
          title="Danh mục mới"
          sx={{
            paddingTop: 20,
          }}
        >
          <Swiper
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
            {allListSubCategory?.map((proItem) => {
              return (
                <SwiperSlide key={proItem?._id}>
                  <div className={cx("item__cate")}>
                    <a
                      onClick={() =>
                        handleClickNavigate(proItem, "/collections")
                      }
                    >
                      <img src={proItem?.image?.url} alt="image1" />
                      <h3 className={cx("name-product")}>{proItem?.name}</h3>
                    </a>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </SwiperSlides>
      </section>

      <section className={cx("banner-web")}>
        <a>
          <div className={cx("banner-image")}>
            <picture>
              <source
                srcSet="https://media2.coolmate.me/cdn-cgi/image/width=450,height=663,quality=80,format=auto/uploads/December2023/mceclip7_63.png"
                media="(max-width: 991px)"
              />
              <img
                src="https://media2.coolmate.me/cdn-cgi/image/width=1069,height=1575,quality=80,format=auto/uploads/December2023/mceclip6_65.png"
                alt="banner"
              />
            </picture>
          </div>
        </a>
        <div className={cx("block-content")}>
          <h2 className={cx("block-heading")}>
            BST
            <br />
            THU ĐÔNG
          </h2>
          <div className={cx("block-button")}>
            <a href="">Khám phá ngay</a>
          </div>
        </div>
      </section>

      <section className={cx("banner-web")}>
        <SwiperSlides title="Sản phẩm mới">
          <SlideShowItem
            allProduct={getAllFeaturedProduct}
            handleClickNavigate={handleClickNavigate}
            name={`/products`}
          />
        </SwiperSlides>
      </section>

      <section className={cx("homepage-care-share")}>
        <div className={cx("container")}>
          <div className={cx("homepage-care")}>
            <a href="">
              <div className={cx("homepage-image")}>
                <img
                  src="https://mcdn.coolmate.me/image/March2023/mceclip0_137.jpg"
                  alt="ảnh chia sẻ cộng đồng"
                />
              </div>
              <div className={cx("homepage-content")}>
                <img src="https://mcdn.coolmate.me/image/March2023/mceclip8.png" />
                <h2>
                  Góp phần mang lại cuộc <br /> sống tươi đẹp{" "}
                  <br className={cx("mobile--hidden")} />
                  hơn cho tụi nhỏ
                </h2>
                <div className={cx("homepage-button")}>
                  <a className={cx("button-full")} href="#">
                    Khám phá ngay
                  </a>
                </div>
              </div>
            </a>
          </div>
        </div>
      </section>

      <section className={cx("homepage-branch")}>
        <div className={cx("container")}>
          <div className={cx("row")}>
            <div className={cx("col-md-6 col-12", "branch-item")}>
              <div className={cx("branch-img")}>
                <img src="https://mcdn.coolmate.me/image/December2023/mceclip1_99.png" />
              </div>
              <div className={cx("branch-content")}>
                <p>CM24 MỘT TUỔI</p>
                <h2>
                  Mời bạn <br />
                  Chung vui
                </h2>
                <div className={cx("homepage-button")}>
                  <a href="">Khám phá ngay</a>
                </div>
              </div>
            </div>

            <div className={cx("col-md-6 col-12", "branch-item")}>
              <div className={cx("branch-img")}>
                <img src="https://mcdn.coolmate.me/image/October2023/mceclip1_15.png" />
              </div>
              <div className={cx("branch-content")}>
                <p>84Rising - streetwear</p>
                <h2>
                  BASKETBALL
                  <br /> COLLECTION
                </h2>
                <div className={cx("homepage-button")}>
                  <a href="">Khám phá ngay</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={cx("homepage-collections")}>
        <div className={cx("container")}>
          <div className={cx("row")}>
            <div className={cx("col-md-3 col-sm-3 col-6", "collection-item")}>
              <a href="">
                <div className={cx("collection-thumbnail")}>
                  <img
                    src="https://media2.coolmate.me/cdn-cgi/image/width=1069,height=1575,quality=80,format=auto/uploads/October2023/mceclip1_36.png"
                    alt="banner"
                  />
                </div>
              </a>
            </div>

            <div className={cx("col-md-3 col-sm-3 col-6", "collection-item")}>
              <a href="">
                <div className={cx("collection-thumbnail")}>
                  <img
                    src="https://media2.coolmate.me/cdn-cgi/image/width=1069,height=1575,quality=80,format=auto/uploads/October2023/mceclip0_40.png"
                    alt="banner"
                  />
                </div>
              </a>
            </div>

            <div className={cx("col-md-3 col-sm-3 col-6", "collection-item")}>
              <a href="">
                <div className={cx("collection-thumbnail")}>
                  <img
                    src="https://media2.coolmate.me/cdn-cgi/image/width=1069,height=1575,quality=80,format=auto/uploads/October2023/mceclip3_86.png"
                    alt="banner"
                  />
                </div>
              </a>
            </div>

            <div className={cx("col-md-3 col-sm-3 col-6", "collection-item")}>
              <a href="">
                <div className={cx("collection-thumbnail")}>
                  <img
                    src="https://media2.coolmate.me/cdn-cgi/image/width=1069,height=1575,quality=80,format=auto/uploads/October2023/mceclip4_7.png"
                    alt="banner"
                  />
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className={cx("homepage-care-share")}>
        <div className={cx("container")}>
          <div className={cx("homepage-care")}>
            <a href="#">
              <div className={cx("homepage-care-image")}>
                <picture>
                  <source
                    srcSet="https://media2.coolmate.me/cdn-cgi/image/quality=80,format=auto/uploads/November2023/mceclip1_90.png"
                    media="(max-width: 991px)"
                  />
                  <img
                    src="https://media2.coolmate.me/cdn-cgi/image/quality=80,format=auto/uploads/November2023/mceclip0_71.png"
                    alt="ảnh chia sẻ cộng đồng"
                  />
                </picture>
              </div>
            </a>
          </div>
        </div>
      </section>

      <section className={cx("banner-web")}>
        <SwiperSlides title="NHẬT KÝ KENTA">
          <Swiper
            spaceBetween={20}
            navigation={true}
            slidesPerView={2}
            breakpoints={{
              "@1.50": {
                slidesPerView: 4,
                spaceBetween: 50,
              },
            }}
            centeredSlides={true}
            autoplay={{
              delay: 1500,
              disableOnInteraction: false,
            }}
            modules={[Navigation, Autoplay, Pagination]}
            className="productHotSwiper "
            loop={true}
            direction={"horizontal"}
          >
            {allListSubCategory?.map((proItem) => {
              return (
                <SwiperSlide key={proItem?._id}>
                  <div className={cx("item__cate")}>
                    <a>
                      <img src={proItem?.image?.url} alt="image1" />
                    </a>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </SwiperSlides>
      </section>
    </>
  );
}

export default Home;
