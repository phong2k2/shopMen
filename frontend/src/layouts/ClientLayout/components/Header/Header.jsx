import classNames from "classnames/bind";
import styles from "./Header.module.scss";
import { useQuery } from "react-query";
import * as authService from "@/services/authService";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { IconCart, IconSearch } from "@/components/Icons/icon";
import Menu from "@/components/Menu/Menu";
import config from "@/config";
import { logoutFailed, logoutStart, logoutSuccess } from "@/redux/authSlice";
import Button from "@/components/Button";
import { useDeliveryInfo } from "@/hook/useContext";
import { useEffect, useRef, useState } from "react";
import { getAllCategory } from "@/services/categoryService";
import Category from "@/components/Category";

const cx = classNames.bind(styles);
function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth?.login);
  const name = user?.currentUser?.data?.username;
  const cart = useSelector((state) => state.cart);
  const { setShowModalCart, setShowModalSearch, setShowModalCategory } =
    useDeliveryInfo();
  const [showHeader, setShowHeader] = useState();
  const isAdmin = user?.currentUser?.data?.isAdmin;
  const navRef = useRef();

  const userMenus = [
    {
      title: "Hồ sơ",
      check: true,
      to: config.publicRouter.account,
    },
    {
      title: "Đơn hàng",
      to: config.publicRouter.listOrders,
      check: true,
    },
    {
      title: "Đăng xuất",
      check: true,
      logout: true,
    },
  ];

  const menuItem = [
    {
      title: "Quản Trị website",
      to: config.privateRouter.dashboard,
    },
    ...userMenus,
  ];

  const listCategory = useQuery({
    queryKey: "listCategoryHeader",
    queryFn: () => getAllCategory(),
  });

  const handleClickLogout = async () => {
    dispatch(logoutStart());
    try {
      const res = await authService.logOut();
      if (res) {
        dispatch(logoutSuccess());
        toast.success("Đã đăng xuất", { position: "top-right" });
        navigate(config.publicRouter.home);
      }
    } catch (err) {
      dispatch(logoutFailed());
    }
  };

  const handleClickNavigate = (item) => {
    navigate(`/collections/${item?.slug}`, { state: { stateNav: item } });
  };

  const handleShowModalNavigation = () => {
    setShowModalCart((prev) => !prev);
  };

  const handleShowModalSearch = () => {
    setShowModalSearch((prev) => !prev);
  };

  useEffect(() => {
    const sticky = navRef.current.offsetTop;
    const handleScroll = () => {
      if (window.pageYOffset > sticky) {
        setShowHeader(true);
      } else {
        setShowHeader(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div
      className={cx("scroller-inner", {
        "sticky-header": showHeader,
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
                      <Button
                        className={cx("login")}
                        to={config.publicRouter.auth}
                      >
                        Đăng nhập
                      </Button>
                    )}
                    <span className={cx("account-menu")}>
                      <i className="bi bi-person-circle"></i>
                    </span>
                    {user?.isLogin ? (
                      <Menu
                        items={isAdmin ? menuItem : userMenus}
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
      <header ref={navRef} className={cx("wrapper-header")}>
        <div className={cx("wrapper-header")}>
          <div className={cx("container")}>
            <div className={cx("row", "header-body")}>
              <div
                className={cx("col-md-2", "col-sm-6 col-7", "wrap-header-2")}
              >
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

              <div className={cx("col-md-8", "wrap-header-4", "hide")}>
                <nav className={cx("navbar-main")}>
                  {
                    <ul className={cx("list-main")}>
                      {listCategory?.data?.map((category) => {
                        return (
                          <Category
                            key={category?._id}
                            categories={category}
                            handleClickNavigate={handleClickNavigate}
                          />
                        );
                      })}
                    </ul>
                  }
                </nav>
              </div>

              <div
                className={cx(
                  "col-md-2",
                  "col-sm-6",
                  "col-5",
                  "action",
                  "wrap-header-3"
                )}
              >
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
                  {/* Category */}
                  <div className={cx("action-item", "show-cate")}>
                    <div className={cx("div-category")}>
                      <a onClick={() => setShowModalCategory((prev) => !prev)}>
                        <i
                          className={cx(
                            "fa-solid fa-align-justify",
                            "icon-cate"
                          )}
                        ></i>
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
  );
}

export default Header;
