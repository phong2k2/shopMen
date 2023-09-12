import Header from "../components/Header/Header";
import classNames from "classnames/bind";
import { useEffect} from "react";
import * as categoryService from "@/services/adminServices/categoryService";
import styles from "./DefaultLayout.module.scss";
import Footer from "@/layouts/ClientLayout/components/Footer/Footer";
import Slider from "../components/Slider/Slider";
import { useDispatch } from "react-redux";
import { getCategorySuccess } from "@/redux/categorySlice";

const cx = classNames.bind(styles);
function DefaultLayout({ children }) {
  const dispatch = useDispatch()
  useEffect(() => {
    const getCategoryApi = async () => {
     try {
      const res = await categoryService.indexCategory();
      if (res) {
        dispatch(getCategorySuccess(res))
      }
     } catch (err) {
      console.log('Get danh muc that failed')
     }
    };
    getCategoryApi();
  }, []);
  return (
    <div >
      <Header />
      <Slider/>
        <div className={cx("content")}>{children}</div>
      <Footer />
    </div>
  );
}

export default DefaultLayout;
