import { Box, Typography } from "@mui/material"
import PropTypes from "prop-types"
import classNames from "classnames/bind"
import styles from "./EmptyBox.module.scss"

const cx = classNames.bind(styles)
function EmptyBox({ title }) {
  return (
    <div className={cx("col-12")}>
      <div className={cx("box-empty")}>
        <i
          style={{ fontSize: "20rem", opacity: 0.4, lineHeight: "1rem" }}
          className="bi bi-box2"
        ></i>
        <h2 variant="body1">{title}</h2>
      </div>
    </div>
  )
}

EmptyBox.propTypes = {
  title: PropTypes.string
}
export default EmptyBox
