import classNames from "classnames/bind";
import styles from './Search.module.scss'
import { useEffect, useRef, useState } from "react";
import { IconSearch } from "@/components/Icons/icon";
import useDebounce from "@/hook/useDebounce";
import * as searchServices from '@/services/searchServices'
import HeaderTippy from '@tippyjs/react/headless';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark, faSpinner } from "@fortawesome/free-solid-svg-icons";
import ProductItem from "@/components/ProductItem";
import { Link, useNavigate } from "react-router-dom";

const cx = classNames.bind(styles)
function Search() {
    const [searchResult, setSearchResult] = useState([]);
    const [searchValue, setSearchValue] = useState('')
    const [loading, setLoading] = useState(false);
    const [showResult ,setShowResult] = useState(false);
    const navigate = useNavigate()

    const inputRef = useRef()
    //Hook
    const debouncedValue = useDebounce(searchValue, 500);
    useEffect(() => {
        if (!debouncedValue?.trim()) {
            setSearchResult([]);
            return;
        }
        
            setLoading(true);

            const fetchApiSearch = async () => {
            try {
                const res = await searchServices.search(debouncedValue);
                setSearchResult(res?.data);
                setLoading(false);
            } catch (error) {
                setLoading(false);
            }
        };
        fetchApiSearch();
    }, [debouncedValue])


    const handleChangeSearch = (e) => {
        let searchValue = e.target.value;
        if (searchValue.startsWith(' ')) {
            return;
          } else {
            setSearchValue(searchValue);
          }
    }

    const handleHideResult = () => {
        setShowResult(false);
    };

    const handleClear = () => {
        setSearchValue('')
        setSearchResult([]);
        inputRef.current.focus();
    }

    const handleSearchProduct = (e) => {
        e.preventDefault()
        navigate(`/search?q=${searchValue}&type=more`)
    }

    return ( 
        <HeaderTippy
            interactive="true"
            visible={showResult && searchResult.length > 0}
            render={(attrs) => (
                    <ul className={cx('result-search')} tabIndex="-1" {...attrs}>
                    {
                        searchResult?.map((item, index) => {
                            return (
                                <ProductItem key={index} data={item}/>
                            )
                        })
                    }
                    <li className={cx('all-result')}><Link to={`/search?q=${searchValue}&type=more`}> <i className="fa-solid fa-chevron-down"></i> Xem Thêm</Link></li>
                </ul>
            )}
            onClickOutside={handleHideResult}
        >
                <form onSubmit={(e) => handleSearchProduct(e)}>
                    <div className={cx("search-menu")}>
                        <input
                            value={searchValue}
                            onFocus={() => setShowResult(true)}
                            onChange={(e) => handleChangeSearch(e)} 
                            onKeyPress={(e) => {
                                if (e.key === 'Enter') {
                                    e.preventDefault(); // Ngăn chặn sự kiện mặc định của Enter (tức là submit form)
                                    handleSearchProduct(e); // Gọi hàm xử lý tìm kiếm ở đây
                                }
                            }}
                            type="text"
                            ref={inputRef}
                            spellCheck="false"
                            placeholder="Tìm kiếm"
                        />
                        {
                            !!searchValue && !loading ? (
                                <button onClick={handleClear} className={cx('clear')} >
                                    <FontAwesomeIcon icon={faCircleXmark} />
                                </button>
                            ): (
                                ''
                            )
                        }
                        {loading && <div><FontAwesomeIcon className={cx('loading')} icon={faSpinner} /></div>}
                        <span className={cx('distance')}></span>
                        <button className={cx('search-button')}>
                            <IconSearch className={'icon-search-button'}/>
                        </button>
                    </div>
                </form>
        </HeaderTippy>
     );
}

export default Search;