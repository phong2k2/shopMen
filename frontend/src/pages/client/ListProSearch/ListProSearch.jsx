import classNames from "classnames/bind";
import styles from './ListProSearch.module.scss'
import { useEffect, useMemo, useState } from "react";
import * as searchServices from '@/services/searchServices'
import { useSearchParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch } from "react-redux";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import ReactPaginate from "react-paginate";
import ProductItem from "@/components/ProductItem";
import { addToCart, getTotals } from "@/redux/cartSlice";

const cx = classNames.bind(styles)
function ListProSearch() {
    const params = {};
    const [listSearch, setListSearch] = useState([])
    const [page, setPage] = useState(1)
    const dispatch = useDispatch()
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

    const handelAddToCart = (product, discountedPrice) => {
        if(product) {
            dispatch(addToCart({
            orderItem: {
                name: product?.name,
                image: product?.image,
                amount: 1, 
                price: discountedPrice,
                product: product?._id
            }
            }))
            dispatch(getTotals());
        }
    };

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
                                                <ProductItem key={index} itemPro={itemPro} onClick={handelAddToCart}/>
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