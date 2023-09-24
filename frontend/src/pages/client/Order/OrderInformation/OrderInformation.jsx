import classNames from "classnames/bind";
import styles from './OrderInformation.module.scss'
import { formatPrice } from "@/components/formatData/formatData";
import PropTypes from 'prop-types'


const cx = classNames.bind(styles)
function OrderInformation({cart, diliveryPrice, totalPrice}) {
    return ( 
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
                        cart?.cartItems?.map((proItem, index) => {
                            return (
                                <tr className={cx('tr-title')} key={index}>
                                    <td className={cx('product-img')}>
                                        <div className={cx('product-thumbnail-wrapper')}>
                                            <img  src={`http://localhost:3000/${proItem?.image}`}  alt="" />
                                        </div>
                                        <span className={cx('product-thumbnail-quantity')}>{proItem?.amount}</span>
                                    </td>
                                    <td className={cx('product-description')}>
                                        <span className={cx('name')}>{proItem?.name}</span>
                                        <div className={cx('item-desc')}>
                                        <span>{`${proItem?.size} / ${proItem?.color}`}</span>
                                        </div>
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
     );
}

OrderInformation.propTypes = {
    cart: PropTypes.object,
     diliveryPrice: PropTypes.number,
    totalPrice: PropTypes.number
};


export default OrderInformation;