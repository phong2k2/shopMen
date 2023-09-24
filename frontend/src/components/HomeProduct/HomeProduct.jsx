import classNames from "classnames/bind";
import styles from "./HomeProduct.module.scss"
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import * as categoryService from "@/services/adminServices/categoryService";
import Menu from "./Product/Menu";
import { addToCart, getTotals } from "@/redux/cartSlice";


const cx = classNames.bind(styles)
function HomeProduct() {
  const category = useSelector(state => state.category.allCategory)
  const [listProduct, setListProduct] = useState([]); // Initialize with an empty array
  const [activeCategory, setActiveCategory] = useState(0); 
  const dispatch = useDispatch()
  const slug = category?.length && category[activeCategory]?.slug 

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

    
  useEffect(() => {
  const getFirstProduct = async () => {
    try {
      const id = category[0]._id
      
        const res = await categoryService.getDetailsCategory(id)
        if(res?.product) {
          setListProduct(
              res?.product
          )
        }

    }catch( err) {
      console.log(err)
    }
  }
  getFirstProduct()
}, [])

const handleClickCate = async (category, index) => {
    try {
      const id = category?._id
      setActiveCategory(index)
      const existingProduct = listProduct.find(item => item.id === id);
      
      if (!existingProduct) {
        const res = await categoryService.getDetailsCategory(id)
        setListProduct(
          res?.product
        )
    }

    }catch( err) {
      console.log(err)
    }
};

return ( 
    <>
      <div className={cx("wrapper-heading-home")}>
        <h2 className={cx("sub-heading")}>Sản phẩm mới</h2>
        <div className={cx("tab-title")}>
          <ul className={cx("box-tabs")}>
            {
                category?.map((category, index) => {
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
          {/* <Menu onClick={handelAddToCart}  activeCategory={activeCategory} product={listProduct}/> */}
          <Menu  product={listProduct} onClick={handelAddToCart} slug={slug}/>
      </div>
    </>
  );
}

export default HomeProduct;