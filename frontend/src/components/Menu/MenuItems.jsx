import Button from "../Button";
import PropTypes from "prop-types";
function MenuItems({ tabItem, onClick }) {
  return (
    <li>
      <Button to={tabItem?.to} onClick={onClick}>
        {tabItem?.title}
      </Button>
    </li>
  );
}

MenuItems.propTypes = {
  tabItem: PropTypes.object,
  onClick: PropTypes.func,
};
export default MenuItems;
