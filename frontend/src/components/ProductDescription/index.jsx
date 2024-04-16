import { useEffect, useRef, useState } from "react";
import classNames from "classnames/bind";
import parse from "html-react-parser";
import styles from "./ProductDescription.module.scss";

const cx = classNames.bind(styles);
function ProductDescription({ detailProduct }) {
  const [isSeeMore, setIsSeeMore] = useState(true);
  const seeMoreRef = useRef();

  const handleSeeMore = () => {
    setIsSeeMore((prev) => !prev);
  };

  useEffect(() => {
    const seeMore = seeMoreRef.current;
    if (isSeeMore) {
      seeMore.removeAttribute("style");
    } else {
      seeMore.style.maxHeight = "unset";
    }
  }, [isSeeMore]);
  return (
    <div className={cx("tab-pane")}>
      <div
        ref={seeMoreRef}
        className={cx("item", {
          "bg-content": isSeeMore,
        })}
      >
        {typeof detailProduct?.description === "string"
          ? parse(detailProduct?.description)
          : ""}
      </div>
      <div className={cx("see-more")}>
        {isSeeMore ? (
          <button onClick={handleSeeMore}>Xem thêm</button>
        ) : (
          <button onClick={handleSeeMore}>Rút gọn</button>
        )}
      </div>
    </div>
  );
}

export default ProductDescription;
