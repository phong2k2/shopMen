import classNames from "classnames/bind";
import styles from "./Home.module.scss";
import HomeProduct from "@/components/HomeProduct/HomeProduct";

const cx = classNames.bind(styles);
function Home() {
  return (
    <>
      <section className={cx("wrapper-home-collection")}>
        <div className={cx("container-main")}>
          <HomeProduct />
        </div>
      </section>
      {/* 2. two collections */}

      <section className={cx("wrapper-home-banner")}>
        <div className={cx("container-full")}>
          <div className={cx("row")}>
            <div className={cx("col-sm-4")}>
              <div className={cx("block-banner")}>
                <a className={cx("img-group")}>
                  <img
                    className={cx("img-banner")}
                    src="https://file.hstatic.net/1000096703/file/13_f161048fd69e41c096161641f468d663.jpg"
                  />
                </a>
              </div>
            </div>
            <div className={cx("col-sm-4")}>
              <div className={cx("block-banner")}>
                <a className={cx("img-group")}>
                  <img
                    className={cx("img-banner")}
                    src="https://file.hstatic.net/1000096703/file/9_c25efb770ca748868ff408bea4c4c4c5.jpg"
                  />
                </a>
              </div>
            </div>
            <div className={cx("col-sm-4")}>
              <div className={cx("block-banner")}>
                <a className={cx("img-group")}>
                  <img
                    className={cx("img-banner")}
                    src="https://file.hstatic.net/1000096703/file/11_7441d71a347d4bf29645e98a4d1826c8.jpg"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* News */}
      <section className={cx("wrapper-home-news")}>
        <div className={cx("section")}>
          <div className={cx("row")}>
            <div className={cx("col-sm-2", "item", "item")}>
              <div className={cx("block-item")}>
                <a href="#">
                  <img
                    src="https://file.hstatic.net/1000096703/file/1_abfc38482fcc47d592e53aea83de357c.jpg"
                    alt=""
                  />
                </a>
              </div>
            </div>
            <div className={cx("col-sm-2", "item")}>
              <div className={cx("block-item")}>
                <a href="#">
                  <img
                    src="https://file.hstatic.net/1000096703/file/220_e2dba702eda044e291c61c4eca34fb8e.jpg"
                    alt=""
                  />
                </a>
              </div>
            </div>

            <div className={cx("col-sm-2", "item")}>
              <div className={cx("block-item")}>
                <a href="#">
                  <img
                    src="https://file.hstatic.net/1000096703/file/224_2b6ffb57cd3946899fe49316972a3916.jpg"
                    alt=""
                  />
                </a>
              </div>
            </div>

            <div className={cx("col-sm-2", "item")}>
              <div className={cx("block-item")}>
                <a href="#">
                  <img
                    src="https://file.hstatic.net/1000096703/file/237_aeb60ff133da46e69bb9ea40930c83f8.jpg"
                    alt=""
                  />
                </a>
              </div>
            </div>
            <div className={cx("col-sm-2", "item")}>
              <div className={cx("block-item")}>
                <a href="#">
                  <img
                    src="https://file.hstatic.net/1000096703/file/z4486796535458_036b3ced1bb70880f74ee32f59b5992e_57f002bb706848b39b91e206a522ea3e.jpg"
                    alt=""
                  />
                </a>
              </div>
            </div>
            <div className={cx("col-sm-2", "item")}>
              <div className={cx("block-item")}>
                <a href="#">
                  <img
                    src="https://file.hstatic.net/1000096703/file/z4486796638827_dbe44cd0d3d53f7cc90241eaf73d0a10_0c93b062c4c6430a8d80a80721e1a7b3.jpg"
                    alt=""
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
