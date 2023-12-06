import classNames from "classnames/bind";
import styles from "./AccountLayout.module.scss";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import Sidebar from "../components/Sidebar/Sidebar";
import { useDeliveryInfo } from "@/hook/useContext";

const cx = classNames.bind(styles);
function AccountLayout({ children }) {
  const { showModalNavigation } = useDeliveryInfo();
  return (
    <div className={cx("main-body", { "sidebar-mover": showModalNavigation })}>
      <Header />
      <div className={cx("layout-account")}>
        <div className={cx("container")}>
          <div className={cx("content-account")}>
            <div className={cx("row")}>
              <div
                className={cx("col-lg-3 col-md-12 col-12", "sidebar-account")}
              >
                <Sidebar />
              </div>
              <div className={cx("col-lg-9 col-md-12 col-12")}>{children}</div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default AccountLayout;
