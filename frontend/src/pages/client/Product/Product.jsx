import classNames from "classnames/bind";
import styles from "./Product.module.scss";
import { useEffect, useMemo, useRef, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import * as productService from "@/services/productService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useQuery } from "react-query";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import ProductItem from "@/components/ProductItem";
import { useDeliveryInfo } from "@/hook/useContext";
import NavContent from "@/components/NavContent";

import Pagination from "@mui/material/Pagination";

const cx = classNames.bind(styles);
function Product() {
  const limit = 10;
  const selectRef = useRef();
  const { id } = useParams();
  const [sortBy, setSortBy] = useState();
  const { setShowModalFilter, filter } = useDeliveryInfo();
  const [page, setPage] = useState(0);
  const [searchParams] = useSearchParams();
  const categoryId = searchParams.get("categoryId");
  const subCategoryId = searchParams.get("subCategoryId");
  const name = searchParams.get("categoryName");

  const sortingOptions = useMemo(
    () => [
      { value: null, label: "Mặc định" },
      { value: "price-asc", label: "Giá: Tăng dần" },
      { value: "price-desc", label: "Giá: Giảm dần" },
      { value: "name-asc", label: "Tên: A-Z" },
      { value: "name-desc", label: "Tên: Z-A" },
    ],
    []
  );

  useEffect(() => {
    selectRef.current.textContent = sortingOptions[0].label;
    setSortBy(sortingOptions[0].value);
  }, [id, sortingOptions]);

  // Sort Product
  const handleSortChange = (selectedOption) => {
    selectRef.current.textContent = selectedOption.label;
    setSortBy(selectedOption.value);
  };

  // Get Product
  const { data: allProducts, isLoading } = useQuery({
    queryKey: ["allProduct", categoryId, subCategoryId, sortBy, filter],
    queryFn: () => {
      return productService.getAllProducts({
        [categoryId ? "category" : "subCategory"]: categoryId || subCategoryId,
        limit,
        page,
        sortBy,
        ...filter,
      });
    },
  });

  const handleShowModalFilter = () => {
    setShowModalFilter(true);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  return (
    <section className={cx("collections")}>
      <div className={cx("main-content")}>
        <NavContent name={name} />
        {/* List Product */}
        <div className={cx("list-collections")}>
          <div className={cx("container")}>
            {/* List Product */}
            <div className={cx("row")}>
              <div className={cx(" col-md-12")}>
                <div className={cx("row", "hed-title")}>
                  <div className={cx("col-md-6")}>
                    <h1 className={cx("product-name")}>{name}</h1>
                  </div>
                  <div className={cx("col-md-6", "select")}>
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
                                active: option.value === sortBy,
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
                <div className={cx("row")}>
                  {allProducts?.map((itemPro, index) => {
                    return (
                      <ProductItem
                        key={index}
                        itemPro={itemPro}
                        loading={isLoading}
                      />
                    );
                  })}
                </div>
              </div>
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
          count={allProducts?.totalPages}
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

export default Product;
