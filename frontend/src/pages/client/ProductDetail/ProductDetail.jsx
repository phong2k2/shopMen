import classNames from "classnames/bind"
import { useEffect, useMemo, useRef, useState } from "react";
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
    const [ color, setColor] = useState([])
    const [size, setSize] = useState([])
    const [selectedColor, setSelectedColor] = useState('');
    const [selectedSize, setSelectedSize] = useState('');
    const dispatch = useDispatch()
    const colorRef = useRef([])

    const discountedPrice = useMemo(() => {
        return Math.ceil(detailProduct?.price - detailProduct?.discount)
    },[detailProduct])

    useEffect(()=> {
        if(color && size) {
            setSelectedColor(color[0])
            setSelectedSize(size[0])
        }
    },[color, size])

    const handleChangeSelectColor = (item) => {
        setSelectedColor(item);
    }

    const handleChangeSelectSize = (item) => {
        setSelectedSize(item);
    }

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

    //Get size & color
    useEffect(() => {
        const getProductColor = async () => {
            try {
                const res = await productService.getProductColor(detailProduct?._id)
                if(res) {
                    setColor(res)
                }
            }catch (err) {
                console.log(err)
            }
        }
        const getProductSize = async () => {
            try {
                const res = await productService.getProductSize(detailProduct?._id)
                if(res) {
                    setSize(res)
                }
            }catch (err) {
                console.log(err)
            }
        }
        getProductColor()
        getProductSize()
    },[detailProduct?._id])

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

    //Add to Cart
    const handleAddToCart =  () => {
        if(detailProduct) {
            dispatch(addToCart({
                orderItem : {
                    name: detailProduct?.name,
                    image: selectedColor?.image[0] || detailProduct?.image,
                    amount: amount,
                    price: discountedPrice,
                    discount: detailProduct?.discount,
                    color: selectedColor?.color,
                    size: selectedSize?.size,
                    product: detailProduct?._id,
                }
            }))
            dispatch(getTotals());
        }
        
    }

    
    const colorMapping = {
        "Đen": "#000",
        "Xanh": "#0c2461",
        "Trắng": "#ffff",
        "Cam": "#c47a4a ",
    };
    
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
                                                    { selectedColor?.image ?
                                                        selectedColor?.image?.map((urlImgae, index) => {
                                                            return (
                                                                <li key={index} className={cx('gallery-item')}>
                                                                    <img src={`http://localhost:3000/${urlImgae}`} alt="" />
                                                                </li>
                                                            )
                                                        }) :(
                                                            <li  className={cx('gallery-item')}>
                                                                <img src={`http://localhost:3000/${detailProduct?.image}`} alt="" />
                                                            </li>
                                                            )
                                                    }
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
                                            <span className={cx('pro-price')}>{formatPrice(discountedPrice) }</span>
                                            <del>{formatPrice(detailProduct?.discount)}</del>
                                        </div>
                                        
                                            <div className={cx('select-action')}>
                                                {/* Biến thể */}
                                                <div className={cx('variant')}>
                                                    <div className={cx('color')}>
                                                        <div className={cx('select-swap')}>
                                                            
                                                            {
                                                                color?.map((itemColor, index) => {
                                                                    const colorStyle = {
                                                                        backgroundColor: colorMapping[itemColor?.color] || '#defaultcolor',
                                                                    };
                                                                    return (
                                                                        <div
                                                                            ref={colorRef}
                                                                             key={index} 
                                                                             className={cx('swatch-element',
                                                                             selectedColor?.color === itemColor?.color ? 'selector' : ''
                                                                        )}>
                                                                            <input onChange={()=> handleChangeSelectColor(itemColor)}  checked={selectedColor?.color === itemColor?.color} value={itemColor?.color} id={`swatch-1-${itemColor?.color}`} name="gender"  type="radio" />
                                                                            <label htmlFor={`swatch-1-${itemColor?.color}`} className={cx('block-select')}>
                                                                                <span style={colorStyle}>{itemColor?.color}</span>
                                                                            </label>
                                                                        </div>

                                                                    )
                                                                })
                                                            }

                                                        </div>
                                                    </div>

                                                    <div className={cx('size')}>
                                                        <div className={cx('select-swap')}>

                                                            {size?.map((itemSize, index) => {
                                                                return (
                                                                <div
                                                                key={index}
                                                                className={cx('swatch-element', selectedSize?.size === itemSize?.size ? 'active-size' : '' )}
                                                                >
                                                                    <input  id={`swatch-1-${itemSize?.size}`} onChange={()=>handleChangeSelectSize(itemSize)} name="option1" value={itemSize?.size}  type="radio" />
                                                                    <label htmlFor={`swatch-1-${itemSize?.size}`} className={cx('block-select-size')}>
                                                                        <span>{itemSize?.size}</span>
                                                                    </label>
                                                                </div>
                                                                )
                                                            })}
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className={cx('quantity')}>
                                                    <input type="button" value='-'onClick={() => handleChangeCount('decrease', amount ===1)} className={cx('qty-btn')}/>
                                                    <input type="text" value={amount}  onChange={handleChangeAmount} onBlur={handleBlur} className={cx('quantity-selector')}/>
                                                    <input type="button" value='+' onClick={() => handleChangeCount('increase')} className={cx('qty-btn')}/>
                                                </div>
                                                <div className={cx('wrap-addCart')}>
                                                    {detailProduct?.countInStock > 0 ? (
                                                       <button onClick={handleAddToCart} className={cx('cart-btn')}>
                                                         <span>Thêm vào giỏ hàng</span>
                                                        </button>
                                                    ): (
                                                        <button className={cx('cart-btn','out-row')}>
                                                            <span>Sản phẩm hết hàng</span>
                                                         </button>
                                                    )} 
                                                    
                                                </div>
                                            </div>
                                        
                                        <div className={cx('product-description')}>
                                            <div className={cx('title')}>
                                                <h2>Mô tả</h2>
                                            </div>
                                            <div className={cx('content-description')}>
                                                <span>
                                                    {detailProduct?.description}
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