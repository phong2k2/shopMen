import classNames from "classnames/bind"
import styles from "./NotFound.module.scss"
import { Link } from "react-router-dom"
import NavContent from "@/components/NavContent"
import Button from "@/components/Button"

const cx = classNames.bind(styles)
function NotFound() {
  return (
    <>
      <NavContent name="Error 404" />
      <div className={cx("container")}>
        <h2 className={cx("title-error")}>ERROR 404</h2>

        <div className={cx("wrapper-content")}>
          <img src="https://aristino.com/Content/pc/images/404.png" alt="" />
          <h4 className={cx("not-page")}>Không tìm thấy trang</h4>
          <p className={cx("notification")}>
            Kenta rất lấy làm tiếc về sự bất tiện này!
            <br />
            Để tiếp tục mua sắm, Quý khách vui lòng trở lại trang chủ.
          </p>

          <Button className={cx("back-home")} box to={"/"}>
            Trở lại trang chủ
          </Button>
        </div>
      </div>
    </>
  )
}

export default NotFound
