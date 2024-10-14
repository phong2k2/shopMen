import SlideShowItem from "@/components/SlideShowItem"
import PropTypes from "prop-types"
import classNames from "classnames/bind"
import styles from "./ProductRelated.module.scss"
import ProductSkeleton from "../Skeleton/Product/ProductSkeleton"

const cx = classNames.bind(styles)
function ProductRelated({ allProductRelated, isLoading }) {
  return (
    <div className={cx("container-related")}>
      <h3 className={cx("heading-detail")}>Sản phẩm liên quan</h3>

      {isLoading ? (
        <ProductSkeleton />
      ) : (
        <SlideShowItem allProduct={allProductRelated} />
      )}
    </div>
  )
}
ProductRelated.propTypes = {
  allProductRelated: PropTypes.array
}
export default ProductRelated
