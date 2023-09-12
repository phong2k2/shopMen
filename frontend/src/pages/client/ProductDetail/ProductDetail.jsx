import classNames from "classnames/bind"
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as productService from "@/services/adminServices/productService";
import styles from "./ProductDetail.module.scss"
import { addToCart, getTotals } from "@/redux/cartSlice";
import { formatPrice } from "@/components/formatData/formatData";

const cx = classNames.bind(styles)
function ProductDetail() {
    const { slug } = useParams()
    const [ detailProduct, setDetailProduct] = useState(null)
    const [ amount, setAmount] = useState(1)
    const dispatch = useDispatch()
    
    useEffect(() => {
        const productDetail = async () => {
            try {
                const res = await productService.getProductDetail({slug})
                if(res) {
                    setDetailProduct(res)
                }
            }catch (err) {
                console.log(err)
            }
        }
        productDetail()
    },[])

    const handleChangeCount = (type, limited) => {
        if(type === 'decrease') {
            if(!limited) {
                setAmount(amount - 1)
            }
        }else {
            setAmount(amount + 1)
        }
    }

    

    const handleChangeAmount = (e) => {
        let newValue = e.target.value;
        if ( !newValue || !isNaN(newValue)) {
          if (newValue > 999) {
            newValue = 999;
          }
          setAmount(Number(newValue))
        }
    }

    const handleBlur = (e) => {
        let number = parseInt(e.target.value)
        if(number) {
            setAmount(number)
        }else {
            setAmount(1)
        }
       
    }
    console.log(detailProduct)
    //Add to Cart
    const handleAddToCart =  () => {
        if(detailProduct) {
            dispatch(addToCart({
                orderItem : {
                    name: detailProduct?.name,
                    image: detailProduct?.image,
                    amount: amount,
                    price: detailProduct?.price,
                    discount: detailProduct?.discount,
                    product: detailProduct?._id
                }
            }))
            dispatch(getTotals());
        }
        
    }

    return ( 
        <div className={cx('product-detail')}>
            <div className={cx('breadcrumb-shop')}>
                    <div className={cx('container')}>
                        <div className={cx('row')}>
                            <div className={cx('col-md-12')}>
                                <ol className={cx('breadcrumb')}>
                                    <li>
                                        <a>
                                            <span>
                                             Trang chủ
                                            </span>
                                        </a>
                                    </li>
                                    <li>
                                        <a>
                                            <span>
                                            {detailProduct?.category?.name}
                                            </span>
                                        </a>
                                    </li>
                                    <li>
                                        <a>
                                            <span>
                                             {detailProduct?.name}
                                            </span>
                                        </a>
                                    </li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>
            <div className={cx('container')}>
                <div className={cx('row')}>
                    <div className={cx('col-md-12')}>
                        <div className={cx('row')}>
                                    <div className={cx('col-md-6')}>
                                        <div className={cx('product-gallery')}>
                                            <div className={cx('div-detail')}>
                                                <ul className={cx('slide-product')}>
                                                    <li className={cx('gallery-item')}>
                                                        <img src={`http://localhost:3000/${detailProduct?.image}`} alt="" />
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={cx('col-md-6', 'product-content')}>
                                        <div className={cx('product-title')}>
                                            <h1>{detailProduct?.name}</h1>
                                            <p>
                                                <span>Số Lượng:</span>
                                                <span>{detailProduct?.countInStock}</span>
                                            </p>
                                        </div>
                                        <div className={cx('product-price')}>
                                            <span className={cx('pro-price')}>{formatPrice(detailProduct?.price) }</span>
                                            {/* <del>10000d</del> */}
                                        </div>
                                        
                                            <div className={cx('select-action')}>
                                                {/* Biến thể */}
                                                <div className={cx('quantity')}>
                                                    <input type="button" value='-'onClick={() => handleChangeCount('decrease', amount ===1)} className={cx('qty-btn')}/>
                                                    <input type="text" value={amount}  onChange={handleChangeAmount} onBlur={handleBlur} className={cx('quantity-selector')}/>
                                                    <input type="button" value='+' onClick={() => handleChangeCount('increase')} className={cx('qty-btn')}/>
                                                </div>
                                                <div className={cx('wrap-addCart')}>
                                                    <button onClick={handleAddToCart} className={cx('cart-btn')}>
                                                        <span>Thêm vào giỏ hàng</span>
                                                    </button>
                                                </div>
                                            </div>
                                        
                                        <div className={cx('product-description')}>
                                            <div className={cx('title')}>
                                                <h2>Mô tả</h2>
                                            </div>
                                            <div className={cx('content-description')}>
                                                <span>
                                                    Sản phẩm đẹp
                                                </span>
                                            </div>
                                        </div>
                                        <div className={cx('clear')}></div>
                                    </div>
                                </div>
                            </div>
                    </div>
                </div>
            </div>
     );
}

export default ProductDetail;