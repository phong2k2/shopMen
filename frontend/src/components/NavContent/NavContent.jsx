import classNames from "classnames/bind";
import styles from "./NavContent.module.scss";
import PropTypes from "prop-types";

const cx = classNames.bind(styles);
function NavContent({ navName }) {
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
              {navName.map((name, index) => (
                <li key={index}>
                  <a>
                    <span>{name}</span>
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}

NavContent.propTypes = {
  navName: PropTypes.array,
};

export default NavContent;
