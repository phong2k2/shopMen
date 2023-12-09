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
import { Scrollbar } from "swiper/modules";
import { Navigation } from "swiper/modules";
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
    navigate(`${name}/${item?.slug}`, { state: { stateNav: item } });
  };

  return (
    <>
      <SwiperSlides title="Danh mục mới">
        <Swiper
          spaceBetween={20}
          navigation={true}
          scrollbar={true}
          slidesPerView={4}
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
                    onClick={() => handleClickNavigate(proItem, "/collections")}
                  >
                    <img src={proItem?.image?.url} alt="image1" />
                  </a>
                  <h3 className={cx("name-product")}>{proItem?.name}</h3>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </SwiperSlides>

      <section className={cx("bannerWeb")}>
        <a>
          <img
            src="https://aristino.com/Data/ResizeImage/images/banner/n%C4%83m%202023/Bannner-website-Aristino-mobile-4_1920x750x0x0x2.webp"
            alt="banner"
          />
        </a>
      </section>

      <SwiperSlides title="Sản phẩm mới">
        <SlideShowItem
          allProduct={getAllFeaturedProduct}
          name={`/products`}
          handleClickNavigate={handleClickNavigate}
        />
      </SwiperSlides>
    </>
  );
}

export default Home;
