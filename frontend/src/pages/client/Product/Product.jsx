import classNames from "classnames/bind";
import styles from './Product.module.scss'
import ReactPaginate from 'react-paginate';
import { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
// import * as categoryService from "@/services/adminServices/categoryService";
import * as productService from "@/services/adminServices/productService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { addToCart, getTotals } from "@/redux/cartSlice";
import ProductItem from "@/components/ProductItem";


const cx = classNames.bind(styles)
function Product() {
    const { slug } = useParams();
    const [pageNumber, setPageNumber] = useState(0);
    const [products, setProducts] = useState([])
    const dispatch = useDispatch()
    const limit = 10


    const pageCount = useMemo(() => {
        return Math.ceil(products?.totalProducts / limit);
    }, [products?.totalProducts, limit]);
    //  useEffect(() => {
    //     const getNameCategory = async () => {
    //         try {
    //             const res = await categoryService.getDetailCategory({slug, limit, pageNumber })
    //             setData(res)
    //             setNameTitle(res?.data)
    //         }catch (err) {
    //             console.log(err)
    //         }
    //     }
    //     getNameCategory()
    //  },[slug, pageNumber])

    useEffect(() => {
    const fetchGetProductByCategory = async () => {
        try {
            const res = await productService.getProductByCategory(slug, limit, pageNumber)
            setProducts(res)
        }catch (err) {
            console.log(err)
        }
    }
    fetchGetProductByCategory()
    },[slug])

    useEffect(() => {
        const fetchGetProductBySubCategory = async () => {
            try {
                const res = await productService.getProductBySubCategory(slug, limit, pageNumber);
                setProducts(res)
            }catch (err) {
                console.error(err)
            }
        }
        fetchGetProductBySubCategory()
    },[slug])

      // Add to cart
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
                                            {products?.nameCategory}
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
                                <h1>{products?.nameCategory}</h1>
                            </div>
                            {/* <div className={cx('col-md-6', 'select')}>
                                <div className={cx('option')}>
                                    <span>
                                        <select name="" id="">
                                            <option value="">Sản phẩm mới</option>
                                            <option value="">Tăng dần</option>
                                        </select>
                                    </span>
                                </div>
                            </div> */}
                        </div>

                        {/* List Product */}
                        <div className={cx('row')}>
                                {
                                    products?.product?.map((itemPro, index) => {
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

export default Product;