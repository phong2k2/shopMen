import { Link } from "react-router-dom";
import classNames from "classnames/bind";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import styles from "./Category.module.scss";
import CategoryItem from "./CategoryItem";
import PropTypes from "prop-types";
import { PUBLICROUTER } from "@/config/routes";

const cx = classNames.bind(styles);
function Category({ categories }) {
  return (
    <li className={cx("has-sub")}>
      <Link
        to={PUBLICROUTER.product.category(categories?._id, categories?.name)}
        className={cx("text-nav")}
      >
        {categories?.name}
        {categories?.subCategory?.length > 0 && (
          <KeyboardArrowDownIcon className={cx("arrowDownIcon")} />
        )}
      </Link>
      <CategoryItem subCategories={categories?.subCategory} />
    </li>
  );
}

Category.propTypes = {
  categories: PropTypes.object,
  handleClickNavigate: PropTypes.func,
};

export default Category;
