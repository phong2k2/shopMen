import classNames from "classnames/bind"
import styles from "./CollectionNew.module.scss"
import ProductSkeleton from "../Skeleton/Product/ProductSkeleton"
import ProductItem from "../ProductItem"

const cx = classNames.bind(styles)
function CollectionNew({ allProductOutstanding, isLoading }) {
  return (
    <section className={cx("section-home-collection")}>
      <div className={cx("container")}>
        <div className={cx("section-title")}>
          <h2 className={cx("heading-section")}>Sản phẩm nổi bật</h2>
        </div>
        {isLoading ? (
          <ProductSkeleton />
        ) : (
          <div className={cx("section-content")}>
            <div className={cx("list-product-row row")}>
              {allProductOutstanding?.map((proItem) => (
                <div
                  key={proItem?._id}
                  className={cx("col-lg-3", "col-md-6", "col-xs-6")}
                >
                  <ProductItem itemPro={proItem} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default CollectionNew
