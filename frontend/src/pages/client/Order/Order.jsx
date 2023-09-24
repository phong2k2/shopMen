import classNames from "classnames/bind";
import styles from './Order.module.scss'
import { useEffect, useMemo, useState } from "react";
import { apiGetDistricts, apiGetProvinces, apiGetWard } from "@/services/provincesService";
import { useDispatch, useSelector } from "react-redux";
import * as userService from '@/services/adminServices/userService'
import { createAxios } from "@/utils/httpRfreshRequest";
import { loginSuccess } from "@/redux/authSlice";
import { Link, useNavigate, useParams } from "react-router-dom";
import * as orderService from '@/services/orderService'
import config from "@/config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { clearCart, getTotals } from "@/redux/cartSlice";
import OrderInformation from "./OrderInformation/OrderInformation";
import DeliveryInformation from "./DeliveryInformation/DeliveryInformation";
import { useDeliveryInfo } from "@/hook/useContext";

const cx = classNames.bind(styles)
function Order() {
    const { id } = useParams();
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {
        provinces,
        setProvinces,
        provinceId,
        districts,
        setDistricts,
        districtId,
        wards,
        setWards,
        wardId,
        city,
        setCity,
      } = useDeliveryInfo();

    const [shippingAddress, setShippingAddress] = useState({
        username: '',
        email: '',
        phone: '',
        address: '',
      })
    const cart = useSelector((state) => state.cart)
    const user = useSelector((state) => state.auth.login?.currentUser)
    const axiosJWT = createAxios(user, dispatch, loginSuccess)

    useEffect (() => {
        const fetchUserOrder = async () => {
            try {
            const res = await userService.getDetailUser(user.accessToken, id, axiosJWT )
            console.log(res)
                setShippingAddress(res.data)
            }catch (err) {
                console.log(err)
            }
        }
        fetchUserOrder()
    },[])

    useEffect(() => {
        const fetchData = async () => {
          try {
            const [provinces, districtsRes, wardsRes] = await Promise.all([
                apiGetProvinces(),
                apiGetDistricts(provinceId),
                apiGetWard(districtId),
            ]);
            setProvinces(provinces)
            setDistricts(districtsRes);
            setWards(wardsRes);
          } catch (err) {
            console.error(err);
          }
        };
      
        fetchData();
      }, [provinceId, districtId]);

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
    const handleClickCreateOrder = async (values) => {
        try {
            const formData = {
                orderItems: cart?.cartItems,
                fullName: values?.username,
                address: values?.address,
                email: values?.email,
                city: city,
                phone: values?.phone,
                shippingPrice: diliveryPrice,
                totalPrice: totalPrice,
                user: id,
            }
            const res = await orderService.createOrder(user.accessToken, formData, axiosJWT)
            if(res?.data) {
                navigate('/order')
                dispatch(clearCart())
                dispatch(getTotals())
            }
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
                                <h2><Link to={config.publicRouter.home}>KENTA.VN</Link></h2>
                                <ul className={cx('breadcrumb')}>
                                    <li className={cx('breadcrumb-item')}>
                                        <Link to={config.publicRouter.cart}>
                                            Giỏ hàng
                                        </Link>
                                    </li>
                                    <li className={cx('breadcrumb-item')}>
                                        <FontAwesomeIcon icon={faAngleRight}/>
                                    </li>
                                    <li className={cx('breadcrumb-item')}>
                                        Thông tin giao hàng
                                    </li>
                                </ul>
                            </div>
                            <div className={cx('main-content')}>
                                <DeliveryInformation shippingAddress={shippingAddress} diliveryPrice={diliveryPrice} onChange={handleChangeShopping} onClick={handleClickCreateOrder}/>
                            </div>
                        </div>

                        
                    </div>
                    <div className={cx('col-md-6')}>
                        <div className={cx('sidebar-wrapper')}>
                              <OrderInformation cart={cart} diliveryPrice={diliveryPrice} totalPrice={totalPrice}/>
                            </div>  
                        </div>
                    </div>
            </div>
        </div> 
    );
}

export default Order;