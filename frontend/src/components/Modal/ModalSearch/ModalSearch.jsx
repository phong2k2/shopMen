import classNames from "classnames/bind";
import styles from "./ModalSearch.module.scss";
import { useEffect, useRef, useState } from "react";
import { IconSearch } from "@/components/Icons/icon";
import useDebounce from "@/hook/useDebounce";
import * as searchServices from "@/services/searchServices";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark, faSpinner } from "@fortawesome/free-solid-svg-icons";
import ItemSearch from "@/components/ItemSearch";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { useDeliveryInfo } from "@/hook/useContext";

const cx = classNames.bind(styles);
function ModalSearch() {
  const [searchValue, setSearchValue] = useState("");
  const [showResult, setShowResult] = useState(false);
  const navigate = useNavigate();
  const inputRef = useRef();

  const { setShowModalSearch } = useDeliveryInfo();
  //Hook custom
  let debouncedValue = useDebounce(searchValue, 500);

  const searchQuery = useQuery({
    queryKey: ["search", debouncedValue],
    queryFn: () => {
      if (!debouncedValue?.trim()) {
        return;
      }
      return searchServices.search(debouncedValue);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const { data: searchResult, isLoading } = searchQuery;

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

  const handleSearchProduct = (e) => {
    e.preventDefault();
    navigate(`/search?q=${searchValue}&type=more`);
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
                  handleSearchProduct(e); // Gọi hàm xử lý tìm kiếm ở đây
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
            {searchResult?.data?.map((item, index) => {
              return (
                <ItemSearch
                  key={index}
                  data={item}
                  setSearchValue={setSearchValue}
                  setShowModalSearch={setShowModalSearch}
                />
              );
            })}
            <div className={cx("results-more")}>
              <a
                onClick={handleSearchProduct}
              >{`Xem thêm sản ${searchResult?.total} phẩm`}</a>
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
