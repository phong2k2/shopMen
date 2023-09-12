import classNames from "classnames/bind";
import styles from './Category.module.scss'
import ReactPaginate from 'react-paginate';
import { Link, NavLink, useParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import * as categoryService from "@/services/adminServices/categoryService";
import { formatPrice } from '@/components/formatData/formatData';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { IconCart } from "@/components/Icons/icon";


const cx = classNames.bind(styles)
function Category() {
    const { slug } = useParams();
    const [nameTitle, setNameTitle] = useState('')
    const [data, setData] = useState([]);
    const [pageNumber, setPageNumber] = useState(0);
    const limit = 10

    const pageCount = useMemo(() => {
        return Math.ceil(data?.countProduct / limit);
    }, [data.countProduct, limit]);
     useEffect(() => {
        const getNameCategory = async () => {
            try {
                const res = await categoryService.getDetailCategory({slug, limit, pageNumber })
                setData(res)
                setNameTitle(res.data)
            }catch (err) {
                console.log(err)
            }
        }
        getNameCategory()
     },[slug, pageNumber])

     const handlePageChange = ({ selected }) => {
        setPageNumber(selected);
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
                                             trang Chủ
                                            </span>
                                        </a>
                                    </li>
                                    <li>
                                        <a>
                                            <span>
                                             Danh mục
                                            </span>
                                        </a>
                                    </li>
                                    <li>
                                        <a>
                                            <span>
                                            {nameTitle?.name}
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
                            <div className={cx('col-md-6')}>
                                <h1>{nameTitle?.name}</h1>
                            </div>
                            <div className={cx('col-md-6', 'select')}>
                                <div className={cx('option')}>
                                    <span>
                                        <select name="" id="">
                                            <option value="">Sản phẩm mới</option>
                                            <option value="">Tăng dần</option>
                                        </select>
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* List Product */}
                        <div className={cx('row')}>
                                {
                                    nameTitle?.product?.map((itemPro, index) => {
                                        return(
                                            <div key={index} className={cx(' col-md-3')}>
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
                                                            <button className={cx("add-cart")}>
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

export default Category;