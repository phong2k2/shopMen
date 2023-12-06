import classNames from "classnames/bind";
import styles from "./Modal.module.scss";
import { useDeliveryInfo } from "@/hook/useContext";
import { useDispatch, useSelector } from "react-redux";
import config from "@/config";
import { useNavigate } from "react-router-dom";
import { getTotals, removeFromCart } from "@/redux/cartSlice";
import { useEffect } from "react";
import ModalCart from "./ModalCart/ModalCart";
import ModalSearch from "./ModalSearch/ModalSearch";

const cx = classNames.bind(styles);
function Modal() {
  const {
    showModalCart,
    setShowModalCart,
    showModalSearch,
    setShowModalSearch,
  } = useDeliveryInfo();
  const user = useSelector((state) => state.auth.login?.currentUser?.data);
  const cart = useSelector((state) => state.cart);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTotals());
  }, [cart, dispatch]);

  const handleRemoveCart = (itemRemove) => {
    dispatch(removeFromCart({ itemRemove }));
  };

  const handleClickNextPageCart = () => {
    navigate(config.publicRouter.cart);
    setShowModalCart(false);
  };

  const handleClickNextPagePay = () => {
    navigate(`/checkout/${user?._id}`);
    setShowModalCart(false);
  };

  const handleClickNextLogin = () => {
    navigate(config.publicRouter.auth);
    setShowModalCart(false);
  };

  const handleCloseModal = () => {
    setShowModalCart(false);
    setShowModalSearch(false);
  };

  return (
    <div
      className={cx("site-cart", { active: showModalCart || showModalSearch })}
    >
      {/* Modal Cart */}
      {showModalCart && (
        <ModalCart
          handleRemoveCart={handleRemoveCart}
          handleClickNextPageCart={handleClickNextPageCart}
          handleClickNextPagePay={handleClickNextPagePay}
          handleClickNextLogin={handleClickNextLogin}
          user={user}
          cart={cart}
        />
      )}

      {showModalSearch && <ModalSearch />}

      <button onClick={handleCloseModal} className={cx("hamburger-menu")}>
        <span className={cx("bar")}></span>
      </button>
    </div>
  );
}

export default Modal;
