import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import classNames from "classnames/bind";
import styles from "./ButtonSlider.module.scss"

const cx = classNames.bind(styles)
function CustomNextArrow({ onClick }) {
    return ( 
        <button type='button' onClick={onClick}  className={cx("owl-prev")}><FontAwesomeIcon className={cx('icon-prev')} icon={faAngleLeft}/></button>
     );
}

export default CustomNextArrow;