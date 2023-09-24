import classNames from "classnames/bind";
import styles from './DeliveryInformation.module.scss'
import PropTypes from 'prop-types';
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { formatPrice } from "@/components/formatData/formatData";
import { useDeliveryInfo } from "@/hook/useContext";
import MenuItem from '@mui/material/MenuItem';
import InputField from "@/components/form-controls/InputField/InputField"


const cx = classNames.bind(styles)
function DeliveryInformation({
        shippingAddress,
        diliveryPrice,
        onChange,
        onClick
    }) {

    const schema = yup.object({
        username: yup.string().required('Vui lòng nhập tên'),
        email: yup.string().email('Email không đúng').required('Vui lòng nhập email'),
        phone: yup.string().required('Vui lòng nhập số điện thoại').min(10, 'Bắt buộc phải 10 số').max(11, 'Sai định dạng'),
        address: yup.string().required('Vui lòng nhập địa chỉ'),
        province: yup.string().required('Vui lòng chọn'),
        district: yup.string().required('Vui lòng chọn'),
        ward: yup.string().required('Vui lòng chọn'),
    }).required()
    
    const {
        register,
        handleSubmit,
        formState: { errors },
        } = useForm({
            defaultValues: {
                username: shippingAddress?.username, 
            },
            resolver: yupResolver(schema),
        })
        
        const handleOnSubmit = (values) => {
            onClick(values)
        }

    const {
        provinces,
        provinceId,
        setProvinceId,
        districts,
        districtId,
        setDistrictId,
        wards,
        wardId,
        setWardId,
    } = useDeliveryInfo();

    return ( 
        <div className={cx('step')}>
        <div className={cx('step-section')}>
            <h2>Thông tin giao hàng</h2>
           <form onSubmit={handleSubmit(handleOnSubmit)}>
                <div className={cx('section-content')}>
                    <div className={cx('fieldset')}>
                        <div className={cx('field')}>
                            <div className={cx('field-input-wrapper')}>
                                <label className={cx('filed-label')} htmlFor="">Họ và tên</label>
                                <InputField
                                    name="username"
                                    register ={register}
                                    errors= {errors}
                                    // onChange={onChange}
                                    // value={shippingAddress?.username}
                                />
                            </div>
                        </div>
                        <div className={cx('field', 'field-two-thirds')}>
                            <div className={cx('field-input-wrapper')}>
                                <label className={cx('filed-label')} htmlFor="">Email</label>
                                <InputField
                                    name="email"
                                    register ={register}
                                    errors= {errors}
                                    value={shippingAddress?.email}
                                    onChange={onChange} 
                                />
                            </div>
                        </div>
                        <div className={cx('field', 'field-two-thirds')}>
                            <div className={cx('field-input-wrapper')}>
                                <label className={cx('filed-label')} htmlFor="">Số điện thoại</label>
                                <InputField
                                    name="phone"
                                    register ={register}
                                    errors= {errors}
                                    value={shippingAddress?.phone} 
                                    onChange={onChange}
                                />
                            </div>
                        </div>
                    </div>
                    <div className={cx('clear')}></div>
                </div>
    
                <div className={cx('section-content')}>
                    <div className={cx('fieldset')}>
                        <div action="">
                            <div className={cx('content-box')}>
                                <div className={cx('field')}>
                                    <div className={cx('field-input-wrapper')}>
                                        <label className={cx('filed-label')} htmlFor="">Địa chỉ</label>
                                        <InputField
                                            name="address"
                                            register ={register}
                                            errors= {errors}
                                            value={shippingAddress?.address}
                                            onChange={onChange}
                                        />
                                    </div>
                                </div>
                                <div className={cx('field', 'field-third')}>
                                    <div className={cx('field-input-wrapper')}>
                                        {/* <label className={cx('filed-label')} htmlFor="field-label">
                                            Tỉnh / thành
                                        </label> */}
                                        <InputField
                                            name="province" // Đặt tên của trường ở đây
                                            register={register}
                                            errors={errors}
                                            select
                                            value={provinceId || ''}
                                            label="Tỉnh / thành"
                                            onChange={(e) => setProvinceId(e.target.value)}
                                            className={cx('field-input')}
                                        >
                                            {provinces?.map((province, index) => (
                                                <MenuItem key={index} value={province?.province_id}>
                                                {province?.province_name}
                                                </MenuItem>
                                            ))}
                                        </InputField>
                                        {/* <select  value={provinceId} onChange={(e) =>  setProvinceId(e.target.value)} className={cx('field-input')} name="" id="">
                                            <option value="">Chọn tỉnh / thành</option>
                                            {
                                                provinces?.map((province, index) => {
                                                    return <option key={index} value={province?.province_id}>{province?.province_name}</option>
                                                } )
                                            }
                                        </select> */}
                                    </div>
                                </div>
    
                                <div className={cx('field', 'field-third')}>
                                    <div className={cx('field-input-wrapper')}>
                                        <InputField
                                                name="district" // Đặt tên của trường ở đây
                                                register={register}
                                                errors={errors}
                                                select
                                                value={districtId || ''}
                                                label="Tỉnh / thành"
                                                onChange={(e) => setDistrictId(e.target.value)}
                                                className={cx('field-input')}
                                        >
                                            {districts?.map((districtItem, index) => (
                                                <MenuItem key={index} value={districtItem?.district_id}>
                                                    {districtItem?.district_name}
                                                </MenuItem>
                                            ))}
                                        </InputField>
                                        {/* <label className={cx('filed-label')} htmlFor="field-label">
                                            Quận / huyện
                                        </label>
                                        <select value={districtId} onChange={(e) => setDistrictId(e.target.value)} className={cx('field-input')} name="" id="">
                                            <option value="">Chọn quận / huyện</option>
                                            {
                                                districts?.map(districtItem => {
                                                    return <option key={districtItem?.district_id} value={districtItem?.district_id}>{districtItem?.district_name}</option>
                                                })
                                            }
                                        </select> */}
                                    </div>
                                </div>
    
                                <div className={cx('field', 'field-third')}>
                                    <div className={cx('field-input-wrapper')}>
                                        <InputField
                                                name="ward" 
                                                register={register}
                                                errors={errors}
                                                select
                                                value={wardId || ''}
                                                label="Phường / xã"
                                                onChange={(e)=> setWardId(e.target.value)} 
                                                className={cx('field-input')}
                                        >
                                            {wards?.map((wardItem, index) => (
                                                <MenuItem key={index} value={wardItem?.ward_id}>
                                                    {wardItem?.ward_name}
                                                </MenuItem>
                                            ))}
                                        </InputField>
                                        {/* <label className={cx('filed-label')} htmlFor="field-label">
                                            Phường / xã
                                        </label>
                                        <select onChange={(e)=> setWardId(e.target.value)} className={cx('field-input')} name="" id="">
                                            <option value="">Chọn phường / xã</option>
                                            {
                                                wards?.map((wardItem, index )=> {
                                                    return <option key={index} value={wardItem?.ward_id}>{wardItem?.ward_name}</option>
                                                })
                                            }
                                        </select> */}
                                    </div>
                                </div>
                            </div>
                        </div>
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
                                <input defaultChecked={true} type="radio" className={'radio-input'} />
                                <span className={cx('radio-label')}>Giao hàng tận nơi</span>
                                <span className={cx('radio-price')}>{formatPrice(diliveryPrice)}</span>
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
                                <input defaultChecked={true} type="radio" className={'radio-input'} />
                                <span className={cx('radio-label')}>Thanh toán khi giao hàng</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={cx('step-footer')}>
                    <button >Hoàn tất đơn hàng</button>
                </div>
           </form>
        </div>
        
    </div>
     );
}

DeliveryInformation.propTypes = {
    shippingAddress: PropTypes.object,
    diliveryPrice: PropTypes.number,
    onChange: PropTypes.func, 
    onClick: PropTypes.func
};

export default DeliveryInformation;