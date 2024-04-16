import classNames from "classnames/bind";
import Button from "../Button";
import PropTypes from "prop-types";
import styles from "./Menu.module.scss";

const cx = classNames.bind(styles);
function MenuItems({ item, onClick }) {
  return (
    <li className={cx("item")}>
      <Button to={item?.to} onClick={onClick}>
        {item?.title}
      </Button>
    </li>
  );
}

MenuItems.propTypes = {
  item: PropTypes.object,
  onClick: PropTypes.func,
};
export default MenuItems;
