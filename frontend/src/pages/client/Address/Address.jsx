import { useRef, useState } from "react"
import { useMutation, useQuery, useQueryClient } from "react-query"
import { useDispatch, useSelector } from "react-redux"
import classNames from "classnames/bind"
import styles from "./Address.module.scss"
import AddIcon from "@mui/icons-material/Add"
import {
  createAddress,
  deleteAddress,
  getAllAddress,
  updateAddress
} from "@/services/addressService"
import ModalAddress from "@/components/ModalAddress"
import { openModalAddress, closeModalAddress } from "@/redux/modalAddressSlice"

const cx = classNames.bind(styles)
function Address() {
  const [addressId, setAddressId] = useState()
  const [isValid, setIsValid] = useState(true)
  const userId = useSelector((state) => state?.auth?.login?.currentUser?._id)
  const queryClient = useQueryClient()
  const checkRef = useRef()

  const { isShowModalAddress, locations } = useSelector(
    (state) => state.modalAddress
  )
  const dispatch = useDispatch()

  const { data: listAddress } = useQuery({
    queryKey: ["allAddress", userId],
    queryFn: () => getAllAddress({ userId }),
    enabled: userId !== undefined
  })

  //
  const handleClickGetEdit = (id) => {
    dispatch(openModalAddress())
    setIsValid(false)
    setAddressId(id)
  }

  // Crate
  const addAddressUser = useMutation({
    mutationFn: (myAddress) => createAddress(myAddress),
    onSuccess: () => {
      dispatch(closeModalAddress())
      queryClient.invalidateQueries({
        queryKey: ["allAddress", userId],
        exact: true
      })
    }
  })

  // Update
  const updateAddressUser = useMutation({
    mutationFn: ({ myAddress, addressId }) =>
      updateAddress(addressId, myAddress),
    onSuccess: () => {
      dispatch(closeModalAddress())
      queryClient.invalidateQueries({
        queryKey: ["allAddress", userId],
        exact: true
      })
    }
  })

  // Delete
  const deleteAddressUser = useMutation({
    mutationFn: (addressId) => deleteAddress(addressId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["allAddress", userId],
        exact: true
      })
    }
  })

  // [Delete]
  const handleClickDelete = (addressId) => {
    deleteAddressUser.mutate(addressId)
  }

  // Fnc Update
  const handleUpdateStatus = (addressId, status) => {
    status = status === 0 ? 1 : 0
    updateAddressUser.mutate({ status, addressId })
  }

  const handleSubmitAddress = (values) => {
    const myAddress = {
      ...values,
      ...locations,
      status: checkRef.current.checked ? 1 : 0,
      userId
    }

    if (isValid) {
      addAddressUser.mutate(myAddress)
    } else {
      const addressId = values?._id
      updateAddressUser.mutate({ myAddress, addressId })
    }
  }
  return (
    <section className={cx("wrap-address")}>
      <div className={cx("container")}>
        <h5 className={cx("title")}>Địa chỉ của bạn</h5>
        <ul className={cx("row", "list-my-address")}>
          {listAddress?.map((itemAddress) => (
            <li
              key={itemAddress?._id}
              className={cx("col-lg-4", "col-sm-6", "col-12", "li-address")}
            >
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
            dispatch(openModalAddress())
            setIsValid(true)
          }}
          className={cx("wrap-btn")}
        >
          <button className={cx("btn-title")}>Thêm địa chỉ</button>
          <AddIcon
            sx={{
              fontSize: 16,
              color: "#0a58ca"
            }}
          />
        </div>
      </div>

      {isShowModalAddress ? (
        <ModalAddress
          handleSubmitAddress={handleSubmitAddress}
          addressId={addressId}
          isValid={isValid}
          ref={checkRef}
          show={true}
        />
      ) : (
        ""
      )}
    </section>
  )
}

export default Address
