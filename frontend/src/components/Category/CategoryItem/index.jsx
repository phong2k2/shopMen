import { Link } from "react-router-dom";
import classNames from "classnames/bind";
import PropTypes from "prop-types";
import styles from "./CategoryItem.module.scss";
import { PUBLICROUTER } from "@/config/routes";

const cx = classNames.bind(styles);
function CategoryItem({ subCategories }) {
  return (
    <ul className={cx("list-submenu")}>
      {subCategories?.map((item, index) => {
        return (
          <li className={cx("item-submenu")} key={index}>
            <Link to={PUBLICROUTER.product.subCategory(item._id, item?.name)}>
              {item?.name}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

CategoryItem.propTypes = {
  handleClickNavigate: PropTypes.func,
  subCategories: PropTypes.array,
  nameCategory: PropTypes.string,
};

export default CategoryItem;
