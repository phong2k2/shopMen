import classNames from "classnames/bind";
import styles from "./CollectionNew.module.scss";
import { Link } from "react-router-dom";
import { PUBLICROUTER } from "@/config/routes";
import { formatPrice } from "../formatData/formatData";
import { pathProcessing } from "@/helpers/image";

const cx = classNames.bind(styles);
function CollectionNew({ allProductOutstanding }) {
  return (
    <section className={cx("section-home-collection")}>
      <div className={cx("container")}>
        <div className={cx("section-title")}>
          <h2 className={cx("heading-section")}>Sản phẩm nổi bật</h2>
        </div>

        <div className={cx("section-content")}>
          <div className={cx("list-product-row row")}>
            {allProductOutstanding?.map((proItem) => (
              <div
                key={proItem?._id}
                className={cx("col-lg-3", "col-md-6", "col-xs-6")}
              >
                <div className={cx("product-inner")}>
                  <div className={cx("product-image")}>
                    <Link
                      className={cx("lazy-img")}
                      to={PUBLICROUTER.productDetail.slug(
                        proItem?.slug,
                        proItem?._id
                      )}
                    >
                      <img
                        src={pathProcessing(proItem?.thumbnail)}
                        alt="image1"
                      />
                    </Link>
                  </div>
                  <div className={cx("product-detail")}>
                    <Link
                      to={PUBLICROUTER.productDetail.slug(
                        proItem?.slug,
                        proItem?._id
                      )}
                      className={cx("product-name")}
                    >
                      <h3 className={cx("name-desc")}>{proItem?.name}</h3>
                    </Link>
                    <div className={cx("product-price")}>
                      <span className={cx("price")}>
                        {formatPrice(proItem?.salePrice)}
                      </span>
                      <span className={cx("price-del")}>
                        {formatPrice(proItem?.price)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default CollectionNew;
