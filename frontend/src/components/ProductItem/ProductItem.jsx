import classNames from "classnames/bind";
import styles from "./ProductItem.module.scss";
import PropTypes from "prop-types";
import Skeleton from "@mui/material/Skeleton";
import { Link, NavLink } from "react-router-dom";
import { formatPrice } from "@/components/formatData/formatData";

const cx = classNames.bind(styles);
function ProductItem({ itemPro, loading }) {
  const renderImages = (proItem) => {
    const imageProduct = proItem?.color[0]?.gallery;
    if (imageProduct && imageProduct.length >= 2) {
      const twoImages = imageProduct.slice(0, 2);
      const imageElements = twoImages.map((itemImage) => (
        <img
          key={itemImage._id}
          src={itemImage.image.url}
          alt={`image-${itemImage._id}`}
        />
      ));
      return <>{imageElements}</>;
    }
    return null;
  };

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
        <div className={cx("product-block")}>
          <div className={cx("product-img")}>
            <Link to={`/products/${itemPro?.slug}`}>
              <picture>
                <source media="(max-width: 767px)" />
                {renderImages(itemPro)}
              </picture>
            </Link>
          </div>

          <div className={cx("product-detail")}>
            <div className={cx("pro-name")}>
              <NavLink
                className={cx("conformName")}
                to={`/products/${itemPro?.slug}`}
              >
                {itemPro?.name}
              </NavLink>
            </div>
            <div className={cx("box-pro-detail")}>
              <div className={cx("product-price", "conformName")}>
                {formatPrice(itemPro?.salePrice)}
                <span className={cx("price-del")}>
                  <del>{formatPrice(itemPro?.price)}</del>
                </span>
              </div>
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
