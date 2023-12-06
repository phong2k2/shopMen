import classNames from "classnames/bind";
import PropTypes from "prop-types";
import styles from "./CategoryItem.module.scss";

const cx = classNames.bind(styles);
function CategoryItem({ handleClickNavigate, subCategories }) {
  return (
    <ul className={cx("list-submenu")}>
      {subCategories?.map((itemMenu, index) => {
        return (
          <li className={cx("item-submenu")} key={index}>
            <a onClick={() => handleClickNavigate(itemMenu)}>
              {itemMenu?.name}
            </a>
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
