import classNames from "classnames/bind"
import styles from "./NavContent.module.scss"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"

const cx = classNames.bind(styles)
function NavContent({ data }) {
  const LinkTo = (item) =>
    item.path ? (
      [
        <Link to={item?.path}>
          <span>{item?.label}</span>
        </Link>
      ]
    ) : (
      <a>
        <span>{item?.label}</span>
      </a>
    )

  return (
    <div className={cx("breadcrumb-shop")}>
      <div className={cx("container")}>
        <div className={cx("row")}>
          <div className={cx("col-md-12")}>
            <ol className={cx("breadcrumb")}>
              <li>
                <Link to={"/"}>
                  <span>Home</span>
                </Link>
              </li>
              {data?.map((item, index) => (
                <li key={index}>{LinkTo(item)}</li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  )
}

NavContent.propTypes = {
  name: PropTypes.string,
  subName: PropTypes.string,
  nameProduct: PropTypes.string
}

export default NavContent
