import classNames from "classnames/bind";
import styles from "./HomeProduct.module.scss"
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import * as categoryService from "@/services/adminServices/categoryService";
import Menu from "./Product/Menu";
import { addToCart } from "@/redux/cartSlice";


const cx = classNames.bind(styles)
function HomeProduct() {
  const category = useSelector(state => state.category.allCategory)
  const [listProduct, setListProduct] = useState([]); // Initialize with an empty array
  const [activeCategory, setActiveCategory] = useState(0); 
  const dispatch = useDispatch()

  const handelAddToCart = (product) => {
    dispatch(addToCart({
      orderItem: {
        name: product?.name,
        amount: 1, 
        price: product?.price,
        product: product?._id
      }
    }))
  };

    
  useEffect(() => {
      const getFirstProduct = async () => {
        try {
          const id = category[0]._id
          const existingProduct = listProduct.find(item => item.id === id);
          
          if (!existingProduct) {
            const res = await categoryService.getDetailsCategory(id)
            setListProduct([
              ...listProduct,
              {
                'id': res._id,
                'product': res.product
              }
            ])
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
          setListProduct([
            ...listProduct,
            {
              'id': res._id,
              'product': res.product
            }
          ])
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
          <div className={cx("tab-content", 'tab-product')}>
                {
                  listProduct?.map((item, index) => {
                      return (
                       <Menu key={index} id={index} onClick={handelAddToCart} activeCategory={activeCategory} product={item}/>
                      )
                  })
                }
                 
        </div>
       </>
     );
}

export default HomeProduct;