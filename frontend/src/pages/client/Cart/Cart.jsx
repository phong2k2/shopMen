import classNames from "classnames/bind";
import styles from "./Cart.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  clearCart,
  decreaseCart,
  getTotals,
  increaseCart,
  removeFromCart,
} from "@/redux/cartSlice";
import { Link } from "react-router-dom";
import { formatPrice } from "@/components/formatData/formatData";
import config from "@/config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles);
function Cart() {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.login?.currentUser);

  useEffect(() => {
    dispatch(getTotals());
  }, [cart, dispatch]);

  const handleChangeCount = (type, itemProduct, limited) => {
    if (type === "decrease") {
      if (!limited) {
        dispatch(decreaseCart({ itemProduct }));
      }
    } else {
      dispatch(increaseCart({ itemProduct }));
    }
  };

  const handleRemoveFromCart = (itemRemove) => {
    dispatch(removeFromCart({ itemRemove }));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <div className={cx("cart")}>
      <div className={cx("content-cart")}>
        <div className={cx("breadcrumb-shop")}>
          <div className={cx("container")}>
            <div className={cx("row")}>
              <div className={cx("col-md-12")}>
                <ol className={cx("breadcrumb")}>
                  <li>
                    <a>
                      <span>Home</span>
                    </a>
                  </li>
                  <li>
                    <a>
                      <span>Giỏ hàng ({cart?.cartTotalQuantity})</span>
                    </a>
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>

        <div className={cx("container")}>
          <div className={cx("row")}>
            <div className={cx("col-md-12")}>
              <div className={cx("row")}>
                <div className={cx("col-md-9 col-sm-12")}>
                  <h1>Giỏ Hàng Của Bạn</h1>
                  {cart?.cartItems?.length === 0 ? (
                    <div className={cx("cart-empty")}>
                      <h2>Giỏ hàng của bạn đang trống</h2>
                      <div className={cx("start-shopping")}>
                        <Link to="/">
                          <button>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              fill="currentColor"
                              className="bi bi-arrow-left"
                              viewBox="0 0 16 16"
                            >
                              <path
                                fillRule="evenodd"
                                d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                              />
                            </svg>
                            <span>Tiếp tục mua hàng</span>
                          </button>
                        </Link>
                      </div>
                    </div>
                  ) : (
                    <div className={cx("list-cart")}>
                      <div className={cx("cart-row")}>
                        <h2>{`Bạn đang có ${cart?.cartItems?.length} sản phẩm trong giỏ hàng`}</h2>
                        <div className={cx("table-cart")}>
                          {cart?.cartItems?.map((cartItem, index) => {
                            return (
                              <div key={index} className={cx("item-cart")}>
                                <div className={cx("left")}>
                                  <a>
                                    <img src={cartItem?.image} alt="" />
                                  </a>
                                </div>
                                <div className={cx("right")}>
                                  <div className={cx("item-info")}>
                                    <h3>{cartItem?.name}</h3>
                                    <div className={cx("item-desc")}>
                                      <span>{`${cartItem?.size} / ${cartItem?.color}`}</span>
                                    </div>
                                  </div>
                                  <div className={cx("item-quantity")}>
                                    <input
                                      type="button"
                                      value="-"
                                      onClick={() =>
                                        handleChangeCount(
                                          "decrease",
                                          cartItem,
                                          cartItem?.amount === 1
                                        )
                                      }
                                      className={cx("qty-btn")}
                                    />
                                    <input
                                      type="button"
                                      value={cartItem.amount}
                                      className={cx("quantity-selector")}
                                    />
                                    <input
                                      type="button"
                                      value="+"
                                      onClick={() =>
                                        handleChangeCount("increase", cartItem)
                                      }
                                      className={cx("qty-btn")}
                                    />
                                  </div>
                                  <div className={cx("item-price")}>
                                    <p>
                                      <span>
                                        {formatPrice(cartItem?.price)}
                                      </span>
                                      {/* <del>300,00d</del> */}
                                    </p>
                                  </div>
                                  <div className={cx("item-total")}>
                                    <div className={cx("price")}>
                                      <span className={cx("text")}>
                                        Thành tiền
                                      </span>
                                      <span>
                                        {formatPrice(
                                          cartItem?.price * cartItem?.amount
                                        )}
                                      </span>
                                    </div>
                                    <div className={cx("remove")}>
                                      <a
                                        onClick={() =>
                                          handleRemoveFromCart(cartItem)
                                        }
                                      >
                                        <FontAwesomeIcon icon={faTrashCan} />
                                      </a>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                        <div className={cx("clear-car")}>
                          <button onClick={() => handleClearCart()}>
                            Xóa tất cả sản phẩm
                          </button>
                        </div>
                      </div>
                      <div className={cx("cart-row")}>
                        <div className={cx("row", "note-block")}>
                          <div
                            className={cx(
                              "col-md-5 col-xs-12",
                              "cart-left-block"
                            )}
                          >
                            <div
                              className={cx(
                                "checkout-buttons",
                                "clearfix-block"
                              )}
                            >
                              <label className={cx("note-label")}>
                                Ghi chú đơn hàng
                              </label>
                              <textarea
                                className={cx("form-control")}
                                id="note"
                                name="note"
                                rows="5"
                              ></textarea>
                            </div>
                          </div>
                          <div
                            className={cx(
                              "col-md-7 col-xs-12",
                              "cart-right-block"
                            )}
                          >
                            <div className={cx("policy_return")}>
                              <h4>Dịch vụ tại Kenta</h4>
                              <ul>
                                <li>
                                  Miễn phí giao hàng với hóa đơn trên 500k.
                                </li>
                                <li>
                                  TP.HCM nhận hàng trong 12h. Tỉnh thành khác
                                  trong 72h sau khi đặt.
                                </li>
                                <li>Bảo hành sản phẩm.</li>
                                <li>
                                  Sản phẩm được đổi trong 7 ngày, nguyên tag,
                                  chưa sử dụng, giặt ủi, có mùi lạ.
                                </li>
                                <li>
                                  Sản phẩm đổi giá trị bằng hoặc lớn hơn, sản
                                  phẩm Sale không áp dụng đổi.
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div className={cx("col-md-3 col-sm-12")}>
                  <a className={cx("next-order")} href="">
                    Tiếp tục mua hàng
                  </a>
                  <div className={cx("order-summary")}>
                    <h2 className={cx("order-title")}>Thông tin đơn hàng</h2>
                    <div className={cx("summary-total")}>
                      <p>
                        Tổng tiền:
                        <span>{formatPrice(cart?.cartTotalAmount)}</span>
                      </p>
                    </div>

                    {user ? (
                      <div className={cx("summary-actions")}>
                        {cart?.cartItems?.length > 0 ? (
                          <Link to={`/checkout/${user?._id}`}>Thanh toán</Link>
                        ) : (
                          <a>Thanh toán</a>
                        )}
                      </div>
                    ) : (
                      <div className={cx("summary-actions")}>
                        <Link to={config.PUBLICROUTER.auth}>
                          Đăng nhập để thanh toán
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
