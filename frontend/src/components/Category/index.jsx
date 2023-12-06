import classNames from "classnames/bind";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import styles from "./Category.module.scss";
import CategoryItem from "./CategoryItem";
import PropTypes from "prop-types";

const cx = classNames.bind(styles);
function Category({ categories, handleClickNavigate }) {
  return (
    <li className={cx("has-sub")}>
      <a
        className={cx("text-nav")}
        onClick={() => handleClickNavigate(categories)}
      >
        {categories?.name}
        {categories?.subCategory?.length > 0 && (
          <KeyboardArrowDownIcon className={cx("arrowDownIcon")} />
        )}
      </a>
      <CategoryItem
        handleClickNavigate={handleClickNavigate}
        subCategories={categories?.subCategory}
      />
    </li>
  );
}

Category.propTypes = {
  categories: PropTypes.object,
  handleClickNavigate: PropTypes.func,
};

export default Category;
