import classNames from "classnames/bind";
import styles from "./ModalSearch.module.scss";
import { useEffect, useRef, useState } from "react";
import { IconSearch } from "@/components/Icons/icon";
import useDebounce from "@/hook/useDebounce";
import * as productService from "@/services/productService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark, faSpinner } from "@fortawesome/free-solid-svg-icons";
import ItemSearch from "@/components/ItemSearch";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { useDeliveryInfo } from "@/hook/useContext";
import { PUBLICROUTER } from "@/config/routes";

const cx = classNames.bind(styles);
function ModalSearch() {
  const [searchValue, setSearchValue] = useState("");
  const [showResult, setShowResult] = useState(false);
  const navigate = useNavigate();
  const inputRef = useRef();

  const { setShowModalSearch } = useDeliveryInfo();
  //Hook custom
  let debouncedValue = useDebounce(searchValue, 500);

  const { data: searchResult = [], isLoading } = useQuery({
    queryKey: ["search", debouncedValue],
    queryFn: () => {
      if (!debouncedValue?.trim()) {
        return;
      }
      return productService.getAllProducts({
        name: debouncedValue,
        limit: 6,
      });
    },
  });

  const handleChangeSearch = (e) => {
    let searchValue = e.target.value;
    if (searchValue.startsWith(" ")) {
      return;
    } else {
      setSearchValue(searchValue);
    }
  };

  const handleClear = () => {
    setSearchValue("");
    inputRef.current.focus();
  };

  const handleNextPageSearch = (itemSearch) => {
    navigate(
      PUBLICROUTER.productDetail.slug(itemSearch?.slug, itemSearch?._id)
    );
    setSearchValue("");
    setShowModalSearch(false);
  };

  const handleSearchProduct = (e) => {
    e.preventDefault();
    navigate(`/search?name=${searchValue}`);
    setShowModalSearch(false);
  };

  useEffect(() => {
    function onClickOutside(e) {
      const input = inputRef.current;
      if (showResult && !input.contains(e.target)) {
        setShowResult(false);
      }
    }
    document.addEventListener("click", onClickOutside);

    return () => {
      document.removeEventListener("click", onClickOutside);
    };
  });

  return (
    <div className={cx("site-nav-search")}>
      <p className={cx("title")}>Tìm Kiếm</p>
      <div className={cx("wrap-search")}>
        <form onSubmit={(e) => handleSearchProduct(e)}>
          <div className={cx("search-menu")}>
            <input
              value={searchValue}
              onFocus={(e) => {
                e.stopPropagation();
                setShowResult(true);
              }}
              onChange={(e) => handleChangeSearch(e)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleSearchProduct(e);
                }
              }}
              type="text"
              ref={inputRef}
              spellCheck="false"
              placeholder="Tìm kiếm sản phẩm..."
            />
            {!!searchValue && !isLoading ? (
              <button onClick={handleClear} className={cx("clear")}>
                <FontAwesomeIcon icon={faCircleXmark} />
              </button>
            ) : (
              ""
            )}
            {isLoading && (
              <div>
                <FontAwesomeIcon className={cx("loading")} icon={faSpinner} />
              </div>
            )}
            <button className={cx("search-button")}>
              <IconSearch />
            </button>
          </div>
        </form>
        {showResult && searchResult?.data?.length > 0 ? (
          <ul className={cx("list-search")}>
            {searchResult?.data?.map((itemSearch, index) => {
              return (
                <ItemSearch
                  key={index}
                  itemSearch={itemSearch}
                  handleNextPageSearch={handleNextPageSearch}
                />
              );
            })}
            <div className={cx("results-more")}>
              <a onClick={handleSearchProduct}>Xem thêm</a>
            </div>
          </ul>
        ) : (
          showResult &&
          debouncedValue && (
            <div className={cx("results-content")}>
              <p className={cx("data-empty")}>Không có sản phẩm nào...</p>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default ModalSearch;
