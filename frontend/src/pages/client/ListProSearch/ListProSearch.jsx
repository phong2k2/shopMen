import { useMemo, useState } from "react"
import classNames from "classnames/bind"
import styles from "./ListProSearch.module.scss"
import * as productService from "@/services/productService"
import { useSearchParams } from "react-router-dom"
import ProductItem from "@/components/ProductItem"
import { useQuery } from "react-query"
import Pagination from "@/components/Pagination"

const cx = classNames.bind(styles)
function ListProSearch() {
  const [page, setPage] = useState(1)
  let [searchParams] = useSearchParams()
  const name = searchParams.get("name")

  const { data: listSearch = [] } = useQuery({
    queryKey: ["search", name, page],
    queryFn: () => {
      return productService.getAllProducts({
        name,
        page,
        limit: 6
      })
    }
  })

  const handlePageChange = ({ selected }) => {
    setPage(selected)
    window.scrollTo(0, 0)
  }

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
                <h3>{`Từ khóa tìm kiếm: ${name}`}</h3>
              </div>
              <span className={cx("dart-line")}></span>
            </div>
            {/* List Product */}
            <div className={cx("result")}>
              <h4>{`Tìm được ${listSearch?.data?.length} kết quả`}</h4>
            </div>
            <div className={cx("row")}>
              {listSearch?.data?.map((itemPro, index) => (
                <div className={cx(" col-md-3 col-sm-6 mt-5", "col-6")}>
                  <ProductItem key={index} itemPro={itemPro} />
                </div>
              ))}
            </div>
          </div>
        </div>
        {listSearch?.meta?.totalPages ? (
          <Pagination
            count={listSearch?.meta?.totalPages}
            showFirstButton
            showLastButton
            onChange={handlePageChange}
          />
        ) : (
          ""
        )}
      </div>
    </section>
  )
}

export default ListProSearch
