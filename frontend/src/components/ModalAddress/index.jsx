import { forwardRef, useEffect, useState } from "react"
import classNames from "classnames/bind"
import styles from "./ModalAddress.module.scss"
import { useForm } from "react-hook-form"
import InputField from "@/components/form-controls/InputField"
import CloseIcon from "@mui/icons-material/Close"
import { yupResolver } from "@hookform/resolvers/yup"
import { schemaAddress } from "@/validations/yupSchema"
import {
  getDistricts,
  getProvinces,
  getWards
} from "@/services/provincesService"
import { getAddressDetail } from "@/services/addressService"
import { useQuery } from "react-query"
import { useDispatch, useSelector } from "react-redux"
import {
  closeModalAddress,
  setLocationsAddress
} from "@/redux/modalAddressSlice"

const initAddress = {
  name: "",
  email: "",
  address: "",
  phone: ""
}

const cx = classNames.bind(styles)
const ModalAddress = forwardRef(function ModalAddress(
  { handleSubmitAddress, addressId, isValid },
  ref
) {
  const [showSelectCountry, setShowSelectCountry] = useState(false)
  const [activeTab, setActiveTab] = useState("province")
  const [statusAddress, setStatusAddress] = useState()

  const { isShowModalAddress, locations } = useSelector(
    (state) => state.modalAddress
  )
  const dispatch = useDispatch()

  const {
    register,
    formState: { errors },
    reset,
    handleSubmit
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schemaAddress)
  })

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

  const { data: addressDetail } = useQuery({
    queryKey: ["addressDetail", addressId],
    queryFn: () => getAddressDetail(addressId),
    enabled: addressId !== undefined
  })

  useEffect(() => {
    if (isValid) {
      setActiveTab("province")
      reset(initAddress)
      dispatch(setLocationsAddress(null))
    } else {
      if (addressDetail) {
        reset(addressDetail)
        const { province, district, ward } = addressDetail
        dispatch(
          setLocationsAddress({
            province,
            district,
            ward
          })
        )
        setStatusAddress(addressDetail?.status)
      }
    }
  }, [addressDetail, isValid, reset])

  const handleClickActive = (active) => {
    setActiveTab(active)
  }

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
      onClick={() => dispatch(closeModalAddress())}
      className={cx("modal-container", {
        show: isShowModalAddress
      })}
    >
      <div onClick={(e) => e.stopPropagation()} className={cx("modal-dialog")}>
        <form onSubmit={handleSubmit(handleSubmitAddress)}>
          <div className={cx("modal-content")}>
            <div className={cx("modal-header")}>
              <h5 className={cx("modal-title")}>Địa chỉ mới</h5>
              <button className={cx("btn", "btn-close-modal")}>
                <CloseIcon
                  onClick={(e) => {
                    e.preventDefault()
                    dispatch(closeModalAddress())
                  }}
                  sx={{
                    fontSize: 25,
                    opacity: 0.8
                  }}
                />
              </button>
            </div>
            <div className={cx("modal-body")}>
              <div className={cx("form-group")}>
                <InputField
                  name={"name"}
                  validate={register("name")}
                  errors={errors}
                  placeholder="Họ tên người nhận"
                />
              </div>
              <div className={cx("form-group")}>
                <div className={cx("row")}>
                  <div className={cx("col-6")}>
                    <InputField
                      name={"phone"}
                      validate={register("phone")}
                      errors={errors}
                      placeholder="Số điện thoại di động"
                    />
                  </div>
                  <div className={cx("col-6")}>
                    <InputField
                      name={"email"}
                      validate={register("email")}
                      errors={errors}
                      placeholder="Email"
                    />
                  </div>
                </div>
              </div>
              <div className={cx("form-group")}>
                <div className={cx("row")}>
                  <div className={cx("col-12")}>
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
                                  onClick={(e) =>
                                    handleSetLocations(
                                      e,
                                      "province",
                                      "district"
                                    )
                                  }
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
                                  onClick={(e) =>
                                    handleSetLocations(e, "district", "ward")
                                  }
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
                                  onClick={(e) =>
                                    handleSetLocations(e, "ward", "province")
                                  }
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
                  </div>
                </div>
              </div>
              <div className={cx("form-group")}>
                <InputField
                  name={"address"}
                  validate={register("address")}
                  errors={errors}
                  placeholder="Địa chỉ cụ thể: Số nhà, tên đường,..."
                />
              </div>
              <div className={cx("form-group")}>
                <div className={cx("form-check")}>
                  <input
                    id="addressDefault"
                    type="checkbox"
                    ref={ref}
                    checked={!!statusAddress}
                    onChange={(e) => setStatusAddress(e.target.checked)}
                  />
                  <label
                    htmlFor="addressDefault"
                    className={cx("form-check-label")}
                  >
                    Đặt làm địa chỉ mặc định
                  </label>
                </div>
              </div>
            </div>
            <div className={cx("modal-footer")}>
              <div className={cx("form-group")}>
                <button
                  onClick={(e) => {
                    e.preventDefault()
                    dispatch(closeModalAddress())
                  }}
                  className={cx("btn", "btn-modal", "btn-return")}
                >
                  Trở lại
                </button>
                <button className={cx("btn", "btn-modal", "submit-add")}>
                  Xác nhận
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
})

export default ModalAddress
