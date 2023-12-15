import classNames from "classnames/bind";
import styles from "./ModalCategory.module.scss";
import { CustomizeAccordion } from "@/components/CustomMaterial/CustomMaterial";
import { getAllCategory } from "@/services/categoryService";
import { useQuery } from "react-query";

const cx = classNames.bind(styles);
function ModalCategory() {
  const { data: listCategory } = useQuery({
    queryKey: "listCategoryModal",
    queryFn: () => getAllCategory(),
  });

  return (
    <div className={cx("site-nav-search")}>
      <div className={cx("wrap-category")}>
        <CustomizeAccordion listCategory={listCategory} />
      </div>
    </div>
  );
}

export default ModalCategory;
