import SlideShowItem from "@/components/SlideShowItem";
import PropTypes from "prop-types";
import classNames from "classnames/bind";
import styles from "./ProductRelated.module.scss";

const cx = classNames.bind(styles);
function ProductRelated({ allItem }) {
  return (
    <div className={cx("infomation-product")}>
      <h3 className={cx("heading-detail")}>Thường được mua cùng với</h3>
      <SlideShowItem allProduct={allItem} />
    </div>
  );
}
ProductRelated.propTypes = {
  allItem: PropTypes.array,
};
export default ProductRelated;
