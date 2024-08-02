import { forwardRef, useEffect, useState } from "react"
import classNames from "classnames/bind"
import styles from "./ModalAddress.module.scss"
import { useForm } from "react-hook-form"
import InputField from "@/components/form-controls/InputField"
import CloseIcon from "@mui/icons-material/Close"
import { yupResolver } from "@hookform/resolvers/yup"
import { schemaAddress } from "@/validations/yupSchema"
import { getAddressDetail } from "@/services/addressService"
import { useQuery } from "react-query"
import { useDispatch, useSelector } from "react-redux"
import {
  closeModalAddress,
  setLocationsAddress
} from "@/redux/modalAddressSlice"
import LocationSelector from "../LocationSelector"

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
  const [statusAddress, setStatusAddress] = useState()
  const { isShowModalAddress } = useSelector((state) => state.modalAddress)
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

  const { data: addressDetail } = useQuery({
    queryKey: ["addressDetail", addressId],
    queryFn: () => getAddressDetail(addressId),
    enabled: addressId !== undefined
  })

  useEffect(() => {
    if (isValid) {
      reset(initAddress)
      dispatch(setLocationsAddress(null))
    } else {
      if (addressDetail) {
        const { province, district, ward } = addressDetail
        reset(addressDetail)
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
                    <LocationSelector />
                  </div>
                </div>
              </div>

              <div className={cx("form-group")}>
                <div className={cx("row")}>
                  <div className={cx("col-12")}>
                    <InputField
                      name={"address"}
                      validate={register("address")}
                      errors={errors}
                      placeholder="Địa chỉ cụ thể: Số nhà, tên đường,..."
                    />
                  </div>
                </div>
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
