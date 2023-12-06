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
        console.log("🚀 ~ file: Account.jsx:48 ~ fetchUser ~ error:", error);
      }
    };
    fetchUser();
  }, [dispatch]);

  const allListSubCategory = useQuery({
    queryKey: "allSubCate",
    queryFn: () => getAllSubCategory(),
  });

  const getAllFeaturedProduct = useQuery({
    queryKey: "featuredProduct",
    queryFn: () => getAllProductsForHome(),
  });

  const handleClickNavigate = (item, name) => {
    navigate(`${name}/${item?.slug}`, { state: { stateNav: item } });
  };

  return (
    <>
      <SwiperSlides
        title="Danh mục mới"
        allItem={allListSubCategory?.data}
        name={`/collections`}
        handleClickNavigate={handleClickNavigate}
      />

      <section className={cx("bannerWeb")}>
        <a>
          <img
            src="https://aristino.com/Data/ResizeImage/images/banner/n%C4%83m%202023/Bannner-website-Aristino-mobile-4_1920x750x0x0x2.webp"
            alt="banner"
          />
        </a>
      </section>

      <SwiperSlides
        title="Sản phẩm mới"
        allItem={getAllFeaturedProduct?.data}
        name={`/products`}
        handleClickNavigate={handleClickNavigate}
      />
    </>
  );
}

export default Home;
