import classNames from "classnames/bind";
import styles from './Order.module.scss'
import { useEffect, useMemo, useState } from "react";
import { apiGetDistricts, apiGetProvinces, apiGetWard } from "@/services/provincesService";
import { useDispatch, useSelector } from "react-redux";
import * as userService from '@/services/adminServices/userService'
import { createAxios } from "@/utils/httpRfreshRequest";
import { loginSuccess } from "@/redux/authSlice";
import { useParams } from "react-router-dom";
import * as orderService from '@/services/orderService'
import { formatPrice } from "@/components/formatData/formatData";

const cx = classNames.bind(styles)
function Order() {
    const { id } = useParams();
    const dispatch = useDispatch()

    const [provinces, setProvinces] = useState([])
    const [provinceId ,setProvinceId] = useState()
    const [districts ,setDistricts] = useState([])
    const [districtId, setDistrictId] = useState()
    const [wards, setWards] = useState([])
    const [wardId, setWardId] = useState()
    const [city, setCity] = useState('')

    const [shippingAddress, setShippingAddress] = useState({
        username: '',
        email: '',
        phone: '',
        address: '',
        city: '',
      })
    const cart = useSelector((state) => state.cart)
    const user = useSelector((state) => state.auth.login?.currentUser)
    const axiosJWT = createAxios(user, dispatch, loginSuccess)

    useEffect (() => {
        const fetchUserOrder = async () => {
            try {
            const res = await userService.getDetailUser(user.accessToken, id, axiosJWT )
                setShippingAddress(res.data)
            }catch (err) {
                console.log(err)
            }
        }
        fetchUserOrder()
    },[])

    useEffect(() => {
        const fetchPublicProduct = async () => {
            try {
                const res = await apiGetProvinces()
                setProvinces(res)
            }catch (err) {
                console.log(err)
            }
        }
        fetchPublicProduct()
    },[])

    useEffect(() => {
        const fetchPublicDistrict = async () => {
            try {
                const res = await apiGetDistricts(provinceId)
                setDistricts(res)
            }catch (err) {
                console.log(err)
            }
        }
        fetchPublicDistrict()
    },[provinceId])

    useEffect(() => {
        const fetchApiWard = async () => {
            try {
                const res = await apiGetWard(districtId)
                setWards(res)
            }catch (err) {
                console.log(err)
            }
        }
        fetchApiWard()
    },[districtId])

    useEffect(() => {
        const selectedProvince = provinces.find((province) => province.province_id === provinceId);
        const selectedDistrict = districts.find((district) => district.district_id === districtId);
        const selectedWard = wards.find((ward) => ward.ward_id === wardId)

        let address = `${selectedProvince?.province_name || ''} ${selectedDistrict?.district_name || ''} ${selectedWard?.ward_name || ''}`

        setCity(address)
    },[provinceId, districtId, wardId])

    // Phí vận chuyển
    const diliveryPrice = useMemo(() => {
        if(cart?.cartTotalAmount > 200000){
          return 10000
        }else if(cart?.cartTotalAmount === 0 ){
          return 0
        }else {
          return 20000
        }
      },[cart?.cartTotalAmount])

    //Tổng chi phí 
    const totalPrice = useMemo(() => {
        const price = cart?.cartTotalAmount
        
        return Number(price) + Number(diliveryPrice) 
    },[diliveryPrice, cart?.cartTotalAmount])


    const handleChangeShopping = (e) => {
        setShippingAddress({
            ...shippingAddress,
            [e.target.name] : e.target.value,
        })
    }

    //Tạo đơn hàng
    const handleClickCreateOrder = async () => {
        try {
            const formData = {
                orderItems: cart?.cartItems,
                fullName: shippingAddress?.username,
                address: shippingAddress?.address,
                email: shippingAddress?.email,
                city: city,
                phone: shippingAddress?.phone,
                shippingPrice: diliveryPrice,
                totalPrice: totalPrice,
                user: user?.data?._id,
            }
            const res = await orderService.createOrder(user.accessToken, formData, axiosJWT)
            console.log(res)
        }catch(err) {
            console.log(err)
        }
    }

    return (
        <div className={cx('order')}>
            <div className={cx('content')}>
                <div className={cx('container')}>
                    <div className={cx('col-md-6')}>
                        <div className={cx('main')}>
                            <div className={cx('main-head')}>
                                <h2>KENTA.VN</h2>
                                <ul className={cx('breadcrumb')}>
                                    <li className={cx('breadcrumb-item')}>
                                        <a href="">
                                            Giỏ hàng -
                                        </a>
                                    </li>
                                    <li className={cx('breadcrumb-item')}>
                                        Thông tin giao hàng
                                    </li>
                                </ul>
                            </div>
                            <div className={cx('main-content')}>
                                <div className={cx('step')}>
                                    <div className={cx('step-section')}>
                                        <h2>Thông tin giao hàng</h2>
                                        <div className={cx('section-content')}>
                                            <div className={cx('fieldset')}>
                                                <div className={cx('field')}>
                                                    <div className={cx('field-input-wrapper')}>
                                                        <label className={cx('filed-label')} htmlFor="">Họ và tên</label>
                                                        <input name="username" onChange={handleChangeShopping} value={shippingAddress?.username} className={cx('field-input')} type="text" />
                                                    </div>
                                                </div>
                                                <div className={cx('field', 'field-two-thirds')}>
                                                    <div className={cx('field-input-wrapper')}>
                                                        <label className={cx('filed-label')} htmlFor="">Email</label>
                                                        <input name="email" value={shippingAddress?.email} onChange={handleChangeShopping} className={cx('field-input')} type="text" />
                                                    </div>
                                                </div>
                                                <div className={cx('field', 'field-two-thirds')}>
                                                    <div className={cx('field-input-wrapper')}>
                                                        <label className={cx('filed-label')} htmlFor="">Số điện thoại</label>
                                                        <input name="phone" value={shippingAddress?.phone} onChange={handleChangeShopping} className={cx('field-input')} type="text" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={cx('clear')}></div>
                                        </div>

                                        <div className={cx('section-content')}>
                                            <div className={cx('fieldset')}>
                                                <form action="">
                                                    <div className={cx('content-box')}>
                                                        <div className={cx('field')}>
                                                            <div className={cx('field-input-wrapper')}>
                                                                <label className={cx('filed-label')} htmlFor="">Địa chỉ</label>
                                                                <input name="address" value={shippingAddress?.address} onChange={handleChangeShopping} className={cx('field-input')} type="text" />
                                                            </div>
                                                        </div>
                                                        <div className={cx('field', 'field-third')}>
                                                            <div className={cx('field-input-wrapper')}>
                                                                <label className={cx('filed-label')} htmlFor="field-label">
                                                                    Tỉnh / thành
                                                                </label>
                                                                <select  value={provinceId} onChange={(e) =>  setProvinceId(e.target.value)} className={cx('field-input')} name="" id="">
                                                                    <option value="">Chọn tỉnh / thành</option>
                                                                    {
                                                                        provinces?.map((province) => {
                                                                            return <option key={province?.province_id} value={province?.province_id}>{province?.province_name}</option>
                                                                        } )
                                                                    }
                                                                </select>
                                                            </div>
                                                        </div>

                                                        <div className={cx('field', 'field-third')}>
                                                            <div className={cx('field-input-wrapper')}>
                                                                <label className={cx('filed-label')} htmlFor="field-label">
                                                                    Quận / huyện
                                                                </label>
                                                                <select value={districtId} onChange={(e) => setDistrictId(e.target.value)} className={cx('field-input')} name="" id="">
                                                                    <option value="">Chọn quận / huyện</option>
                                                                    {
                                                                        districts?.map(districtItem => {
                                                                            return <option key={districtItem?.district_id} value={districtItem?.district_id}>{districtItem?.district_name}</option>
                                                                        })
                                                                    }
                                                                </select>
                                                            </div>
                                                        </div>

                                                        <div className={cx('field', 'field-third')}>
                                                            <div className={cx('field-input-wrapper')}>
                                                                <label className={cx('filed-label')} htmlFor="field-label">
                                                                    Phường / xã
                                                                </label>
                                                                <select onChange={(e)=> setWardId(e.target.value)} className={cx('field-input')} name="" id="">
                                                                    <option value="">Chọn phường / xã</option>
                                                                    {
                                                                        wards?.map(wardItem => {
                                                                            return <option key={wardItem?.ward_id} value={wardItem?.ward_id}>{wardItem?.ward_name}</option>
                                                                        })
                                                                    }
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                            <div className={cx('clear')}></div>
                                        </div>
                                        
                                        <div className={cx('change-pick')}>
                                            <div className={cx('section-shipping')}>
                                                <div className={cx('section-header')}>
                                                    <h2>Phương thức vận chuyển</h2>
                                                </div>
                                                <div className={cx('section-content')}>
                                                    <div className={cx('radio-wrapper')}>
                                                     <div className={cx('radio-content')}>
                                                        <input type="radio" className={'radio-input'} />
                                                        <span className={cx('radio-label')}>Giao hàng tận nơi</span>
                                                        <span className={cx('radio-price')}>{formatPrice(37000)}</span>
                                                     </div>
                                                    </div>
                                                </div>
                                            </div>
                                                                    
                                            <div className={cx('section-payment')}>
                                                <div className={cx('section-content')}>
                                                    <h2>Phương thức thanh toán</h2>
                                                </div>
                                                <div className={cx('section-content')}>
                                                    <div className={cx('radio-wrapper')}>
                                                      <div className={cx('radio-content')}>
                                                        <input type="radio" className={'radio-input'} />
                                                        <span className={cx('radio-label')}>Thanh toán khi giao hàng</span>
                                                      </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className={cx('step-footer')}>
                                        <button onClick={handleClickCreateOrder}>Hoàn tất đơn hàng</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        
                    </div>
                    <div className={cx('col-md-6')}>
                        <div className={cx('sidebar-wrapper')}>
                                <div className={cx('sidebar-content')}>
                                    <h2>Thông tin đơn hàng</h2>
                                    <div className={cx('order-summary-selection')}>
                                        <table className={cx('product-table')}>
                                            <thead>
                                                <tr>
                                                    <th scope="col"></th>
                                                    <th scope="col"></th>
                                                    <th scope="col"></th>
                                                    <th scope="col"></th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                                {
                                                    cart?.cartItems?.map(proItem => {
                                                        return (
                                                            <tr key={proItem?.product}>
                                                                <td className={cx('product-img')}>
                                                                    <div className={cx('product-thumbnail-wrapper')}>
                                                                        <img src="//product.hstatic.net/1000096703/product/13_c501e27e197d438faf86ea17656bfb2f_small.jpg" alt="" />
                                                                    </div>
                                                                    <span className={cx('product-thumbnail-quantity')}>{proItem?.amount}</span>
                                                                </td>
                                                                <td className={cx('product-description')}>
                                                                    <span className={cx('name')}>{proItem?.name}</span>
                                                                </td>
                                                                <td></td>
                                                                <td className={cx("product-price")}>
                                                                    <span>{formatPrice(proItem?.price)}</span>
                                                                </td>
                                                             </tr>
                                                        )
                                                    })
                                                }
                                                
                                            </tbody>
                                        </table>
                                        <div className={cx('payment-lines')}>
                                            <div className={cx('title')}>
                                                <p>
                                                    Tạm tính
                                                    <span>{formatPrice(cart?.cartTotalAmount)}</span>
                                                </p>
                                                <p>
                                                    Phí vận chuyển
                                                    <span>{formatPrice(diliveryPrice)}</span>
                                                </p>
                                            </div>
                                            <div className={cx('total')}>
                                                <h2>Tổng cộng
                                                    <span>
                                                        {formatPrice(totalPrice)}
                                                    </span>
                                                </h2>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>  
                        </div>
                    </div>
            </div>
        </div> 
    );
}

export default Order;