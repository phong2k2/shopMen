import PropType from 'prop-types'
import classNames from "classnames/bind";
import styles from "./Menu.module.scss"
import { useRef } from 'react';
import { formatPrice } from '@/components/formatData/formatData';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { Link, NavLink } from 'react-router-dom';
import { IconCart } from '@/components/Icons/icon';

const cx = classNames.bind(styles)
function Menu({id, activeCategory, product, onClick }) {
  const listProduct = product?.product
  const slicedProducts = listProduct?.slice(0, 7);
  const itemRef = useRef()
  const cartRef = useRef()

  
    return (
      // 
       <>
        <div className={cx("tab-item",{"active": activeCategory ===id})} >
          <div className={cx('container')}>
            <div className={cx("listProduct")}>
              <div className={cx('owl-stage-outer')} >
                <div ref={itemRef} className={cx("row", "owl-stage")}>
                  {
                    slicedProducts?.map ((proItem, index) => {
                      return (
                        <div key={index} ref={cartRef} className={cx("col-md-3", "owl-item")}>
                          <div className={cx('product-items')}>
                            <div className={cx("product-img")}>
                              <Link to={`/products/${proItem?.slug}`}>
                                <img
                                  className={cx("image-resize")}
                                  src={`http://localhost:3000/${proItem?.image}`}
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
            </div>
            <div className={cx("collection-viewAll")}>
              <a className={cx("button")}>Xem thêm</a>
            </div>

          </div>
        </div>
    </> );
}

Menu.propTypes = {
  id: PropType.number,
  activeCategory: PropType.number,
  product: PropType.object,
  onClick: PropType.func
}

export default Menu;