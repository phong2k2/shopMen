import MenuItems from "./MenuItems";
import PropTypes from "prop-types";
function Menu({ items, handleClickLogout }) {
  return (
    <ul>
      {items.map((item, index) => {
        return (
          <MenuItems
            key={index}
            onClick={() => {
              if (item.logout) {
                handleClickLogout();
              }
            }}
            item={item}
          />
        );
      })}
    </ul>
  );
}
Menu.propTypes = {
  items: PropTypes.array,
  handleClickLogout: PropTypes.func,
};
export default Menu;
