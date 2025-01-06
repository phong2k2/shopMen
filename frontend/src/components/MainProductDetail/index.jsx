/* eslint-disable react/prop-types */
import ProductSlide from "./ProductSlide"
import ProductContent from "./ProductContent"
import Loading from "./Loading"

function MainProductDetail({
  images,
  detailProduct,
  handleChangeSelectColor,
  handleChangeSelectSize,
  handleAddToCart,
  selectedColor,
  selectedSize,
  isLoading
}) {
  if (isLoading) return <Loading />
  return (
    <div className="row">
      <ProductSlide images={images} />
      <ProductContent
        detailProduct={detailProduct}
        handleChangeSelectColor={handleChangeSelectColor}
        handleChangeSelectSize={handleChangeSelectSize}
        handleAddToCart={handleAddToCart}
        selectedColor={selectedColor}
        selectedSize={selectedSize}
      />
    </div>
  )
}

export default MainProductDetail
