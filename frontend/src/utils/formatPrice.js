export const formatPrice = (price) => {
  // Định dạng giá sản phẩm thành số tiền có định dạng
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND"
  }).format(price)
}
