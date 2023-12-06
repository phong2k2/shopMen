import classNames from "classnames/bind";
import styles from "./Slider.module.scss";

const cx = classNames.bind(styles);
function Slider() {
  return (
    <div className={cx("slider")}>
      <div
        id="carouselExampleIndicators"
        className="carousel slide"
        data-ride="carousel"
      >
        <ol className="carousel-indicators">
          <li
            data-target="#carouselExampleIndicators"
            data-slide-to="0"
            className="active"
          ></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
        </ol>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              className="d-block w-100"
              src="https://file.hstatic.net/1000096703/file/gray_minimalist_aesthetic_fashion_facebook_cover_0a9911db9a6d47c39bc95617b47ac520.jpg"
            />
          </div>
          <div className="carousel-item">
            <img
              className="d-block w-100"
              src="https://file.hstatic.net/1000096703/file/ao_khoac_du_03a8426826034e17a1d5b6f8ffeaec2c.jpg"
              alt="Second slide"
            />
          </div>
          <div className="carousel-item">
            <img
              className="d-block w-100"
              src="https://file.hstatic.net/1000096703/file/gray_minimalist_aesthetic_fashion_facebook_cover_0a9911db9a6d47c39bc95617b47ac520.jpg"
              alt="Third slide"
            />
          </div>
        </div>
        <a
          className="carousel-control-prev"
          href="#carouselExampleIndicators"
          role="button"
          data-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="sr-only">Previous</span>
        </a>
        <a
          className="carousel-control-next"
          href="#carouselExampleIndicators"
          role="button"
          data-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="sr-only">Next</span>
        </a>
      </div>
    </div>
  );
}

export default Slider;
