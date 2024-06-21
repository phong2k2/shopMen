import Header from "../components/Header/Header"
import classNames from "classnames/bind"
import styles from "./DefaultLayout.module.scss"
import Footer from "@/layouts/components/Footer/Footer"
import Slider from "../components/Slider/Slider"
import { useDeliveryInfo } from "@/hook/useContext"

const cx = classNames.bind(styles)
function DefaultLayout({ children }) {
  const { showModalNavigation } = useDeliveryInfo()
  return (
    <div className={cx("main-body", { "sidebar-mover": showModalNavigation })}>
      <Header />
      <Slider />
      <div className={cx("content")}>{children}</div>
      <Footer />
    </div>
  )
}

export default DefaultLayout
