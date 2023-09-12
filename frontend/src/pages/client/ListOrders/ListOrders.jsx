import classNames from "classnames/bind";
import styles from './ListOrders.module.scss'
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import * as orderService from "@/services/orderService"
import { useDispatch, useSelector } from "react-redux";
import { createAxios } from "@/utils/httpRfreshRequest";
import { loginSuccess } from "@/redux/authSlice";

const cx = classNames.bind(styles)
function ListOrders() {
    const [allOrders, setAllOrders] = useState([])
    const [idShowItem, setIdShowItem] = useState(null)
    const user = useSelector(state => state.auth?.login?.currentUser)
    const dispatch = useDispatch()
    const axiosJWT = createAxios(user, dispatch, loginSuccess)


    const handleShowDetailOrder = (index) => {
        if(idShowItem === index) {
           return setIdShowItem(null)
        }
        setIdShowItem(index)
    }
    
    const handleClose = () => {
        setIdShowItem(null)
    }


    useEffect(() => {
        const getAllOrder = async () => {
            const accessToken = user?.accessToken
            try {
                const res = await orderService.getAllOrder(accessToken, axiosJWT)
                if(res) {
                    setAllOrders(res?.data)
                }
            }catch (err) {
                console.log(err)
            }
        }
        getAllOrder()
    },[])

    return ( 
        <section className={cx('list-order')}>
            <div className={cx('container')}>
                <h5>Lịch sử đơn hàng</h5>
                <table className={cx('table', 'table-striped')}>
                    <thead>
                        <tr className={cx('table-secondary')}>
                            <th>Mã đơn hàng</th>
                            <th>Ngày mua</th>
                            <th>Sản phẩm</th>
                            <th>Giá tiền</th>
                            <th>Tình trạng</th>
                        </tr>
                    </thead>
                    {
                        allOrders?.map((item, index) => {
                            console.log(allOrders)
                            return (
                                <tbody key={index}>
                                    <tr>
                                        <td onClick={()=>handleShowDetailOrder(index)}>
                                            <FontAwesomeIcon className={cx('icon-menu')} icon={faChevronDown}/>
                                            {item?.orderCode}
                                        </td>
                                        <td>{item?.createdAt}</td>
                                        <td>{item?.orderCode}</td>
                                        <td>{item?.totalPrice}</td>
                                        <td>Đơn hàng mới</td>
                                    </tr>
                                    <tr  className={cx('info-order', {
                                        show: idShowItem === index
                                    })}>
                                        <td colSpan={5}>
                                            <div className={cx('info-order-head')}>
                                                <div className={cx('item-info')}>
                                                    <h3>Địa chỉ nhận hàng</h3>
                                                    <span>Tên: {`${item?.shippingAddress?.fullName} ${item?.shippingAddress?.city}`}</span>
                                                    <span>Địa chỉ:  {item?.shippingAddress?.address}</span>
                                                    <span>Điện thoại: {item?.shippingAddress?.phone}</span>
                                                </div>
                                                <div className={cx('item-info')}>
                                                    <h3>Tình trạng thanh toán</h3>
                                                    <span>Thanh toán COD</span>
                                                    <p className={cx('highlight')}>Thanh toán thành công</p>
                                                </div>
                                                <div className={cx('item-info')}>
                                                    <h3>Thời gian giao hàng</h3>
                                                    <span>Dự kiến giao hàng vào Chủ Nhật, 10/09</span>
                                                    <p>Ghi chú: Giao hàng trong giờ hành chính</p>
                                                </div>
                                            </div>

                                            <div className={cx('detail-order')}>
                                                <table>
                                                    <tbody>
                                                        {
                                                            item?.orderItems?.map((itemProduct, index) => {
                                                                return (
                                                                    <tr key={index}>
                                                                        <td>
                                                                            <div className={cx('wrap-oder')}>
                                                                                <div className={cx('img')}>
                                                                                    <img src="https://aristino.com/Data/ResizeImage/images/product/ao-tanktop/att008s3/_TC_0092x650x650x4.webp" alt="" />
                                                                                </div>
                                                                                <div className={cx('title-product')}>
                                                                                    <h3>{itemProduct?.name}</h3>
                                                                                    <span>Số lượng: {itemProduct?.amount}</span>
                                                                                </div>
                                                                            </div>
                                                                        </td>
                                                                        <td>
                                                                            {itemProduct?.price}
                                                                        </td>
                                                                     </tr>
                                                                )
                                                            })
                                                        }
                                                    </tbody>
                                                    <tfoot>
                                                        <tr>
                                                            <td colSpan={2}>
                                                                <div className={cx('price-total')}>
                                                                    <span >Phí vận chuyển: {item?.shippingPrice}</span>
                                                                    <span>Tổng cộng: <strong>{item?.totalPrice}</strong></span>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </tfoot>
                                                </table>
                                            </div>

                                            <div className={cx('button')}>
                                                <button className={cx('close')}>Hủy đơn hàng</button>
                                                <button onClick={()=> handleClose()} className={cx('cancel-order')}>Rút gọn</button>
                                            </div>
                                        </td>
                                    </tr>
                            </tbody>
                            )
                        })
                    }
                    
                    
                </table>
            </div>
        </section>
     );
}

export default ListOrders;