import classNames from "classnames/bind";
import styles from './ListProSearch.module.scss'
import { Link, NavLink,useSearchParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { formatPrice } from '@/components/formatData/formatData';
import * as searchServices from '@/services/searchServices'
import { IconCart } from "@/components/Icons/icon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import ReactPaginate from "react-paginate";

const cx = classNames.bind(styles)
function ListProSearch() {
    const params = {};
    const [listSearch, setListSearch] = useState([])
    const [page, setPage] = useState(1)
    let [searchParams, setSearchParams] = useSearchParams();

    const pageCount = useMemo(() => {
        return Math.ceil(listSearch?.total / 10);
    }, [listSearch?.total]);
    
    for(let [key, value] of searchParams.entries()) {
        params[key] = value;
    }
        

    useEffect(() => {
        const fetchApiProductSearch = async () => {
            const {q, type} = params
            try {
              const res = await searchServices.search(q, type, page);
              if(res) {
                setListSearch(res);
              }
            } catch (error) {
                console.log(error);
            }
          };
          fetchApiProductSearch();
    },[page, params.q])

    const handlePageChange = ({selected}) => {
        setPage(selected);
    }
    return ( 
        <section className={cx('collections')}>
                <div className={cx('main-content')}>
                    <div className={cx('breadcrumb-shop')}>
                        <div className={cx('container')}>
                            <div className={cx('row')}>
                                <div className={cx('col-md-12')}>
                                    <ol className={cx('breadcrumb')}>
                                        <li>
                                            <a>
                                                <span>
                                                Trang Chủ
                                                </span>
                                            </a>
                                        </li>
                                        <li>
                                            <a>
                                                <span>
                                                Tìm kiếm
                                                </span>
                                            </a>
                                        </li>
                                    </ol>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* List Product */}
                    <div className={cx('list-collections')}>
                        <div className={cx('container')}>
                            {/* Title Product */}
                            <div className={cx('row', 'hed-title')}>
                                <div className={cx('col-md-12')}>
                                    <h1>Tìm kiếm</h1>
                                </div>

                                <div className={cx('col-md-12')}>
                                    <h3>{`Từ khóa tìm kiếm: ${params.q}`}</h3>
                                </div>
                                <span className={cx('dart-line')}></span>
                            </div>
                            {/* List Product */}
                            <div className={cx('result')}><h4>{`Tìm được ${listSearch.total} kết quả`}</h4></div>
                            <div className={cx('row')}>
                                    {
                                        listSearch?.data?.map((itemPro, index) => {
                                            return(
                                                <div key={index} className={cx(' col-md-3 mt-5')}>
                                                    <div className={cx('product-block')}>
                                                        <div className={cx('product-img')}>
                                                            <Link to={`/products/${itemPro?.slug}`}>
                                                                <picture>
                                                                    <source media="(max-width: 767px)" />
                                                                    <img src={`http://localhost:3000/${itemPro?.image}`} alt="Anh" />
                                                                </picture>
                                                            </Link>
                                                        </div>

                                                        <div className={cx('product-detail')}>
                                                            <div  className={cx("pro-name")}>
                                                                <NavLink className={cx("conformName")} to={`/products/${itemPro?.slug}`}>
                                                                {itemPro?.name}
                                                                </NavLink>
                                                            </div>
                                                            <div className={cx("box-pro-detail")}>
                                                                <div className={cx('product-price', 'conformName')}>
                                                                    {formatPrice(itemPro?.price)}
                                                                    {/* <span className={cx('price-del')}>
                                                                        <del>1000</del>
                                                                    </span> */}
                                                                </div>
                                                                <button  className={cx("add-cart")}>
                                                                    <IconCart width={'1.6rem'}/>
                                                                    <span>Thêm</span>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                            </div>
                        </div>
                    </div>
                    <ReactPaginate
                        previousLabel={<FontAwesomeIcon icon={faArrowLeft}/>}
                        nextLabel={<FontAwesomeIcon icon={faArrowRight}/>}
                        breakLabel="..."
                        breakClassName="break-me"
                        pageCount={pageCount}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={5}
                        onPageChange={handlePageChange}
                        containerClassName={cx("custom-pagination")}
                        previousClassName={cx("custom-pagination__item")}
                        nextClassName={cx('custom-pagination__item')}
                        pageClassName={cx('custom-pagination__item')}
                        pageLinkClassName = {cx('custom-pagination__link')}
                        subContainerClassName="pages pagination"
                        activeClassName={cx('custom-pagination__active')}
                        disabledClassName={cx('custom-pagination__disabled')}
                    />
                </div>
        </section>
     );
}

export default ListProSearch;