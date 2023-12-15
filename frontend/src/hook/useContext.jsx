import PropTypes from "prop-types";
import { createContext, useContext, useState } from "react";

const DeliveryInfoContext = createContext();
const useDeliveryInfo = () => useContext(DeliveryInfoContext);

function DeliveryInfoProvider({ children }) {
  const [provinces, setProvinces] = useState([]);
  const [provinceId, setProvinceId] = useState();
  const [districts, setDistricts] = useState([]);
  const [districtId, setDistrictId] = useState();
  const [wards, setWards] = useState([]);
  const [wardId, setWardId] = useState();
  const [city, setCity] = useState("");
  const [showModalCart, setShowModalCart] = useState(false);
  const [showModalSearch, setShowModalSearch] = useState(false);
  const [showModalCategory, setShowModalCategory] = useState(false);
  const [showModalFilter, setShowModalFilter] = useState(false);
  const [filter, setFilter] = useState();

  return (
    <DeliveryInfoContext.Provider
      value={{
        provinces,
        setProvinces,
        provinceId,
        setProvinceId,
        districts,
        setDistricts,
        districtId,
        setDistrictId,
        wards,
        setWards,
        wardId,
        setWardId,
        city,
        setCity,
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
