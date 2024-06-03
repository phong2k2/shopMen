import classNames from "classnames/bind";
import styles from "./Footer.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhoneVolume,
  faRightLeft,
  faShieldHalved,
  faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles);
function Footer() {
  return (
    <footer className={cx("footer")}>
      <div className={cx("footer-module")}>
        <div className={cx("container", "module-container")}>
          <div className={cx("row")}>
            <div
              className={cx("col-md-3", "col-sm-3", "col-lg-3", "col-block")}
            >
              <div className={cx("icon")}>
                <FontAwesomeIcon
                  className={cx("icon-detail")}
                  icon={faRightLeft}
                />
              </div>
              <div className={cx("text")}>
                <p className={cx("title")}>Đổi hàng 30 ngày</p>
                <p className={cx("des")}>
                  Thời Gian thay đổi sản phẩm lên đến 30 ngày
                </p>
              </div>
            </div>

            <div
              className={cx("col-md-3", "col-sm-3", "col-lg-3", "col-block")}
            >
              <div className={cx("icon")}>
                <FontAwesomeIcon
                  className={cx("icon-detail")}
                  icon={faShieldHalved}
                />
              </div>
              <div className={cx("text")}>
                <p className={cx("title")}>Bảo hành 90 ngày</p>
                <p className={cx("des")}>Hỗ trợ bảo hành miễn phí</p>
              </div>
            </div>

            <div className={cx("col-md-3", "col-block")}>
              <div className={cx("icon")}>
                <FontAwesomeIcon
                  className={cx("icon-detail")}
                  icon={faPhoneVolume}
                />
              </div>
              <div className={cx("text")}>
                <p className={cx("title")}>5 ngày hoàn tiền</p>
                <p className={cx("des")}>
                  Thời gian hoàn tiền không lý do lên đến 5 ngày
                </p>
              </div>
            </div>

            <div className={cx("col-md-3", "col-block")}>
              <div className={cx("icon")}>
                <FontAwesomeIcon
                  className={cx("icon-detail")}
                  icon={faThumbsUp}
                />
              </div>
              <div className={cx("text")}>
                <p className={cx("title")}>Ưu đãi 15%</p>
                <p className={cx("des")}>Ưu đãi Vip cho Member lên đến 15%</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={cx("footer-bottom")}>
        <div className={cx("container")}>
          <div className={cx("row")}>
            <div
              className={cx("col-md-3", "col-sm-3", "col-lg-3", "col-block")}
            >
              <div className={cx("footer-block")}>
                <h4 className={cx("footer-title")}>Kenta VN</h4>
                <div className={cx("footer-content")}>
                  <ul>
                    <li>
                      <a>Giới thiệu</a>
                    </li>
                    <li>
                      <a>Kiểm tra đơn hàng</a>
                    </li>
                    <li>
                      <a>Cách chọn size</a>
                    </li>
                    <li>
                      <a>Thông tin liên hệ</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className={cx("col-md-3", "col-sm-3", "col-lg-3")}>
              <div className={cx("footer-block")}>
                <h4 className={cx("footer-title")}>Chính sách</h4>
                <div className={cx("footer-content")}>
                  <ul>
                    <li>
                      <a>Hướng dẫn mua hàng</a>
                    </li>
                    <li>
                      <a>Khách hàng thân thiết</a>
                    </li>
                    <li>
                      <a>Chính sách đổi hàng</a>
                    </li>
                    <li>
                      <a>Chính sách bảo mật</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className={cx("col-md-3", "col-sm-3", "col-lg-3")}>
              <div className={cx("footer-block")}>
                <h4 className={cx("footer-title")}>Kết nối với Kenta</h4>
                <div className={cx("footer-content")}>
                  <div className={cx("social-list")}>
                    <a>
                      <i className="fa-brands fa-facebook-f"></i>
                    </a>
                    <a>
                      <i className="fa-brands fa-google"></i>
                    </a>
                    <a>
                      <i className="fa-brands fa-instagram"></i>
                    </a>
                    <a>
                      <i className="fa-brands fa-tiktok"></i>
                    </a>
                  </div>
                  <div className={cx("logo-footer")}>
                    <a href="#">
                      <img
                        src="https://file.hara.vn/1000114117/file/logo-bct_5a0bbf4fb2d34c3e88c04df41ad38dc9.png"
                        alt=""
                      />
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className={cx("col-md-3", "col-sm-3", "col-lg-3")}>
              <div className={cx("footer-block")}>
                <h4 className={cx("footer-title")}>Thông tin cửa hàng</h4>
                <div className={cx("footer-content")}>
                  <ul>
                    <li>
                      <i className="fa-solid fa-house"></i>
                      <span>20 Tất Thành, P15, Q.10, DN</span>
                    </li>
                    <li>
                      <i className="fa-solid fa-phone"></i>
                      <span>Hotline: (028) 7300 6200</span>
                    </li>
                    <li>
                      <i className="fa-solid fa-envelope"></i>
                      <span>Mail: phongweb@gmail.com</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
