import { useEffect, useRef, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import classNames from "classnames/bind";
import styles from "./Address.module.scss";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import {
  createAddress,
  deleteAddress,
  getAddressDetail,
  getAllAddress,
  updateAddress,
  updateStatusAddress,
} from "@/services/addressService";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaAddress } from "@/Validations/yupSchema";
import InputField from "@/components/form-controls/InputField";
import {
  getDistricts,
  getProvinces,
  getWards,
} from "@/services/provincesService";

const initValue = {
  id: "",
  name: "",
};

const initAddress = {
  name: "",
  email: "",
  address: "",
  phone: "",
};

const cx = classNames.bind(styles);
function Address() {
  const [show, setShow] = useState(false);
  const [showSelectCountry, setShowSelectCountry] = useState(false);
  const [province, setProvince] = useState(initValue);
  const [district, setDistrict] = useState(initValue);
  const [ward, setWard] = useState(initValue);
  const [activeTab, setActiveTab] = useState("provinces");
  const [addressId, setAddressId] = useState();
  const [isValid, setIsValid] = useState();
  const [statusAddress, setStatusAddress] = useState();
  const userId = useSelector((state) => state?.auth?.login?.currentUser?._id);
  const queryClient = useQueryClient();
  const checkRef = useRef();

  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schemaAddress),
  });

  // Get Address
  const { data: listAddress } = useQuery({
    queryKey: ["allAddress", userId],
    queryFn: () => getAllAddress({ userId }),
    enabled: userId !== undefined,
  });
  console.log("🚀 ~ listAddress:", listAddress);

  const { data: allProvinces } = useQuery({
    queryKey: "allProvinces",
    queryFn: () => getProvinces(),
  });

  const { data: allDistrict } = useQuery({
    queryKey: ["allDistricts", province?.id],
    queryFn: () => getDistricts(province?.id),
    enabled: province?.id !== undefined,
  });

  const { data: allWard } = useQuery({
    queryKey: ["allWards", province?.id, district?.id],
    queryFn: () => getWards(province?.id),
    enabled: province?.id !== undefined,
  });

  const { data: addressDetail } = useQuery({
    queryKey: ["addressDetail", addressId],
    queryFn: () => getAddressDetail({ addressId }),
    enabled: addressId !== undefined,
  });

  const handleClickActive = (active) => {
    setActiveTab(active);
  };

  useEffect(() => {
    if (isValid) {
      reset(initAddress);
    } else {
      reset(addressDetail);
      setProvince(addressDetail?.province);
      setDistrict(addressDetail?.district);
      setWard(addressDetail?.ward);
      setStatusAddress(addressDetail?.status);
    }
  }, [addressDetail, isValid, reset]);

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

  //
  const handleClickGetEdit = (id) => {
    setShow(true);
    setIsValid(false);
    setAddressId(id);
  };

  // Crate
  const addAddressUser = useMutation({
    mutationFn: (myAddress) => createAddress(myAddress),
    onSuccess: () => {
      setShow(false);
      queryClient.invalidateQueries({
        queryKey: ["allAddress", userId],
        exact: true,
      });
    },
  });

  // Update
  const updateAddressUser = useMutation({
    mutationFn: ({ myAddress, addressId }) =>
      updateAddress(addressId, myAddress),
    onSuccess: () => {
      setShow(false);
      queryClient.invalidateQueries({
        queryKey: ["allAddress", userId],
        exact: true,
      });
    },
  });

  // Delete
  const deleteAddressUser = useMutation({
    mutationFn: (addressId) => deleteAddress(addressId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["allAddress", userId],
        exact: true,
      });
    },
  });

  // Update Status Address
  const updateStatusAddressUser = useMutation({
    mutationFn: ({ addressId, status }) =>
      updateStatusAddress(addressId, status),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["allAddress", userId],
        exact: true,
      });
    },
  });

  // [Delete]
  const handleClickDelete = (addressId) => {
    deleteAddressUser.mutate(addressId);
  };

  // Fnc Update
  const handleUpdateStatus = (addressId, status) => {
    updateStatusAddressUser.mutate({ addressId, status });
  };

  const handleSubmitAddress = (values) => {
    const myAddress = {
      ...values,
      province: province,
      district: district,
      ward: ward,
      status: checkRef.current.checked ? 1 : 0,
      userId,
    };

    if (isValid) {
      addAddressUser.mutate(myAddress);
    } else {
      const addressId = values?._id;
      updateAddressUser.mutate({ myAddress, addressId });
    }
  };
  return (
    <section className={cx("wrap-address")}>
      <div className={cx("container")}>
        <h5 className={cx("title")}>Địa chỉ của bạn</h5>
        <ul className={cx("row", "list-my-address")}>
          {listAddress?.map((itemAddress) => (
            <li key={itemAddress?._id} className={cx("col-4", "li-address")}>
              <div className={cx("item-my-address")}>
                <div className={cx("item-body")}>
                  <div className={cx("heading")}>
                    <strong>{itemAddress?.name}</strong>
                    {itemAddress?.status === 0 ? (
                      <a
                        onClick={() =>
                          handleUpdateStatus(
                            itemAddress?._id,
                            itemAddress?.status
                          )
                        }
                      >
                        Mặc định
                      </a>
                    ) : (
                      <span className={cx("color-success")}>Mặc định</span>
                    )}
                  </div>

                  <p className={"my-address"}>
                    Địa chỉ:
                    {` ${itemAddress?.address}, ${itemAddress?.district?.name}, ${itemAddress?.province?.name}`}
                  </p>
                  <div className={cx("address-footer")}>
                    <span className={cx("phone")}>
                      Điện thoại: {itemAddress?.phone}
                    </span>
                    <div className={cx("control")}>
                      <button
                        onClick={() => handleClickGetEdit(itemAddress?._id)}
                        className={cx("btn", "edit")}
                      >
                        Chỉnh sửa
                      </button>
                      <button
                        onClick={() => handleClickDelete(itemAddress?._id)}
                        className={cx("btn", "remove")}
                      >
                        Xóa
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <div
          onClick={() => {
            setShow(true);
            setIsValid(true);
          }}
          className={cx("wrap-btn")}
        >
          <button className={cx("btn-title")}>Thêm địa chỉ</button>
          <AddIcon
            sx={{
              fontSize: 16,
              color: "#0a58ca",
            }}
          />
        </div>
      </div>

      <div
        onClick={() => {
          setShow(false);
        }}
        className={cx("modal", "fade", {
          "show-modal": show,
        })}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className={cx("modal-dialog", "modal-wrap")}
        >
          <form action="" onSubmit={handleSubmit(handleSubmitAddress)}>
            <div className={cx("modal-content")}>
              <div className={cx("modal-header")}>
                <h5 className={cx("modal-title")}>Địa chỉ mới</h5>
                <button className={cx("btn", "btn-close-modal")}>
                  <CloseIcon
                    onClick={(e) => {
                      e.preventDefault();
                      setShow(false);
                    }}
                    sx={{
                      fontSize: 25,
                      opacity: 0.8,
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
                          {province?.name
                            ? `${ward?.name || "..."}, ${
                                district?.name || "..."
                              }, ${province?.name}`
                            : "Tỉnh/Thành phố, Quận/Huyện, Phường/Xã *"}
                          <i className="bi bi-chevron-down"></i>
                        </div>
                        <div
                          onClick={(e) => e.stopPropagation()}
                          className={cx("country-options", {
                            "show-modal": showSelectCountry,
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
                                className={cx("tab-ward", {
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
                                {allProvinces?.map((itemProvince) => (
                                  <li
                                    data-id={itemProvince?.id}
                                    data-name={itemProvince?.name}
                                    onClick={handleClickActiveProvinces}
                                    key={itemProvince?.id}
                                    className={cx("item-list")}
                                  >
                                    {itemProvince?.full_name}
                                  </li>
                                ))}
                              </ul>
                            )}

                            {activeTab === "district" && (
                              <ul
                                className={cx("list-country", "list-district")}
                              >
                                {allDistrict?.map((district) => (
                                  <li
                                    key={district?.id}
                                    data-id={district?.id}
                                    data-name={district?.name}
                                    onClick={handleClickActiveDistrict}
                                    className={cx("item-list")}
                                  >
                                    {district?.full_name}
                                  </li>
                                ))}
                              </ul>
                            )}

                            {activeTab === "ward" && (
                              <ul className={cx("list-country", "list-ward")}>
                                {allWard?.map((ward) => (
                                  <li
                                    key={ward?.id}
                                    data-id={ward?.id}
                                    data-name={ward?.name}
                                    onClick={handleClickActiveWard}
                                    className={cx("item-list")}
                                  >
                                    {ward?.full_name}
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
                      ref={checkRef}
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
                      e.preventDefault();
                      setShow(false);
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
    </section>
  );
}

export default Address;
