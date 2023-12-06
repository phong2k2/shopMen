import classNames from "classnames/bind";
import styles from "./ItemSearch.module.scss";
import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import { useMemo } from "react";
import { formatPrice } from "../formatData/formatData";

const cx = classNames.bind(styles);
function ItemSearch({ data, setSearchValue, setShowModalSearch }) {
  const navigate = useNavigate();

  const handleNextPageSearch = () => {
    if (data?.slug) {
      navigate(`/products/${data?.slug}`);
      setShowModalSearch(false);
      setSearchValue("");
    }
  };

  const discountedPrice = useMemo(() => {
    return Math.ceil(data?.price - data?.discount);
  }, [data]);

  return (
    <>
      <li onClick={handleNextPageSearch} className={cx("content-item")}>
        <div className={cx("div-text")}>
          <p className={cx("text-search")}>
            <span>{data?.name}</span>
          </p>
          <strong>{formatPrice(discountedPrice)}</strong>
        </div>

        <Link to={`/products/${data?.slug}`} className={cx("img-item")}>
          <img src={data?.image?.url} alt="" />
        </Link>
      </li>
      <span className={cx("line")}></span>
    </>
  );
}

ItemSearch.propTypes = {
  data: PropTypes.object,
  setSearchValue: PropTypes.func,
  setShowModalSearch: PropTypes.func,
};

export default ItemSearch;
