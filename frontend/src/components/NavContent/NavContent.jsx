import classNames from "classnames/bind";
import styles from "./NavContent.module.scss";
import PropTypes from "prop-types";

const cx = classNames.bind(styles);
function NavContent({ name, subName, nameProduct }) {
  return (
    <div className={cx("breadcrumb-shop")}>
      <div className={cx("container")}>
        <div className={cx("row")}>
          <div className={cx("col-md-12")}>
            <ol className={cx("breadcrumb")}>
              <li>
                <a>
                  <span>Home</span>
                </a>
              </li>
              <li >
                <a>
                  <span>{name}</span>
                </a>
              </li>
              {subName ? <li >
                <a>
                  <span>{subName}</span>
                </a>
              </li> : ''}
              {nameProduct ? <li >
                <a>
                  <span>{nameProduct}</span>
                </a>
              </li> : ''}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}

NavContent.propTypes = {
  name: PropTypes.string,
  subName: PropTypes.string, 
  nameProduct: PropTypes.string
};

export default NavContent;
