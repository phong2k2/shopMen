import classNames from "classnames/bind";
import styles from './ProductItem.module.scss'
import PropTypes from 'prop-types';
import { formatPrice } from "../formatData/formatData";
import { Link } from "react-router-dom";


const cx = classNames.bind(styles)
function ProductItem({data}) {
    return ( 
        <li  className={cx('content-item')}>
            <Link to={`/products/${data?.slug}`} className={cx('img-item')}><img src={`http://localhost:3000/${data?.image}`} alt="" /></Link>
            <div className={cx('div-text')}>
                <p className={cx('text-search')}>
                    <Link to={`/products/${data?.slug}`}>{data?.name}</Link>
                </p>
                <strong>{formatPrice(data?.price)}</strong>
            </div>
        </li>
     );
}

ProductItem.propTypes = {
    data: PropTypes.object
  };

export default ProductItem;