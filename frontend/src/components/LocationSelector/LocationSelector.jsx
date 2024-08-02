import classNames from "classnames/bind"
import styles from "./LocationSelector.module.scss"
import { useDispatch, useSelector } from "react-redux"
import { useQuery } from "react-query"
import { useState } from "react"
import {
  getDistricts,
  getProvinces,
  getWards
} from "@/services/provincesService"
import { setLocationsAddress } from "@/redux/modalAddressSlice"

const cx = classNames.bind(styles)
function LocationSelector() {
  const [activeTab, setActiveTab] = useState("province")
  const [showSelectCountry, setShowSelectCountry] = useState(false)
  const { locations } = useSelector((state) => state.modalAddress)
  const dispatch = useDispatch()

  // Fetch Api
  const { data: allProvinces } = useQuery({
    queryKey: "allProvinces",
    queryFn: () => getProvinces()
  })

  const { data: allDistrict } = useQuery({
    queryKey: ["allDistricts", locations?.province?.id],
    queryFn: () => getDistricts(locations?.province?.id),
    enabled: locations?.province?.id !== undefined
  })

  const { data: allWard } = useQuery({
    queryKey: ["allWards", locations?.province?.id, locations?.district?.id],
    queryFn: () => getWards(locations?.district?.id),
    enabled: locations?.district?.id !== undefined
  })

  const handleClickActive = (active) => setActiveTab(active)

  const handleSetLocations = (
    { target: { dataset } },
    nameField,
    nextField
  ) => {
    const { id, name } = dataset
    if (!id && !name) return

    dispatch(
      setLocationsAddress({
        ...locations,
        [nameField]: {
          id,
          name
        }
      })
    )

    if (nameField === "ward") {
      setShowSelectCountry(false)
    }
    setActiveTab(nextField)
  }

  return (
    <div
      onClick={() => setShowSelectCountry((prev) => !prev)}
      className={cx("select-custom-group")}
    >
      <div className={cx("select-custom-country")}>
        {locations?.province?.name
          ? `${locations?.ward?.name || "..."}, ${
              locations?.district?.name || "..."
            }, ${locations?.province?.name}`
          : "Tỉnh/Thành phố, Quận/Huyện, Phường/Xã *"}
        <i className="bi bi-chevron-down"></i>
      </div>
      <div
        onClick={(e) => e.stopPropagation()}
        className={cx("country-options", {
          "show-modal": showSelectCountry
        })}
      >
        <div className={cx("header-tabs")}>
          <ul className={cx("menu-tabs")}>
            <li
              onClick={() => handleClickActive("province")}
              className={cx("tab-city", {
                active: activeTab === "province"
              })}
            >
              Tỉnh/Thành phố
            </li>
            <li
              onClick={() => handleClickActive("district")}
              className={cx("tab-district", {
                active: activeTab === "district"
              })}
            >
              Quận/Huyện
            </li>
            <li
              onClick={() => handleClickActive("ward")}
              className={cx("tab-ward", {
                active: activeTab === "ward"
              })}
            >
              Phường/Xã
            </li>
          </ul>
        </div>
        <div className={cx("body-result")}>
          {activeTab === "province" && (
            <ul className={cx("list-country", "list-city")}>
              {allProvinces?.map((itemProvince) => (
                <li
                  data-id={itemProvince?.province_id}
                  data-name={itemProvince?.province_name}
                  onClick={(e) => handleSetLocations(e, "province", "district")}
                  key={itemProvince?.province_id}
                  className={cx("item-list")}
                >
                  {itemProvince?.province_name}
                </li>
              ))}
            </ul>
          )}

          {activeTab === "district" && (
            <ul className={cx("list-country", "list-district")}>
              {allDistrict?.map((district) => (
                <li
                  key={district?.district_id}
                  data-id={district?.district_id}
                  data-name={district?.district_name}
                  onClick={(e) => handleSetLocations(e, "district", "ward")}
                  className={cx("item-list")}
                >
                  {district?.district_name}
                </li>
              ))}
            </ul>
          )}

          {activeTab === "ward" && (
            <ul className={cx("list-country", "list-ward")}>
              {allWard?.map((ward) => (
                <li
                  key={ward?.ward_id}
                  data-id={ward?.ward_id}
                  data-name={ward?.ward_name}
                  onClick={(e) => handleSetLocations(e, "ward", "province")}
                  className={cx("item-list")}
                >
                  {ward?.ward_name}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}

export default LocationSelector
