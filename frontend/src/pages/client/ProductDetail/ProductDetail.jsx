/* eslint-disable react-hooks/exhaustive-deps */
import classNames from "classnames/bind"
import { useEffect, useMemo, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useSearchParams } from "react-router-dom"
import { toast } from "react-toastify"
import * as productService from "@/services/productService"
import styles from "./ProductDetail.module.scss"
import { useQuery } from "react-query"
import { addToCart, getTotals } from "@/redux/cartSlice"
import { useDeliveryInfo } from "@/hook/useContext"
import NavContent from "@/components/NavContent"
import MainProductDetail from "@/components/MainProductDetail"
import ProductInformation from "@/components/ProductInformation"
import { clearAmount } from "@/redux/countSlice"
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/navigation"
import "swiper/css/thumbs"
import { PUBLICROUTER } from "@/config/routes"

const cx = classNames.bind(styles)
function ProductDetail() {
  const [selectedColor, setSelectedColor] = useState("")
  const [selectedSize, setSelectedSize] = useState("")
  const [indexActive, setIndexActive] = useState(0)
  const [searchParams] = useSearchParams()
  const productId = searchParams.get("id")
  const { setShowModalCart } = useDeliveryInfo()
  const dispatch = useDispatch()
  const { amount } = useSelector((state) => state.count)

  // Get products Detail
  const { data: detailProduct, isLoading: isLoadingDetailProduct } = useQuery({
    queryKey: ["productDetail", productId],
    queryFn: () => productService.getProductDetail(productId)
  })

  const dataNav = [
    {
      label: detailProduct?.category?.name,
      path: PUBLICROUTER.product.category(
        detailProduct?.category?._id,
        detailProduct?.category?.name
      )
    },
    {
      label: detailProduct?.subCategory?.name,
      path: PUBLICROUTER.product.subCategory(
        detailProduct?.subCategory?._id,
        detailProduct?.subCategory?.name
      )
    },
    {
      label: detailProduct?.name,
      path: PUBLICROUTER.product.slug(detailProduct?.slug, detailProduct?._id)
    }
  ]

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

  //Add to Cart
  const handleAddToCart = () => {
    if (!selectedSize) return toast.error("Vui lòng chọn size")
    if (detailProduct) {
      dispatch(
        addToCart({
          orderItem: {
            name: detailProduct?.name,
            image: detailProduct?.thumbnail,
            amount,
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
      dispatch(clearAmount())
      setShowModalCart(true)
    }
  }
  return (
    <div className={cx("product-detail")}>
      <NavContent data={dataNav} />
      <div className={cx("container")}>
        <MainProductDetail
          images={images}
          detailProduct={detailProduct}
          isSizeInProduct={isSizeInProduct}
          handleChangeSelectColor={handleChangeSelectColor}
          handleChangeSelectSize={handleChangeSelectSize}
          handleAddToCart={handleAddToCart}
          selectedColor={selectedColor}
          selectedSize={selectedSize}
          isLoading={isLoadingDetailProduct}
        />
        {/* Descriptions */}
        <ProductInformation
          detailProduct={detailProduct}
          selectedSize={selectedSize}
          allProductRelatedFilter={allProductRelatedFilter}
          isLoading={isLoadingDetailProduct}
        />
      </div>
    </div>
  )
}

export default ProductDetail
