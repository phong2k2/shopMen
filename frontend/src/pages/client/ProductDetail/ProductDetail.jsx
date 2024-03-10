import classNames from "classnames/bind";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import parse from "html-react-parser";
import { toast } from "react-toastify";
import * as productService from "@/services/productService";
import styles from "./ProductDetail.module.scss";
import { useQuery } from "react-query";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";

import { addToCart, getTotals } from "@/redux/cartSlice";
import { formatPrice } from "@/components/formatData/formatData";
import { useDeliveryInfo } from "@/hook/useContext";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { productSizes } from "@/contant";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import NavContent from "@/components/NavContent";
import ProductRelated from "../ProductRelated/index.js";

const cx = classNames.bind(styles);
function ProductDetail() {
  const { slug } = useParams();
  const [amount, setAmount] = useState(1);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [indexActive, setIndexActive] = useState(0);
  const { setShowModalCart } = useDeliveryInfo();
  const dispatch = useDispatch();
  const colorRef = useRef([]);
  const LIMIT = 10;

  const colorMapping = {
    Đen: "#000",
    Xanh: "#0c2461",
    Trắng: "#ffff",
    Cam: "#c47a4a ",
    Đỏ: "#ff0000",
  };

  // Get products Detail
  const { data: detailProduct } = useQuery({
    queryKey: ["productDetail", slug],
    queryFn: () => productService.getProductDetail(slug),
  });

  const navName = [detailProduct?.category?.name, detailProduct?.name];
  // Images
  const images = detailProduct?.color[indexActive]?.gallery;
  // Sizes
  const sizes = detailProduct?.color[indexActive]?.size;
  // ----
  function isSizeInProduct(size) {
    return sizes?.some((productSize) => productSize.size === size);
  }

  // Get product related
  const { data: allProductRelated } = useQuery({
    queryKey: [
      "productRelated",
      detailProduct?.category?._id,
      detailProduct?._id,
    ],
    queryFn: () => {
      let categoryId = detailProduct?.category?._id;
      let removeId = detailProduct?._id;
      return productService.getAllProductsRelated(categoryId, removeId, LIMIT);
    },
    enabled:
      detailProduct?.category !== undefined && detailProduct?._id !== undefined,
  });

  const handleChangeSelectColor = (item, index) => {
    setIndexActive(index);
    setSelectedColor(item);
    setSelectedSize("");
  };

  const handleChangeSelectSize = (size) => {
    setSelectedSize(size);
  };

  // Active lần đầu
  useEffect(() => {
    setSelectedColor(detailProduct?.color[0]);
  }, [detailProduct]);

  // Increase product quantity
  const handleChangeCount = (type, limited) => {
    if (type === "decrease") {
      if (!limited) {
        setAmount(amount - 1);
      }
    } else {
      setAmount(amount + 1);
    }
  };

  // Decrease product quantity
  const handleChangeAmount = (e) => {
    let newValue = e.target.value;
    if (!newValue || !isNaN(newValue)) {
      if (newValue > 999) {
        newValue = 999;
      }
      setAmount(Number(newValue));
    }
  };

  const handleBlur = (e) => {
    let number = parseInt(e.target.value);
    if (number) {
      setAmount(number);
    } else {
      setAmount(1);
    }
  };

  //Add to Cart
  const handleAddToCart = () => {
    if (!selectedSize) return toast.error("Vui lòng chọn size");
    if (detailProduct) {
      dispatch(
        addToCart({
          orderItem: {
            name: detailProduct?.name,
            image: images[0]?.image.url || detailProduct?.image?.url,
            amount: amount,
            price: detailProduct?.salePrice,
            salePrice: detailProduct?.salePrice,
            color: selectedColor?.nameColor,
            size: selectedSize,
            product: detailProduct?._id,
            slug: detailProduct?.slug,
          },
        })
      );
      dispatch(getTotals());
      setShowModalCart(true);
    }
  };

  return (
    <div className={cx("product-detail")}>
      <NavContent navName={navName} />

      <div className={cx("container")}>
        <div className={cx("row")}>
          <div className={cx("col-md-12")}>
            <div className={cx("row")}>
              <div className={cx("col-md-8 col-sm-12")}>
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
                        <SwiperSlide key={item?._id}>
                          <img
                            style={{ width: "100%" }}
                            src={item?.image?.url}
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
                            src={item?.image?.url}
                            className={cx("swiper-slide-auto")}
                            alt={item?.nameImage}
                            loading="lazy"
                          />
                        </SwiperSlide>
                      );
                    })}
                  </Swiper>
                </div>
              </div>
              <div className={cx("col-md-4 col-sm-12", "product-content")}>
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
                              colorMapping[itemColor?.nameColor] ||
                              "#defaultcolor",
                          };
                          return (
                            <div
                              ref={colorRef}
                              key={index}
                              className={cx(
                                "swatch-element",
                                selectedColor?.nameColor ===
                                  itemColor?.nameColor
                                  ? "selector"
                                  : ""
                              )}
                            >
                              <input
                                onChange={() =>
                                  handleChangeSelectColor(itemColor, index)
                                }
                                checked={
                                  selectedColor?.nameColor ===
                                  itemColor?.nameColor
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
                                <span style={colorStyle}>
                                  {itemColor?.color}
                                </span>
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
                        onClick={() =>
                          handleChangeCount("decrease", amount === 1)
                        }
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
                  <div className={cx("wrap-addCart")}>
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
                  <div className={cx("wrap-addOrder")}>
                    <button onClick={handleAddToCart} className={cx("btn-buy")}>
                      <span>Mua ngay</span>
                    </button>
                  </div>
                  <div className={cx("process_product")}>
                    <div
                      className={cx("accordion")}
                      id="accordionProcessProduct"
                    >
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
                        <h2
                          className={cx("accordion-header")}
                          id="headingThree"
                        >
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
        {/* Descriptions */}
        <div className={cx("row")}>
          <div className={cx("col-md-12")}>
            <div className={cx("infoBody")}>
              <div className={cx("infomation-product")}>
                <h3 className={cx("heading-detail")}>Thông tin sản phẩm</h3>
                <span className={cx("line")}></span>
                <div className={cx("content")}>
                  <div className={cx("product-description")}>
                    <div className={cx("content-description")}>
                      <h4 className={cx("describe")}>Mô tả:</h4>
                      <span>
                        {typeof detailProduct?.description === "string"
                          ? parse(detailProduct?.description)
                          : ""}
                      </span>
                    </div>

                    <div className={cx("parameter-description")}>
                      <h4 className={cx("parameter")}>Thông số:</h4>
                      <p>SIZE: {selectedSize?.size}</p>
                      <p>CHIỀU RỘNG: {selectedSize?.width}</p>
                      <p>CHIỀU DÀI: {selectedSize?.height}</p>
                      <p>KHỐI LƯỢNG: {selectedSize?.mass}</p>
                    </div>
                  </div>
                </div>

                {/* Product related */}
                <ProductRelated allItem={allProductRelated} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
