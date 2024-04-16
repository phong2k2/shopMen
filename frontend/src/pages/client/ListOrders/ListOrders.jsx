import { useQuery } from "react-query";
import { useSearchParams } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./ListOrders.module.scss";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import * as orderService from "@/services/orderService";
import { formatPrice } from "@/components/formatData/formatData";

const cx = classNames.bind(styles);
function ListOrders() {
  const [searchParams] = useSearchParams();
  const [idShowItem, setIdShowItem] = useState(null);
  const [idCancer, serIdCancer] = useState("");
  const status = searchParams.get("status");
  const user = searchParams.get("user");

  const handleShowDetailOrder = (index) => {
    if (idShowItem === index) {
      return setIdShowItem(null);
    }
    setIdShowItem(index);
  };

  const handleClose = () => {
    setIdShowItem(null);
  };

  const handleCancerOrder = async () => {
    try {
      const res = await orderService.cancerOrder(idCancer);
      if (res) {
        window.location = "";
      }
    } catch (err) {
      console.log(err);
    }
  };
  const { data: listOrderStatus } = useQuery({
    queryKey: ["orderStatus", status, user],
    queryFn: () => orderService.getAllOrderStatus({ status, user }),
    enabled: status !== undefined,
  });
  console.log(
    "🚀 ~ file: ListOrders.jsx:64 ~ ListOrders ~ listOrderStatus:",
    listOrderStatus
  );

  return (
    <section className={cx("list-order")}>
      <div className={cx("container")}>
        <h5>Lịch sử đơn hàng</h5>
        <table className={cx("table", "table-striped")}>
          <thead>
            <tr className={cx("table-secondary")}>
              <th>Mã đơn hàng</th>
              <th>Ngày mua</th>
              <th>Sản phẩm</th>
              <th>Giá tiền</th>
              <th>Tình trạng</th>
            </tr>
          </thead>
          {listOrderStatus?.map((item, index) => {
            return (
              <tbody key={index}>
                <tr>
                  <td onClick={() => handleShowDetailOrder(index)}>
                    <FontAwesomeIcon
                      className={cx("icon-menu")}
                      icon={faChevronDown}
                    />
                    {item?.orderCode}
                  </td>
                  <td>{item?.createdAt}</td>
                  <td>{item?.orderCode}</td>
                  <td>{formatPrice(item?.totalPrice)}</td>
                  <td>{item?.status}</td>
                </tr>
                <tr
                  className={cx("info-order", {
                    "show-modal": idShowItem === index,
                  })}
                >
                  <td colSpan={5}>
                    <div className={cx("info-order-head")}>
                      <div className={cx("item-info")}>
                        <h3>Địa chỉ nhận hàng</h3>
                        <span>
                          Tên:{" "}
                          {`${item?.shippingAddress?.fullName} ${item?.shippingAddress?.city}`}
                        </span>
                        <span>Địa chỉ: {item?.shippingAddress?.address}</span>
                        <span>Điện thoại: {item?.shippingAddress?.phone}</span>
                      </div>
                      <div className={cx("item-info")}>
                        <h3>Tình trạng thanh toán</h3>
                        <span>Thanh toán COD</span>
                        <p className={cx("highlight")}>Thanh toán thành công</p>
                      </div>
                      <div className={cx("item-info")}>
                        <h3>Thời gian giao hàng</h3>
                        <span>Dự kiến giao hàng vào Chủ Nhật, 10/09</span>
                        <p>Ghi chú: Giao hàng trong giờ hành chính</p>
                      </div>
                    </div>

                    <div className={cx("detail-order")}>
                      <table>
                        <tbody>
                          {item?.orderItems?.map((itemProduct, index) => {
                            return (
                              <tr key={index}>
                                <td>
                                  <div className={cx("wrap-oder")}>
                                    <div className={cx("img")}>
                                      <img
                                        src={`http://localhost:3000/${itemProduct?.image}`}
                                        alt=""
                                      />
                                    </div>
                                    <div className={cx("title-product")}>
                                      <h3>{itemProduct?.name}</h3>
                                      <div className={cx("item-desc")}>
                                        <span>{`${itemProduct?.size} / ${itemProduct?.color}`}</span>
                                      </div>
                                      <span>
                                        Số lượng: {itemProduct?.amount}
                                      </span>
                                    </div>
                                  </div>
                                </td>
                                <td>{formatPrice(itemProduct?.price)}</td>
                              </tr>
                            );
                          })}
                        </tbody>
                        <tfoot>
                          <tr>
                            <td colSpan={2}>
                              <div className={cx("price-total")}>
                                <span>
                                  Phí vận chuyển:{" "}
                                  {formatPrice(item?.shippingPrice)}
                                </span>
                                <span>
                                  Tổng cộng:{" "}
                                  <strong>
                                    {formatPrice(item?.totalPrice)}
                                  </strong>
                                </span>
                              </div>
                            </td>
                          </tr>
                        </tfoot>
                      </table>
                    </div>

                    <div className={cx("button")}>
                      <button
                        onClick={() => handleClose()}
                        className={cx("cancel")}
                      >
                        <i className="fa-solid fa-chevron-up"></i>
                        Rút gọn
                      </button>
                      {/* <button onClick={() => handleCancerOrder(item?._id)} className={cx('close')}>Hủy đơn hàng</button> */}
                      {item?.status === "processing" ? (
                        <button
                          type="button"
                          onClick={() => serIdCancer(item?._id)}
                          className={cx("close", "btn")}
                          data-toggle="modal"
                          data-target="#exampleModal"
                        >
                          Hủy đơn hàng
                        </button>
                      ) : (
                        ""
                      )}
                    </div>
                  </td>
                </tr>
              </tbody>
            );
          })}
        </table>
        {/* Model */}
        <div
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Bạn muốn xóa
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">Bạn chắc chắn hủy đơn hàng này</div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Huy
                </button>
                <button
                  type="button"
                  onClick={() => handleCancerOrder()}
                  className="btn btn-primary"
                >
                  Xóa
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ListOrders;
