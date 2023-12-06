import classNames from "classnames/bind";
import styles from "./ListProSearch.module.scss";
import { useEffect, useMemo, useState } from "react";
import * as searchServices from "@/services/searchServices";
import { useSearchParams } from "react-router-dom";
import ProductItem from "@/components/ProductItem";
import { Pagination } from "@mui/material";

const cx = classNames.bind(styles);
function ListProSearch() {
  const params = {};
  const [listSearch, setListSearch] = useState([]);
  const [page, setPage] = useState(1);
  let [searchParams] = useSearchParams();

  const q = searchParams.get("q");
  const type = searchParams.get("type");
  const pageCount = useMemo(() => {
    return Math.ceil(listSearch?.total / 10);
  }, [listSearch?.total]);

  useEffect(() => {
    const fetchApiProductSearch = async () => {
      try {
        const res = await searchServices.search(q, type, page);
        if (res) {
          setListSearch(res);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchApiProductSearch();
  }, [page, params.q]);

  const handlePageChange = ({ selected }) => {
    setPage(selected);
  };

  return (
    <section className={cx("collections")}>
      <div className={cx("main-content")}>
        <div className={cx("breadcrumb-shop")}>
          <div className={cx("container")}>
            <div className={cx("row")}>
              <div className={cx("col-md-12")}>
                <ol className={cx("breadcrumb")}>
                  <li>
                    <a>
                      <span>Trang Chủ</span>
                    </a>
                  </li>
                  <li>
                    <a>
                      <span>Tìm kiếm</span>
                    </a>
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>

        {/* List Product */}
        <div className={cx("list-collections")}>
          <div className={cx("container")}>
            {/* Title Product */}
            <div className={cx("row", "hed-title")}>
              <div className={cx("col-md-12")}>
                <h1>Tìm kiếm</h1>
              </div>

              <div className={cx("col-md-12")}>
                <h3>{`Từ khóa tìm kiếm: ${q}`}</h3>
              </div>
              <span className={cx("dart-line")}></span>
            </div>
            {/* List Product */}
            <div className={cx("result")}>
              <h4>{`Tìm được ${listSearch.total} kết quả`}</h4>
            </div>
            <div className={cx("row")}>
              {listSearch?.data?.map((itemPro, index) => {
                return <ProductItem key={index} itemPro={itemPro} />;
              })}
            </div>
          </div>
        </div>
        <Pagination
          sx={{
            display: "flex",
            justifyContent: "center",
            listStyle: "none",
            padding: 5,
            marginBottom: 0,
            "&  svg": {
              fontSize: "2.2rem",
            },
          }}
          count={pageCount}
          color="primary"
          size="large"
          boundaryCount={2}
          showFirstButton
          showLastButton
          onChange={handlePageChange}
        />
      </div>
    </section>
  );
}

export default ListProSearch;
