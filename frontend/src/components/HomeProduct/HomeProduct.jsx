import classNames from "classnames/bind";
import styles from "./HomeProduct.module.scss"
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import * as categoryService from "@/services/adminServices/categoryService";
import * as productService from "@/services/adminServices/productService";
import Menu from "./Product/Menu";
import { addToCart, getTotals } from "@/redux/cartSlice";


const cx = classNames.bind(styles)
function HomeProduct() {
  const [listProduct, setListProduct] = useState([]); // Initialize with an empty array
  const [activeCategory, setActiveCategory] = useState(0); 
  const [hideSlugProduct, setHideSlugProduct] = useState();
  const [categorySlider, setCategorySlider] = useState([])
  const dispatch = useDispatch()
  const slug = categorySlider?.length ? categorySlider[activeCategory]?.slug : '' 
  const limit = 10


  useEffect(()=> {
    if(categorySlider) {
      setHideSlugProduct(categorySlider[0])
    }
  },[categorySlider])

  useEffect(() => {
    const fetchApiHomeProduct = async () => {
      try {
        const res = await categoryService.getCategorySlideHome()
        setCategorySlider(res)
      }catch (err){
        console.log(err)
      }
    }
    fetchApiHomeProduct()
  },[])
  
  useEffect(() => {
  const getFirstProduct = async () => {
    try {
      const slug = hideSlugProduct?.slug
        const res = await productService.getProductByCategory(slug, limit)
        setListProduct(res?.product)
    }catch( err) {
      console.log(err)
    }
  }
  getFirstProduct()
}, [hideSlugProduct])

const handleClickCate = async (category, index) => {
    try {
      const slug = category?.slug
      setActiveCategory(index)
      // const existingProduct = listProduct.find(item => item.slug === slug);
      // if (!existingProduct) {
        const res = await productService.getProductByCategory(slug, limit)
        setListProduct(res?.product)
      // }
    }catch( err) {
      console.log(err)
    }
};

// Add to cart
const handelAddToCart = (product, discountedPrice) => {
  if(product) {
    dispatch(addToCart({
      orderItem: {
        name: product?.name,
        image: product?.image,
        amount: 1, 
        price: discountedPrice,
        product: product?._id,
        size: 'S',
        color: 'Trắng'
      }
    }))
    dispatch(getTotals());

  }
};

return ( 
    <>
      <div className={cx("wrapper-heading-home")}>
        <h2 className={cx("sub-heading")}>Sản phẩm mới</h2>
        <div className={cx("tab-title")}>
          <ul className={cx("box-tabs")}>
            {
                categorySlider?.map((category, index) => {
                    return(
                    <li key={index} onClick={() => handleClickCate(category, index)} className={cx("tab-item", {"active": activeCategory === index})}>
                        <a>{category?.name}</a>
                    </li>
                    )
                })
            }
          </ul>
        </div>
      </div>

      {/* product */}
      <div className={cx("tab-content")}>
          <Menu  product={listProduct} onClick={handelAddToCart} slug={slug}/>
      </div>
    </>
  );
}

export default HomeProduct;