import classNames from "classnames/bind";
import styles from "./Product.module.scss";
import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
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
  let location = useLocation();
  const selectRef = useRef();
  const { slug } = useParams();
  const stateNav = location.state?.stateNav;
  const [sortOption, setSortOption] = useState();
  const { setShowModalFilter, filter } = useDeliveryInfo();
  const [pageNumber, setPageNumber] = useState(0);
  const limit = 10;
  const navName = [stateNav?.name];

  const sortingOptions = useMemo(
    () => [
      { value: "default", label: "Mặc định" },
      { value: "salePrice-asc", label: "Giá: Tăng dần" },
      { value: "salePrice-desc", label: "Giá: Giảm dần" },
      { value: "name-asc", label: "Tên: A-Z" },
      { value: "name-desc", label: "Tên: Z-A" },
    ],
    []
  );

  useEffect(() => {
    selectRef.current.textContent = sortingOptions[0].label;
    setSortOption(sortingOptions[0].value);
  }, [slug, sortingOptions]);

  // Sort Product
  const handleSortChange = (selectedOption) => {
    selectRef.current.textContent = selectedOption.label;
    setSortOption(selectedOption.value);
  };

  // Get Product
  const getProductQuery = useQuery({
    queryKey: ["productByCate", slug, limit, pageNumber, sortOption, filter],
    queryFn: () => {
      return productService.getProductByCategory({
        slug,
        limit,
        pageNumber,
        sortOption,
        ...filter,
      });
    },
    enabled: slug !== undefined,
  });

  const { data: allProducts, isLoading } = getProductQuery;

  const handleShowModalFilter = () => {
    setShowModalFilter(true);
  };

  const handlePageChange = (event, value) => {
    setPageNumber(value);
  };

  return (
    <section className={cx("collections")}>
      <div className={cx("main-content")}>
        <NavContent navName={navName} />
        {/* List Product */}
        <div className={cx("list-collections")}>
          <div className={cx("container")}>
            {/* List Product */}
            <div className={cx("row")}>
              <div className={cx(" col-md-12")}>
                <div className={cx("row", "hed-title")}>
                  <div className={cx("col-md-6")}>
                    <h1 className={cx("product-name")}>{stateNav?.name}</h1>
                  </div>
                  <div className={cx("col-md-6", "select")}>
                    <div className={cx("control-filter")}>
                      <div
                        onClick={handleShowModalFilter}
                        className={cx("filter")}
                      >
                        <span className={cx("text")}>Bộ lọc</span>
                        <i className="bi bi-funnel" />
                      </div>

                      <div className={cx("sort-box")}>
                        <div className={cx("sort-mobile")}>
                          <span>Sắp xếp:</span>
                          <i className="bi bi-filter-left"></i>
                        </div>

                        <label className={cx("title")} htmlFor="">
                          Sắp xếp:
                          <span className={cx("text")} ref={selectRef}></span>
                          <span className={cx("icon")}>
                            <FontAwesomeIcon icon={faChevronDown} />
                          </span>
                        </label>
                        <ul className={cx("sort-by")}>
                          {sortingOptions.map((option) => (
                            <li
                              key={option.value}
                              className={cx("option", {
                                active: option.value === sortOption,
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
                  {allProducts?.docs?.map((itemPro, index) => {
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
