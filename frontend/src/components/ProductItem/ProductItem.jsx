import classNames from "classnames/bind";
import styles from './ProductItem.module.scss'
import PropTypes from 'prop-types';
import { Link, NavLink } from "react-router-dom";
import { formatPrice } from '@/components/formatData/formatData';
import { IconCart } from "../Icons/icon";
import { useMemo } from "react";


const cx = classNames.bind(styles)
function ProductItem({itemPro, onClick}) {

    const discountedPrice = useMemo(() => {
        return Math.ceil(itemPro?.price - itemPro?.discount)
    },[itemPro])

    return ( 
        <div className={cx(' col-md-3 mt-5')}>
            <div className={cx('product-block')}>
                <div className={cx('product-img')}>
                    <Link to={`/products/${itemPro?.slug}`}>
                        <picture>
                            <source media="(max-width: 767px)" />
                            <img src={`http://localhost:3000/${itemPro?.image}`} alt="Anh" />
                        </picture>
                    </Link>
                </div>

                <div className={cx('product-detail')}>
                    <div  className={cx("pro-name")}>
                        <NavLink className={cx("conformName")} to={`/products/${itemPro?.slug}`}>
                        {itemPro?.name}
                        </NavLink>
                    </div>
                    <div className={cx("box-pro-detail")}>
                        <div className={cx('product-price', 'conformName')}>
                            {formatPrice(discountedPrice)}
                            <span className={cx('price-del')}>
                                <del>{formatPrice(itemPro?.discount)}</del>
                            </span>
                        </div>
                        <button onClick={()=>onClick(itemPro, discountedPrice)} className={cx("add-cart")}>
                            <IconCart width={'1.6rem'}/>
                            <span>Thêm</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
     );
}

ProductItem.propTypes = {
    itemPro: PropTypes.object,
    onClick: PropTypes.func
}

export default ProductItem;