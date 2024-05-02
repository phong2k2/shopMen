import PropTypes from "prop-types";
import { createContext, useContext, useState } from "react";

const DeliveryInfoContext = createContext();
const useDeliveryInfo = () => useContext(DeliveryInfoContext);

function DeliveryInfoProvider({ children }) {
  const [showModalCart, setShowModalCart] = useState(false);
  const [showModalSearch, setShowModalSearch] = useState(false);
  const [showModalCategory, setShowModalCategory] = useState(false);
  const [showModalFilter, setShowModalFilter] = useState(false);
  const [filter, setFilter] = useState();

  return (
    <DeliveryInfoContext.Provider
      value={{
        showModalCart,
        setShowModalCart,
        showModalSearch,
        setShowModalSearch,
        setShowModalCategory,
        showModalCategory,
        showModalFilter,
        setShowModalFilter,
        filter,
        setFilter,
      }}
    >
      {children}
    </DeliveryInfoContext.Provider>
  );
}

DeliveryInfoProvider.propTypes = {
  children: PropTypes.node,
};

export { DeliveryInfoContext, useDeliveryInfo, DeliveryInfoProvider };
