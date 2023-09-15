import PropType from 'prop-types'
import classNames from "classnames/bind";
import styles from "./Menu.module.scss"
import { Link, NavLink } from 'react-router-dom';


import { formatPrice } from '@/components/formatData/formatData';
import { IconCart } from '@/components/Icons/icon';


const cx = classNames.bind(styles)
function MenuItem({proItem, onClick}) {


    return ( 
        <div className={cx("col-md-3", "owl-item")}>
            <div className={cx('product-items')}>
            <div className={cx("product-img")}>
                <Link to={`/products/${proItem?.slug}`}>
                <img
                    className={cx("image-resize")}
                    src={`http://localhost:3000/${proItem?.image[0]}`}
                />
                </Link>
            </div>
            <div className={cx("product-detail")}>
                <div className={cx('box-product')}>
                <h2 className={cx("pro-name")}>
                    <NavLink to={`/products/${proItem?.slug}`} className={cx("conformName")}>{proItem?.name}</NavLink>
                </h2>
                <div className={cx("box-pro-detail")}>
                    <div className={cx("pro-price")}>
                    {formatPrice(proItem?.price) }
                    {/* <span className={cx("pro-price-del")}>
                        <del>295,000d</del>
                    </span> */}
                    </div>

                    <button onClick={() => onClick(proItem)} className={cx("add-cart")}>
                    <IconCart width={'1.6rem'}/>
                    <span>Thêm</span>
                    </button>
                </div>
                </div>
            </div>
            </div>
        </div>
     );
}

MenuItem.propTypes = {
    proItem: PropType.object,
    onClick: PropType.func,
  }
  
export default MenuItem;