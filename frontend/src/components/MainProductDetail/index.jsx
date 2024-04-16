/* eslint-disable react/prop-types */
import { useState } from "react";
import classNames from "classnames/bind";
import styles from "./MainProductDetail.module.scss";
import { formatPrice } from "../formatData/formatData";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { productSizes } from "@/contant";
import { pathProcessing } from "@/helpers/image";

const cx = classNames.bind(styles);
function MainProductDetail({
  images,
  detailProduct,
  isSizeInProduct,
  handleChangeSelectColor,
  handleChangeSelectSize,
  handleChangeCount,
  handleChangeAmount,
  handleBlur,
  handleAddToCart,
  amount,
  selectedColor,
  selectedSize,
}) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  const colorMapping = {
    Đen: "#000",
    Xanh: "#0c2461",
    Trắng: "#ffff",
    Cam: "#c47a4a ",
    Đỏ: "#ff0000",
  };

  return (
    <div className={cx("row")}>
      <div className={cx("col-md-12")}>
        <div className={cx("row")}>
          <div className={cx("col-md-6 col-sm-12")}>
            <div className={cx("product-gallery")}>
              <Swiper
                spaceBetween={10}
                navigation={true}
                slidesPerView={1}
                thumbs={{ swiper: thumbsSwiper }}
                modules={[FreeMode, Navigation, Thumbs]}
                className="productHotSwiper"
                style={{ order: 2 }}
              >
                {images?.map((item) => {
                  return (
                    <SwiperSlide style={{ cursor: "pointer" }} key={item?._id}>
                      <img
                        style={{ width: "100%" }}
                        src={pathProcessing(item?.image)}
                        className="swiper-lazy"
                        alt={item?.nameImage}
                        loading="lazy"
                      />
                    </SwiperSlide>
                  );
                })}
              </Swiper>
              <Swiper
                onSwiper={setThumbsSwiper}
                spaceBetween={10}
                slidesPerView={4}
                freeMode={true}
                sx={{
                  display: "flex",
                  flex: "none",
                  marginLeft: "20px",
                  marginTop: 0,
                }}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mySwiper"
                style={{ order: 1 }}
              >
                {images?.map((item) => {
                  return (
                    <SwiperSlide key={item?._id} className="wrap-img">
                      <img
                        style={{
                          display: "block",
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                        src={pathProcessing(item?.image)}
                        className={cx("swiper-slide-auto")}
                        alt={item?.image}
                        loading="lazy"
                      />
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </div>
          </div>
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
                          colorMapping[itemColor?.nameColor] || "#defaultcolor",
                      };
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
                            onChange={() =>
                              handleChangeSelectColor(itemColor, index)
                            }
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
                      );
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
                            selector: itemSize.name === selectedSize,
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
                            onClick={() =>
                              handleChangeSelectSize(itemSize.name)
                            }
                          >
                            <span>{itemSize.name}</span>
                          </label>
                        </div>
                      );
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
                    onClick={() => handleChangeCount("decrease", amount === 1)}
                    className={cx("qty-btn")}
                  />
                  <input
                    type="text"
                    value={amount}
                    onChange={handleChangeAmount}
                    onBlur={handleBlur}
                    className={cx("quantity-selector")}
                  />
                  <input
                    type="button"
                    value="+"
                    onClick={() => handleChangeCount("increase")}
                    className={cx("qty-btn")}
                  />
                </div>
              </div>
              <div className={cx("wrap-btn")}>
                <div className={cx("wrap-add-cart")}>
                  {detailProduct?.countInStock > 0 ? (
                    <button
                      onClick={handleAddToCart}
                      className={cx("cart-btn")}
                    >
                      <AddShoppingCartIcon
                        sx={{
                          fontSize: 30,
                          paddingRight: "5px",
                        }}
                      />
                      <span>Thêm vào giỏ hàng</span>
                    </button>
                  ) : (
                    <button className={cx("cart-btn", "out-row")}>
                      <span>Sản phẩm hết hàng</span>
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
        </div>
      </div>
    </div>
  );
}

export default MainProductDetail;
