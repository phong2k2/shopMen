/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react"
import classNames from "classnames/bind"
import styles from "./ProductInformation.module.scss"
import ProductRelated from "@/components/ProductRelated"
import ProductDescription from "../ProductDescription"
import ProductPreview from "../ProductPreview"

const cx = classNames.bind(styles)
function ProductDetail({ detailProduct, allProductRelatedFilter, isLoading }) {
  const [activeTab, setActiveTab] = useState(1)
  const lineActiveRef = useRef(null)
  const tabContentRef = useRef(null)
  const activeLineStartRef = useRef(null)

  useEffect(() => {
    const line = lineActiveRef.current
    const activeLineStar = activeLineStartRef.current
    if (!line && !activeLineStar) return
    line.style.left = activeLineStar.offsetLeft + "px"
    line.style.width = activeLineStar.offsetWidth + "px"
  }, [])

  const handleClickActive = (e, tab) => {
    const line = lineActiveRef.current
    if (!line) return

    line.style.left = e.target.offsetLeft + "px"
    line.style.width = e.target.offsetWidth + "px"
    setActiveTab(tab)
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 1:
        return <ProductDescription detailProduct={detailProduct} />
      case 2:
        return <ProductPreview />
      case 3:
        return <></>
      default:
        return null
    }
  }

  return (
    <div className={cx("row")}>
      <div className={cx("col-md-12")}>
        <div className={cx("wrapper-description")}>
          <div className={cx("tab-buttons")}>
            <ul>
              <li
                ref={activeLineStartRef}
                onClick={(e) => handleClickActive(e, 1)}
              >
                Mô tả
              </li>
              <li onClick={(e) => handleClickActive(e, 2)}>Đánh giá</li>
              <li onClick={(e) => handleClickActive(e, 3)}>Thông số</li>
            </ul>

            <div className={cx("line")}></div>
            <div ref={lineActiveRef} className={cx("line-active")}></div>
          </div>

          <div ref={tabContentRef} className={cx("tab-contents")}>
            {renderTabContent()}
          </div>
        </div>
        <ProductRelated
          allProductRelated={allProductRelatedFilter}
          isLoading={isLoading}
        />
      </div>
    </div>
  )
}

export default ProductDetail
