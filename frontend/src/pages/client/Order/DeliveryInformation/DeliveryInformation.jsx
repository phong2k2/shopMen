import { useEffect, useState } from "react"
import classNames from "classnames/bind"
import styles from "./DeliveryInformation.module.scss"
import PropTypes from "prop-types"
import { Controller, useForm } from "react-hook-form"
import { useDispatch } from "react-redux"
import { yupResolver } from "@hookform/resolvers/yup"
import InputField from "@/components/form-controls/InputField/InputField"
import { RadioGroup, FormControlLabel, Radio } from "@mui/material"
import PayPal from "../../Paypal"
import { useQuery } from "react-query"
import { getClientIdPaypal } from "@/services/paymentService"
import { schemaCheckout } from "@/validations/yupSchema"
import LocationSelector from "@/components/LocationSelector"
import { setLocationsAddress } from "@/redux/modalAddressSlice"
import { formatPrice } from "@/utils/formatPrice"

const cx = classNames.bind(styles)
const DeliveryInformation = function DeliveryInformation({
  addressUserOrder,
  shippingCost,
  payments,
  activePayment,
  handleChangeActivePayment,
  handleSubmitCreateOrder,
  optionsPayPal
}) {
  const [isShowPayment, setIsShowPayment] = useState(false)
  const dispatch = useDispatch()
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schemaCheckout)
  })

  useEffect(() => {
    if (addressUserOrder) {
      const { province, district, ward } = addressUserOrder
      reset(addressUserOrder)
      dispatch(
        setLocationsAddress({
          province,
          district,
          ward
        })
      )
    }
  }, [addressUserOrder, reset])

  //Get Client Id
  const { data: clientId } = useQuery({
    queryKey: "clientId",
    queryFn: () => getClientIdPaypal()
  })

  const handleChangePayment = (payment) => {
    handleChangeActivePayment(payment)
    const namePayment = payment?.name.toLowerCase()
    if (namePayment.includes("paypal")) {
      setIsShowPayment(true)
    } else {
      setIsShowPayment(false)
    }
  }

  return (
    <div className={cx("step")}>
      <div className={cx("step-section")}>
        <h2 className={cx("title-delivery")}>Thông tin giao hàng</h2>
        <form onSubmit={handleSubmit(handleSubmitCreateOrder)}>
          <div className={cx("section-content")}>
            <div className={cx("fieldset")}>
              <div className={cx("field")}>
                <div className={cx("field-input-wrapper")}>
                  <label className={cx("filed-label")} htmlFor="">
                    Họ và tên
                  </label>
                  <InputField
                    className={cx("input-delivery")}
                    name="name"
                    validate={register("name")}
                    errors={errors}
                  />
                </div>
              </div>
              <div className={cx("field", "field-two-thirds")}>
                <div className={cx("field-input-wrapper")}>
                  <label className={cx("filed-label")} htmlFor="">
                    Email
                  </label>
                  <InputField
                    className={cx("input-delivery")}
                    name="email"
                    validate={register("email")}
                    errors={errors}
                  />
                </div>
              </div>
              <div className={cx("field", "field-two-thirds")}>
                <div className={cx("field-input-wrapper")}>
                  <label className={cx("filed-label")} htmlFor="">
                    Số điện thoại
                  </label>
                  <InputField
                    className={cx("input-delivery")}
                    name="phone"
                    validate={register("phone")}
                    errors={errors}
                  />
                </div>
              </div>
            </div>
            <div className={cx("clear")}></div>
          </div>

          <div className={cx("section-content")}>
            <div className={cx("fieldset")}>
              <div className={cx("field")}>
                <div className={cx("field-input-wrapper")}>
                  <label className={cx("filed-label")} htmlFor="">
                    Địa chỉ
                  </label>
                  <InputField
                    name="address"
                    validate={register("address")}
                    errors={errors}
                  />
                </div>
              </div>
              <div className={cx("field")}>
                <div className={cx("form-group")}>
                  <div className={cx("row")}>
                    <div className={cx("col-12")}>
                      <LocationSelector />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={cx("clear")}></div>
          </div>

          <div className={cx("change-pick")}>
            <div className={cx("section-shipping")}>
              <div className={cx("fieldset")}>
                <div className={cx("field")}>
                  <div className={cx("section-header")}>
                    <h2>Phương thức vận chuyển</h2>
                  </div>
                  <div className={cx("section-content")}>
                    <div className={cx("radio-wrapper")}>
                      <div className={cx("radio-content")}>
                        <input
                          defaultChecked={true}
                          type="radio"
                          className={cx("radio-input")}
                        />
                        <span className={cx("radio-label")}>
                          Giao hàng tận nơi
                        </span>
                        <span className={cx("radio-price")}>
                          {formatPrice(shippingCost)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className={cx("section-payment")}>
              <div className={cx("fieldset")}>
                <div className={cx("field")}>
                  <div className={cx("section-content")}>
                    <h2>Phương thức thanh toán</h2>
                  </div>
                  <div className={cx("section-content")}>
                    <div className={cx("radio-wrapper")}>
                      <div className={cx("radio-content")}>
                        <Controller
                          name="payment"
                          control={control}
                          render={({ field }) => (
                            <RadioGroup
                              {...field}
                              value={field.value || ""}
                              aria-labelledby="demo-controlled-radio-buttons-group"
                            >
                              {payments?.map((payment) => (
                                <FormControlLabel
                                  key={payment?._id}
                                  value={payment?._id}
                                  sx={{
                                    "& .MuiTypography-root": {
                                      fontSize: 12
                                    }
                                  }}
                                  checked={activePayment?._id === payment?._id}
                                  onChange={() => handleChangePayment(payment)}
                                  control={
                                    <Radio
                                      sx={{
                                        "& .MuiSvgIcon-root": {
                                          fontSize: 20
                                        }
                                      }}
                                    />
                                  }
                                  label={payment?.name}
                                />
                              ))}
                            </RadioGroup>
                          )}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Button Paypal */}
          {isShowPayment ? (
            <div className={cx("step-footer")}>
              <PayPal optionsPayPal={optionsPayPal} clientId={clientId} />
            </div>
          ) : (
            <div className={cx("step-footer")}>
              <button className={cx("btn-complete-order")}>
                Hoàn tất đơn hàng
              </button>
              <div className={cx("clear")}></div>
            </div>
          )}
        </form>
      </div>
    </div>
  )
}

DeliveryInformation.propTypes = {
  addressUserOrder: PropTypes.object,
  shippingCost: PropTypes.number,
  payments: PropTypes.array,
  onChange: PropTypes.func,
  handleSubmitCreateOrder: PropTypes.func,
  handleChangeActivePayment: PropTypes.func,
  activePayment: PropTypes.object,
  optionsPayPal: PropTypes.object
}

export default DeliveryInformation
