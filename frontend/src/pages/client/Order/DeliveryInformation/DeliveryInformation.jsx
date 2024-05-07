import { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./DeliveryInformation.module.scss";
import PropTypes from "prop-types";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { formatPrice } from "@/components/formatData/formatData";
import InputField from "@/components/form-controls/InputField/InputField";
import { RadioGroup, FormControlLabel, Radio } from "@mui/material";
import PayPal from "../../Paypal";
import { useQuery } from "react-query";
import { getClientIdPaypal } from "@/services/paymentService";
import { schemaCheckout } from "@/validations/yupSchema";
import {
  getDistricts,
  getProvinces,
  getWards,
} from "@/services/provincesService";

const initValue = {
  id: "",
  name: "",
};

const cx = classNames.bind(styles);
const DeliveryInformation = function DeliveryInformation({
  addressUserOrder,
  shippingCost,
  payments,
  activePayment,
  handleChangeActivePayment,
  handleSubmitCreateOrder,
  optionsPayPal,
}) {
  const [isShowPayment, setIsShowPayment] = useState(false);
  const [province, setProvince] = useState(initValue);
  const [district, setDistrict] = useState(initValue);
  const [ward, setWard] = useState(initValue);
  const [showSelectCountry, setShowSelectCountry] = useState(false);
  const [activeTab, setActiveTab] = useState("provinces");

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaCheckout),
  });

  const handleOnSubmit = (values) => {
    handleSubmitCreateOrder(values);
  };

  //Get Client Id
  const { data: clientId } = useQuery({
    queryKey: "clientId",
    queryFn: () => getClientIdPaypal(),
  });

  const handleChangePayment = (payment) => {
    handleChangeActivePayment(payment);
    const namePayment = payment?.name.toLowerCase();
    if (namePayment.includes("paypal")) {
      setIsShowPayment(true);
    } else {
      setIsShowPayment(false);
    }
  };

  useEffect(() => {
    reset(addressUserOrder);
    setProvince(addressUserOrder?.province);
    setDistrict(addressUserOrder?.district);
    setWard(addressUserOrder?.ward);
  }, [addressUserOrder, reset]);

  // CODE EDIT
  const provincesQuery = useQuery({
    queryKey: "allProvinces",
    queryFn: () => getProvinces(),
  });

  const districtQuery = useQuery({
    queryKey: ["allDistricts", province?.id],
    queryFn: () => getDistricts(province?.id),
    enabled: province?.id !== undefined,
  });

  const wardQuery = useQuery({
    queryKey: ["allWards", district?.id],
    queryFn: () => getWards(district?.id),
    enabled: district?.id !== undefined,
  });

  const { data: provinces } = provincesQuery;
  const { data: itemDistrict } = districtQuery;
  const { data: itemWard } = wardQuery;

  const handleClickActive = (active) => {
    setActiveTab(active);
  };

  const handleClickActiveProvinces = (e) => {
    const id = e.target.dataset.id;
    const name = e.target.dataset.name;
    if (id && name) {
      setProvince({
        ...province,
        id,
        name,
      });
      setActiveTab("district");
    }
  };

  const handleClickActiveDistrict = (e) => {
    const id = e.target.dataset.id;
    const name = e.target.dataset.name;
    if (id && name) {
      setDistrict({
        ...district,
        id,
        name,
      });
      setActiveTab("ward");
    }
  };

  const handleClickActiveWard = (e) => {
    const id = e.target.dataset.id;
    const name = e.target.dataset.name;
    if (id && name) {
      setWard({
        ...ward,
        id,
        name,
      });
      setShowSelectCountry(false);
    }
  };

  return (
    <div className={cx("step")}>
      <div className={cx("step-section")}>
        <h2 className={cx("title-delivery")}>Thông tin giao hàng</h2>
        <form onSubmit={handleSubmit(handleOnSubmit)}>
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
                      <div
                        onClick={() => setShowSelectCountry((prev) => !prev)}
                        className={cx("select-custom-group")}
                      >
                        <div className={cx("select-custom-country")}>
                          {district?.name && province?.name
                            ? `${ward?.name}, ${district?.name}, ${province?.name} `
                            : "Tỉnh/Thành phố, Quận/Huyện, Phường/Xã *"}
                          <i className="bi bi-chevron-down"></i>
                        </div>
                        <div
                          onClick={(e) => e.stopPropagation()}
                          className={cx("country-options", {
                            show: showSelectCountry,
                          })}
                        >
                          <div className={cx("header-tabs")}>
                            <ul className={cx("menu-tabs")}>
                              <li
                                onClick={() => handleClickActive("provinces")}
                                className={cx("tab-city", {
                                  active: activeTab === "provinces",
                                })}
                              >
                                Tỉnh/Thành phố
                              </li>
                              <li
                                onClick={() => handleClickActive("district")}
                                className={cx("tab-district", {
                                  active: activeTab === "district",
                                })}
                              >
                                Quận/Huyện
                              </li>
                              <li
                                onClick={() => handleClickActive("ward")}
                                className={cx("tab-district", {
                                  active: activeTab === "ward",
                                })}
                              >
                                Phường/Xã
                              </li>
                            </ul>
                          </div>
                          <div className={cx("body-result")}>
                            {activeTab === "provinces" && (
                              <ul className={cx("list-country", "list-city")}>
                                {provinces?.map((itemProvince) => (
                                  <li
                                    data-id={itemProvince?.id}
                                    data-name={itemProvince?.name}
                                    onClick={handleClickActiveProvinces}
                                    key={itemProvince?.id}
                                    className={cx("item-list")}
                                  >
                                    {itemProvince?.name}
                                  </li>
                                ))}
                              </ul>
                            )}

                            {activeTab === "district" && (
                              <ul
                                className={cx("list-country", "list-district")}
                              >
                                {itemDistrict?.districts?.map((district) => (
                                  <li
                                    key={district?.code}
                                    data-id={district?.code}
                                    data-name={district?.name}
                                    onClick={handleClickActiveDistrict}
                                    className={cx("item-list")}
                                  >
                                    {district?.name}
                                  </li>
                                ))}
                              </ul>
                            )}

                            {activeTab === "ward" && (
                              <ul className={cx("list-country", "list-ward")}>
                                {itemWard?.wards?.map((ward) => (
                                  <li
                                    key={ward?.code}
                                    data-id={ward?.code}
                                    data-name={ward?.name}
                                    onClick={handleClickActiveWard}
                                    className={cx("item-list")}
                                  >
                                    {ward?.name}
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
                                      fontSize: 12,
                                    },
                                  }}
                                  checked={activePayment?._id === payment?._id}
                                  onChange={() => handleChangePayment(payment)}
                                  control={
                                    <Radio
                                      sx={{
                                        "& .MuiSvgIcon-root": {
                                          fontSize: 20,
                                        },
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
              <button className={cx("btn-complete")}>Hoàn tất đơn hàng</button>
              <div className={cx("clear")}></div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

DeliveryInformation.propTypes = {
  addressUserOrder: PropTypes.object,
  shippingCost: PropTypes.number,
  payments: PropTypes.array,
  onChange: PropTypes.func,
  handleSubmitCreateOrder: PropTypes.func,
  handleChangeActivePayment: PropTypes.func,
  activePayment: PropTypes.object,
  optionsPayPal: PropTypes.object,
};

export default DeliveryInformation;
