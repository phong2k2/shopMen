import classNames from "classnames/bind"
import styles from "./Product.module.scss"
import { useEffect, useMemo, useRef, useState } from "react"
import { useParams, useSearchParams } from "react-router-dom"
import * as productService from "@/services/productService"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useQuery } from "react-query"
import { faChevronDown } from "@fortawesome/free-solid-svg-icons"
import ProductItem from "@/components/ProductItem"
import { useDeliveryInfo } from "@/hook/useContext"
import NavContent from "@/components/NavContent"
import Pagination from "@/components/Pagination"
import ProductSkeleton from "@/components/Skeleton/Product/ProductSkeleton"
import { PUBLICROUTER } from "@/config/routes"
import EmptyBox from "@/components/EmptyBox"

const cx = classNames.bind(styles)
function Product() {
  const limit = 10
  const selectRef = useRef()
  const { id } = useParams()
  const [sortBy, setSortBy] = useState()
  const { setShowModalFilter, filter } = useDeliveryInfo()
  const [page, setPage] = useState(0)
  const [searchParams] = useSearchParams()
  const categoryId = searchParams.get("categoryId")
  const subCategoryId = searchParams.get("subCategoryId")
  const nameMain = searchParams.get("categoryName")

  const sortingOptions = useMemo(
    () => [
      { value: null, label: "Mặc định" },
      { value: "price-asc", label: "Giá: Tăng dần" },
      { value: "price-desc", label: "Giá: Giảm dần" },
      { value: "name-asc", label: "Tên: A-Z" },
      { value: "name-desc", label: "Tên: Z-A" }
    ],
    []
  )

  useEffect(() => {
    selectRef.current.textContent = sortingOptions[0].label
    setSortBy(sortingOptions[0].value)
  }, [id, sortingOptions])

  // Sort Product
  const handleSortChange = (selectedOption) => {
    selectRef.current.textContent = selectedOption.label
    setSortBy(selectedOption.value)
  }

  // Get Product
  const { data: allProducts = [], isLoading } = useQuery({
    queryKey: ["allProduct", categoryId, subCategoryId, sortBy, filter, page],
    queryFn: () => {
      return productService.getAllProducts({
        [categoryId ? "category" : "subCategory"]: categoryId || subCategoryId,
        limit,
        page,
        sortBy,
        ...filter
      })
    },
    retry: 1,
    retryDelay: 1000
  })

  const handleShowModalFilter = () => {
    setShowModalFilter(true)
  }

  const handlePageChange = (event, value) => {
    setPage(value)
    window.scrollTo(0, 0)
  }

  return (
    <section className={cx("collections")}>
      <div className={cx("main-content")}>
        <NavContent data={[{ label: nameMain }]} />
        {/* List Product */}
        <div className={cx("list-collections")}>
          <div className={cx("container")}>
            {/* List Product */}
            <div className={cx("row")}>
              <div className={cx("col-md-12")}>
                <div className={cx("row", "hed-title")}>
                  <div className={cx("product-title")}>
                    <h1 className={cx("product-name")}>{nameMain}</h1>
                  </div>
                  <div className={cx("list-filter")}>
                    <div className={cx("control-filter")}>
                      <div
                        onClick={handleShowModalFilter}
                        className={cx("filter")}
                      >
                        <span className={cx("filter-text")}>Bộ lọc</span>
                        <i className="bi bi-funnel" />
                      </div>

                      <div className={cx("sort-box")}>
                        <label className={cx("sort-contain")}>
                          <span className={cx("sort-title")}>Sắp xếp:</span>
                          <span
                            className={cx("sort-select")}
                            ref={selectRef}
                          ></span>
                          <span className={cx("icon")}>
                            <FontAwesomeIcon icon={faChevronDown} />
                          </span>
                        </label>
                        <ul className={cx("sort-by")}>
                          {sortingOptions.map((option) => (
                            <li
                              key={option.value}
                              className={cx("option", {
                                active: option.value === sortBy
                              })}
                              onClick={() => handleSortChange(option)}
                            >
                              {option.label}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                {isLoading ? (
                  <ProductSkeleton />
                ) : (
                  <div className={cx("row")}>
                    {allProducts?.data.length ? (
                      allProducts?.data?.map((itemPro, index) => {
                        return (
                          <div
                            key={index}
                            className={cx(" col-md-3 col-sm-6 mt-5", "col-6")}
                          >
                            <ProductItem itemPro={itemPro} />
                          </div>
                        )
                      })
                    ) : (
                      <EmptyBox title="Không có sản phẩm" />
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {allProducts?.meta?.totalPages ? (
          <Pagination
            count={allProducts?.meta?.totalPages}
            onChange={handlePageChange}
          />
        ) : (
          ""
        )}
      </div>
    </section>
  )
}

export default Product
