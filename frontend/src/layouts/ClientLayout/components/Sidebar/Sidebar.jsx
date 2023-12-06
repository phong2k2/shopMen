import classNames from "classnames/bind";
import styles from "./Sidebar.module.scss";
import config from "@/config";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);
function Sidebar() {
  return (
    <div className={cx("sidebar")}>
      <h3 className={cx("title")}>Tài Khoản</h3>
      <div className={cx("account-list")}>
        <ul className={cx("list-unstyled")}>
          <li>
            <Link to={config.publicRouter.account}>
              <i className="bi bi-stop-circle"></i>Thông tin tài khoản
            </Link>
          </li>
          <li>
            <Link to={config.publicRouter.listOrders}>
              <i className="bi bi-stop-circle"></i> Đơn hàng
            </Link>
          </li>
          <li>
            <Link to={config.publicRouter.address}>
              <i className="bi bi-stop-circle"></i> Danh sách địa chỉ
            </Link>
          </li>
          <li className={cx("last")}>
            <a>
              <i className="bi bi-stop-circle"></i>Đăng xuất
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
