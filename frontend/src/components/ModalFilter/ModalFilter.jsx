import classNames from "classnames/bind"
import styles from "./ModalFilter.module.scss"
import { Slider } from "@mui/material"
import { CustomizeAccordion } from "@/components/CustomMaterial/CustomMaterial"
import { useState } from "react"
import { useDeliveryInfo } from "@/hook/useContext"
import { useQuery } from "react-query"
import { getAllCategory } from "@/services/categoryService"
import { productSizes } from "@/contant"
import { formatPrice } from "@/utils/formatPrice"

const cx = classNames.bind(styles)
function ModalFilter() {
  const [priceScroll, setPriceScroll] = useState([0, 10000000])
  const { showModalFilter, setShowModalFilter, filter, setFilter } =
    useDeliveryInfo()
  const minDistance = 10

  const { data: listCategory } = useQuery({
    queryKey: "listCategoryModal",
    queryFn: () => getAllCategory()
  })

  const handleChangeFindPrice = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return
    }

    if (activeThumb === 0) {
      setPriceScroll([
        Math.min(newValue[0], priceScroll[1] - minDistance),
        priceScroll[1]
      ])
    } else {
      setPriceScroll([
        priceScroll[0],
        Math.max(newValue[1], priceScroll[0] + minDistance)
      ])
    }
  }

  const handleCloseModal = () => {
    setShowModalFilter(false)
  }

  const handleClickFilter = () => {
    if (priceScroll) {
      const price_min = priceScroll[0]
      const price_max = priceScroll[1]
      setFilter({
        ...filter,
        price_min,
        price_max
      })

      setShowModalFilter(false)
    }
  }

  const handleFilterSize = () => {}

  return (
    <div className={cx("site-cart", { active: showModalFilter })}>
      <div className={cx("header")}>
        <h2 className={cx("title")}>LỌC SẢN PHẨM</h2>
        <button onClick={handleCloseModal} className={cx("close")}>
          <span className={cx("bar")}></span>
        </button>
      </div>
      <div className={cx("filter")}>
        {/* {price.length > 1 && (
          <div className={cx("header")}>
            <h2 className={cx("title")}>Đã chọn</h2>
            <div className={cx("list-tag")}>
              <div className={cx("filter-tag")}>
                Khoảng giá:{" "}
                <b>{`${formatPrice(price[0])} - ${formatPrice(price[1])}`}</b>
              </div>
            </div>
          </div>
        )} */}

        {/* control filter */}
        <div className={cx("content")}>
          <div className={cx("group")}>
            <div className={cx("group-menu-action")}>
              <div className={cx("menu-title")}>
                <h2>Danh mục sản phẩm</h2>
              </div>
              <div className={cx("filter-box")}>
                <CustomizeAccordion listCategory={listCategory} />
              </div>

              <div className={cx("filter-box")}>
                <div className={cx("accordion-header")}>
                  <h2>Màu sắc</h2>
                  <div className={cx("filter-box-color")}>
                    <div className={cx("slider-price")}>
                      <ul className={cx("list-size")}>
                        {productSizes?.map((itemSize) => (
                          <li onClick={handleFilterSize} key={itemSize.id}>
                            <input type="checkbox" id={itemSize.name} hidden />
                            {itemSize.name}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className={cx("filter-box")}>
                <div className={cx("accordion-header")}>
                  <h2>Khoảng giá</h2>
                  <div className={cx("filter-box-price")}>
                    <div className={cx("slider-price")}>
                      <Slider
                        getAriaLabel={() => "Temperature range"}
                        sx={{
                          color: "#000"
                        }}
                        value={priceScroll}
                        disableSwap
                        size={"medium"}
                        onChange={handleChangeFindPrice}
                        max={10000000}
                        min={0}
                        valueLabelFormat={(value) =>
                          `${value.toLocaleString("vi-VN")} VND`
                        }
                      />
                    </div>
                    <div className={cx("display-number")}>
                      <span className={cx("min-value")}>
                        {formatPrice(filter?.price_min[0] || priceScroll[0])}
                      </span>
                      <span className={cx("max-value")}>
                        {formatPrice(filter?.price_max[1] || priceScroll[1])}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={cx("footer")}>
              <button onClick={handleClickFilter} className={cx("btn-filter")}>
                Áp dụng
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ModalFilter
