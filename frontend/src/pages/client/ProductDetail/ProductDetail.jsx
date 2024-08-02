/* eslint-disable react-hooks/exhaustive-deps */
import classNames from "classnames/bind"
import { useEffect, useMemo, useState } from "react"
import { useDispatch } from "react-redux"
import { useSearchParams } from "react-router-dom"
import { toast } from "react-toastify"
import * as productService from "@/services/productService"
import styles from "./ProductDetail.module.scss"
import { useQuery } from "react-query"
import { addToCart, getTotals } from "@/redux/cartSlice"
import { useDeliveryInfo } from "@/hook/useContext"

// Import Swiper styles
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/navigation"
import "swiper/css/thumbs"
import NavContent from "@/components/NavContent"
import MainProductDetail from "@/components/MainProductDetail"
import ProductInformation from "@/components/ProductInformation"

const cx = classNames.bind(styles)
function ProductDetail() {
  const [amount, setAmount] = useState(1)
  const [selectedColor, setSelectedColor] = useState("")
  const [selectedSize, setSelectedSize] = useState("")
  const [indexActive, setIndexActive] = useState(0)
  const [searchParams] = useSearchParams()
  const productId = searchParams.get("id")
  const { setShowModalCart } = useDeliveryInfo()
  const dispatch = useDispatch()

  // Get products Detail
  const { data: detailProduct } = useQuery({
    queryKey: ["productDetail", productId],
    queryFn: () => productService.getProductDetail(productId)
  })

  // Images
  const images = detailProduct?.color[indexActive]?.gallery
  // Sizes
  const sizes = detailProduct?.color[indexActive]?.size

  function isSizeInProduct(size) {
    return sizes?.some((productSize) => productSize.size === size)
  }

  // Get product related
  const { data: allProductRelated } = useQuery({
    queryKey: ["productRelated", detailProduct?.category?._id],
    queryFn: () => {
      return productService.getAllProductsRelated(detailProduct?.category?._id)
    },
    enabled: !!detailProduct?.category?._id
  })

  // Lọc sản phẩm liên quan
  const allProductRelatedFilter = useMemo(() => {
    return allProductRelated
      ?.filter((item) => item._id !== detailProduct?._id)
      .slice(0, 10)
  }, [allProductRelated, productId])

  const handleChangeSelectColor = (item, index) => {
    setIndexActive(index)
    setSelectedColor(item)
    setSelectedSize("")
  }

  const handleChangeSelectSize = (size) => {
    setSelectedSize(size)
  }

  // Active lần đầu
  useEffect(() => {
    setSelectedColor(detailProduct?.color[0])
  }, [detailProduct])

  // Increase product quantity
  const handleChangeCount = (type, limited) => {
    if (type === "decrease") {
      if (!limited) {
        setAmount(amount - 1)
      }
    } else {
      setAmount(amount + 1)
    }
  }

  // Decrease product quantity
  const handleChangeAmount = (e) => {
    let newValue = e.target.value
    if (!newValue || !isNaN(newValue)) {
      if (newValue > 999) {
        newValue = 999
      }
      setAmount(Number(newValue))
    }
  }

  const handleBlur = (e) => {
    let number = parseInt(e.target.value)
    if (number) {
      setAmount(number)
    } else {
      setAmount(1)
    }
  }

  //Add to Cart
  const handleAddToCart = () => {
    if (!selectedSize) return toast.error("Vui lòng chọn size")
    if (detailProduct) {
      dispatch(
        addToCart({
          orderItem: {
            name: detailProduct?.name,
            image: detailProduct?.thumbnail,
            amount: amount,
            price: detailProduct?.price,
            salePrice: detailProduct?.salePrice,
            color: selectedColor?.nameColor,
            size: selectedSize,
            product: detailProduct?._id,
            slug: detailProduct?.slug
          }
        })
      )
      dispatch(getTotals())
      setShowModalCart(true)
    }
  }
  return (
    <div className={cx("product-detail")}>
      <NavContent
        name={detailProduct?.category?.name}
        subName={detailProduct?.subCategory?.name}
        nameProduct={detailProduct?.name}
      />
      <div className={cx("container")}>
        <MainProductDetail
          images={images}
          detailProduct={detailProduct}
          isSizeInProduct={isSizeInProduct}
          handleChangeSelectColor={handleChangeSelectColor}
          handleChangeSelectSize={handleChangeSelectSize}
          handleChangeCount={handleChangeCount}
          handleChangeAmount={handleChangeAmount}
          handleBlur={handleBlur}
          handleAddToCart={handleAddToCart}
          amount={amount}
          selectedColor={selectedColor}
          selectedSize={selectedSize}
        />
        {/* Descriptions */}
        <ProductInformation
          detailProduct={detailProduct}
          selectedSize={selectedSize}
          allProductRelatedFilter={allProductRelatedFilter}
        />
      </div>
    </div>
  )
}

export default ProductDetail
