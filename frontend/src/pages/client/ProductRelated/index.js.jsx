import SlideShowItem from "@/components/SlideShowItem";
import PropTypes from "prop-types";
import classNames from "classnames/bind";
import styles from "./ProductRelated.module.scss";
import { useNavigate } from "react-router-dom";

const cx = classNames.bind(styles);
function ProductRelated({ allItem }) {
  const navigate = useNavigate();
  const handleClickNavigate = (item, name) => {
    console.log(name, item);
    navigate(`${name}/${item?.slug}`, { state: { stateNav: item } });
  };
  return (
    <div className={cx("infomation-product")}>
      <h3 className={cx("heading-detail")}>Thường được mua cùng với</h3>
      <SlideShowItem
        allProduct={allItem}
        handleClickNavigate={handleClickNavigate}
        name={`/products`}
      />
    </div>
  );
}
ProductRelated.propTypes = {
  allItem: PropTypes.array,
};
export default ProductRelated;
