import classNames from "classnames/bind";
import { useQuery } from "react-query";
import styles from "./ModalCategory.module.scss";
import { CustomizeAccordion } from "@/components/CustomMaterial/CustomMaterial";
import { getAllCategory } from "@/services/categoryService";
import { useDeliveryInfo } from "@/hook/useContext";

const cx = classNames.bind(styles);
function ModalCategory() {
  const { setShowModalCategory, showModalCategory } = useDeliveryInfo();

  const handleCloseModal = () => {
    setShowModalCategory(false);
  };

  const { data: listCategory } = useQuery({
    queryKey: "listCategoryModal",
    queryFn: () => getAllCategory(),
  });

  return (
    <div
      className={cx("site-cart", {
        active: showModalCategory,
      })}
    >
      <div className={cx("site-nav-search")}>
        <div className={cx("site-header")}>
          <h3 className={cx("site-header-text")}>Danh mục</h3>
        </div>
        <div className={cx("wrap-modal-content")}>
          <CustomizeAccordion listCategory={listCategory} />
        </div>
      </div>
      <button onClick={handleCloseModal} className={cx("hamburger-menu")}>
        <span className={cx("bar")}></span>
      </button>
    </div>
  );
}

export default ModalCategory;
