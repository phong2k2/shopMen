import classNames from "classnames/bind";
import styles from "./Header.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as authService from "@/services/authServices/authService";
import {
  faCircleUser,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { createAxios } from "@/utils/httpRfreshRequest";
import Menu from "@/components/Menu/Menu";
import  config from "@/config";
import { loginSuccess, logoutFailed, logoutStart, logoutSuccess } from "@/redux/authSlice";
import { NavLink } from "react-router-dom";
import { IconCart } from "@/components/Icons/icon";

const cx = classNames.bind(styles);
function Header() {
  const dispatch = useDispatch()
  const user = useSelector(state => state.auth.login.currentUser)
  const name = user?.data?.username
  const axiosJWT = createAxios(user, dispatch, loginSuccess)
  const listCategory = useSelector(state => state.category.allCategory)
  const cart = useSelector(state => state.cart)

  const userMenus = [
    {
      title: 'Xem hồ sơ',
    },
    {
      title: 'Đăng nhập',
      to: config.publicRouter.auth
    },
    {
      title: 'Đăng xuất'
    }
  ]

  const handleClicklogout = async () => {
    dispatch(logoutStart())
      try {
          const accessToken = user?.accessToken
          const res = await authService.logOut(accessToken, axiosJWT);
          console.log(res)
          if (res) {
              dispatch(logoutSuccess())
              window.location.reload()
          }
      }catch(err) {
          dispatch(logoutFailed())
      }   
  }
  

  return (
      <header className={cx("wrapper-header")}>
        <div className={cx('header-top')}>
          <div className={cx('container-full')}>
              <div className={cx('container-item')}>
                <ul className={cx('nav')}>
                  <li>Tell 18001833</li>
                  <span className={cx('span')}></span>
                  <li >
                    {name ?'Hi, '+ name : 'Đăng nhập' }
                      <span className={cx("account-menu")}>
                        <FontAwesomeIcon
                          className={cx("icon-header")}
                          icon={faCircleUser}
                        />
                      </span>
                    <ul className={cx('sub-nav')}>
                      <Menu items={userMenus}  onClick={handleClicklogout}/>
                    </ul>
                  </li>
                </ul>
              </div>
          </div>
        </div>
          <div className={cx("container")}>
            <div className={cx( "row", 'header-body')}>
              <div className={cx("col-md-2 col-sm-2 col-lg-2", "wrap-header-2")}>
                <div className={cx("header-logo")}>
                  <a href={config.publicRouter.home}>
                    <img
                      className={cx("image-header")}
                      src="https://file.hstatic.net/1000096703/file/logo_website__191___70_px__979fdef210f7474d8a09b42724033b5c.png"
                      alt="logo"
                    />
                  </a>
                </div>
              </div>
    
              <div className={cx("col-md-7 col-sm-7 col-lg-7", "wrap-header-4")}>
                <nav className={cx("navbar-main")}>
                  <ul className={cx("list-main")}>
                    {
                      listCategory?.map((category, index) => {
                        return (
                          <li key={index} className={cx("has-sub")}>
                            <NavLink className={cx('text-nav')} to={'/'+ category?.slug}>{category.name}</NavLink>
                         </li>
                        )
                      })
                    }
                  </ul>
                </nav>
              </div>
  
              <div className={cx("col-md-3 col-sm-3 col-lg-3", "action", "wrap-header-3")}>
                <div className={cx("header-action")}>
                  
                  <div className={cx("action-item")}>
                      <div className={cx("search-menu")}>
                        <input type="text" placeholder="Tìm kiếm"/>
                      </div>
                  </div>
  
                  <div className={cx("action-item")}>
                   <div className={cx('div-cart')}>
                      <a href={config.publicRouter.cart}>
                          <IconCart className={cx('icon-cart')}/>
                      </a>
                      <div className={cx('count-cart')}>
                        <span>{cart?.cartTotalQuantity}</span>
                      </div>
                   </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </header>
  );
}

export default Header;
