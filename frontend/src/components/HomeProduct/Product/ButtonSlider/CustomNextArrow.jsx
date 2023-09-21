import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import classNames from "classnames/bind";
import styles from "./ButtonSlider.module.scss"

const cx = classNames.bind(styles)
function CustomNextArrow({ onClick }) {
    return ( 
        <div  onClick={onClick} className={cx("owl-next")}><FontAwesomeIcon className={cx('icon-next')} icon={faAngleRight}/></div>
     );
}

export default CustomNextArrow;