import classNames from "classnames/bind";
import styles from "./ProductPreview.module.scss";

const cx = classNames.bind(styles);
function ProductPreview() {
  return (
    <div className={cx("tab-pane")}>
      <div className={cx("item")}>
        <p>Không có</p>
      </div>
    </div>
  );
}

export default ProductPreview;
