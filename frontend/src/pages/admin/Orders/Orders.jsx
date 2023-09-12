import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import * as orderService from "@/services/orderService"
import styles from './Orders.module.scss'
import { loginSuccess } from "@/redux/authSlice";
import { createAxios } from "@/utils/httpRfreshRequest";

const cx = classNames.bind(styles)
function Orders() {
    const [listOrders, setListOrders] = useState([])
    const user = useSelector(state => state.auth?.login?.currentUser)
    const dispatch = useDispatch()
    const axiosJWT = createAxios(user, dispatch, loginSuccess)
    
    console.log( listOrders)

    useEffect(() => {
        const getAllOrder = async () => {
            const accessToken = user?.accessToken
            try {
                const res = await orderService.getAllOrder(accessToken, axiosJWT)
                if(res) {
                    setListOrders(res?.data)
                }
            }catch (err) {
                console.log(err)
            }
        }
        getAllOrder()
    },[])

    return (
        <div>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">STT</th>
                        <th scope="col">Tên khách hàng</th>
                        <th scope="col">Điện thoại</th>
                        <th scope="col">Tổng tiền</th>
                        <th scope="col">Trạng thái</th>
                        <th rowSpan={2} scope="col">Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        listOrders?.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{item?.shippingAddress?.fullName}</td>
                                    <td>{item?.shippingAddress?.phone}</td>
                                    <td>{item?.totalPrice}</td>
                                    <td>{item?.status}</td>
                                    <td><a href={`/admin/order/detail/${item?._id}`}>Chi tiết</a></td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    );
}

export default Orders;