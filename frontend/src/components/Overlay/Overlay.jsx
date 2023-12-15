import classNames from "classnames/bind";
import styles from "./Overlay.module.scss";
import { useDeliveryInfo } from "@/hook/useContext";

const cx = classNames.bind(styles);
function Overlay() {
  const {
    showModalCart,
    setShowModalCart,
    showModalSearch,
    setShowModalSearch,
    showModalFilter,
    setShowModalFilter,
    setShowModalCategory,
    showModalCategory,
  } = useDeliveryInfo();
  const handleCloseModal = () => {
    setShowModalCart(false);
    setShowModalSearch(false);
    setShowModalFilter(false);
    setShowModalCategory(false);
  };
  return (
    <div
      onClick={handleCloseModal}
      className={cx("site-overlay", {
        active:
          showModalCart ||
          showModalSearch ||
          showModalFilter ||
          showModalCategory,
      })}
    ></div>
  );
}

export default Overlay;
