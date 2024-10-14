import classNames from "classnames/bind"
import { useDispatch, useSelector } from "react-redux"
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart"
import { productSizes } from "@/contant"
import { decrement, increment, incrementByAmount } from "@/redux/countSlice"
import { colorList } from "@/utils/colorList"
import styles from "./ProductContent.module.scss"
import { formatPrice } from "@/utils/formatPrice"

const cx = classNames.bind(styles)
function ProductContent({
  detailProduct,
  isSizeInProduct,
  handleChangeSelectColor,
  handleChangeSelectSize,
  handleAddToCart,
  selectedColor,
  selectedSize
}) {
  const dispatch = useDispatch()
  const { amount } = useSelector((state) => state.count)

  return (
    <div className={cx("col-md-6 col-sm-12", "product-content")}>
      <div className={cx("product-title")}>
        <h1>{detailProduct?.name}</h1>
        <p>
          <span>Số Lượng:</span>
          <span>{detailProduct?.countInStock}</span>
        </p>
      </div>
      <div className={cx("product-price")}>
        <span className={cx("pro-price")}>
          {formatPrice(detailProduct?.salePrice)}
        </span>
        <del>{formatPrice(detailProduct?.price)}</del>
      </div>

      <div className={cx("select-action")}>
        {/* Biến thể */}
        <div className={cx("variant")}>
          <div className={cx("color")}>
            <div className={cx("select-swap")}>
              {/* Color */}
              {detailProduct?.color?.map((itemColor, index) => {
                const colorStyle = {
                  backgroundColor:
                    colorList[itemColor?.nameColor] || "#defaultcolor"
                }
                return (
                  <div
                    key={index}
                    className={cx(
                      "swatch-element",
                      selectedColor?.nameColor === itemColor?.nameColor
                        ? "selector"
                        : ""
                    )}
                  >
                    <input
                      onChange={() => handleChangeSelectColor(itemColor, index)}
                      checked={
                        selectedColor?.nameColor === itemColor?.nameColor
                      }
                      value={itemColor?.nameColor}
                      id={`swatch-1-${itemColor?.nameColor}`}
                      name="gender"
                      type="radio"
                    />

                    <label
                      htmlFor={`swatch-1-${itemColor?.nameColor}`}
                      className={cx("block-select")}
                    >
                      <span style={colorStyle}>{itemColor?.color}</span>
                    </label>
                  </div>
                )
              })}
            </div>
          </div>
          {/* Sizes */}
          <div className={cx("size")}>
            <div className={cx("select-swap")}>
              {productSizes?.map((itemSize) => {
                return (
                  <div
                    key={itemSize.id}
                    className={cx("swatch-element", {
                      hideSize: !isSizeInProduct(itemSize.name),
                      selector: itemSize.name === selectedSize
                    })}
                  >
                    <input
                      id={`swatch-1-${itemSize.name}`}
                      // onChange={handleChangeSelectSize}
                      name="option1"
                      value={itemSize.name}
                      type="radio"
                    />
                    <label
                      htmlFor={`swatch-1-${itemSize.name}`}
                      className={cx("block-select-size")}
                      onClick={() => handleChangeSelectSize(itemSize.name)}
                    >
                      <span>{itemSize.name}</span>
                    </label>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        <div className={cx("quantity")}>
          <span className={cx("title")}>Số lượng</span>
          <div className={cx("input-group")}>
            <input
              type="button"
              value="-"
              onClick={() => dispatch(decrement())}
              className={cx("qty-btn")}
            />
            <input
              type="text"
              value={amount}
              onChange={(e) => dispatch(incrementByAmount(e.target.value))}
              className={cx("quantity-selector")}
            />
            <input
              type="button"
              value="+"
              onClick={() => dispatch(increment())}
              className={cx("qty-btn")}
            />
          </div>
        </div>
        <div className={cx("wrap-btn")}>
          <div className={cx("wrap-add-cart")}>
            {detailProduct?.countInStock > 0 ? (
              <button onClick={handleAddToCart} className={cx("cart-btn")}>
                <AddShoppingCartIcon
                  sx={{
                    fontSize: 30,
                    paddingRight: "5px"
                  }}
                />
                Thêm vào giỏ hàng
              </button>
            ) : (
              <button className={cx("cart-btn", "out-row")}>
                <span>Hết hàng</span>
              </button>
            )}
          </div>
          <div className={cx("wrap-add-order")}>
            <button onClick={handleAddToCart} className={cx("btn-buy")}>
              <span>Mua ngay</span>
            </button>
          </div>
        </div>
        <div className={cx("process_product")}>
          <div className={cx("accordion")} id="accordionProcessProduct">
            <div className={cx("accordion-item")}>
              <h2 className={cx("accordion-header")} id="headingTwo">
                <button
                  className={cx("accordion-button")}
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseTwo"
                  aria-expanded="false"
                  aria-controls="collapseTwo"
                >
                  <i className="bi bi-credit-card"></i>
                  <span>Đa dạng phương thức thanh toán</span>
                </button>
              </h2>
              <div
                id="collapseTwo"
                className={cx("accordion-collapse collapse")}
                aria-labelledby="headingTwo"
                data-bs-parent="#accordionProcessProduct"
              >
                <div className={cx("accordion-body")}></div>
              </div>
            </div>
            <div className={cx("accordion-item")}>
              <h2 className={cx("accordion-header")} id="headingThree">
                <button
                  className={cx("accordion-button")}
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseThree"
                  aria-expanded="false"
                  aria-controls="collapseThree"
                >
                  <i className="bi bi-arrow-repeat"></i>
                  <span>Đổi hàng miễn phí lên đến 30 ngày</span>
                </button>
              </h2>
              <div
                id="collapseThree"
                className={cx("accordion-collapse collapse")}
                aria-labelledby="headingThree"
                data-bs-parent="#accordionProcessProduct"
              >
                <div className={cx("accordion-body")}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={cx("clear")}></div>
    </div>
  )
}

export default ProductContent
