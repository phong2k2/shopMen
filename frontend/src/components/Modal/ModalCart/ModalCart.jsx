import classNames from "classnames/bind";
import styles from "./ModalCart.module.scss";
import { useDeliveryInfo } from "@/hook/useContext";
import { useNavigate } from "react-router-dom";
import { formatPrice } from "../../formatData/formatData";
import { Button } from "@mui/material";
import PropTypes from "prop-types";

const cx = classNames.bind(styles);
function ModalCart({
  handleRemoveCart,
  handleClickNextPageCart,
  handleClickNextPagePay,
  handleClickNextLogin,
  user,
  cart,
}) {
  const navigate = useNavigate();
  const { setShowModalCart } = useDeliveryInfo();

  const handleNextPage = (slug) => {
    navigate(`/products/${slug}`);
    setShowModalCart(false);
  };
  return (
    <div className={cx("site-nav-container")}>
      <p className={cx("title")}>Giỏ hàng</p>
      <div className={cx("cart-view")}>
        <table>
          <tbody>
            {cart?.cartItems?.length ? (
              cart?.cartItems?.map((cartItem, index) => {
                console.log("🚀 ~ cartItem:", cartItem);
                return (
                  <tr key={index} className={cx("card-item")}>
                    <td className={cx("pro-img")}>
                      <a onClick={() => handleNextPage(cartItem?.slug)}>
                        <img src={cartItem?.image} alt="anh san pham" />
                      </a>
                    </td>
                    <td className={cx("content-cart")}>
                      <div className={cx("title")}>
                        <a
                          className={cx("name")}
                          onClick={() => handleNextPage(cartItem?.slug)}
                        >
                          {cartItem?.name}
                        </a>
                        <span
                          className={cx("variant")}
                        >{`${cartItem?.size} / ${cartItem?.color}`}</span>
                        <span className={cx("quantity-view")}>
                          {cartItem?.amount}
                        </span>
                        <span className={cx("price")}>
                          {formatPrice(cartItem?.price)}
                        </span>
                      </div>
                      <span className={cx("remove-pro")}>
                        <button onClick={() => handleRemoveCart(cartItem)}>
                          <i className="fa-solid fa-xmark"></i>
                        </button>
                      </span>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td className={cx("pro-null")}>Hiện chưa có sản phẩm</td>
              </tr>
            )}
          </tbody>
        </table>

        <div className={cx("table-total")}>
          <span className={cx("line")}></span>
          <div className={cx("total-price")}>
            <h3>Tổng tiền:</h3>
            <span>{formatPrice(cart?.cartTotalAmount)}</span>
          </div>

          <div className={cx("button-cart")}>
            <Button
              onClick={handleClickNextPageCart}
              className={cx("btn-submit", "mr-3")}
            >
              Xem giỏ hàng
            </Button>
            {user ? (
              cart?.cartItems?.length > 0 ? (
                <Button
                  onClick={handleClickNextPagePay}
                  className={cx("btn-submit")}
                >
                  Thanh toán
                </Button>
              ) : (
                <Button className={cx("btn-submit")}>Thanh toán</Button>
              )
            ) : (
              <Button
                className={cx("btn-submit")}
                onClick={handleClickNextLogin}
              >
                Vui lòng đăng nhập
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

ModalCart.propTypes = {
  handleRemoveCart: PropTypes.func,
  handleClickNextPageCart: PropTypes.func,
  handleClickNextPagePay: PropTypes.func,
  handleClickNextLogin: PropTypes.func,
  user: PropTypes.object,
  cart: PropTypes.object,
};

export default ModalCart;
