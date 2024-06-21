import classNames from "classnames/bind"
import styles from "./Header.module.scss"
import { useQuery } from "react-query"
import * as authService from "@/services/authService"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { IconCart, IconSearch } from "@/components/Icons/icon"
import Menu from "@/components/Menu/Menu"
import { logoutFailed, logoutStart, logoutSuccess } from "@/redux/authSlice"
import Button from "@/components/Button"
import { useDeliveryInfo } from "@/hook/useContext"
import { useEffect, useRef, useState } from "react"
import { getAllCategory } from "@/services/categoryService"
import Category from "@/components/Category"
import { PUBLICROUTER } from "@/config/routes"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars } from "@fortawesome/free-solid-svg-icons"

const cx = classNames.bind(styles)
function Header() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector((state) => state?.auth?.login)
  const name = user?.currentUser?.username
  const cart = useSelector((state) => state.cart)
  const { setShowModalCart, setShowModalSearch, setShowModalCategory } =
    useDeliveryInfo()
  const [showHeader, setShowHeader] = useState()
  const navRef = useRef()

  const userMenus = [
    {
      title: "Hồ sơ",
      check: true,
      to: PUBLICROUTER.account
    },
    {
      title: "Đơn hàng",
      to: PUBLICROUTER.orderStatistics.index,
      check: true
    },
    {
      title: "Đăng xuất",
      check: true,
      logout: true
    }
  ]

  const { data: listCategory } = useQuery({
    queryKey: "listCategoryHeader",
    queryFn: () => getAllCategory()
  })

  const handleClickLogout = async () => {
    dispatch(logoutStart())
    try {
      const res = await authService.logOut()
      if (res) {
        dispatch(logoutSuccess())
        toast.success("Đã đăng xuất", { position: "top-right" })
        navigate(PUBLICROUTER.home)
      }
    } catch (err) {
      dispatch(logoutFailed())
    }
  }

  const handleShowModalNavigation = () => {
    setShowModalCart((prev) => !prev)
  }

  const handleShowModalSearch = () => {
    setShowModalSearch((prev) => !prev)
  }

  useEffect(() => {
    const sticky = navRef.current.offsetTop
    const handleScroll = () => {
      if (window.pageYOffset > sticky) {
        setShowHeader(true)
      } else {
        setShowHeader(false)
      }
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <div
      className={cx("scroller-inner", {
        "sticky-header": showHeader
      })}
    >
      <div className={cx("header-top")}>
        <div className={cx("container")}>
          <div className={cx("row")}>
            <div className={cx("col-sm-6")}></div>
            <div className={cx("col-sm-6")}>
              <div className={cx("container-item")}>
                <ul className={cx("nav")}>
                  <li>
                    <i className="bi bi-telephone"></i> 18001833
                  </li>
                  <span className={cx("sure")}></span>
                  <li>
                    {name ? (
                      "Hi, " + name
                    ) : (
                      <Button className={cx("login")} to={PUBLICROUTER.auth}>
                        Đăng nhập
                      </Button>
                    )}
                    <span className={cx("account-menu")}>
                      <i className="bi bi-person-circle"></i>
                    </span>
                    {user?.isLogin ? (
                      <Menu
                        items={userMenus}
                        handleClickLogout={handleClickLogout}
                      />
                    ) : (
                      ""
                    )}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <header ref={navRef} className={cx("header")}>
        <div className={cx("wrapper-header")}>
          <div className={cx("container")}>
            <div className={cx("row", "header-body")}>
              <div className={cx("col-2", "icon-category")}>
                <div>
                  <a onClick={() => setShowModalCategory(true)}>
                    <FontAwesomeIcon icon={faBars} />
                  </a>
                </div>
              </div>
              <div className={cx("col-md-2", "col-sm-2", "col-7", "wrap-logo")}>
                <div className={cx("header-logo")}>
                  <a href={PUBLICROUTER.home}>
                    <img
                      className={cx("image-header")}
                      src="https://file.hstatic.net/1000096703/file/logo_website__191___70_px__979fdef210f7474d8a09b42724033b5c.png"
                      alt="logo"
                    />
                  </a>
                </div>
              </div>

              <div className={cx("col-md-8", "col-sm-7", "wrap-category")}>
                <nav className={cx("navbar-main")}>
                  <ul className={cx("list-main")}>
                    {listCategory?.map((category) => {
                      return (
                        <Category key={category?._id} categories={category} />
                      )
                    })}
                  </ul>
                </nav>
              </div>

              <div className={cx("col-md-2", "col-3", "action")}>
                <div className={cx("header-action")}>
                  {/* <Search /> */}
                  <div className={cx("action-item")}>
                    <a onClick={handleShowModalSearch}>
                      <IconSearch className={cx("icon-search")} />
                    </a>
                  </div>
                  {/* Cart */}
                  <div className={cx("action-item")}>
                    <div className={cx("div-cart")}>
                      <a onClick={handleShowModalNavigation}>
                        <IconCart className={cx("icon-cart")} />
                        <div className={cx("count-cart")}>
                          <span>{cart?.cartTotalQuantity}</span>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  )
}

export default Header
