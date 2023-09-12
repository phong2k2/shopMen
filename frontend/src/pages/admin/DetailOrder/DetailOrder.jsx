import classNames from "classnames/bind";
import styles from './DetailOrder.module.scss'
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from "@/redux/authSlice";
import { createAxios } from "@/utils/httpRfreshRequest";
import * as orderService from "@/services/orderService"
import { useParams } from "react-router-dom";
import { formatPrice } from "@/components/formatData/formatData";


const cx = classNames.bind(styles)
function DetailOrder() {
    const [detailOrder, setDetailOrder] = useState()
    const dispatch = useDispatch()
    const { id } = useParams()
    const user = useSelector(state => state.auth?.login?.currentUser)
    const axiosJWT = createAxios(user, dispatch, loginSuccess)

    console.log(detailOrder)
    
    useEffect(() => {
        const getDetailOrder = async () => {
            const accessToken = user?.accessToken
            try {
                const res = await orderService.getDetailOrder(accessToken, id, axiosJWT)
                if(res) {
                    setDetailOrder(res?.data)
                }
            }catch (err) {
                console.log(err)
            }
        }
        getDetailOrder()
    },[])

    return ( 
        <div className={cx('wrapper-detail')}>
            <div className={cx('container')}>
                <h1>Đơn hàng chi tiết</h1>
                <div className={cx('flex')}>
                    <div className={cx('col-md-8')}>
                        <table className={cx("table")}>
                            <thead>
                                <tr>
                                    <th scope="col">STT</th>
                                    <th scope="col">Tên Sản phẩm</th>
                                    <th scope="col">Hình ảnh</th>
                                    <th scope="col">Số lượng</th>
                                    <th scope="col">Giá</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    detailOrder?.orderItems?.map((item, index) => {
                                        return (
                                            <tr key={index}>
                                            <th scope="row">{index + 1}</th>
                                            <td>{item?.name}</td>
                                            <td>
                                                <img src="https://www.thedigitalbridges.com/wp-content/uploads/2016/08/best-gaming-laptop-how-to-buy.jpg" alt="" />
                                            </td>
                                            <td>{item?.amount}</td>
                                            <td>{formatPrice(item?.price)}</td>
                                        </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
    
                    <div className={cx('col-md-4', 'content')}>
                        <h2>Thông tin khách hàng</h2>
                        <div className={cx('img')}>
                            <img src={detailOrder?.user?.image} alt="" />
                            <span>{detailOrder?.user?.username}</span>
                        </div>
                        <span>Người nhận: {detailOrder?.shippingAddress?.fullName} </span>
                        <span>Địa chỉ: {detailOrder?.shippingAddress?.address}</span>
                        <span>SĐT: {detailOrder?.shippingAddress?.phone}</span>
                        <span>Trạng thái: </span>
                        <span>Tổng tiền: {formatPrice(detailOrder?.totalPrice)}</span>
                    </div>
                </div>
            </div>
        </div>
     );
}

export default DetailOrder;