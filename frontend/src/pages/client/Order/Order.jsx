import classNames from "classnames/bind";
import styles from "./Order.module.scss";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import * as orderService from "@/services/orderService";
import config from "@/config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { clearCart, getTotals } from "@/redux/cartSlice";
import OrderInformation from "./OrderInformation/OrderInformation";
import DeliveryInformation from "./DeliveryInformation/DeliveryInformation";
import { useMutation, useQuery } from "react-query";
import { getAllPayments } from "@/services/paymentService";
import { getAddressForOrder } from "@/services/addressService";

const cx = classNames.bind(styles);
function Order() {
  const { id: userId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [activePayment, setActivePayment] = useState();
  const cart = useSelector((state) => state.cart);

  // Lấy địa chỉ của user
  const addressQuery = useQuery({
    queryKey: ["addressForOrder", userId],
    queryFn: () => getAddressForOrder(userId),
    enabled: userId !== undefined,
  });
  const { data: addressUserOrder } = addressQuery;

  // Phí vận chuyển
  const diliveryPrice = useMemo(() => {
    if (cart?.cartTotalAmount > 200000) {
      return 10000;
    } else if (cart?.cartTotalAmount === 0) {
      return 0;
    } else {
      return 20000;
    }
  }, [cart?.cartTotalAmount]);

  //Tổng chi phí
  const totalPrice = useMemo(() => {
    const price = cart?.cartTotalAmount;

    return Number(price) + Number(diliveryPrice);
  }, [diliveryPrice, cart?.cartTotalAmount]);

  // Lấy phương thức thanh toán
  const getAllPaymentsQuery = useQuery({
    queryKey: "Payments",
    queryFn: () => getAllPayments(),
  });
  const { data: allPayments } = getAllPaymentsQuery;

  useEffect(() => {
    if (allPayments) {
      const activePayment = allPayments.find((item) => {
        const namePayment = item.name.toLowerCase();
        return namePayment.includes("cod");
      });
      setActivePayment(activePayment);
    }
  }, [allPayments]);

  const handleChangeActivePayment = (payment) => {
    setActivePayment(payment);
  };

  // Mutation Add order
  const addOrderMutations = useMutation({
    mutationFn: (dataOrder) => orderService.createOrder(dataOrder),
    onSuccess: () => {
      navigate("/order");
      dispatch(clearCart());
      dispatch(getTotals());
    },
  });
  //Tạo đơn hàng
  const handleSubmitCreateOrder = async (values) => {
    console.log(values);
    const dataOrder = {
      orderItems: cart?.cartItems,
      fullName: values?.name,
      address: values?.address,
      email: values?.email,
      phone: values?.phone,
      district: values.district.name,
      province: values.province.name,
      payment: activePayment?._id,
      totalPrice: totalPrice,
      user: userId,
      shippingPrice: diliveryPrice,
    };
    addOrderMutations.mutate(dataOrder);
  };

  // Tạo đơn hàng ví PalPay
  const totalPricePaypal = useMemo(() => {
    return Math.ceil(Number(totalPrice) / 23000);
  }, [totalPrice]);

  const paypalButtonTransactionProps = {
    style: { layout: "vertical" },
    createOrder(data, actions) {
      return actions.order.create({
        purchase_units: [
          {
            amount: {
              currency_code: "USD",
              value: totalPricePaypal,
            },
          },
        ],
      });
    },
    onApprove(data, actions) {
      return actions.order.capture({}).then((details) => {
        console.log(details);
      });
    },
  };

  return (
    <div className={cx("order")}>
      <div className={cx("content")}>
        <div className={cx("container")}>
          <div className={cx("row")}>
            <div className={cx("col-md-12")}>
              <div className={cx("header-order")}>
                <h2>
                  <Link to={config.publicRouter.home}>KENTA.VN</Link>
                </h2>
              </div>
            </div>
            <div className={cx("col-md-6 col-sm-12", "main")}>
              <div className={cx("main-head")}>
                <h2>
                  <Link to={config.publicRouter.home}>KENTA.VN</Link>
                </h2>
                <ul className={cx("breadcrumb")}>
                  <li className={cx("breadcrumb-item")}>
                    <Link to={config.publicRouter.cart}>Giỏ hàng</Link>
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
                  diliveryPrice={diliveryPrice}
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
                diliveryPrice={diliveryPrice}
                totalPrice={totalPrice}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Order;
