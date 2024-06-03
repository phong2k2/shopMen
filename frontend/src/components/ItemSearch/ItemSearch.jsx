import classNames from "classnames/bind";
import styles from "./ItemSearch.module.scss";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import { formatPrice } from "../formatData/formatData";

const cx = classNames.bind(styles);
function ItemSearch({ itemSearch, handleNextPageSearch }) {
  return (
    <>
      <li
        onClick={() => handleNextPageSearch(itemSearch)}
        className={cx("content-item")}
      >
        <div className={cx("div-text")}>
          <p className={cx("text-search")}>
            <span>{itemSearch?.name}</span>
          </p>
          <strong>{formatPrice(itemSearch?.salePrice)}</strong>
        </div>

        <NavLink
          to={`/products/${itemSearch?.slug}`}
          className={cx("img-item")}
        >
          <img src={itemSearch?.color[0]?.gallery[0]?.image?.url} alt="" />
        </NavLink>
      </li>
      <span className={cx("line")}></span>
    </>
  );
}

ItemSearch.propTypes = {
  itemSearch: PropTypes.object,
  handleNextPageSearch: PropTypes.func,
};

export default ItemSearch;
