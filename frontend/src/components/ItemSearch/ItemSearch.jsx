import classNames from "classnames/bind";
import styles from './ItemSearch.module.scss'
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import { useMemo } from "react";
import { formatPrice } from "../formatData/formatData";


const cx = classNames.bind(styles)
function ItemSearch({data}) {
    const discountedPrice = useMemo(() => {
        return Math.ceil(data?.price - data?.discount)
    },[data])
    return ( 
        <li  className={cx('content-item')}>
            <Link to={`/products/${data?.slug}`} className={cx('img-item')}><img src={`http://localhost:3000/${data?.image}`} alt="" /></Link>
            <div className={cx('div-text')}>
                <p className={cx('text-search')}>
                    <Link to={`/products/${data?.slug}`}>{data?.name}</Link>
                </p>
                <strong>{formatPrice(discountedPrice)}</strong>
            </div>
        </li>
     );
}

ItemSearch.propTypes = {
    data: PropTypes.object
  };

export default ItemSearch;