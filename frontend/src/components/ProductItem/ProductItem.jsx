import classNames from "classnames/bind";
import styles from "./ProductItem.module.scss";
import PropTypes from "prop-types";
import Skeleton from "@mui/material/Skeleton";
import { Link, NavLink } from "react-router-dom";
import { formatPrice } from "@/components/formatData/formatData";
import { PUBLICROUTER } from "@/config/routes";
import { pathProcessing } from "@/helpers/image";

const cx = classNames.bind(styles);
function ProductItem({ itemPro, loading }) {
  return (
    <div className={cx(" col-md-3 col-sm-6 mt-5", "col-6")}>
      {loading ? (
        <div>
          <Skeleton
            animation="wave"
            variant="rectangular"
            width={210}
            height={118}
          />
          <Skeleton animation="wave" />
          <Skeleton animation="wave" width="60%" />
        </div>
      ) : (
        <div className={cx("product-inner")}>
          <div className={cx("product-img")}>
            <Link
              to={PUBLICROUTER.productDetail.slug(itemPro?.slug, itemPro?._id)}
              className={cx("lazy-img")}
            >
              <picture>
                <source media="(max-width: 767px)" />
                <img
                  src={pathProcessing(itemPro?.thumbnail)}
                  alt={`image-${itemPro?._id}`}
                />
              </picture>
            </Link>
          </div>

          <div className={cx("product-detail")}>
            <div className={cx("product-name")}>
              <NavLink
                className={cx("name")}
                to={PUBLICROUTER.productDetail.slug(
                  itemPro?.slug,
                  itemPro?._id
                )}
              >
                {itemPro?.name}
              </NavLink>
            </div>
            <div className={cx("product-price")}>
              <span className={cx("price")}>
                {formatPrice(itemPro?.salePrice)}
              </span>
              <span className={cx("price-del")}>
                {formatPrice(itemPro?.price)}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

ProductItem.propTypes = {
  itemPro: PropTypes.object,
  onClick: PropTypes.func,
  loading: PropTypes.bool,
};

export default ProductItem;
