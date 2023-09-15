import PropType from 'prop-types'
import classNames from "classnames/bind";
import styles from "./Menu.module.scss"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import MenuItem from './MenuItem';


const cx = classNames.bind(styles)
function Menu({ product, onClick}) {
  const slicedProducts = product?.slice(0, 7);

    return (
       <>
        <div className={cx("tab-item")} >
          <div className={cx('container')}>
            <div className={cx("listProduct")}>
              <div className={cx('owl-stage-outer')} >
                <div className={cx("row", "owl-stage")}>
                  {
                    slicedProducts?.map((proItem, index) => {
                      return (
                        <MenuItem key={index} proItem={proItem} onClick={onClick}/>
                      )
                    })
                  }
                </div>
              </div>
              {/* controll */}
              <div className={cx("owl-controls")}>
                <div  className={cx("owl-prev")}><FontAwesomeIcon className={cx('icon-prev')} icon={faAngleLeft}/></div>
                <div  className={cx("owl-next")}><FontAwesomeIcon className={cx('icon-next')} icon={faAngleRight}/></div>
              </div>
              <div className={cx("collection-viewAll")}>
                <a className={cx("button")}>Xem thêm</a>
              </div>
            </div>

          </div>
        </div>
    </> );
}

Menu.propTypes = {
  product: PropType.array,
  onClick: PropType.func
}

export default Menu;