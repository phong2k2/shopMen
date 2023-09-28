import classNames from "classnames/bind";
import styles from "./Header.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as authService from "@/services/authServices/authService";
import {
  faCircleUser,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { createAxios } from "@/utils/httpRfreshRequest";
import { NavLink } from "react-router-dom";
import { IconCart } from "@/components/Icons/icon";
import Menu from "@/components/Menu/Menu";
import  config from "@/config";
import { loginSuccess, logoutFailed, logoutStart, logoutSuccess } from "@/redux/authSlice";
import Button from "@/components/Button";
import Search from "../Search/Search";
import toastify from "@/components/toastify/toastify";
import CategoryItem from "@/components/CategoryItem";

const cx = classNames.bind(styles);
function Header() {
  const dispatch = useDispatch()
  const user = useSelector(state => state.auth?.login)
  const name = user?.currentUser?.data?.username
  const axiosJWT = createAxios(user?.currentUser, dispatch, loginSuccess)
  const listCategory = useSelector(state => state.category.allCategory)
  const cart = useSelector(state => state.cart)

  const userMenus = [
    {
      title: 'Quản Trị website',
      check: user?.currentUser?.data?.role,
      to: config.privateRouter.dashboard
    },
    {
      title: 'Hồ sơ',
      check: true,
      to: config.publicRouter.profile
    },
    {
      title: 'Đơn hàng',
      to: config.publicRouter.listOrders,
      check: true
    },{
      title: 'Đăng xuất',
      check: true,
      logout: true,
    },
  ]

  const handleClickLogout = async () => {
    dispatch(logoutStart())
      try {
        const accessToken = user?.currentUser?.accessToken
          const res = await authService.logOut(accessToken, axiosJWT);
          if (res) {
              dispatch(logoutSuccess())
              toastify({
                type: 'success',
                message: "Đã đăng xuất"
              })
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
                      {name ?'Hi, '+ name : <Button to={config.publicRouter.auth} >Đăng nhập</Button> }
                        <span className={cx("account-menu")}>
                          <FontAwesomeIcon
                            className={cx("icon-header")}
                            icon={faCircleUser}
                          />
                        </span>
                        {
                          user?.isLogin ? <Menu items={ userMenus}  onClick={handleClickLogout}/> : ''
                        }
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
    
              <div className={cx("col-md-6 col-sm-6 col-lg-6", "wrap-header-4")}>
                <nav className={cx("navbar-main")}>
                  <ul className={cx("list-main")}>
                    {
                      listCategory?.map((category, index) => {
                        return (
                          <li key={index} className={cx("has-sub")}>
                            <NavLink className={cx('text-nav')} to={'/'+ category?.slug}>{category.name}</NavLink>
                            <CategoryItem idCate={category?._id}/>
                         </li>
                        )
                      })
                    }
                  </ul>
                </nav>
              </div>
  
              <div className={cx("col-md-4 col-sm-4 col-lg-4", "action", "wrap-header-3")}>
                <div className={cx("header-action")}>
                  
                  <div className={cx("action-item")}>
                      <Search/>
                  </div>

  
                  <div className={cx("action-item")}>
                   <div className={cx('div-cart')}>
                      <a href={config.publicRouter.cart}>
                          <IconCart className={cx('icon-cart')}/>
                          <div className={cx('count-cart')}>
                            <span>{cart?.cartTotalQuantity}</span>
                          </div>
                      </a>
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
