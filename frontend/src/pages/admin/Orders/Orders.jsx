import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as orderService from "@/services/orderService"
import { loginSuccess } from "@/redux/authSlice";
import { createAxios } from "@/utils/httpRfreshRequest";
import { formatPrice } from "@/components/formatData/formatData";

function Orders() {
    const [listOrders, setListOrders] = useState([])
    const user = useSelector(state => state.auth?.login?.currentUser)
    const dispatch = useDispatch()
    const axiosJWT = createAxios(user, dispatch, loginSuccess)
    const accessToken = user?.accessToken

    useEffect(() => {
        const getAllOrder = async () => {
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

    const handleChangeStatusOrder = async (event, id) => {
        const newStatus = event.target.value
        try {
            const res = await orderService.updateStatus(accessToken, id, newStatus, axiosJWT)
            if(res) {
                window.location = ''
            }
        }catch (err) {
            console.log(err)
        }
    }

    const handleDeleteOrder = async (id) => {
        try {
            const res = await orderService.deleteOrder(accessToken, id, axiosJWT)
            if(res) {
                const orderAfterDelete = listOrders.filter((val) => {
                    return val._id !== id
                })
                setListOrders(orderAfterDelete)
            }
        }catch (err) {
            console.log(err)
        }
    }

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
                        <th rowSpan={2} scope="col" className="text-center">Hành động</th>
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
                                    <td>{formatPrice(item?.totalPrice)}</td>
                                    <td>
                                        <select  value={item?.status}  onChange={(event)=> handleChangeStatusOrder(event, item?._id)} name="" id="">
                                            <option value="processing">Đang xử lý</option>
                                            <option value="confirmed">Đang xác nhận</option>
                                            <option value="shipped">Đang vận chuyển</option>
                                            <option value="complete">Hoàn thành</option>
                                            <option value="cancelled">Hủy</option>
                                        </select>
                                    </td>
                                    <td className="text-center">
                                        <a className='btn btn-primary ml-3' href={`/admin/order/detail/${item?._id}`}>Chi tiết</a>
                                        <button onClick={()=> handleDeleteOrder(item?._id)} className='btn btn-danger ml-3'>Xóa</button>
                                    </td>
                                    <td></td>
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