import classNames from "classnames/bind"
import styles from "./ProductItem.module.scss"
import PropTypes from "prop-types"
import { Link, NavLink } from "react-router-dom"
import { PUBLICROUTER } from "@/config/routes"
import { pathProcessing } from "@/helpers/image"
import { formatPrice } from "@/utils/formatPrice"

const cx = classNames.bind(styles)
function ProductItem({ itemPro, loading }) {
  return (
    <div className={cx("product-inner")}>
      <div className={cx("product-img")}>
        <Link
          to={PUBLICROUTER.productDetail.slug(itemPro?.slug, itemPro?._id)}
          className={cx("lazy-img")}
        >
          <img
            src={pathProcessing(itemPro?.thumbnail)}
            alt={`image-${itemPro?._id}`}
          />
        </Link>
      </div>

      <div className={cx("product-detail")}>
        <div className={cx("product-name")}>
          <NavLink
            className={cx("name")}
            to={PUBLICROUTER.productDetail.slug(itemPro?.slug, itemPro?._id)}
          >
            {itemPro?.name}
          </NavLink>
        </div>
        <div className={cx("product-price")}>
          <span className={cx("price")}>{formatPrice(itemPro?.salePrice)}</span>
          <span className={cx("price-del")}>{formatPrice(itemPro?.price)}</span>
        </div>
      </div>
    </div>
  )
}

ProductItem.propTypes = {
  itemPro: PropTypes.object,
  onClick: PropTypes.func
}

export default ProductItem
