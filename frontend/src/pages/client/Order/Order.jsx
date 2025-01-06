import classNames from "classnames/bind"
import styles from "./Order.module.scss"
import { useEffect, useMemo, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate, useParams } from "react-router-dom"
import * as orderService from "@/services/orderService"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleRight } from "@fortawesome/free-solid-svg-icons"
import { clearCart, getTotals } from "@/redux/cartSlice"
import OrderInformation from "./OrderInformation/OrderInformation"
import DeliveryInformation from "./DeliveryInformation/DeliveryInformation"
import { useMutation, useQuery } from "react-query"
import { createUrlVnPay, getAllPayments } from "@/services/paymentService"
import { getAllAddress } from "@/services/addressService"
import { PUBLICROUTER } from "@/config/routes"

const cx = classNames.bind(styles)
function Order() {
  const { id: userId } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [activePayment, setActivePayment] = useState()
  const cart = useSelector((state) => state.cart)
  const { locations } = useSelector((state) => state.modalAddress)

  // Lấy địa chỉ của user
  const { data: addressUserOrder } = useQuery({
    queryKey: ["addressForOrder", userId],
    queryFn: () => getAllAddress({ userId, status: 1 }),
    enabled: userId !== undefined,
    select: (data) => data[0]
  })

  // Phí vận chuyển
  const shippingCost = useMemo(() => {
    if (cart?.cartTotalAmount > 200000) {
      return 10000
    } else if (cart?.cartTotalAmount === 0) {
      return 0
    } else {
      return 20000
    }
  }, [cart?.cartTotalAmount])

  //Tổng chi phí
  const totalPrice = useMemo(() => {
    const price = cart?.cartTotalAmount

    return Number(price) + Number(shippingCost)
  }, [shippingCost, cart?.cartTotalAmount])

  // Phương thức thanh toán
  const getAllPaymentsQuery = useQuery({
    queryKey: "Payments",
    queryFn: () => getAllPayments()
  })
  const { data: allPayments } = getAllPaymentsQuery

  // useEffect(() => {
  //   if (allPayments) {
  //     const activePayment = allPayments.find((item) => {
  //       const namePayment = item.name.toLowerCase()
  //       return namePayment.includes("cod")
  //     })
  //     setActivePayment(activePayment)
  //   }
  // }, [allPayments])

  const handleChangeActivePayment = (payment) => {
    setActivePayment(payment)
  }

  // Mutation Add order
  const addOrderMutations = useMutation({
    mutationFn: (dataOrder) => orderService.createOrder(dataOrder),
    onSuccess: () => {
      navigate("/")
      dispatch(clearCart())
      dispatch(getTotals())
    }
  })

  // create url VN_PAY
  const createUrlVnPayMutations = useMutation({
    mutationFn: (data) => createUrlVnPay(data),
    onSuccess: (data) => {
      console.log("🚀 ~ data:", data)
      // window.location.href = data
    }
  })

  //Tạo đơn hàng
  const handleSubmitCreateOrder = async (values) => {
    const dataOrder = {
      orderItems: cart?.cartItems,
      fullName: values?.name,
      address: values?.address,
      email: values?.email,
      phone: values?.phone,
      payment: activePayment?._id,
      totalPrice: totalPrice,
      user: userId,
      shippingPrice: shippingCost,
      ...locations
    }
    if (activePayment?.type === "vnpay") {
      dataOrder.bankCode = "NCB"
      createUrlVnPayMutations.mutate(dataOrder)
    } else {
      addOrderMutations.mutate(dataOrder)
    }
  }

  // Tạo đơn hàng ví PalPay
  const totalPricePaypal = useMemo(() => {
    return Math.ceil(Number(totalPrice) / 23000)
  }, [totalPrice])

  const paypalButtonTransactionProps = {
    style: { layout: "vertical" },
    createOrder(data, actions) {
      return actions.order.create({
        purchase_units: [
          {
            amount: {
              currency_code: "USD",
              value: totalPricePaypal
            }
          }
        ]
      })
    },
    onApprove(data, actions) {
      return actions.order.capture({}).then((details) => {})
    }
  }

  return (
    <div className={cx("order")}>
      <div className={cx("container", "wrap-content")}>
        <div className={cx("row")}>
          <div className={cx("col-md-12")}>
            <div className={cx("header-order")}>
              <h2>
                <Link to={PUBLICROUTER.home}>KENTA.VN</Link>
              </h2>
            </div>
          </div>
          <div className={cx("col-md-6 col-sm-12", "main")}>
            <div className={cx("main-head")}>
              <h2>
                <Link to={PUBLICROUTER.home}>KENTA.VN</Link>
              </h2>
              <ul className={cx("breadcrumb")}>
                <li className={cx("breadcrumb-item")}>
                  <Link to={PUBLICROUTER.cart}>Giỏ hàng</Link>
                </li>
                <li className={cx("breadcrumb-item")}>
                  <FontAwesomeIcon icon={faAngleRight} />
                </li>
                <li className={cx("breadcrumb-item")}>Thông tin giao hàng</li>
              </ul>
            </div>
            <div className={cx("main-content")}>
              <DeliveryInformation
                addressUserOrder={addressUserOrder}
                shippingCost={shippingCost}
                payments={allPayments}
                activePayment={activePayment}
                handleChangeActivePayment={handleChangeActivePayment}
                handleSubmitCreateOrder={handleSubmitCreateOrder}
                optionsPayPal={paypalButtonTransactionProps}
              />
            </div>
          </div>
          <div className={cx("col-md-6 col-sm-12", "sidebar")}>
            <OrderInformation
              cart={cart}
              shippingCost={shippingCost}
              totalPrice={totalPrice}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Order
