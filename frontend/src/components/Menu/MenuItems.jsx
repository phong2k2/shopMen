import Button from "../Button";
import PropTypes from "prop-types";
function MenuItems({ tabItem, onClick }) {
  return (
    <Button to={tabItem?.to} onClick={onClick}>
      {tabItem?.title}
    </Button>
  );
}

MenuItems.propTypes = {
  tabItem: PropTypes.object,
  onClick: PropTypes.func,
};
export default MenuItems;
